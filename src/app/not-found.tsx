import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#071426] flex items-center justify-center px-6">

      <div className="text-center">

        <h1 className="text-8xl font-bold text-[#D4AF37]">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-4">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold"
        >
          Back Home
        </Link>

      </div>

    </main>
  );
}