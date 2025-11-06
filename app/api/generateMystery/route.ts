import { NextResponse } from "next/server";
import { OpenAI} from "openai"

interface Player {
    name: string;
    email: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});


export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { players, setting, genre, tone, courses, duration, difficulty } = body as {
            players: Player[],
            setting: string,
            genre: string,
            tone: string,
            courses: number,
            duration: number,
            difficulty: number
        }; 

        if (!players || players.length < 4) {
            return NextResponse.json(
                { error: "Mindestens 4 Spieler erforderlich" },
                { status: 400 }
            )
        }

        // Function calling 
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: 'system',
                    content: 'Du bist ein kreativer Autor für Murder Mystery Dinners. Du generierst spannende Szenarien mit Rollen, Hinweisen und Menüvorschlägen.'
                }, 
                {
                    role: 'user',
                    content: `
                        Erstelle ein Murder Mystery Dinner mit folgenden Parametern:
                        Setting: ${setting}
                        Ton: ${tone}
                        Gänge: ${courses}
                        Dauer: ${duration}
                        Schwierigkeit: ${difficulty}
                        Spieler:
                        ${players.map((p, i) => `${i + 1}. ${p.name}`).join("\n")}
                    `
                }
            ],
            tools: [
                {
                    type: "function",
                    function: {
                        name: "return_mystery_dinner",
                        description: "Gibt das generierte Murder Mystery Dinner als strukturiertes Objekt zurück.",
                        parameters: {
                            type: "object",
                            properties: {
                                title: { type: "string", description: "Titel des Dinners" },
                                summary: {
                                    type: "string",
                                    description: "Kurzbeschreibung der Handlung",
                                },
                                roles: {
                                    type: "array",
                                    description: "Alle Rollen und Charaktere im Spiel",
                                    items: {
                                        type: "object",
                                        properties: {
                                            player: { type: "string" },
                                            character: { type: "string" },
                                            description: { type: "string" },
                                            goal: { type: "string" },
                                            isKiller: { type: "boolean" },
                                        },
                                        required: [
                                            "player",
                                            "character",
                                            "description",
                                            "goal",
                                            "isKiller",
                                        ],
                                    },
                                },
                                hints: {
                                    type: "array",
                                    description: "Private Hinweise für jeden Spieler",
                                    items: {
                                        type: "object",
                                        properties: {
                                            to: { type: "string" },
                                            text: { type: "string" },
                                        },
                                        required: ["to", "text"],
                                    },
                                },
                                menu: {
                                    type: "array",
                                    description: "Menüvorschläge in Gängen",
                                    items: {
                                        type: "object",
                                        properties: {
                                            course: { type: "string" },
                                            dish: { type: "string" },
                                        },
                                        required: ["course", "dish"],
                                    },
                                },
                                phases: {
                                    type: "array",
                                    description: "Ablaufphasen des Spiels",
                                    items: {
                                        type: "object",
                                        properties: {
                                            phase: { type: "string" },
                                            description: { type: "string" },
                                        },
                                        required: ["phase", "description"],
                                    },
                                },
                            },
                            required: [
                                "title",
                                "summary",
                                "roles",
                                "hints",
                                "menu",
                                "phases",
                            ],
                        }
                    }
                }
            ],
            tool_choice: "auto",
        });


        const toolCall = completion.choices[0].message?.tool_calls?.[0];

        if (!toolCall || toolCall.type !== "function") {
        throw new Error("Kein gültiger Tool-Aufruf gefunden.");
        }

        const result = JSON.parse(toolCall.function.arguments);


        return NextResponse.json({ success: true, data: result })
    } catch (error) {
        console.log("[GENERATE_MMD_ERROR]: " , error);
        return NextResponse.json(
            { error: "Fehler beim generieren des MMDs" },
            { status: 500 }
        )
    }
}

