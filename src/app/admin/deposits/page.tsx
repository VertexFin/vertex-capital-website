"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DepositsPage() {
  const router = useRouter();
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeposits();
  }, []);

  const loadDeposits = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
    }

    setDeposits(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="pt-32 text-center">
        Loading deposits...
      </main>
    );
  }

  return (
    <main className="pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          My Deposits
        </h1>

        <div className="space-y-4">
          {deposits.length === 0 ? (
            <p>No deposits yet.</p>
          ) : (
            deposits.map((d) => (
              <div
                key={d.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <p>Amount: ${d.amount}</p>
                <p>Hash: {d.tx_hash}</p>
                <p>Status: {d.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}