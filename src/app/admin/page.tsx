"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
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

    loadData();
  };

  const loadData = async () => {
    const { data: userData } = await supabase
      .from("profile")
      .select("*");

    const { data: depositData } = await supabase
      .from("deposits")
      .select("*");

    const { data: withdrawalData } = await supabase
      .from("withdrawals")
      .select("*");

    setUsers(userData || []);
    setDeposits(depositData || []);
    setWithdrawals(withdrawalData || []);

    setLoading(false);
  };

  const addBalance = async (
  id: string,
  currentBalance: number,
  amount: number
) => {
  if (!amount) return;

  await supabase
    .from("profile")
    .update({
      balance: currentBalance + amount,
    })
    .eq("id", id);

  loadData();
};

const subtractBalance = async (
  id: string,
  currentBalance: number,
  amount: number
) => {
  if (!amount) return;

  const newBalance = Math.max(
    0,
    currentBalance - amount
  );

  await supabase
    .from("profile")
    .update({
      balance: newBalance,
    })
    .eq("id", id);

  loadData();
};


  const toggleAdmin = async (
  id: string,
  current: boolean
) => {
  await supabase
    .from("profile")
    .update({
      is_admin: !current,
    })
    .eq("id", id);

  loadData();
};

const deleteUser = async (id: string) => {
  const confirmed = confirm(
    "Delete this user profile?"
  );

  if (!confirmed) return;

  await supabase
    .from("profile")
    .delete()
    .eq("id", id);

  loadData();
};

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="pt-32 text-white text-center">
        Loading Admin...
      </main>
    );
  }

  const pendingDeposits = deposits.filter(
    (d) => d.status === "pending"
  ).length;

  const pendingWithdrawals = withdrawals.filter(
    (w) => w.status === "pending"
  ).length;

  const totalDeposits = deposits.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0
  );

  const totalWithdrawals = withdrawals.reduce(
    (sum, w) => sum + Number(w.amount || 0),
    0
  );

  const totalBalances = users.reduce(
    (sum, u) => sum + Number(u.balance || 0),
    0
  );

  const filteredUsers = users.filter((user) =>
    `${user.full_name} ${user.email} ${user.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

 return (
  <main className="pt-32 px-6 min-h-screen bg-[#071426] pb-20">

    <div className="flex flex-wrap justify-between items-center gap-4 mb-10">

      <h1 className="text-4xl font-bold text-white">
        Admin Dashboard
      </h1>

      <button
        onClick={logout}
        className="border border-red-400 text-red-400 px-5 py-2 rounded-xl"
      >
        Logout
      </button>

    </div>

    {/* Dashboard Statistics */}

    <div className="grid md:grid-cols-2 1g:grid-cols-3 gap-6 mb-10">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">Users</p>
        <h2 className="text-3xl font-bold text-white">
          {users.length}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">Balances</p>
        <h2 className="text-3xl font-bold text-[#D4AF37]">
          ${totalBalances.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">Deposits</p>
        <h2 className="text-3xl font-bold text-white">
          ${totalDeposits.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">Withdrawals</p>
        <h2 className="text-3xl font-bold text-white">
          ${totalWithdrawals.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">Pending Deposits</p>
        <h2 className="text-3xl font-bold text-yellow-400">
          {pendingDeposits}
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">Pending Withdrawals</p>
        <h2 className="text-3xl font-bold text-red-400">
          {pendingWithdrawals}
        </h2>
      </div>

    </div>

    {/* Action Buttons */}

    <div className="flex flex-wrap gap-4 mb-8">

      <Link
        href="/admin/deposits"
        className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold"
      >
        Manage Deposits
      </Link>

      <Link
        href="/admin/withdrawals"
        className="border border-white/20 px-6 py-3 rounded-xl text-white"
      >
        Withdrawals
      </Link>

      <Link
        href="/deposit"
        className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold"
      >
        Deposit Funds
      </Link>

      <Link
        href="/admin/settings"
        className="border border-white/20 px-6 py-3 rounded-xl text-white"
      >
        Settings
      </Link>

    </div>

    {/* Search */}

    <div className="mb-8">

  <input
    type="text"
    placeholder="Search by name, username or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-[400px] bg-[#0E223D] border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500"
  />

</div>

    {/* Users */}

    <div className="space-y-6">

      {filteredUsers.map((user) => (

        <div
          key={user.id}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >

          <h2 className="text-2xl font-bold text-white">
            {user.full_name || "User"}
          </h2>

          <p className="text-gray-400 mt-1">
            {user.email}
          </p>

          <p className="text-gray-300 mt-2">
  Username: {user.username || "-"}
</p>

<p className="text-gray-300">
  BTC Wallet: {user.btc_wallet || "Not provided"}
</p>

<p className="text-gray-300">
  ETH Wallet: {user.eth_wallet || "Not provided"}
</p>

<p className="text-gray-300">
  USDT Wallet: {user.usdt_wallet || "Not provided"}
</p>

<p className="text-gray-300">
  LTC Wallet: {user.ltc_wallet || "Not provided"}
</p>

<p className="mt-2">
  Status:{" "}
  <span
    className={`font-semibold ${
      user.is_admin
        ? "text-green-400"
        : "text-gray-300"
    }`}
  >
    {user.is_admin ? "Administrator" : "Investor"}
  </span>
</p>

          <p className="text-gray-400">
            Plan: {user.plan || "No Plan"}
          </p>

          <p className="mt-4 text-white text-lg">
            Balance:
            <span className="text-[#D4AF37] font-bold ml-2">
              ${Number(user.balance || 0).toLocaleString()}
            </span>
          </p>

          <div className="flex gap-3 mt-5">

  <input
    id={`balance-${user.id}`}
    type="number"
    placeholder="Amount"
    className="flex-1 bg-[#0E223D] p-3 rounded-xl text-white"
  />

  <button
    onClick={() => {
      const input = document.getElementById(
        `balance-${user.id}`
      ) as HTMLInputElement;

      addBalance(
        user.id,
        Number(user.balance || 0),
        Number(input.value)
      );

      input.value = "";
    }}
    className="bg-green-600 px-5 rounded-xl font-bold"
  >
    +
  </button>

  <button
    onClick={() => {
      const input = document.getElementById(
        `balance-${user.id}`
      ) as HTMLInputElement;

      subtractBalance(
        user.id,
        Number(user.balance || 0),
        Number(input.value)
      );

      input.value = "";
    }}
    className="bg-red-600 px-5 rounded-xl font-bold"
  >
    -
  </button>

</div>

          <div className="flex flex-wrap gap-3 mt-6">

  <button
    onClick={() =>
      toggleAdmin(user.id, user.is_admin)
    }
    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
  >
    {user.is_admin
      ? "Remove Admin"
      : "Make Admin"}
  </button>

  <button
    onClick={() => deleteUser(user.id)}
    className="bg-red-600 text-white px-4 py-2 rounded-xl"
  >
    Delete User
  </button>

</div>

        </div>

      ))}

    </div>

    <div className="mt-16">

  <h2 className="text-3xl font-bold text-white mb-6">
    Recent Deposits
  </h2>

  <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

    <table className="w-full">

      <thead className="bg-[#0E223D]">

        <tr>

          <th className="text-left p-4">User</th>
          <th className="text-left p-4">Amount</th>
          <th className="text-left p-4">Coin</th>
          <th className="text-left p-4">Status</th>

        </tr>

      </thead>

      <tbody>

        {deposits.slice(0,5).map((deposit) => (

          <tr
            key={deposit.id}
            className="border-t border-white/10"
          >

            <td className="p-4">
              {deposit.user_id.slice(0,8)}...
            </td>

            <td className="p-4">
              ${deposit.amount}
            </td>

            <td className="p-4">
              {deposit.coin}
            </td>

            <td className="p-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  deposit.status === "approved"
                    ? "bg-green-600"
                    : deposit.status === "pending"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {deposit.status}
              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

        <div className="mt-16">

  <h2 className="text-3xl font-bold text-white mb-6">
    Recent Withdrawals
  </h2>

  <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

    <table className="w-full">

      <thead className="bg-[#0E223D]">

        <tr>

          <th className="text-left p-4">User</th>
          <th className="text-left p-4">Amount</th>
          <th className="text-left p-4">Wallet</th>
          <th className="text-left p-4">Status</th>

        </tr>

      </thead>

      <tbody>

        {withdrawals.slice(0, 5).map((withdrawal) => (

          <tr
            key={withdrawal.id}
            className="border-t border-white/10"
          >

            <td className="p-4">
              {withdrawal.user_id.slice(0, 8)}...
            </td>

            <td className="p-4">
              ${withdrawal.amount}
            </td>

            <td className="p-4 break-all">
              {withdrawal.wallet_address}
            </td>

            <td className="p-4">

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  withdrawal.status === "approved"
                    ? "bg-green-600"
                    : withdrawal.status === "pending"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {withdrawal.status}
              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

  </main>
);
} 
