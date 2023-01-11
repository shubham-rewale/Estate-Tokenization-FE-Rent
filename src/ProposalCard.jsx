import { useState } from "react";

const ProposalCard = (props) => {
  const [vote, setVote] = useState("");
  const proposal = props.proposal;
  const handleVoteClick = () => {
    console.log(vote);
  };
  return (
    <div className="ProposalCard w-fit m-3 p-4 border-2 border-white">
      <div className="details mb-2 border-b-2 border-gray-500 pb-2">
        <p>On Chain ProposalId : {proposal.onChainProposalId}</p>
        <p>Proof : {proposal.proposalProofLink}</p>
        <p>Requested Funds From : {proposal.withDrawFundsFrom}</p>
        <p>Amount : {proposal.amount}</p>
        {/* <p>Proposed At : {proposal.createdAt.split("T")[0]}</p> */}
      </div>
      <div className="InputAndButtons flex flex-col items-center">
        <div className="vote">
          <input
            type="text"
            placeholder="Ex.  0"
            className="p-2 w-14 rounded bg-gray-900"
            value={vote}
            onChange={(e) => setVote(e.target.value)}
          />
          <button
            className="ml-2 px-2 py-1 rounded border-2 border-purple-500 hover:bg-purple-500 hover:text-black"
            onClick={handleVoteClick}
          >
            Vote
          </button>
        </div>
        <div className="execute">
          <button className="border-2 rounded border-cyan-700 mt-3 px-7 py-2 hover:bg-cyan-700 hover:text-black">
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
