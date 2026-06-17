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
    // Requires process.env.RESEND_API_KEY and process.env.NOTIFICATION_EMAIL to be set
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendApiKey && notificationEmail) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
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
    } else {
      // If no API key is provided, just log it (helpful for local dev)
      console.log("=== NEW RESEARCH INQUIRY (Logged, Email not configured) ===");
      console.log(`Source Page: ${data.sourcePage}`);
      console.log(`Name: ${data.fullName || "N/A"}`);
      console.log(`Email: ${data.email}`);
      console.log(`WhatsApp: ${data.whatsapp}`);
      console.log(`Country: ${data.country}`);
      console.log(`Product Interest: ${data.productInterest}`);
      console.log(`Message: ${data.message || "N/A"}`);
      console.log("============================");
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
