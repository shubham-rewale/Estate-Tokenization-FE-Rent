import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { ABI, MUMBAI_ADDRESS } from "./contracts/DAO";
import AxiosInstance from "./utils/axiosInstance";
import connectToMetamask from "./utils/connectTometamask";

const ProposalDetails = () => {
  const location = useLocation();
  const proposalIdHash = location.state;
  const [proposal, setProposal] = useState();
  const [votingDetails, setVotingDetails] = useState({
    forPercentage: 0,
    againstPercentage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [reloadComponent, setReloadComponent] = useState(true);
  // const proposal = location.state;
  // console.log(proposal);
  const forVote = 0;
  const againstVote = 0;

  useEffect(() => {
    (async () => {
      const response = await AxiosInstance(
        `api/proposal/proposal?proposalIdHash=${proposalIdHash}`
      );
      // console.log(response.data.result.data);
      const proposal = response.data.result.data;
      // console.log((againstVote / proposal.totalTokenSupply) * 100);
      setProposal(proposal);
      setVotingDetails((prev) => {
        return {
          ...prev,
          forPercentage: (proposal.totalForVote / proposal.quorumVote) * 100,
          againstPercentage:
            (proposal.totalAgainstVote / proposal.totalTokenSupply) * 100,
        };
      });
      // console.log(response.data.result.data);
      setIsLoading(false);
    })();
  }, [reloadComponent]);

  const handleVoteClick = async (e) => {
    // console.log(e.target.name);
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      //checking the network
      const chainId = await signer.getChainId();
      if (chainId !== 80001) {
        alert("connect you metamask to Mumbai network");
        return;
      }
      // console.log(accounts, signer);

      const daoReadWrite = new ethers.Contract(MUMBAI_ADDRESS, ABI, signer);

      const response = await AxiosInstance(
        `/api/vote/getVoters?owner=${accounts[0]}&target=voterProof&proposalIdHash=${proposal.proposalIdHash}`
      );

      if (response.status === 200) {
        const result = response.data.result.data;
        if (result === "invalidAddress") {
          //will fix this address this
          console.log("invalid address");
        } else {
          const tx = await daoReadWrite.vote(
            proposal.tokenId,
            proposal.onChainProposalId,
            e.target.name,
            result.proof,
            result.balanceAtProposalTime.Balance
          );
          await tx.wait();
          const txFinality = await tx.wait();
          // console.log(txFinality);

          let totalForVote;
          let totalAgainstVote;
          let vote;
          let voter;

          txFinality.events.forEach((event) => {
            if (event.event === "voted") {
              totalForVote = Number(event.args.totalForVote._hex);
              totalAgainstVote = Number(event.args.totalAgainstVote._hex);
              vote = Number(event.args.vote._hex);
              voter = event.args.voter;
            }
          });
          let addVoteResponse = await AxiosInstance.post("/api/vote/add", {
            proposalIdHash: proposal.proposalIdHash,
            vote,
            voter,
          });
          let updateProposalResponse = await AxiosInstance.post(
            `api/proposal/updateVotingDetails`,
            {
              proposalIdHash: proposal.proposalIdHash,
              totalForVote,
              totalAgainstVote,
            }
          );
          alert("Voted");
          setReloadComponent(!reloadComponent);
        }
      } else {
        alert("Something Went wrong");
        console.log(response);
      }

      // const tx = await daoReadWrite.vote(
      //   tokenId,
      //   proposeAmount,
      //   withDrawFundsFrom,
      //   proposalDetails.proposalProof,
      //   ownerRootHash
      // );
      // const txFinality = await tx.wait();
      // if (txFinality.blocknumber === null) {
      //   alert("Transaction Failed");
      // } else {
      //   alert("Submitted Proposal Successfully");
      // }
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
  };

  const handleExecute = async () => {
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      const daoReadWrite = new ethers.Contract(MUMBAI_ADDRESS, ABI, signer);
      const tx = await daoReadWrite.execute(
        tokenId,
        proposal.onChainProposalId
      );
      const executeTxFinality = await tx.wait();
      if (executeTxFinality.blockNumber != null) {
        alert("Successfully Executed Proposal");
        window.location.reload(false);
      } else {
        alert("something Went Wrong, try again");
      }
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="PropertyDetails min-h-screen bg-black text-white">
      {isLoading ? (
        <div className="flex justify-center min-h-screen items-center">
          <div className="text-5xl text-gray-500">Loading ...</div>
        </div>
      ) : (
        <div className="mainContainer w-fit p-10 mx-auto">
          <p className="w-fit text-6xl  text-gray-500 mx-auto mb-6">
            Proposal Details
          </p>
          <div className="proposalDetailsContainer [&>p]:text-3xl [&>p]:w-fit [&>p]:mb-3 [&>p]:text-gray-300">
            <p className=" ">Title : {proposal.proposalTitle}</p>
            <p className=" ">ProposalId : {proposal.onChainProposalId}</p>
            <p className=" ">Proof : {proposal.proposalProof}</p>
            <p className=" ">From : {proposal.withdrawFundsFrom}</p>
            <p className=" ">Amount : {proposal.proposalAmount} Ether</p>
            <p className="">
              State :{" "}
              <span
                className={`${
                  proposal.proposalState === "Execution"
                    ? "text-green-500"
                    : proposal.proposalState === "Pending"
                    ? " text-yellow-300"
                    : " text-blue-600"
                } `}
              >
                {proposal.proposalState}
              </span>
            </p>
          </div>
          <p className="w-fit text-6xl  text-gray-500 mx-auto mb-6">
            voting Details
          </p>

          <div className="votingContainer">
            <div className="forVote">
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-green-700 dark:text-white">
                  For Vote
                </span>
                <span className="text-sm font-medium text-green-700 dark:text-white">
                  {proposal.totalForVote}/{proposal.quorumVote}
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-green-700 h-2.5 rounded-full"
                  style={{ width: votingDetails.forPercentage + "%" }}
                ></div>
              </div>
            </div>

            <div className="againstVote my-4">
              <div className="flex justify-between m-1">
                <span className="text-base font-medium text-red-700 dark:text-white">
                  Against Vote
                </span>
                {/* <span className="text-sm font-medium text-red-700 dark:text-white">
                  {10}%
                </span> */}
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: votingDetails.againstPercentage + "%" }}
                ></div>
              </div>
            </div>
            <div
              className={`timeDetails text-xl mt-10 ${
                proposal.proposalState === "Execution"
                  ? "text-gray-500"
                  : proposal.proposalState === "Pending"
                  ? " text-yellow-300"
                  : " text-blue-600"
              } `}
            >
              {proposal.proposalState === "Pending"
                ? `Voting will start at ${proposal.votingStartTime}`
                : proposal.proposalState === "Active"
                ? `Voting will end at ${proposal.votingEndTime}`
                : "Voting period is over"}
            </div>
            <div className="votingButtons">
              <div className="vote py-10 flex flex-col items-center border-b-2 border-gray-400">
                <button
                  name="1"
                  className=" block my-3 p-2 w-52 text-2xl rounded border-2 border-green-500 hover:bg-green-500 hover:text-black"
                  onClick={handleVoteClick}
                >
                  Vote For
                </button>
                <button
                  name="0"
                  className="block my-3 p-2 w-52 text-2xl rounded border-2 border-red-500 hover:bg-red-500 hover:text-black"
                  onClick={handleVoteClick}
                >
                  Vote Against
                </button>
              </div>

              <div className="execute mt-3 text-gray-400">
                <p>Note :- Only Property Manager can execute a proposal</p>
                <div className="executeButton mt-3 flex justify-center">
                  <button
                    className="block p-2 w-52 border-2 rounded border-cyan-700 hover:bg-cyan-700 hover:text-black"
                    onClick={handleExecute}
                  >
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalDetails;

{
  /* <div className="PropertyDetails min-h-screen bg-black text-white">
      <div className="mainContainer w-fit p-10 mx-auto">
        <p className="w-fit text-6xl  text-gray-500 mx-auto mb-6">
          Proposal Details
        </p>
        <div className="proposalDetailsContainer [&>p]:text-3xl [&>p]:w-fit [&>p]:mb-3 [&>p]:text-gray-300">
          <p className=" ">Title : {proposal.proposalTitle}</p>
          <p className=" ">ProposalId : {proposal.onChainProposalId}</p>
          <p className=" ">Proof : {proposal.proposalProof}</p>
          <p className=" ">From : {proposal.withdrawFundsFrom}</p>
          <p className=" ">Amount : {proposal.proposalAmount} Ether</p>
          <p className="">
            State :{" "}
            <span
              className={`${
                proposal.proposalState === "Execution"
                  ? "text-green-500"
                  : proposal.proposalState === "Pending"
                  ? " text-yellow-300"
                  : " text-blue-600"
              } `}
            >
              {proposal.proposalState}
            </span>
          </p>
        </div>
        <p className="w-fit text-6xl  text-gray-500 mx-auto mb-6">
          voting Details
        </p>

        <div className="votingContainer">
          <div className="forVote">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-green-700 dark:text-white">
                For Vote
              </span>
              <span className="text-sm font-medium text-green-700 dark:text-white">
                {forPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-700 h-2.5 rounded-full"
                style={{ width: forPercentage + "%" }}
              ></div>
            </div>
          </div>

          <div className="againstVote my-4">
            <div className="flex justify-between m-1">
              <span className="text-base font-medium text-red-700 dark:text-white">
                Against Vote
              </span>
              <span className="text-sm font-medium text-red-700 dark:text-white">
                {againstPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: againstPercentage + "%" }}
              ></div>
            </div>
          </div>
          <div
            className={`timeDetails text-xl mt-10${
              proposal.proposalState === "Execution"
                ? "text-green-500"
                : proposal.proposalState === "Pending"
                ? " text-yellow-300"
                : " text-blue-600"
            } `}
          >
            {proposal.proposalState === "Pending"
              ? `Voting will start at ${proposal.votingStartTime}`
              : proposal.proposalState === "Active"
              ? `Voting will end at ${proposal.votingEndTime}`
              : "Voting period is over"}
          </div>
          <div className="votingButtons">
            <div className="vote py-10 flex flex-col items-center border-b-2 border-gray-400">
              <button
                name="1"
                className=" block my-3 p-2 w-52 text-2xl rounded border-2 border-green-500 hover:bg-green-500 hover:text-black"
                onClick={handleVoteClick}
              >
                Vote For
              </button>
              <button
                name="0"
                className="block my-3 p-2 w-52 text-2xl rounded border-2 border-red-500 hover:bg-red-500 hover:text-black"
                onClick={handleVoteClick}
              >
                Vote Against
              </button>
            </div>

            <div className="execute mt-3 text-gray-400">
              <p>Note :- Only Property Manager can execute a proposal</p>
              <div className="executeButton mt-3 flex justify-center">
                <button
                  className="block p-2 w-52 border-2 rounded border-cyan-700 hover:bg-cyan-700 hover:text-black"
                  onClick={handleExecute}
                >
                  Execute
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */
}
