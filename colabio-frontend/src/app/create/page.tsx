'use client';

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { toast } from "react-hot-toast";
import { PROGRAM_ID } from "../../config/solana";
import { Transaction, SystemProgram, PublicKey, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { createInstruction } from "../../utils/instructions";
import { ProjectCategory } from "../../types/project";

const validCategories: ProjectCategory[] = ['DeFi', 'NFT', 'Social', 'Education', 'Other'] as const;


export default function CreateProject() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "DeFi" as ProjectCategory,
    goalAmount: "",
  } as {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: ProjectCategory;
    goalAmount: string;
  });

  const [errors, setErrors] = useState<{
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    goalAmount: string;
  }>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    goalAmount: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: formData.title.length < 3 ? "Title must be at least 3 characters" : "",
      shortDescription: formData.shortDescription.length < 10 ? "Short description must be at least 10 characters" : "",
      fullDescription: formData.fullDescription.length < 20 ? "Full description must be at least 20 characters" : "",
      category: !validCategories.includes(formData.category) ? "Please select a valid category" : "",
      goalAmount: !/^[0-9]+(\\.[0-9]+)?$/.test(formData.goalAmount) ? "Please enter a valid number" : "",
    } as {
      title: string;
      shortDescription: string;
      fullDescription: string;
      category: string;
      goalAmount: string;
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the changed field
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateForm()) {
        throw new Error("Please fix the form errors");
      }

      if (!publicKey) {
        throw new Error("Please connect your wallet first");
      }

      // Convert goal amount to lamports
      const goalAmountLamports = Number(formData.goalAmount) * 1_000_000_000;

      // Create PDAs
      const projectPda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("project"),
          publicKey.toBuffer(),
          Buffer.from(formData.title)
        ],
        PROGRAM_ID
      )[0];

      const projectEscrowPda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("project_escrow"),
          projectPda.toBuffer()
        ],
        PROGRAM_ID
      )[0];

      console.log("Project PDA:", projectPda.toString());
      console.log("Project Escrow PDA:", projectEscrowPda.toString());
      console.log("Goal Amount (lamports):", goalAmountLamports);

      const transaction = new Transaction().add(
        createInstruction(
          {
            creator: publicKey,
            project: projectPda,
            projectEscrow: projectEscrowPda,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
          },
          {
            fundingGoal: goalAmountLamports,
            title: formData.title,
            shortDescription: formData.shortDescription,
            fullDescription: formData.fullDescription,
            category: formData.category
          }
        )
      );

      // Send and confirm the transaction
      console.log("Sending transaction...");
      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction signature:", signature);
      
      await connection.confirmTransaction(signature, "confirmed");
      console.log("Transaction confirmed successfully");

      toast.success("Project created successfully!");
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to create project. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.title.length >= 3 &&
      formData.shortDescription.length >= 10 &&
      formData.fullDescription.length >= 20 &&
      validCategories.includes(formData.category) &&
      /^[0-9]+(\\.[0-9]+)?$/.test(formData.goalAmount)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <Label htmlFor="shortDescription">Short Description</Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Enter a brief description"
            className={errors.shortDescription ? "border-red-500" : ""}
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fullDescription">Full Description</Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Enter detailed project description"
            className={errors.fullDescription ? "border-red-500" : ""}
          />
          {errors.fullDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.fullDescription}</p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {validCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <Label htmlFor="goalAmount">Goal Amount (SOL)</Label>
          <Input
            id="goalAmount"
            name="goalAmount"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.goalAmount}
            onChange={handleChange}
            placeholder="Enter goal amount in SOL"
            className={errors.goalAmount ? "border-red-500" : ""}
          />
          {errors.goalAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.goalAmount}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className="w-full"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </Button>

        <div className="mt-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Project Details Preview</h3>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <p className="text-gray-600">{formData.title}</p>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <p className="text-gray-600">{formData.shortDescription}</p>
                </div>
                <div>
                  <Label>Full Description</Label>
                  <p className="text-gray-600">{formData.fullDescription}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <p className="text-gray-600">{formData.category}</p>
                </div>
                <div>
                  <Label>Goal Amount</Label>
                  <p className="text-gray-600">{formData.goalAmount} SOL</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
