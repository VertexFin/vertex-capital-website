"use client";

import { useState } from "react";


export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      question: "How secure is my investment?",
      answer:
        "We employ strict risk management practices, transparent operations, and professional oversight to protect investor funds.",
    },
    {
      question: "What is the minimum investment amount?",
      answer:
        "Investment plans start from $100,000 depending on the selected package.",
    },
    {
      question: "Can I withdraw before maturity?",
      answer:
        "Early withdrawal policies vary depending on the investment plan selected.",
    },
    {
      question: "How do returns get paid?",
      answer:
        "Returns may be paid periodically or at maturity depending on the chosen investment package.",
    },
    {
  question: "How do I start investing?",
  answer:
    "Create an account, choose an investment plan, fund your account, and begin tracking your investment performance.",
},
{
  question: "How can I monitor my investment?",
  answer:
    "You can track your investment portfolio through your investor dashboard.",
},
{
  question: "Do I need investment experience?",
  answer:
    "No. Our investment plans are designed for both new and experienced investors.",
},
{
  question: "How do I contact support?",
  answer:
    "You can reach our support team through email, phone, or the contact form on our website.",
},
{
  question: "When do I receive my returns?",
  answer:
    "Returns are paid according to the terms of your selected investment plan.",
},
{
  question: "How do I fund my account?",
  answer:
    "After logging into your dashboard, click Deposit Funds and follow the payment instructions."
},

{
  question: "What cryptocurrencies do you accept?",
  answer:
    "We currently support Bitcoin, Ethereum, USDT and Litecoin deposits."
},

{
  question: "How long does deposit approval take?",
  answer:
    "Most deposits are reviewed and approved within 24 hours after payment verification."
},

{
  question: "How do I withdraw profits?",
  answer:
    "Submit a withdrawal request from your dashboard and funds will be sent to your registered wallet address."
},

{
  question: "Can I have multiple investments?",
  answer:
    "Yes. Investors may maintain multiple active investment plans simultaneously."
},

{
  question: "Is there a minimum investment amount?",
  answer:
    "Yes. The minimum investment amount is $100."
}
  ];

  return (
    <section
      id="faq"
      className="py-28 bg-[#081726]"
    >
      <div className="max-w-4xl mx-auto px-6">

       <div>
  <h2 className="text-4xl font-bold text-white">
    Frequently Asked Questions
  </h2>
</div>
        <div className="mt-16 space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full text-left p-6 font-semibold text-white"
              >
                {faq.question}
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}