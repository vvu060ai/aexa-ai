"use client";

import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { Phone, PhoneOff, Loader2 } from "lucide-react";

interface VoiceCallButtonProps {
  vapiKey: string;
  onCallResult: (data: any) => void;
}

export function VoiceCallButton({ vapiKey, onCallResult }: VoiceCallButtonProps) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle");
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !hasInitialized.current) {
      const vapiInstance = new Vapi(vapiKey);
      setVapi(vapiInstance);
      hasInitialized.current = true;

      // Event listeners for Vapi
      vapiInstance.on("call-start", () => {
        setCallStatus("active");
      });

      vapiInstance.on("message", (message) => {
        if (message.type === 'tool-calls') {
          const toolCall = message.toolCalls[0];
          if (toolCall.function.name === 'schedule_dental_appointment') {
            const args = toolCall.function.arguments;
            // Pass the captured data up to the parent
            onCallResult(args);
          }
        }
      });

      vapiInstance.on("call-end", () => {
        setCallStatus("ended");
        // Reset to idle after a few seconds
        setTimeout(() => setCallStatus("idle"), 3000);
      });

      vapiInstance.on("error", (e) => {
        console.error("Vapi Error:", e);
        setCallStatus("idle");
      });
      
      return () => {
        vapiInstance.removeAllListeners();
      };
    }
  }, [vapiKey, onCallResult]);

  const toggleCall = async () => {
    if (!vapi) return;

    if (callStatus === "idle" || callStatus === "ended") {
      setCallStatus("connecting");
      try {
        // Provide the generated Assistant ID from Vapi dashboard here later, 
        // or configure it to make an ad-hoc assistant configuration
        // Right now we start a generic call, but you'll need the assistant ID from Vapi
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "ASSISTANT_ID_GOES_HERE");
      } catch (e) {
        console.error("Failed to start call:", e);
        setCallStatus("idle");
      }
    } else {
      vapi.stop();
      setCallStatus("ended");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleCall}
        className={`flex items-center gap-2 px-6 py-4 rounded-full text-white font-semibold transition-all shadow-lg text-lg ${
          callStatus === "idle" || callStatus === "ended"
            ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
            : callStatus === "connecting"
            ? "bg-yellow-500 cursor-wait outline-none"
            : "bg-red-500 hover:bg-red-600 shadow-red-500/20 animate-pulse"
        }`}
        disabled={callStatus === "connecting"}
      >
        {callStatus === "idle" || callStatus === "ended" ? (
          <>
            <Phone size={24} />
            Call AI Receptionist
          </>
        ) : callStatus === "connecting" ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            Connecting to AI...
          </>
        ) : (
          <>
            <PhoneOff size={24} />
            End Call
          </>
        )}
      </button>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {callStatus === "active" ? "AI is speaking..." : "Make sure your microphone is unmuted."}
      </p>
    </div>
  );
}
