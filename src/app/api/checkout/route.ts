import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!resendApiKey || !notificationEmail) {
      console.error("Missing environment variables: RESEND_API_KEY or NOTIFICATION_EMAIL");
      return NextResponse.json(
        { error: "Server configuration error: Missing Email API Key. Please check Vercel Environment Variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Compose the email
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Crypto Order Received!</h2>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111;">Order Details</h3>
          <p><strong>Product:</strong> ${data.productName} (${data.productId})</p>
          <p><strong>Total Amount:</strong> $${data.amount.toFixed(2)} USDT</p>
        </div>

        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #bbf7d0;">
          <h3 style="margin-top: 0; color: #166534;">Payment Verification</h3>
          <p><strong>TxHash:</strong> <span style="font-family: monospace; word-break: break-all;">${data.txHash}</span></p>
          <p style="font-size: 13px; color: #166534;"><em>Please verify this transaction hash on the blockchain before shipping.</em></p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px;">Shipping Address</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${data.fullName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 5px 0;"><strong>Address:</strong> ${data.address}</p>
          <p style="margin: 5px 0;"><strong>City:</strong> ${data.city}</p>
          <p style="margin: 5px 0;"><strong>State/Province:</strong> ${data.state}</p>
          <p style="margin: 5px 0;"><strong>Postal Code:</strong> ${data.zip}</p>
          <p style="margin: 5px 0;"><strong>Country:</strong> ${data.country}</p>
        </div>

        <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
          Sent from DSIP E-commerce System
        </p>
      </div>
    `;

    const response = await resend.emails.send({
      from: "DSIP Orders <onboarding@resend.dev>",
      to: notificationEmail,
      subject: `[New Order] $${data.amount.toFixed(2)} USDT - ${data.fullName}`,
      html: emailHtml,
      replyTo: data.email
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      return NextResponse.json(
        { error: response.error.message || "Failed to send order email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: response.data?.id });
  } catch (error) {
    console.error("Checkout submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing checkout" },
      { status: 500 }
    );
  }
}
