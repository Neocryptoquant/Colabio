use anchor_lang::prelude::*;
use anchor_lang::system_program::{self, Transfer}; // Import Transfer for SOL transfer

// Replace with your program's actual ID after first build/deploy
declare_id!("DSU6vAdyoNZwuQFPY4fenDuFtycxf615Pu2jXME9DDzp");

#[program]
pub mod colabio {
    use super::*;

    // --- INSTRUCTIONS ---

    pub fn create_project(
        ctx: Context<CreateProject>,
        funding_goal: u64, // Input: goal in lamports
        description: String, // Input: project description
        category: String,    // Input: project category
    ) -> Result<()> {
        // Get the project account from the context
        let project = &mut ctx.accounts.project;

        // Get the creator (signer) public key
        let creator_key = ctx.accounts.creator.key();

        // Initialize the project account's fields
        project.creator = creator_key;
        project.funding_goal = funding_goal;
        project.description = description;
        project.category = category;
        project.total_funded = 0; // Start with 0 funds
        project.state = ProjectState::Funding; // Start in Funding state

        // We retrieve the bump for the project account itself for potential use later
        // The escrow bump is retrieved from the CreateProject context directly
        project.escrow_bump = ctx.bumps.project_escrow;

        msg!("Project Created: {}", project.key());
        msg!("Creator: {}", project.creator);
        msg!("Description: {}", project.description);
        msg!("Funding Goal: {} lamports", project.funding_goal);
        msg!("Escrow PDA Bump: {}", project.escrow_bump);
        Ok(())
    }

    pub fn fund_project(ctx: Context<FundProject>, amount: u64) -> Result<()> {
        // Ensure the project is in the correct state to receive funds
        require!(
            ctx.accounts.project.state == ProjectState::Funding,
            ColabioError::ProjectNotInFundingState
        );
        // Ensure funding amount is greater than zero
        require!(amount > 0, ColabioError::FundingAmountZero);

        // 1. Transfer SOL from backer to project escrow PDA
        // Prepare the CPI context
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.backer.to_account_info(),
                to: ctx.accounts.project_escrow.to_account_info(),
            },
        );
        // Execute the transfer CPI
        system_program::transfer(cpi_context, amount)?;

        // 2. Update the project's total funded amount
        let project = &mut ctx.accounts.project;
        project.total_funded = project.total_funded.checked_add(amount).ok_or(ColabioError::Overflow)?; // Use checked_add for safety

        msg!(
            "Project {} funded with {} lamports by {}",
            project.key(),
            amount,
            ctx.accounts.backer.key()
        );
        msg!("New total funded: {} lamports", project.total_funded);


        // 3. Check if the funding goal has been reached
        if project.total_funded >= project.funding_goal {
            project.state = ProjectState::GoalReached;
            msg!("Funding goal reached for project {}!", project.key());
        }

        Ok(())
    }

     // --- Placeholder for withdrawing funds (MVP V0.2+) ---
    // pub fn withdraw_funds(ctx: Context<WithdrawFunds>) -> Result<()> {
    //     // 1. Check state (must be GoalReached)
    //     // 2. Check creator signature
    //     // 3. Transfer SOL from escrow PDA to creator using CPI and PDA signer seeds
    //     Ok(())
    // }

} // End of #[program] module

// --- DATA STRUCTURES ---

// Define the possible states of a project
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ProjectState {
    Funding,     // Project is actively accepting funds
    GoalReached, // Funding goal met, creator can potentially withdraw
    Failed,      // Funding goal not met by deadline (Not implemented in V0.1)
    Cancelled,   // Creator cancelled the project (Not implemented in V0.1)
    Withdrawn,   // Funds withdrawn by creator (Needed for withdraw logic)
}

// Define the structure for storing project data on-chain
#[account]
pub struct Project {
    pub creator: Pubkey,          // The public key of the project creator
    pub funding_goal: u64,        // Target amount in lamports (1 SOL = 1,000,000,000 lamports)
    pub total_funded: u64,        // Current amount raised in lamports
    pub description: String,      // Project description
    pub category: String,         // Project category
    pub state: ProjectState,      // Current state of the project (Funding, GoalReached, etc.)
    pub escrow_bump: u8,          // Bump seed for the project's escrow PDA
    // Add deadline later: pub deadline: i64,
    // Consider max string lengths later if needed
}

// Define size constants for space calculation
// Note: String space = 4 bytes for length + (max_chars * size_per_char (usually 1 for UTF-8, but Anchor often uses 4 for safety margin))
const DISCRIMINATOR_SIZE: usize = 8;
const PUBKEY_SIZE: usize = 32;
const U64_SIZE: usize = 8;
const U8_SIZE: usize = 1;
const ENUM_SIZE: usize = 1; // Assuming simple enum like ProjectState
const MAX_DESCRIPTION_LENGTH: usize = 256; // Example max length
const MAX_CATEGORY_LENGTH: usize = 64;    // Example max length
const STRING_LENGTH_PREFIX: usize = 4;
const PROJECT_ACCOUNT_SPACE: usize = DISCRIMINATOR_SIZE
    + PUBKEY_SIZE    // creator
    + U64_SIZE       // funding_goal
    + U64_SIZE       // total_funded
    + (STRING_LENGTH_PREFIX + MAX_DESCRIPTION_LENGTH) // description
    + (STRING_LENGTH_PREFIX + MAX_CATEGORY_LENGTH)    // category
    + ENUM_SIZE      // state
    + U8_SIZE;       // escrow_bump

