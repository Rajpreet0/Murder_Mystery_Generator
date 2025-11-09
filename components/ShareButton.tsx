import { useWizardStore } from "@/store/useWizardStore"
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import crypto from "crypto";
import { isPremium } from "@/lib/isPremium";

const ShareButton = () => {

    const state = useWizardStore((s) => s);
    const premium = isPremium();

    const handleShare = () => {
      if (!premium) {
        toast.error("🔒 Diese Funktion ist nur für Premium-Nutzer verfügbar!");
        return;
      }
        const payload = {
            players: state.players,
            setting: state.setting,
            genre: state.genre,
            tone: state.tone,
            courses: state.courses,
            duration: state.duration,
            difficulty: state.difficulty,
            aiResponse: state.aiResponse,
            readonly: true,
        }

        const json = JSON.stringify(payload);
        const encoded = encodeURIComponent(json);

        const secret = process.env.NEXT_PUBLIC_SHARE_SECRET!;
        const hash = crypto
          .createHash("sha256")
          .update(json + secret)
          .digest("hex");

        const shareUrl = `${window.location.origin}/generated?data=${encoded}&sig=${hash}`;
        navigator.clipboard.writeText(shareUrl);
        
        toast.success("🔗 Link wurde in die Zwischenablage kopiert!");
    }

  return (
    <Button
        onClick={handleShare}
        className={`relative mt-6 px-6 py-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 w-full sm:w-auto ${premium 
          ? "bg-[#8E7CC3] hover:bg-[#A89FD4] text-white"
          : "bg-[#2C2C2C] text-[#888] cursor-not-allowed"}`}>
            <Share2 size={18}/>
            Spiel teilen
    </Button>
  )
}

export default ShareButton

