"use client";
import { useWizardStore } from "@/store/useWizardStore";
import { useEffect } from "react"

const GeneratedView = () => {

    useEffect(() => {
        const handleGeneration = async () => {
            try {
                const res = await fetch("/api/generateMystery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(useWizardStore.getState()),
                });

                const data = await res.json();
                console.log(data);
            } catch (err) {
                console.log("[ERROR_GENERATE_REQUEST]: ", err);
            }
        }

        handleGeneration();
    }, []);

  return (
    <div>
        <p>Generated View</p>
    </div>
  )
}

export default GeneratedView
