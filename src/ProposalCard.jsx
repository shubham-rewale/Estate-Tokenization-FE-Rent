import { Link } from "react-router-dom";

const ProposalCard = (props) => {
  const proposal = props.proposal;
  const tokenId = proposal.tokenId;

  return (
    <Link
      to={`/property/${tokenId}/proposal/${proposal.onChainProposalId}`}
      state={proposal}
    >
      <div className="ProposalCard w-fit m-3 p-4 border-2 border-white flex">
        <p>{proposal.onChainProposalId}</p>
        <p className="px-3 w-52 truncate">{proposal.proposalTitle}</p>
        <p
          className={`${
            proposal.proposalState === "Execution"
              ? "text-green-500"
              : proposal.proposalState === "Pending"
              ? " text-yellow-300"
              : " text-blue-600"
          } `}
        >
          {proposal.proposalState}
        </p>
      </div>
    </Link>
  );
};

export default ProposalCard;
