"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function WithdrawPage() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("withdrawals").insert([
      {
        user_id: session.user.id,
        amount: Number(amount),
        wallet_address: wallet,
        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Withdrawal request sent");

    setAmount("");
    setWallet("");
  };

  return (
    <main className="pt-32 px-6">
      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Withdraw Funds
        </h1>

        <form
          onSubmit={handleWithdraw}
          className="bg-white/5 border border-white/10 p-8 rounded-2xl"
        >

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 mb-4 rounded-xl bg-[#0E223D]"
          />

          <input
            type="text"
            placeholder="Bitcoin Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full p-4 mb-4 rounded-xl bg-[#0E223D]"
          />

          <button
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"
          >
            {loading ? "Processing..." : "Request Withdrawal"}
          </button>

        </form>

      </div>
    </main>
  );
}