// --- ACCOUNTS STRUCTS FOR INSTRUCTIONS ---

#[derive(Accounts)]
#[instruction(funding_goal: u64, description: String, category: String)] // Make arguments available if needed for seeds/space
pub struct CreateProject<'info> {
    // 1. Project Account (PDA)
    #[account(
        init,
        payer = creator,
        space = PROJECT_ACCOUNT_SPACE, // Use calculated constant
        // Seeds example: Use project name literal and creator key.
        // IMPORTANT: If you want a creator to make MULTIPLE projects,
        // you MUST add something unique here (like a counter or a unique name/seed string)
        seeds = [b"PROJECT", b"colabio_project".as_ref(), creator.key().as_ref()],
        bump
    )]
    pub project: Account<'info, Project>,

    // 2. Project Escrow Account (PDA)
    // This PDA will hold the funds for the project. Derived from the project account's key.
    #[account(
        init, // Initialize fully here
        payer = creator,
        space = DISCRIMINATOR_SIZE, // Just need the discriminator to exist and hold SOL balance
        seeds = [b"ESCROW", project.key().as_ref()], // Seeds: "ESCROW" + project's key
        bump,
        owner = system_program.key() // Owned by system program to hold SOL
    )]
    /// CHECK: We are initializing the account space to hold SOL balance via SystemProgram. Owner is checked.
    pub project_escrow: UncheckedAccount<'info>, // Use UncheckedAccount for System Owned accounts holding SOL

    // 3. Creator Account (Signer)
    #[account(mut)]
    pub creator: Signer<'info>,

    // 4. System Program
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(amount: u64)] // Make amount available if needed for seeds/checks
pub struct FundProject<'info> {
    // 1. Project Account (Needs to be mutable to update total_funded and state)
    // Inside the FundProject struct:
#[account(
    mut,
    // We need to ensure the escrow PDA passed matches the one derived from this project
    seeds = [b"PROJECT", b"colabio_project".as_ref(), project.creator.as_ref()], // Use same seeds as creation
    bump, // Anchor will verify bump if project account has it stored, but we don't store project bump here.
    // REMOVE this line: has_one = creator // Optional constraint: check if project.creator matches a passed creator pubkey
)]
pub project: Account<'info, Project>,

    // 2. Project Escrow Account (Needs to be mutable to receive funds)
    #[account(
        mut,
        seeds = [b"ESCROW", project.key().as_ref()], // Use seeds and project key to derive PDA
        bump = project.escrow_bump // Use the stored bump from the project account for verification
    )]
    /// CHECK: Seeds + bump constraint ensures this is the correct escrow PDA for the project. Mut needed for transfer.
    pub project_escrow: UncheckedAccount<'info>, // Receiving SOL via CPI, System Program handles balance.

    // 3. Backer Account (Signer, provides the funds)
    #[account(mut)]
    pub backer: Signer<'info>,

    // 4. System Program (Required for the SOL transfer CPI)
    pub system_program: Program<'info, System>,
}

// --- Placeholder Accounts Struct for withdrawing funds ---
// #[derive(Accounts)]
// pub struct WithdrawFunds<'info> {
//     // 1. Project Account (Needs creator and state check)
//     #[account(
//         mut, // May need to update state to Withdrawn
//         seeds = [b"PROJECT", b"colabio_project".as_ref(), project.creator.as_ref()],
//         bump,
//         has_one = creator // MUST be the original creator
//     )]
//     pub project: Account<'info, Project>,

//     // 2. Project Escrow Account (Needs to be mutable to send funds FROM)
//     #[account(
//         mut,
//         seeds = [b"ESCROW", project.key().as_ref()],
//         bump = project.escrow_bump
//     )]
//     /// CHECK: Seeds + bump constraint ensures this is the correct escrow PDA. Mut needed for transfer FROM.
//     pub project_escrow: UncheckedAccount<'info>,

//     // 3. Creator Account (Signer & Receiver of funds)
//     #[account(mut)]
//     pub creator: Signer<'info>,

//     // 4. System Program (Required for the SOL transfer CPI)
//     pub system_program: Program<'info, System>,
// }


// --- Custom Errors ---
#[error_code]
pub enum ColabioError {
    #[msg("Project is not in funding state.")]
    ProjectNotInFundingState,
    #[msg("Funding amount must be greater than zero.")]
    FundingAmountZero,
    #[msg("Arithmetic Overflow occurred.")]
    Overflow,
    #[msg("Project is not in goal reached state for withdrawal.")]
    ProjectNotGoalReached,
    #[msg("Only the project creator can withdraw funds.")]
    WithdrawalNotAuthorized,
}