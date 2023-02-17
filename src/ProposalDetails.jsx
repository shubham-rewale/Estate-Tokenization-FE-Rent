import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { ABI, MUMBAI_ADDRESS } from "./contracts/DAO";
import AxiosInstance from "./utils/axiosInstance";
import connectToMetamask from "./utils/connectTometamask";
import { LoadingModal } from "./Modal";
import loaderGIF from "./assets/loader.gif";
import OwnersAndBalancesComponent from "./OwnersAndBalancesComponent";
import { reloadContext, userContext } from "./App";

const ProposalDetails = () => {
  const location = useLocation();
  const proposalIdHash = location.state;
  const [proposal, setProposal] = useState();
  const [votingDetails, setVotingDetails] = useState({
    forPercentage: 0,
    againstPercentage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [reloadComponent, setReloadComponent] =
    useContext(reloadContext).reloadDetails;
  const [user, setUser] = useContext(userContext).userDetails;
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
          forPercentage:
            proposal.totalForVote <= proposal.quorumVote
              ? (proposal.totalForVote / proposal.quorumVote) * 100
              : 100,
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
          setShowLoader(true);
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
            `api/proposal/updateProposalDetails`,
            {
              proposalIdHash: proposal.proposalIdHash,
              updateField: "votingDetails",
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
    } catch (err) {
      if (err.code === 4001) {
        window.alert("User Rejected Metamask Connection");
      } else {
        console.log(err);
      }
    }
    setShowLoader(false);
  };

  const handleExecute = async () => {
    try {
      const [provider, accounts, signer] = await connectToMetamask();
      const daoReadWrite = new ethers.Contract(MUMBAI_ADDRESS, ABI, signer);
      const tx = await daoReadWrite.execute(
        proposal.tokenId,
        proposal.onChainProposalId
      );
      setShowLoader(true);
      const txFinality = await tx.wait();
      if (txFinality.blockNumber != null) {
        let result;

        txFinality.events.forEach((event) => {
          if (event.event === "executed") {
            result = event.args.result;
          }
        });
        let updateProposalResponse = await AxiosInstance.post(
          `api/proposal/updateProposalDetails`,
          {
            proposalIdHash: proposal.proposalIdHash,
            updateField: "executionField",
            result: result ? "success" : "failed",
            isExecuted: true,
          }
        );
        alert("Successfully Executed Proposal");
        setReloadComponent(!reloadComponent);
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
    setShowLoader(false);
  };
  return (
    <div className="PropertyDetails min-h-screen bg-black text-white">
      {isLoading ? (
        <div className="flex justify-center min-h-screen items-center">
          <div className="text-5xl text-gray-500">Loading ...</div>
        </div>
      ) : (
        <div className="">
          <div className="DetailsAndVotingContainer flex pt-6">
            <div className="DetailsContainer flex-1">
              <p className="w-fit text-6xl  text-gray-500 mx-auto mb-6">
                Proposal Details
              </p>
              <div className="proposalDetailsContainer w-fit mx-auto mt-16 [&>p]:text-3xl [&>p]:w-fit [&>p]:mb-3 [&>p]:text-gray-300">
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
                        ? "text-orange-500"
                        : proposal.proposalState === "Pending"
                        ? " text-yellow-300"
                        : proposal.proposalState === "Active"
                        ? " text-blue-600"
                        : proposal.proposalState === "Executed"
                        ? "text-green-500"
                        : "text-red-500" //rejected
                    } `}
                  >
                    {proposal.proposalState}
                  </span>
                </p>
              </div>
            </div>
            <div className="VotingContainer flex-1">
              <p className="w-fit text-6xl  text-gray-500 mx-auto mb-6">
                voting Details
              </p>

              <div className="votingDetailsContainer w-1/2 mx-auto ">
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
                  className={`timeDetails text-2xl mt-10 w-fit mx-auto  ${
                    proposal.proposalState === "Pending"
                      ? " text-yellow-300"
                      : proposal.proposalState === "Active"
                      ? " text-blue-600"
                      : "text-gray-500" //over
                  } `}
                >
                  {proposal.proposalState === "Pending"
                    ? `Voting will start at ${proposal.votingStartTimeIST}`
                    : proposal.proposalState === "Active"
                    ? `Voting will end at ${proposal.votingEndTimeIST}`
                    : "Voting Period is over"}
                </div>
                <div className="votingAndExecuteButtons">
                  {proposal.proposalState === "Active" && user.isConnected && (
                    <div className="voteButtons py-10 flex flex-col items-center">
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
                  )}

                  {proposal.proposalState === "Execution" &&
                    user.isConnected &&
                    user.isPropertyManager && (
                      <div className="executeButton mt-3 flex justify-center">
                        <button
                          className="block p-2 w-52 border-2 rounded border-cyan-700 hover:bg-cyan-700 hover:text-black"
                          onClick={handleExecute}
                        >
                          Execute
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="tokenOwners mt-12 ">
            <p className="w-fit text-5xl mb-5 text-gray-500 mx-auto">
              Property Owners At Proposal Creation
            </p>
            <div className="ownersContainer w-fit mx-auto ">
              <div className="p-3 text-gray-300 text-xl border-b-2 border-b-gray">
                <span className="mr-10 px-44 ">Addresses</span>
                <span>Balances</span>
              </div>

              <OwnersAndBalancesComponent
                ownersAndBalances={proposal.ownerListAtProposal}
              />
            </div>
          </div>

          <LoadingModal show={showLoader}>
            <div
              className="flex justify-center items-center flex-col"
              style={{ height: "100%" }}
            >
              <div>
                <img src={loaderGIF} alt="blockGIF" style={{ width: "50px" }} />
              </div>
              <p className=" text-2xl mt-10">This will take Seconds</p>
            </div>
          </LoadingModal>
        </div>
      )}
    </div>
  );
};

export default ProposalDetails;
