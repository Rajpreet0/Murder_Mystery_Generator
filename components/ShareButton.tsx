import { useWizardStore } from "@/store/useWizardStore"
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const ShareButton = () => {

    const state = useWizardStore((s) => s);

    const handleShare = () => {
        const encoded = encodeURIComponent(JSON.stringify({
            players: state.players,
            setting: state.setting,
            genre: state.genre,
            tone: state.tone,
            courses: state.courses,
            duration: state.duration,
            difficulty: state.difficulty,
            aiResponse: state.aiResponse,
        }));

        const shareUrl = `${window.location.origin}/generated?data=${encoded}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("🔗 Link wurde in die Zwischenablage kopiert!");
    }

  return (
    <Button
        onClick={handleShare}
        className="bg-[#8E7CC3] hover:bg-[#A89FD4]  text-white mt-6 px-6 py-2 flex items-center gap-2 rounded-lg cursor-pointer transition-all">
            <Share2 size={18}/>
            Spiel teilen
    </Button>
  )
}

export default ShareButton

