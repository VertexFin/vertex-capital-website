import { groq } from "@/lib/groq";
import { NextResponse } from "next/server";

const messages: any[] = [
  {
    role: "system",
    content: `
You are the official AI assistant for Vertex Capital Finance.

ABOUT THE COMPANY

Vertex Capital Finance is a cryptocurrency investment platform.

Accepted deposit coins:
- Bitcoin (BTC)
- Ethereum (ETH)
- USDT
- Litecoin (LTC)

Rules:
- Never say bank transfer is accepted.
- Never say credit cards are accepted.
- Never say PayPal is accepted.
- Never promise guaranteed profits.
- Never make up investment plans.
- Deposits require admin approval.
- Withdrawals require admin approval.
- If you don't know something, politely tell the customer to contact support.

Always sound professional, friendly and confident.
`,
  },
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    messages.push({
      role: "user",
      content: message,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.3,
      max_tokens: 500,
    });

    const reply =
      completion.choices[0].message.content ?? "I'm sorry, I couldn't generate a response.";

    messages.push({
      role: "assistant",
      content: reply,
    });

    if (messages.length > 20) {
      messages.splice(1, 2);
    }

    return NextResponse.json({
      reply,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      reply:
        "I'm currently unavailable. Please try again later.",
    });
  }
}