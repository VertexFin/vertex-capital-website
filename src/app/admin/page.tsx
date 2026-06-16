"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);

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

    const { data } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!data?.is_admin) {
      router.push("/dashboard");
      return;
    }

    loadUsers();
  };

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profile")
      .select("*");

    setUsers(data || []);
  };

  return (
    <main className="pt-32 px-6">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h2 className="font-bold">
              {user.full_name}
            </h2>

            <p>{user.email}</p>

            <p>
              Balance: $
              {user.balance}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}