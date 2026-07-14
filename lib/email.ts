import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a password reset email using Resend
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Aurelia Jewelry <onboarding@resend.dev>', // Must use this for unverified domains
      to: email, // Note: with a free account and unverified domain, this can only be the email registered with Resend
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-w-md: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="font-size: 24px; font-weight: normal; margin-bottom: 20px;">Reset your password</h2>
          <p style="color: #444; margin-bottom: 20px;">You recently requested to reset your password for your Aurelia Jewelry account. Click the button below to reset it.</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #111; color: #fff; padding: 12px 24px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin-bottom: 20px;">Reset Password</a>
          <p style="color: #666; font-size: 12px;">If you did not request a password reset, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("==========================================");
    console.log(`📨 Reset Email Sent to ${email} via Resend!`);
    console.log(`Email ID: ${data?.id}`);
    console.log("==========================================");
    
    return data;
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}

/**
 * Send an inquiry confirmation email to the customer
 */
export async function sendInquiryConfirmationEmail(email: string, name: string, productName?: string | null) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Aurelia Jewelry <onboarding@resend.dev>', // Must use this for unverified domains
      to: email, // Note: with a free account and unverified domain, this can only be the email registered with Resend
      subject: "We've received your inquiry - Aurelia Jewelry",
      html: `
        <div style="font-family: sans-serif; max-w-md: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="font-size: 24px; font-weight: normal; margin-bottom: 20px; text-align: center;">Thank You for Your Inquiry</h2>
          <p style="color: #444; margin-bottom: 20px;">Dear ${name},</p>
          <p style="color: #444; margin-bottom: 20px;">
            Thank you for reaching out to Aurelia Jewelry${productName ? ` regarding the <strong>${productName}</strong>` : ''}. 
            We have safely received your request.
          </p>
          <p style="color: #444; margin-bottom: 20px;">
            Our concierge team is currently reviewing your inquiry and will be in touch with you within the next 24 hours to discuss the details, pricing, and next steps for your bespoke piece.
          </p>
          <p style="color: #444; margin-bottom: 40px;">
            If you have any immediate questions, please feel free to reply directly to this email.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 20px;" />
          <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
            Aurelia Jewelry | The Culture of Craft
          </p>
        </div>
      `,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Failed to send customer confirmation email:", err);
    throw err;
  }
}

/**
 * Send an inquiry alert to the admin
 */
export async function sendInquiryAdminAlert(adminEmail: string, inquiryDetails: any) {
  try {
    const { name, email, phone, type, budget, message, productName } = inquiryDetails;
    
    const { data, error } = await resend.emails.send({
      from: 'Aurelia Jewelry Alerts <onboarding@resend.dev>',
      to: adminEmail, // Must be the verified Resend email for free accounts
      subject: `New Inquiry Alert: ${type} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-w-md: 600px; margin: 0 auto; padding: 20px; background-color: #faf9f7;">
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Inquiry Received</h2>
          
          <table style="width: 100%; text-align: left; border-collapse: collapse;">
            <tbody>
              <tr><th style="padding: 8px 0; border-bottom: 1px solid #eee; width: 30%;">Name</th><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><th style="padding: 8px 0; border-bottom: 1px solid #eee;">Email</th><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${email || 'Not provided'}</td></tr>
              <tr><th style="padding: 8px 0; border-bottom: 1px solid #eee;">Phone</th><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone}</td></tr>
              <tr><th style="padding: 8px 0; border-bottom: 1px solid #eee;">Type</th><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${type}</td></tr>
              ${productName ? `<tr><th style="padding: 8px 0; border-bottom: 1px solid #eee;">Product</th><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${productName}</td></tr>` : ''}
              ${budget ? `<tr><th style="padding: 8px 0; border-bottom: 1px solid #eee;">Budget</th><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${budget}</td></tr>` : ''}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; background-color: #fff; padding: 15px; border: 1px solid #eee;">
            <h3 style="font-size: 14px; margin-top: 0; color: #666; text-transform: uppercase;">Message</h3>
            <p style="margin-bottom: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/inquiries" style="display: inline-block; background-color: #111; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">View in CRM</a>
          </div>
        </div>
      `,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Failed to send admin alert email:", err);
    throw err;
  }
}
