import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendConfirmationEmail = async ({ to, name, service, date, time, reservationNumber }) => {
  const mailOptions = {
    from: `"Barber World 💈" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Confirmation de réservation — ${reservationNumber}`,
    html: `
      <div style="font-family: Georgia, serif; background: #000; color: #fff; padding: 2rem; max-width: 500px; margin: 0 auto; border-radius: 16px;">
        
        <h1 style="color: #FBBF24; font-size: 2rem; margin-bottom: 0.5rem;">
          Barber World
        </h1>
        
        <p style="color: #9CA3AF; margin-bottom: 2rem;">
          Luxury Cuts for Modern Men
        </p>

        <h2 style="color: #4ADE80; margin-bottom: 1rem;">
          ✅ Réservation confirmée !
        </h2>

        <p style="margin-bottom: 1.5rem;">Bonjour <strong style="color: #FBBF24;">${name}</strong>,</p>
        
        <p style="margin-bottom: 1.5rem; color: #D1D5DB;">
          Votre réservation a bien été enregistrée. Voici les détails :
        </p>

        <div style="background: #111; border: 1px solid rgba(251,191,36,0.3); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <p style="margin: 0.5rem 0;"><span style="color: #9CA3AF;">Service :</span> <strong style="color: #FBBF24;">${service}</strong></p>
          <p style="margin: 0.5rem 0;"><span style="color: #9CA3AF;">Date :</span> <strong>${new Date(date).toLocaleDateString("fr-FR")}</strong></p>
          <p style="margin: 0.5rem 0;"><span style="color: #9CA3AF;">Heure :</span> <strong>${time}</strong></p>
          <p style="margin: 0.5rem 0;"><span style="color: #9CA3AF;">Numéro :</span> <strong style="font-family: monospace; color: #FBBF24; font-size: 1.2rem;">${reservationNumber}</strong></p>
        </div>

        <p style="color: #9CA3AF; font-size: 0.85rem;">
          Notez votre numéro de réservation — il vous sera demandé le jour du rendez-vous.
        </p>

        <hr style="border-color: rgba(251,191,36,0.2); margin: 1.5rem 0;" />
        
        <p style="color: #6B7280; font-size: 0.8rem; text-align: center;">
          © ${new Date().getFullYear()} Barber World — Tous droits réservés
        </p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}