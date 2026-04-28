export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_TO,
      subject: "Nieuw contactformulier",
      html: `
        <h2>Nieuw bericht</h2>
        <p><b>Naam:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Bericht:</b><br>${message}</p>
      `
    })
  });

  const data = await response.json();

  res.status(200).json(data);
}