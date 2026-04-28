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
        <div style="font-family:Arial,sans-serif;padding:30px;background:#f8f8f8;">
          <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px;">
            <h2 style="margin-top:0;">Nieuw contactbericht</h2>

            <p><strong>Naam:</strong><br>${name}</p>

            <p><strong>Email:</strong><br>${email}</p>

            <p><strong>Bericht:</strong><br>
            ${message.replace(/\n/g, "<br>")}
            </p>

            <hr style="margin:25px 0;">

            <p style="font-size:12px;color:#666;">
              Verzonden via je portfolio website.
            </p>
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