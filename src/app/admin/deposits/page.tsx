"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDeposits() {
  const router = useRouter();

  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profile")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      router.push("/dashboard");
      return;
    }

    loadDeposits();
  };

  const loadDeposits = async () => {
    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDeposits(data || []);
    setLoading(false);
  };

  const approveDeposit = async (deposit: any) => {
    try {
      // prevent double clicking issues
      if (deposit.status !== "pending") return;

      // 1. mark deposit approved
      const { error: depError } = await supabase
        .from("deposits")
        .update({ status: "approved" })
        .eq("id", deposit.id);

      if (depError) throw depError;

      // 2. get user balance
      const { data: user, error: userError } = await supabase
        .from("profile")
        .select("balance")
        .eq("id", deposit.user_id)
        .single();

      if (userError) throw userError;

      // 3. update balance safely
      const newBalance =
        Number(user?.balance || 0) + Number(deposit.amount);

      const { error: balError } = await supabase
        .from("profile")
        .update({ balance: newBalance })
        .eq("id", deposit.user_id);

      if (balError) throw balError;

      loadDeposits();
    } catch (err) {
      console.error(err);
      alert("Error approving deposit");
    }
  };

  const rejectDeposit = async (id: string) => {
    try {
      const { error } = await supabase
        .from("deposits")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      loadDeposits();
    } catch (err) {
      console.error(err);
      alert("Error rejecting deposit");
    }
  };

  if (loading) {
    return (
      <main className="pt-32 text-center">
        Loading deposits...
      </main>
    );
  }

  return (
    <main className="pt-32 px-6 min-h-screen bg-[#071426]">

      <h1 className="text-4xl font-bold mb-10">
        Manage Deposits
      </h1>

      <div className="space-y-6">

        {deposits.length === 0 ? (
          <p className="text-gray-400">
            No deposits found.
          </p>
        ) : (
          deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl"
            >

              <p>
                User ID:
                <span className="text-gray-400 ml-2">
                  {deposit.user_id}
                </span>
              </p>

              <p className="mt-3">
                Amount:
                <b className="ml-2">
                  ${deposit.amount}
                </b>
              </p>

              <p>
                Coin: {deposit.coin}
              </p>

              <p className="break-all">
                TX Hash: {deposit.tx_hash}
              </p>

              <p className="mt-3">
                Status:
                <span className="text-[#D4AF37] ml-2">
                  {deposit.status}
                </span>
              </p>

              {deposit.status === "pending" && (
                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => approveDeposit(deposit)}
                    className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-bold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectDeposit(deposit.id)}
                    className="border border-red-500 text-red-400 px-5 py-2 rounded-xl"
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          ))
        )}

      </div>
    </main>
  );
}