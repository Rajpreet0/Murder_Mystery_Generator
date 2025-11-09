import GeneratedView from "@/modules/generated/ui/views/generated-view"
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Generated = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-[80vh] text-center text-[#EAEAEA]">
          <Loader2 className="animate-spin h-10 w-10 mb-3 text-[#8E7CC3]"/>
          <p>Lade das Dinner... 🍷</p>
        </div>
      }
    >
      <GeneratedView/>
    </Suspense>
  );
}

export default Generated
