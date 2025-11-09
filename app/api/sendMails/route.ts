import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface Role {
    character: string;
    player: string;
    description: string;
    goal: string;
}

interface Hint {
    to: string;
    text: string;
}

interface Player {
    name: string;
    email: string;
}

export async function POST(req: Request) {
    try {
        const testMode = false;
        const { roles, hints, title, players } = (await req.json()) as {
            roles: Role[],
            hints: Hint[],
            title: string;
            players: Player[];
        };

        if (!roles || !Array.isArray(roles)) {
            return NextResponse.json(
                { error: "Keine Rollen übergeben" }, {status: 400}
            )
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465 ,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        for (const [index, role] of roles.entries()) {
            if (testMode && index > 0) break;

            const playerInfo = players.find(
                (p) => p.name.trim().toLowerCase() === role.player.trim().toLowerCase()
            );

            if (!playerInfo || !playerInfo.email) {
                continue;
            }

            const playerHint = hints.find((h) => h.to === role.character);

            const mailHtml=`
                <div style="font-family:Georgia,serif;background:#0e0e10;color:#eaeaea;padding:24px;">
                    <h2 style="color:#d4af37;">🎭 Deine Rolle im Murder Mystery Dinner</h2>
                    <p><strong>${role.character}</strong></p>
                    <p>${role.description}</p>

                    <h3 style="color:#8e7cc3;">🎯 Dein Ziel</h3>
                    <p>${role.goal}</p>

                    ${
                        playerHint
                        ? `<p style="margin-top:16px;color:#aaa;">💌 Dein geheimer Hinweis befindet sich im Anhang dieser E-Mail.</p>`
                        : `<p style="margin-top:16px;color:#aaa;">Kein geheimer Hinweis erforderlich.</p>`
                    }

                    <hr style="border:none;border-top:1px solid #444;margin:20px 0;">
                    <p style="font-size:14px;color:#888;">Halte diese Informationen geheim und sei bereit für das Dinner.</p>
                </div>
            `;

            const attachments = playerHint ? [
                {
                    filename: `Geheimer_Hinweis_${role.character}.txt`,
                    content: playerHint.text,
                }
            ] : [];


            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: playerInfo.email,
                subject: `Deine Rolle im Murder Mystery Dinner "${title}"`,
                html: mailHtml,
                attachments,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ error: "Fehler beim Versenden der E-Mails." }, { status: 500 });

    }
}