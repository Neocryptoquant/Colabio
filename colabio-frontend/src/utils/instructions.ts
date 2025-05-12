import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PROGRAM_ID } from "@/config/solana";
import { ProjectCategory } from "@/types/project";

export interface CreateProjectInstructionData {
  fundingGoal: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
}

export function createInstruction(
  accounts: {
    creator: PublicKey;
    project: PublicKey;
    projectEscrow: PublicKey;
    systemProgram: PublicKey;
    rent: PublicKey;
  },
  data: CreateProjectInstructionData
): TransactionInstruction {
  const buffer = Buffer.alloc(1000); // Adjust size as needed
  const view = new DataView(buffer.buffer);

  // Write data to buffer
  let offset = 0;
  view.setUint8(offset, 0); // Instruction discriminator
  offset += 1;

  // Write funding goal
  view.setBigUint64(offset, BigInt(data.fundingGoal), true);
  offset += 8;

  // Write strings
  const writeString = (str: string) => {
    const bytes = Buffer.from(str);
    view.setUint8(offset, bytes.length);
    offset += 1;
    bytes.copy(buffer, offset);
    offset += bytes.length;
  };

  writeString(data.title);
  writeString(data.shortDescription);
  writeString(data.fullDescription);
  writeString(data.category);

  return new TransactionInstruction({
    keys: [
      { pubkey: accounts.creator, isSigner: true, isWritable: false },
      { pubkey: accounts.project, isSigner: false, isWritable: true },
      { pubkey: accounts.projectEscrow, isSigner: false, isWritable: true },
      { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
      { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: buffer.slice(0, offset),
  });
}
