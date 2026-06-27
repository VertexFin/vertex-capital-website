"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminSettings() {
  const router = useRouter();

  const [wallet, setWallet] = useState("");
  const [walletId, setWalletId] = useState<string>("");
  const [saving, setSaving] = useState(false);

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

    loadWallet();
  };

  const loadWallet = async () => {
    const { data, error } = await supabase
      .from("wallet_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setWallet(data.btc_wallet || "");
    setWalletId(data.id);
  };

  const save = async () => {
    if (!wallet.trim()) {
      alert("Please enter a wallet address.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("wallet_settings")
      .update({
        btc_wallet: wallet,
      })
      .eq("id", walletId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("BTC wallet updated successfully.");
  };

  return (
    <main className="pt-32 px-6 min-h-screen bg-[#071426]">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          Admin Wallet Settings
        </h1>

        <label className="block text-gray-300 mb-2">
          Bitcoin Wallet Address
        </label>

        <textarea
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          rows={4}
          className="w-full bg-[#0E223D] text-white rounded-xl p-4 border border-white/10"
          placeholder="Enter BTC wallet address"
        />

        <button
          onClick={save}
          disabled={saving}
          className="mt-6 bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save BTC Wallet"}
        </button>

      </div>
    </main>
  );
}