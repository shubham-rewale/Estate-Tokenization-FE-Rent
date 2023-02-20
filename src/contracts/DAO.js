const MUMBAI_ADDRESS = "0xFA5F425eCc75d5e5E08402C5342DF2a225c389B6";
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    name: "executed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum DAO.ReserveContracts",
        name: "withdrawFundsFrom",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalEditedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalTokenSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quorumVote",
        type: "uint256",
      },
    ],
    name: "proposalEdited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum DAO.ReserveContracts",
        name: "withdrawFundsFrom",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalInitiatedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votingStartAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votingEndAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalTokenSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quorumVote",
        type: "uint256",
      },
    ],
    name: "proposalInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "totalForVote",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAgainstVote",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "voted",
    type: "event",
  },
  {
    inputs: [],
    name: "MaintenanceReserve",
    outputs: [
      {
        internalType: "contract IMaintenanceReserve",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RentalProperties",
    outputs: [
      {
        internalType: "contract IRentalProperties",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VacancyReserve",
    outputs: [
      {
        internalType: "contract IVacancyReserve",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "enum DAO.ReserveContracts",
        name: "_withdrawFundsFrom",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_proposalProof",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_votersRootHash",
        type: "bytes32",
      },
    ],
    name: "editProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "getProposalState",
    outputs: [
      {
        internalType: "enum DAO.ProposalState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "getVotingDetail",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_votingDelay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_votingPeriod",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_propertyManager",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quorumPercentage",
        type: "uint256",
      },
      {
        internalType: "contract IMOGTokenUpgradeable",
        name: "_token",
        type: "address",
      },
      {
        internalType: "contract IRentalProperties",
        name: "_RentalProperties",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "propertyManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "uint256",
        name: "voteStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "voteEnd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "enum DAO.ReserveContracts",
        name: "withdrawFundsFrom",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "votersRootHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "proposalProof",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalTokenSupply",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "enum DAO.ReserveContracts",
        name: "_withdrawFundsFrom",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_proposalProof",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_votersRootHash",
        type: "bytes32",
      },
    ],
    name: "propose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IMaintenanceReserve",
        name: "_maintenanceReserveAddress",
        type: "address",
      },
    ],
    name: "setMaintenanceReserveAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_propertyManager",
        type: "address",
      },
    ],
    name: "setPropertyManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVacancyReserve",
        name: "_vacancyReserveAddress",
        type: "address",
      },
    ],
    name: "setVacancyReserveAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_votingDelay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_votingPeriod",
        type: "uint256",
      },
    ],
    name: "setVotingDelayAndPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IMOGTokenUpgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_vote",
        type: "uint8",
      },
      {
        internalType: "bytes32[]",
        name: "_voterMerkleProof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votings",
    outputs: [
      {
        internalType: "uint256",
        name: "forVote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "against",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { MUMBAI_ADDRESS, ABI };
