export const FACTORY_ABI = [
   {
      anonymous: false,
      inputs: [
         { internalType: "address", name: "tokenAddress", type: "address" },
         { internalType: "address", name: "owner", type: "address" },
         { internalType: "string", name: "name", type: "string" },
         { internalType: "string", name: "symbol", type: "string" },
         { internalType: "uint256", name: "supply", type: "uint256" },
      ],
      name: "TokenCreated",
      type: "event",
   },
   {
      inputs: [
         { internalType: "string", name: "_name", type: "string" },
         { internalType: "string", name: "_symbol", type: "string" },
         { internalType: "uint256", name: "_supply", type: "uint256" },
      ],
      name: "createToken",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [],
      name: "getAllTokens",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
   },
];
