import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Colabio } from "../target/types/colabio"; // Import the Anchor-generated type
import { expect } from "chai"; // Use chai for assertions

// Destructure web3 components
const { SystemProgram, LAMPORTS_PER_SOL } = anchor.web3;

describe("Colabio Crowdfunding Tests", () => {
  // Configure the client to use the local cluster (Anchor.toml)
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider() as anchor.AnchorProvider;

  // Get the program instance from the workspace
  // Ensure 'Colabio' matches your program name in lib.rs and Anchor.toml
  const program = anchor.workspace.Colabio as Program<Colabio>;

  // Use the provider's wallet as the default creator and backer for tests
  const wallet = provider.wallet as anchor.Wallet;
  const creator = wallet.publicKey;
  // For fund_project test, we'll use the same wallet as the backer for simplicity
  const backer = wallet.publicKey;

  // --- Test Data ---
  const testProjectLiteralSeed = Buffer.from("colabio_project"); // Match the literal seed in lib.rs
  const testFundingGoal = new anchor.BN(2 * LAMPORTS_PER_SOL); // 2 SOL
  const testDescription = "Test project for Colabio";
  const testCategory = "Testing";
  const fundAmount = new anchor.BN(1 * LAMPORTS_PER_SOL); // 1 SOL
  const fundAmountToReachGoal = new anchor.BN(1.1 * LAMPORTS_PER_SOL); // 1.1 SOL (to exceed 2 SOL goal)

  // Variables to store PDAs between tests if needed, otherwise recalculate
  let projectPda: anchor.web3.PublicKey;
  let escrowPda: anchor.web3.PublicKey;
  let escrowBump: number;

  // --- Test: Create a new project ---
  it("Successfully creates a project account", async () => {
    console.log(`Testing with Creator: ${creator.toBase58()}`);

    // 1. Calculate PDAs (MUST MATCH RUST SEEDS EXACTLY)
    // Project PDA: seeds = [b"PROJECT", b"colabio_project", creator_key]
    [projectPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("PROJECT"),
        testProjectLiteralSeed,
        creator.toBuffer()
      ],
      program.programId
    );

    // Escrow PDA: seeds = [b"ESCROW", project_pda_key]
    [escrowPda, escrowBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("ESCROW"),
        projectPda.toBuffer()
      ], // Derived from the project PDA itself
      program.programId
    );

    console.log(`Calculated Project PDA: ${projectPda.toBase58()}`);
    console.log(`Calculated Escrow PDA: ${escrowPda.toBase58()}`);
    console.log(`Funding Goal (lamports): ${testFundingGoal.toString()}`);

    // 2. Execute the create_project instruction
    try {
      const txSignature = await program.methods
        .createProject(testFundingGoal, testDescription, testCategory)
        .accounts({
          project: projectPda,
          projectEscrow: escrowPda,
          creator: creator,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Create project transaction signature:", txSignature);
      await provider.connection.confirmTransaction(txSignature, "confirmed");
      console.log("Transaction confirmed.");

      // 3. Fetch the created account data to verify
      const projectAccount = await program.account.project.fetch(projectPda);
      console.log("Fetched Project Account Data:", projectAccount);

      // 4. Assertions using Chai
      expect(projectAccount.creator.equals(creator)).to.be.true;
      expect(projectAccount.fundingGoal.eq(testFundingGoal)).to.be.true;
      expect(projectAccount.description).to.equal(testDescription);
      expect(projectAccount.category).to.equal(testCategory);
      expect(projectAccount.totalFunded.eqn(0)).to.be.true;
      expect(projectAccount.state).to.have.property("funding"); // Check enum state
      expect(projectAccount.escrowBump).to.equal(escrowBump); // Check stored bump

      console.log("✅ Project creation test passed!");

    } catch (error) {
      console.error("❌ Test failed:", error);
      throw error; // Re-throw to fail the test runner
    }
  });


  // --- Test: Fund an existing project ---
  it("Successfully funds a project", async () => {
    // Ensure projectPda and escrowPda are available from the previous test or recalculate/create here
    // For simplicity, we assume the project from the first test exists.
    // If running tests independently, you might need to call create_project here first.
    expect(projectPda, "Project PDA should be defined from previous test").to.not.be.undefined;
    expect(escrowPda, "Escrow PDA should be defined from previous test").to.not.be.undefined;

    console.log(`Funding project: ${projectPda.toBase58()}`);
    console.log(`Using backer: ${backer.toBase58()}`);
    console.log(`Funding amount (lamports): ${fundAmount.toString()}`);

    // Optional: Get balances before funding for assertion later (adds complexity)
    // const backerBalanceBefore = await provider.connection.getBalance(backer);
    // const escrowBalanceBefore = await provider.connection.getBalance(escrowPda);

    try {
      // Execute the fund_project instruction
      const txSignature = await program.methods
        .fundProject(fundAmount)
        .accounts({
          project: projectPda,
          projectEscrow: escrowPda,
          backer: backer,
          systemProgram: SystemProgram.programId,
        })
        .rpc(); // Use the same wallet as backer

      console.log("Fund project transaction signature:", txSignature);
      await provider.connection.confirmTransaction(txSignature, "confirmed");
      console.log("Transaction confirmed.");

      // Fetch the updated project account data
      const projectAccount = await program.account.project.fetch(projectPda);
      console.log("Fetched Project Account Data After Funding:", projectAccount);

      // Optional: Get balances after
      // const backerBalanceAfter = await provider.connection.getBalance(backer);
      // const escrowBalanceAfter = await provider.connection.getBalance(escrowPda);

      // Assertions
      expect(projectAccount.totalFunded.eq(fundAmount)).to.be.true; // Total funded should match the first contribution
      expect(projectAccount.state).to.have.property("funding"); // State should still be funding (1 SOL < 2 SOL goal)

      // Optional balance checks (approximate, account for gas fees)
      // expect(escrowBalanceAfter).to.equal(escrowBalanceBefore + fundAmount.toNumber());
      // expect(backerBalanceAfter).to.be.lessThan(backerBalanceBefore - fundAmount.toNumber());

      console.log("✅ Project funding test passed!");

    } catch (error) {
        console.error("❌ Funding test failed:", error);
        throw error;
    }
  });

  // --- Test: Fund a project to reach the goal ---
  it("Successfully funds a project to reach its goal", async () => {
    expect(projectPda, "Project PDA should be defined").to.not.be.undefined;
    expect(escrowPda, "Escrow PDA should be defined").to.not.be.undefined;

    // We know 1 SOL was funded in the previous test.
    // Let's fund enough to surpass the 2 SOL goal.
    console.log(`Funding project to reach goal: ${projectPda.toBase58()}`);
    console.log(`Using backer: ${backer.toBase58()}`);
    console.log(`Funding amount (lamports): ${fundAmountToReachGoal.toString()}`);

    const projectAccountBefore = await program.account.project.fetch(projectPda);
    const expectedTotalAfter = projectAccountBefore.totalFunded.add(fundAmountToReachGoal);

    try {
      // Execute the fund_project instruction
      const txSignature = await program.methods
        .fundProject(fundAmountToReachGoal)
        .accounts({
          project: projectPda,
          projectEscrow: escrowPda,
          backer: backer,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Goal funding transaction signature:", txSignature);
      await provider.connection.confirmTransaction(txSignature, "confirmed");
      console.log("Transaction confirmed.");

      // Fetch the updated project account data
      const projectAccountAfter = await program.account.project.fetch(projectPda);
      console.log("Fetched Project Account Data After Reaching Goal:", projectAccountAfter);

      // Assertions
      expect(projectAccountAfter.totalFunded.eq(expectedTotalAfter)).to.be.true; // Check total funded accurately reflects both contributions
      expect(projectAccountAfter.state).to.have.property("goalReached"); // State should now be GoalReached

      console.log("✅ Project goal reached test passed!");

    } catch (error) {
        console.error("❌ Goal funding test failed:", error);
        throw error;
    }
  });

  // --- Add more tests later ---
  // - Test funding a project that is already GoalReached (should fail)
  // - Test funding with amount 0 (should fail)
  // - Test withdraw_funds (once implemented)
  // - Test creator withdrawing when not GoalReached (should fail)
  // - Test non-creator withdrawing (should fail)

});