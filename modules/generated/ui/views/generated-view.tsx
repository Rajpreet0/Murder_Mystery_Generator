"use client";
import ShareButton from "@/components/layout/ShareButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWizardStore } from "@/store/useWizardStore";
import { FileDown, Loader2, Lock, Mail, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { isPremium } from "@/lib/isPremium";

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
    const { aiResponse, updateField, regenCount, incrementRegenCount } = useWizardStore();
    const [data, setData] = useState<MysteryData>({
      title: "",
      summary: "",
      roles: [],
      hints: [],
      menu: [],
      phases: [],
    });
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [readonly, setReadOnly] = useState(false); 
    const searchParams = useSearchParams();
    const premium = isPremium();

    useEffect(() => {
      const loadData = async () => {
        setHydrated(true);

        const dataParam = searchParams.get("data");
        const sigParam = searchParams.get("sig");

        if (dataParam && sigParam) {
          try {
            const decoded = decodeURIComponent(dataParam);
            const secret = process.env.NEXT_PUBLIC_SHARE_SECRET || "";
            const expectedSig = CryptoJS.SHA256(decoded + secret).toString();

            if (expectedSig !== sigParam) {
              console.warn("Ungültige Signatur oder manipulierte URL!");
              setReadOnly(true);
              toast.error("⚠️ Dieser Link wurde manipuliert oder ist ungültig!");
              setLoading(false);
              return;
            }

            setReadOnly(true);
            const parsed = JSON.parse(decoded);
            Object.entries(parsed).forEach(([key, value]) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              updateField(key as any, value)
            );
            if (parsed.aiResponse) {
              setData(parsed.aiResponse);
            }
          } catch (err) {
            console.error("Fehler beim Prüfen oder Laden:", err);
            toast.error("Ungültiger Link!");
          } finally {
            setLoading(false);
          }
          return;
        }

        setReadOnly(false);

        if (aiResponse) {
          setData(aiResponse);
          setLoading(false);
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
          console.error("[ERROR_GENERATE_REQUEST]:", err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [searchParams, aiResponse, updateField]);

  // SEND MAILS TO PLAYER FUNCTION
  const sendEmails = async () => {
    if (!data) return;
    setSending(true);

    try {
      const res = await fetch("/api/sendMails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          roles: data.roles,
          hints: data.hints,
          players: useWizardStore.getState().players
        }),
      });

      console.log(res);

      if (res.ok) {
        toast.success("E-Mails erfolgreich versendet!");
      } else {
        toast.error("Fehler beim E-Mail-Versand");
      }
    } catch (err) {
      toast.error("Verbindungsfehler beim Senden");
    } finally {
      setSending(false);
    }
  };

  // GENERATE PDF FUNCTION
  const generatePDF = async () => {
    if (!premium) {
      toast.error("🔒 Diese Funktion ist nur für Premium-Nutzer verfügbar!");
      return;
    }
    
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

  // REGENERATE DINNER
  const regnerateDinner = async () => {
    if (readonly) {
      toast.error("🔒 Dieses Dinner wurde geteilt – Neu-Generieren ist deaktiviert.");
      return;
    }

    if (!premium) {
      toast.error("🔒 Diese Funktion ist nur für Premium-Nutzer verfügbar!");
      return;
    }
    
    if (regenCount >= 3) {
      toast.error("Du kannst das Dinner nur dreimal neu generieren 🕯️");
      return;
    }

    setLoading(true);
    toast.message("Das Dinner wird neu generiert... 🕵️");

    try {

      const res = await fetch("/api/generateMystery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(useWizardStore.getState()),
      });

      const result = await res.json();
      if (result.data) {
        setData(result.data);
        updateField("aiResponse", result.data);
        incrementRegenCount();
        toast.success("Dinner erfolgreich neu generiert!");
      } else {
        toast.error("Fehler beim Neu-Generieren!");
      }

    } catch (err) {
      console.error("[REGENERATE_ERROR]:", err);
      toast.error("Fehler bei der Neu-Generierung");
    } finally {
      setLoading(false);
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
          {data?.roles?.map((role, i) => (
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
          {data?.menu?.map((item, i) => (
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
          {data?.phases?.map((phase, i) => (
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
      
      {/* BUTTONS */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        {/* DOWNLOAD BUTTON */}
        <Button
          onClick={generatePDF}
          className={`mt-6 px-6 py-2 flex items-center gap-2 cursor-pointer transition ${
              premium
                ? "bg-[#8E7CC3] hover:bg-[#A89FD4] text-white"
                : "bg-[#2C2C2C] text-[#888] cursor-not-allowed"
          }`}
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
        {/* SHARE BUTTON */}
        <ShareButton/>

        {/* REGENERATE BUTTON */}
        <div className="relative inline-flex items-center justify-center w-full sm:w-auto">
          <Button
            onClick={regnerateDinner}
            disabled={readonly || loading || regenCount >= 3}
            className={`relative mt-6 px-6 py-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 w-full sm:w-auto ${premium 
              ? "bg-[#8E7CC3] hover:bg-[#A89FD4] text-white"
              : "bg-[#2C2C2C] text-[#888] cursor-not-allowed"}`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <RotateCcw />
            )}
            Dinner neu generieren
            {!readonly && (
              <Badge
                className={`absolute -top-2 -right-2 sm:-right-3 sm:-top-2   text-xs px-2 py-0.5 shadow-md
                ${premium ? "bg-[#D4AF37] text-black" : "bg-[#2C2C2C] text-[#888]"}`}
                variant="secondary"
              >
                {Math.max(0, 3 - regenCount)}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      {readonly && (
        <p className="text-xs text-[#9C9CA5] mt-4 italic">
          🔒 Neu-Generieren ist im geteilten Modus deaktiviert
        </p>
      )}
    </div>
  )
}

export default GeneratedView
