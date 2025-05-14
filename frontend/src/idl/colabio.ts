export type ProjectState = {
  funding: {};
  goalReached: {};
  failed: {};
  cancelled: {};
  withdrawn: {};
};

export type Project = {
  publicKey: string;
  title: string;
  creator: string;
  fundingGoal: number;
  totalFunded: number;
  description: string;
  category: string;
  state: keyof ProjectState;
  escrowBump: number;
};

export const IDL = {
  version: "0.1.0",
  name: "colabio",
  instructions: [
    {
      name: "createProject",
      accounts: [
        {
          name: "project",
          isMut: true,
          isSigner: false,
        },
        {
          name: "projectEscrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "fundingGoal",
          type: "u64",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "category",
          type: "string",
        },
      ],
    },
    {
      name: "fundProject",
      accounts: [
        {
          name: "project",
          isMut: true,
          isSigner: false,
        },
        {
          name: "projectEscrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "backer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "project",
      type: {
        kind: "struct",
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "creator",
            type: "pubkey",
          },
          {
            name: "fundingGoal",
            type: "u64",
          },
          {
            name: "totalFunded",
            type: "u64",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "category",
            type: "string",
          },
          {
            name: "state",
            type: {
              defined: "ProjectState",
            },
          },
          {
            name: "escrowBump",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "ProjectState",
      type: {
        kind: "enum",
        variants: [
          {
            name: "funding",
          },
          {
            name: "goalReached",
          },
          {
            name: "failed",
          },
          {
            name: "cancelled",
          },
          {
            name: "withdrawn",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "ProjectNotInFundingState",
      msg: "Project is not in funding state.",
    },
    {
      code: 6001,
      name: "FundingAmountZero",
      msg: "Funding amount must be greater than zero.",
    },
    {
      code: 6002,
      name: "Overflow",
      msg: "Arithmetic Overflow occurred.",
    },
    {
      code: 6003,
      name: "ProjectNotGoalReached",
      msg: "Project is not in goal reached state for withdrawal.",
    },
    {
      code: 6004,
      name: "WithdrawalNotAuthorized",
      msg: "Only the project creator can withdraw funds.",
    },
  ],
} as const; 