"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DepositPage() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  const walletAddress = "bc1qvetmpa2d5ftxg60g3yt8mh2tk26yfty9hrpfka";

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setLoading(false);
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("deposits").insert([
      {
        user_id: session.user.id,
        amount: Number(amount),
        tx_hash: txHash,
        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Deposit submitted successfully");

    setAmount("");
    setTxHash("");
  };

  return (
    <main className="pt-32 px-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Deposit Funds
        </h1>

        <form
          onSubmit={handleDeposit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >

          <p className="text-gray-400 mb-2">
            Send Bitcoin to:
          </p>

          <div className="bg-[#0E223D] p-4 rounded-xl break-all mb-6">
            {walletAddress}
          </div>

          <input
            type="number"
            placeholder="Amount (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 mb-4 rounded-xl bg-[#0E223D]"
          />

          <input
            type="text"
            placeholder="Transaction Hash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="w-full p-4 mb-4 rounded-xl bg-[#0E223D]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"
          >
            {loading ? "Submitting..." : "Submit Deposit"}
          </button>

        </form>

      </div>
    </main>
  );
}