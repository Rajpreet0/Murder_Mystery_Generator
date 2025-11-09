"use client";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react";
import { toast } from "sonner";

function PaymentSuccessContent() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const verify = async () => {
            if (!sessionId) return;

            const res = await fetch(`/api/verifySession?session_id=${sessionId}`);
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("mmd-premium-token", data.premiumToken);
                toast.success("🎉 Premium freigeschaltet!");
                router.push("/wizard");
            } else {
                toast.error("Zahlung konnte nicht bestätigt werden 😔");
            }
        };

        verify();
    }, [sessionId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p>💳 Zahlung wird überprüft...</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
    return(
        <Suspense fallback={
            <div className="text-white p-10">
                Wird geladen...
            </div>
        }>
            <PaymentSuccessContent/>
        </Suspense>
    )
}