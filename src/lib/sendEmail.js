import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,   
    pass: process.env.GMAIL_PASS,   
  },
});

export async function sendResetEmail(toEmail, token) {
  const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/adminsidepages/resetpassword?token=${token}`;

  await transporter.sendMail({
    from: `"MQI Admin Panel" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset Request — MQI Admin",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto; background: #09090b; color: #f5e6d8; padding: 40px; border-radius: 16px; border: 1px solid rgba(192,72,26,0.3);">
        <h2 style="color: #e8703a; margin-bottom: 8px;">MQI Admin Panel</h2>
        <p style="color: rgba(245,230,216,0.6); font-size: 14px; margin-bottom: 32px;">Muhammad Qayum International LLC</p>

        <p style="font-size: 15px; margin-bottom: 16px;">You requested password reset. Copy the below token and enter that in reset password page:</p>

        <div style="background: rgba(192,72,26,0.15); border: 1px solid rgba(192,72,26,0.4); border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0;">
          <p style="font-size: 12px; color: rgba(245,230,216,0.4); margin: 0 0 8px; letter-spacing: 1px; text-transform: uppercase;">Reset Token</p>
          <p style="font-size: 22px; font-weight: 900; letter-spacing: 4px; color: #e8703a; margin: 0;">${token}</p>
        </div>

        <a href="${resetLink}" style="display: block; background: #c0481a; color: white; text-align: center; padding: 14px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; margin-bottom: 24px;">
          Go to Reset Password Page
        </a>

        <p style="font-size: 12px; color: rgba(245,230,216,0.3);">Ye token <strong style="color: rgba(245,230,216,0.5);">15 minutes</strong> later it will expire. If you didn't requested then ignore.</p>
      </div>
    `,
  });
}