import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Vertex Capital <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: "📩 New Chat Message",
      html: `
        <h2>New Chat Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <div style="padding:15px;background:#f5f5f5;border-radius:8px;">
          ${message}
        </div>

        <br/>

        <a
          href="http://localhost:3000/admin/messages"
          style="
            background:#D4AF37;
            color:#000;
            padding:12px 20px;
            text-decoration:none;
            border-radius:8px;
            font-weight:bold;
          "
        >
          Open Admin Dashboard
        </a>
      `,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}