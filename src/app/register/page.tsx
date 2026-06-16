"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [btcWallet, setBtcWallet] = useState("");
  const [ethWallet, setEthWallet] = useState("");
  const [usdtWallet, setUsdtWallet] = useState("");
  const [ltcWallet, setLtcWallet] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !fullName ||
      !username ||
      !email ||
      !password
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      alert(
        "You must accept the Terms & Conditions"
      );
      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      setLoading(false);
      alert("Unable to create account");
      return;
    }

    const { error: profileError } =
      await supabase
        .from("profile")
        .insert([
          {
            id: user.id,
            full_name: fullName,
            username,
            email,

            btc_wallet: btcWallet,
            eth_wallet: ethWallet,
            usdt_wallet: usdtWallet,
            ltc_wallet: ltcWallet,

            balance: 0,
            total_deposits: 0,
            total_withdrawals: 0,

            is_admin: false,
          },
        ]);

    setLoading(false);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert(
      "Account created successfully. Please login."
    );

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#071426] pt-32 px-6">

      <div className="max-w-xl mx-auto">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h1 className="text-4xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-gray-400 mb-8">
            Open your investment account.
          </p>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-xl bg-[#0E223D]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-xl bg-[#0E223D]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>
            </div>

            <hr className="border-white/10" />

            <h3 className="font-bold text-xl">
              Wallet Information
            </h3>

            <input
              type="text"
              placeholder="Bitcoin Wallet Address"
              value={btcWallet}
              onChange={(e) =>
                setBtcWallet(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <input
              type="text"
              placeholder="Ethereum Wallet Address"
              value={ethWallet}
              onChange={(e) =>
                setEthWallet(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <input
              type="text"
              placeholder="USDT Wallet Address"
              value={usdtWallet}
              onChange={(e) =>
                setUsdtWallet(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <input
              type="text"
              placeholder="Litecoin Wallet Address"
              value={ltcWallet}
              onChange={(e) =>
                setLtcWallet(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-xl bg-[#0E223D]"
            />

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) =>
                  setAcceptedTerms(
                    e.target.checked
                  )
                }
                className="mt-1"
              />

              <label className="text-sm text-gray-300">
                I agree to the
                {" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-[#D4AF37]"
                >
                  Terms & Conditions
                </a>
                ,
                {" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-[#D4AF37]"
                >
                  Privacy Policy
                </a>
                {" "}and{" "}
                <a
                  href="/risk-disclosure"
                  target="_blank"
                  className="text-[#D4AF37]"
                >
                  Risk Disclosure
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}