const RATE_LIMIT = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minuut
  const maxRequests = 3;

  const requests = RATE_LIMIT.get(ip) || [];
  const recent = requests.filter(time => now - time < windowMs);

  if (recent.length >= maxRequests) {
    RATE_LIMIT.set(ip, recent);
    return true;
  }

  recent.push(now);
  RATE_LIMIT.set(ip, recent);
  return false;
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket?.remoteAddress ||
      "unknown";

    if (isRateLimited(ip)) {
      return res.status(429).json({
        message: "Too many messages. Try again later."
      });
    }

    const {
      name,
      email,
      message,
      website // honeypot veld
    } = req.body;

    /* Anti bot */
    if (website && website.trim() !== "") {
      return res.status(200).json({
        success: true
      });
    }

    /* Validatie */
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        message: "Please enter your name."
      });
    }

    if (!email || !validEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email."
      });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        message: "Please enter a message."
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: process.env.EMAIL_TO,
        subject: `Nieuw bericht van ${name}`,
        reply_to: email,
        html: `
        <div style="
        background:#0c0c0b;
        padding:50px 20px;
        font-family:Arial,sans-serif;
        color:#f0ede6;
        ">

        <div style="
        max-width:640px;
        margin:auto;
        background:#131312;
        border:1px solid rgba(255,255,255,0.07);
        padding:40px;
        ">

        <p style="
        font-size:11px;
        letter-spacing:3px;
        text-transform:uppercase;
        color:#c8f060;
        margin:0 0 18px;
        font-family:monospace;
        ">
        New Inquiry
        </p>

        <h1 style="
        margin:0 0 30px;
        font-size:42px;
        line-height:1.05;
        font-weight:400;
        color:#f0ede6;
        font-family:Georgia,serif;
        ">
        Someone contacted <span style="color:#e8d5a3;">Enritix</span>
        </h1>

        <div style="
        border-top:1px solid rgba(255,255,255,0.07);
        padding-top:24px;
        margin-bottom:24px;
        ">

        <p style="
        font-size:11px;
        letter-spacing:2px;
        text-transform:uppercase;
        color:#8a8880;
        margin:0 0 8px;
        font-family:monospace;
        ">
        Name
        </p>

        <p style="
        font-size:20px;
        margin:0;
        color:#f0ede6;
        ">
        ${name}
        </p>

        </div>

        <div style="
        border-top:1px solid rgba(255,255,255,0.07);
        padding-top:24px;
        margin-bottom:24px;
        ">

        <p style="
        font-size:11px;
        letter-spacing:2px;
        text-transform:uppercase;
        color:#8a8880;
        margin:0 0 8px;
        font-family:monospace;
        ">
        Email
        </p>

        <p style="
        font-size:18px;
        margin:0;
        color:#f0ede6;
        ">
        ${email}
        </p>

        </div>

        <div style="
        border-top:1px solid rgba(255,255,255,0.07);
        padding-top:24px;
        ">

        <p style="
        font-size:11px;
        letter-spacing:2px;
        text-transform:uppercase;
        color:#8a8880;
        margin:0 0 10px;
        font-family:monospace;
        ">
        Message
        </p>

        <p style="
        font-size:16px;
        line-height:1.8;
        margin:0;
        color:#f0ede6;
        white-space:pre-line;
        ">
        ${message}
        </p>

        </div>

        <div style="
        margin-top:34px;
        padding-top:20px;
        border-top:1px solid rgba(255,255,255,0.07);
        font-size:12px;
        color:#8a8880;
        font-family:monospace;
        letter-spacing:1px;
        ">
        Sent from enritix.vercel.app
        </div>

        </div>
        </div>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(500).json({
        message: "Failed to send message."
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error."
    });
  }
}