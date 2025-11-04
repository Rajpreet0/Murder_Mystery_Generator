import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { roles, hints, title } = await req.json();

        if (!roles || !Array.isArray(roles)) {
            return NextResponse.json(
                { error: "Keine Rollen übergeben" }, {status: 400}
            )
        }

        // TODO: Muss noch angepasst werden
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        for (const role of roles) {
            const playerHint = hints.find((h: any) => h.to === role.character);

            const mailText = `
            🕵️ Willkommen zum Murder Mystery Dinner: ${title}

            🎭 Deine Rolle: ${role.character}
            Beschreibung: ${role.description}

            🎯 Dein Ziel:
            ${role.goal}

            💌 Dein geheimer Hinweis:
            ${playerHint ? playerHint.text : "Kein Hinweis vorhanden"}

            Halte diese Informationen geheim und sei bereit für das Dinner.
            `

            await transporter.sendMail({
                from: `"Murder Mystery Dinner" <mystery@dinner-game.com>`,
                to: role.player.includes("@") ? role.player : "test@example.com", // failsafe
                subject: `Deine Rolle im Murder Mystery Dinner "${title}"`,
                text: mailText,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ error: "Fehler beim Versenden der E-Mails." }, { status: 500 });

    }
}