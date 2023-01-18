const MUMBAI_ADDRESS = "0x73A6118c784325DC0Dd5e23494D4bF1aFC5D9bfb";
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
        indexed: false,
        internalType: "uint256",
        name: "_rentalPropertyTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_tokenOwnerList",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_rentAmountPerOwner",
        type: "uint256[]",
      },
    ],
    name: "RentDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_rentalPropertyTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_tenantAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_rentalStartTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_rentPeriodInDays",
        type: "uint256",
      },
    ],
    name: "RentalPeriodInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_rentalPropertyTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "terminatedTenant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "terminationTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "returnedRemainingDepositAmount",
        type: "uint256",
      },
    ],
    name: "RentalPeriodTerminated",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_propertyTokenId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_ownerList",
        type: "address[]",
      },
    ],
    name: "distributeRentAmount",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_propertyTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_propertyMaintenanceReserveCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_propertyVacancyReserveCap",
        type: "uint256",
      },
    ],
    name: "enterRentalPropertyDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_propertyTokenId",
        type: "uint256",
      },
    ],
    name: "getPropertyRentDeposits",
    outputs: [
      {
        internalType: "uint256",
        name: "_propertyDeposits",
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
        name: "_propertyTokenId",
        type: "uint256",
      },
    ],
    name: "getPropertyStatus",
    outputs: [
      {
        internalType: "string",
        name: "_propertyStatus",
        type: "string",
      },
      {
        internalType: "address",
        name: "_tenant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rentalPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_noOfCompletedDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_dailyRent",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_propertyTokenContract",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_maintenanceReserveContract",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_vacancyReserveContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_propertyManager",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_propertyTokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tenant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rentalPeriodInDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTowardsMaintenanceReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTowardsVacancyReserve",
        type: "uint256",
      },
    ],
    name: "initiateRentalPeriod",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "address payable",
        name: "_maintenanceReserveContractAddress",
        type: "address",
      },
    ],
    name: "setMaintenanceReserveAddr",
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
    name: "setPropertyManagerAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_vacancyReserveContractAddress",
        type: "address",
      },
    ],
    name: "setVacancyReserveAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_propertyTokenId",
        type: "uint256",
      },
    ],
    name: "terminateRentalPeriod",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "_propertyTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newMaintenanceReserveCapAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newVacancyReserveCapAmount",
        type: "uint256",
      },
    ],
    name: "updateReserveCapAmount",
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
];

export { MUMBAI_ADDRESS, ABI };
