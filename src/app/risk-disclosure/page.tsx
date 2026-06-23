export default function RiskDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#071426] pt-32 px-6 pb-20">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Risk Disclosure
        </h1>

        <div className="space-y-8 text-gray-300 leading-8">

          <p>
            Investing involves risk. Before making any investment decision, investors should carefully evaluate their financial circumstances, objectives, and risk tolerance.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Market Risk
            </h2>

            <p>
              Financial markets are subject to fluctuations caused by economic events, political developments, regulatory changes, and investor sentiment. Investment values may rise or fall over time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Capital Risk
            </h2>

            <p>
              Investors may lose part or all of their invested capital. No investment should be made with funds that cannot afford to be exposed to risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Liquidity Risk
            </h2>

            <p>
              Certain investments may not be immediately redeemable. Withdrawal requests may be subject to processing periods or investment maturity requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Regulatory Risk
            </h2>

            <p>
              Changes in laws, taxation, financial regulations, or government policies may impact investment performance and investor returns.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No Guaranteed Returns
            </h2>

            <p>
              Any projected returns displayed on this platform are estimates only and should not be interpreted as guarantees of future performance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Investor Responsibility
            </h2>

            <p>
              By using this platform, investors acknowledge that they understand and accept the risks associated with investing and agree to make independent investment decisions.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}