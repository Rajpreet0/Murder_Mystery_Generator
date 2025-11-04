"use client";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWizardStore } from "@/store/useWizardStore";
import { FileDown, Loader2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

interface MysteryData {
    title: string;
    summary: string;
    roles: { 
        player: string; 
        character: string; 
        description: string; 
        goal: string; 
        isKiller: boolean 
    }[];
    hints: { 
        to: string; 
        text: string 
    }[];
    menu: { 
        course: string; 
        dish: string 
    }[];
    phases: { 
        phase: string; 
        description: string 
    }[];
}

const GeneratedView = () => {
    const { aiResponse, updateField } = useWizardStore();
    const [data, setData] = useState<MysteryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
      setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;


        const dataParam = searchParams.get("data");
        if (dataParam) {
          try {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            Object.entries(decoded).forEach(([key, value]) =>
              updateField(key as any, value)
            );

            if (decoded.aiResponse) {
              setData(decoded.aiResponse);
              setLoading(false);
              console.log("Daten aus Shared Link geladen!");
              return;
            }
          } catch (err) {
            console.error("Fehler beim Dekodieren des Shared-Links:", err);
          }
        }

        const handleGeneration = async () => {
            if (aiResponse) {
              setData(aiResponse);
              setLoading(false);
              console.log("AI Response aus Zustand geladen");
              return;
            }

            try {
                const res = await fetch("/api/generateMystery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(useWizardStore.getState()),
                });
                const result = await res.json();
                setData(result.data);
                updateField("aiResponse", result.data);
            } catch (err) {
                console.log("[ERROR_GENERATE_REQUEST]: ", err);
            } finally {
                setLoading(false);
            }
        }

        handleGeneration();
    }, [hydrated, aiResponse, updateField]);

  const sendEmails = async () => {
    if (!data) return;
    setSending(true);

    try {
      const res = await fetch("/api/sendEmails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          roles: data.roles,
          hints: data.hints,
        }),
      });

      if (res.ok) {
        //toast.success("E-Mails erfolgreich versendet!");
      } else {
        //.error("Fehler beim E-Mail-Versand");
      }
    } catch (err) {
      //toast.error("Verbindungsfehler beim Senden");
    } finally {
      setSending(false);
    }
  };

  const generatePDF = async () => {
    try {
      const res = await fetch("/api/generatePdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Murder_Mystery_${data?.title}.pdf`;
      a.click();
    } catch (err) {
      console.log("[PDF_GENERATE_ERR]: ", err);
    }
  }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center text-[#EAEAEA]">
                <Loader2 className="animate-spin h-10 w-10 mb-3 text-[#8E7CC3]"/>
                <p>Das Dinner wird zusammengestellt... 🔪</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center text-[#EAEAEA]">
                <p>Fehler beim Generieren 😔</p>
            </div>
        )
    }

  return (
    <div className="w-full min-h-screen bg-[#0E0E10] text-[#EAEAEA] flex flex-col items-center px-4 py-10">

      {/* HEADER */}
      <div className="max-w-2xl text-center mb-8">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">{data.title}</h1>
        <p className="text-[#9C9CA5] text-sm leading-relaxed">{data.summary}</p>
      </div>

      {/* ROLES (neutral overview) */}
      <div className="w-full max-w-3xl mb-10">
        <h2 className="text-2xl font-semibold text-[#8E7CC3] mb-4">🎭 Rollenübersicht</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.roles.map((role, i) => (
            <Card key={i} className="bg-[#141416] border border-[#2C2C2C]">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] text-lg">{role.character}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#CFCFCF] space-y-1">
                <p>
                  <span className="text-[#8E7CC3] font-medium">Spieler:</span> {role.player}
                </p>
                <p>
                  <span className="text-[#8E7CC3] font-medium">Beschreibung:</span>{" "}
                  {role.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Menü */}
      <div className="w-full max-w-3xl mb-10">
        <h2 className="text-2xl font-semibold text-[#8E7CC3] mb-4">🍽️ Menü</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {data.menu.map((item, i) => (
            <Card key={i} className="bg-[#141416] border-[#2C2C2C]">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">{item.course}</CardTitle>
              </CardHeader>
              <CardContent className="text-[#CFCFCF] text-sm">{item.dish}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ablauf */}
      <div className="w-full max-w-3xl mb-10">
        <h2 className="text-2xl font-semibold text-[#8E7CC3] mb-4">📜 Ablauf</h2>
        <div className="flex flex-col gap-3">
          {data.phases.map((phase, i) => (
            <div
              key={i}
              className="border border-[#2C2C2C] rounded-lg bg-[#141416] p-4"
            >
              <p className="text-[#D4AF37] font-semibold">{phase.phase}</p>
              <p className="text-[#CFCFCF] text-sm mt-1">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* DOWNLOAD BUTTON */}
        <Button
          onClick={generatePDF}
          className="bg-[#8E7CC3] hover:bg-[#A89FD4] text-white mt-6 px-6 py-2 flex items-center gap-2 cursor-pointer"
        >
          <FileDown size={18} />
          Download als PDF
        </Button>
        {/* MAIL BUTTON */}
        <Button
          onClick={sendEmails}
          disabled={sending}
          className="bg-[#8E7CC3] hover:bg-[#A89FD4] text-white mt-6 px-6 py-2 flex items-center gap-2 cursor-pointer"
        >
          {sending ? <Loader2 className="animate-spin w-4 h-4" /> : <Mail size={18} />}
          E-Mails an Spieler senden
        </Button>
        <ShareButton/>
      </div>
    </div>
  )
}

export default GeneratedView
