import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic server-side validation
    if (!data.email || !data.whatsapp || !data.country || !data.productInterest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!data.qualifiedBuyer || !data.logisticsConsent || !data.privacyAccepted) {
      return NextResponse.json(
        { error: "Missing required consents" },
        { status: 400 }
      );
    }

    // Send Email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    // In production (Vercel), we MUST have the API key
    if (!resendApiKey || !notificationEmail) {
      console.error("Missing environment variables: RESEND_API_KEY or NOTIFICATION_EMAIL");
      return NextResponse.json(
        { error: "Server configuration error: Missing Email API Key. Please check Vercel Environment Variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "DSIP Portal <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `New Lead: ${data.productInterest} from ${data.country}`,
      html: `
        <h2>New Research Inquiry</h2>
        <p><strong>Name:</strong> ${data.fullName || "N/A"}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Interest:</strong> ${data.productInterest}</p>
        <p><strong>Message:</strong> ${data.message || "N/A"}</p>
        <p><strong>Source Page:</strong> ${data.sourcePage}</p>
      `,
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return NextResponse.json(
        { error: `Email sending failed: ${resendError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Inquiry received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
