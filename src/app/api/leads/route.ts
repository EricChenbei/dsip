import { NextResponse } from "next/server";

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

    // In a production environment, you would use an email service provider here.
    // e.g., Resend, SendGrid, Postmark.
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    // For now, we will simply log the lead to the console to simulate successful processing.
    console.log("=== NEW RESEARCH INQUIRY ===");
    console.log(`Source Page: ${data.sourcePage}`);
    console.log(`Name: ${data.fullName || "N/A"}`);
    console.log(`Email: ${data.email}`);
    console.log(`WhatsApp: ${data.whatsapp}`);
    console.log(`Country: ${data.country}`);
    console.log(`Product Interest: ${data.productInterest}`);
    console.log(`Message: ${data.message || "N/A"}`);
    console.log(`Consents - Qualified Buyer: ${data.qualifiedBuyer ? "Yes" : "No"}, Logistics: ${data.logisticsConsent ? "Yes" : "No"}, Privacy: ${data.privacyAccepted ? "Yes" : "No"}, Marketing: ${data.marketingConsent ? "Yes" : "No"}`);
    console.log("============================");

    return NextResponse.json({ success: true, message: "Inquiry received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
