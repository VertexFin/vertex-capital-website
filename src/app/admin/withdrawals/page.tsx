"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminWithdrawals() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
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
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      router.push("/dashboard");
      return;
    }

    load();
  };

  const load = async () => {
    const { data } = await supabase
      .from("withdrawals")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await supabase
      .from("withdrawals")
      .update({ status })
      .eq("id", id);

    load();
  };

  if (loading) {
    return (
      <main className="pt-32 text-center">
        Loading withdrawals...
      </main>
    );
  }

  return (
    <main className="pt-32 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Withdrawals Admin
      </h1>

      <div className="space-y-4">
        {data.map((w) => (
          <div
            key={w.id}
            className="bg-white/5 border border-white/10 p-6 rounded-xl"
          >
            <p>Amount: ${w.amount}</p>
            <p>Wallet: {w.wallet_address}</p>
            <p>Status: {w.status}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  updateStatus(w.id, "approved")
                }
                className="bg-green-500 px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(w.id, "rejected")
                }
                className="bg-red-500 px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}