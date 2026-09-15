import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod schema
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Honeypot spam check
    if (result.data.honeypot && result.data.honeypot.trim().length > 0) {
      // Reject bot submission silently
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    const { name, email, message } = result.data;
    const recipientEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    // Check if email dispatch service and recipient are configured
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || !recipientEmail) {
      return NextResponse.json(
        {
          success: true,
          delivered: false,
          message:
            "Form input validated successfully. Automated email dispatch is not configured in this environment.",
        },
        { status: 200 }
      );
    }

    // Initialize Resend and dispatch email
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio Contact] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Portfolio Contact Form at ${new Date().toISOString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #27272a; border-radius: 12px; background-color: #09090b; color: #fafafa;">
          <h2 style="color: #38bdf8; margin-top: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em;">
            New Contact Message
          </h2>
          <div style="background-color: #18181b; padding: 16px; border-radius: 8px; border: 1px solid #27272a; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #a1a1aa;">
              <strong style="color: #f4f4f5;">From:</strong> ${name} (<a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>)
            </p>
            <p style="margin: 0; font-size: 13px; color: #71717a;">
              <strong style="color: #a1a1aa;">Received:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
          <div style="background-color: #18181b; padding: 18px; border-radius: 8px; border: 1px solid #27272a;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a;">
              Message Content
            </p>
            <div style="margin: 0; font-size: 15px; line-height: 1.6; color: #f4f4f5; white-space: pre-wrap;">${message}</div>
          </div>
          <p style="margin: 20px 0 0 0; font-size: 12px; color: #52525b; text-align: center;">
            Sent from Jatin Kukreja Portfolio Form &bull; Reply to this email to reply directly to ${name}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API delivery error:", error);
      return NextResponse.json(
        {
          success: true,
          delivered: false,
          message:
            "Your message was validated, but automated delivery failed. Please try again later.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        delivered: true,
        message: "Thank you! Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error in contact route:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