/*
RESPONSE:
{
    "success": true,
    "data": {
        "title": "Murder im Herrenhaus: Ein Geheimnis aus der Vergangenheit",
        "summary": "Im eleganten Herrenhaus der Familie von Hohenberg wird ein opulentes Festessen gegeben. Doch während der Feierlichkeiten bricht plötzlich Chaos aus, als der ehrwürdige Patriarch, Lord Wilhelm von Hohenberg, tot aufgefunden wird. Die Ermittlungen zeigen, dass jeder Gast ein Geheimnis verbirgt und ein Motiv zur Tat hatte. Wer hat das Verbrechen begangen?",
        "roles": [
            {
                "player": "rajpreet Singh",
                "character": "Lady Emilia von Hohenberg",
                "description": "Die charmante, aber geheimnisvolle Tochter des Lords, die in einem anderen Licht erstrahlt, als sie die finanziellen Schwierigkeiten ihrer Familie entdeckt.",
                "goal": "Finde den Mörder, um den Ruf deiner Familie zu retten und die Geschäfte deines Vaters zu sichern.",
                "isKiller": false
            },
            {
                "player": "rajpreet singh",
                "character": "Graf Friedrich von Altenburg",
                "description": "Ein alter Freund der Familie, der in den aristokratischen Kreisen umherzieht und ein dunkles Geheimnis aus der Vergangenheit hat.",
                "goal": "Schütze dein eigenes Geheimnis und verhindere, dass jemand dich mit dem Mord in Verbindung bringt.",
                "isKiller": false
            },
            {
                "player": "rajpreet singh",
                "character": "Fräulein Clara Schmidt",
                "description": "Die loyale Köchin des Hauses, die mehr über die Familiengeheimnisse weiß, als es den Anschein hat.",
                "goal": "Entdecke die Limousine, die der Mörder benutzt hat, um deine Arbeit zu sichern.",
                "isKiller": false
            },
            {
                "player": "rajpreet singh",
                "character": "Inspektor Hermann Müller",
                "description": "Ein hartnäckiger und scharfsinniger Ermittler, der entschlossen ist, die Wahrheit zu finden.",
                "goal": "Löse den Fall, um deinem Ruf als Ermittler gerecht zu werden.",
                "isKiller": true
            }
        ],
        "hints": [
            {
                "to": "Lady Emilia von Hohenberg",
                "text": "Du hast das Testament deines Vaters gesehen. Besitze den Zettel, in dem ein großes Vermögen auf den von Altenburg statt auf dich geht."
            },
            {
                "to": "Graf Friedrich von Altenburg",
                "text": "Du hast in der Nacht des Mordes ein Gespräch zwischen Lord von Hohenberg und einem unbekannten Besucher belauscht. Es ging um eine geheime Verbindung zu deiner Familie."
            },
            {
                "to": "Fräulein Clara Schmidt",
                "text": "Du hast die Waffe gesehen, die zum Mord verwendet wurde. Sie gehört dem Inspektor!"
            },
            {
                "to": "Inspektor Hermann Müller",
                "text": "Dein altes Versagen in einem früheren Fall belastet dich. Es könnte deine Karriere ruinieren, wenn du diesen Fall nicht löst."
            }
        ],
        "menu": [
            {
                "course": "Vorspeise",
                "dish": "Jakobsmuscheln auf einem Bett aus Erbsenpüree"
            },
            {
                "course": "Hauptgang",
                "dish": "Rinderfilet mit Rotweinsauce und saisonalem Gemüse"
            },
            {
                "course": "Dessert",
                "dish": "Schokoladenfondant mit Vanilleeis"
            }
        ],
        "phases": [
            {
                "phase": "Einführung",
                "description": "Die Gäste treffen ein und es gibt ein Begrüßungsgetränk. Die Familiengeschichte wird vorgestellt."
            },
            {
                "phase": "Mord",
                "description": "Während des Hauptgangs wird der Mord bekannt gegeben und die Ermittlungen beginnen."
            },
            {
                "phase": "Auflösung",
                "description": "Die Gäste präsentieren ihre Theorien, gefolgt von der Enthüllung des Mörders und dem Dessert."
            }
        ]
    }
}
*/