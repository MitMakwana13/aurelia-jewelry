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
