"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, Phone, PhoneOff, Loader2, X, Calendar, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SlimScrollArea } from "@/components/ui/SlimScrollArea";

type CallStatus = "idle" | "connecting" | "active" | "ended";

interface TranscriptEntry {
  role: "assistant" | "user";
  text: string;
  timestamp: number;
}

interface VoiceAgentDemoProps {
  isOpen: boolean;
  onClose: () => void;
  agentId?: string;
  title?: string;
}

export function VoiceAgentDemo({ isOpen, onClose, agentId, title }: VoiceAgentDemoProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const vapiRef = useRef<Vapi | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts]);

  // Initialize Vapi once
  useEffect(() => {
    if (!isOpen) return;

    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error("NEXT_PUBLIC_VAPI_PUBLIC_KEY is not set");
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setCallStatus("active");
    });

    vapi.on("call-end", () => {
      setCallStatus("ended");
      setIsSpeaking(false);
      setVolumeLevel(0);
    });

    vapi.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapi.on("volume-level", (level: number) => {
      setVolumeLevel(level);
    });

    vapi.on("message", (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscripts((prev) => [
          ...prev,
          {
            role: message.role,
            text: message.transcript,
            timestamp: Date.now(),
          },
        ]);
      }
    });

    vapi.on("error", (e: any) => {
      console.error("Vapi Error:", e);
      setCallStatus("idle");
    });

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
      vapiRef.current = null;
    };
  }, [isOpen]);

  const startCall = useCallback(async () => {
    if (!vapiRef.current) return;
    const resolvedAgentId = agentId || process.env.NEXT_PUBLIC_VAPI_BOOKING_AGENT_ID;
    if (!resolvedAgentId) {
      console.error("Agent ID is not set");
      return;
    }

    setCallStatus("connecting");
    setTranscripts([]);
    try {
      await vapiRef.current.start(resolvedAgentId);
    } catch (e) {
      console.error("Failed to start call:", e);
      setCallStatus("idle");
    }
  }, [agentId]);

  const endCall = useCallback(() => {
    if (!vapiRef.current) return;
    vapiRef.current.stop();
    setCallStatus("ended");
  }, []);

  const handleClose = useCallback(() => {
    if (vapiRef.current && (callStatus === "active" || callStatus === "connecting")) {
      vapiRef.current.stop();
    }
    setCallStatus("idle");
    setTranscripts([]);
    setIsSpeaking(false);
    setVolumeLevel(0);
    onClose();
  }, [callStatus, onClose]);

  if (!isOpen) return null;

  // Generate waveform bars
  const waveformBars = Array.from({ length: 24 }, (_, i) => {
    const baseHeight = callStatus === "active"
      ? 8 + Math.sin((Date.now() / 200) + i * 0.5) * 15 * (0.3 + volumeLevel * 0.7)
      : 4;
    return Math.max(4, baseHeight);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{title || "AI Booking Assistant"}</h3>
                  <p className="text-gray-500 text-xs">
                    {callStatus === "active"
                      ? "Call in progress..."
                      : callStatus === "connecting"
                      ? "Connecting..."
                      : callStatus === "ended"
                      ? "Call ended"
                      : "Ready to connect"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Visualizer Area */}
            <div className="px-6 py-8 flex flex-col items-center">
              {/* Call Circle */}
              <div className="relative mb-8">
                {/* Ripple rings when active */}
                {callStatus === "active" && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" style={{ animationDuration: "2s" }} />
                    <div className="absolute -inset-3 rounded-full bg-cyan-500/10 animate-ping" style={{ animationDuration: "3s" }} />
                  </>
                )}

                <button
                  onClick={callStatus === "idle" || callStatus === "ended" ? startCall : endCall}
                  disabled={callStatus === "connecting"}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                    callStatus === "idle" || callStatus === "ended"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
                      : callStatus === "connecting"
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 cursor-wait"
                      : "bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-lg shadow-red-500/25"
                  }`}
                >
                  {callStatus === "idle" || callStatus === "ended" ? (
                    <Phone className="w-8 h-8 text-white" />
                  ) : callStatus === "connecting" ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : (
                    <PhoneOff className="w-8 h-8 text-white" />
                  )}
                </button>
              </div>

              {/* Waveform Visualizer */}
              <div className="flex items-center gap-[3px] h-12 mb-4">
                {waveformBars.map((height, i) => (
                  <motion.div
                    key={i}
                    className={`w-[3px] rounded-full ${
                      callStatus === "active"
                        ? isSpeaking
                          ? "bg-cyan-400"
                          : "bg-cyan-600/50"
                        : "bg-white/10"
                    }`}
                    animate={{
                      height: callStatus === "active" ? height : 4,
                    }}
                    transition={{
                      duration: 0.15,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Status Text */}
              <p className="text-gray-500 text-sm mb-2">
                {callStatus === "idle" && "Tap the button to start speaking with the AI"}
                {callStatus === "connecting" && "Requesting microphone access..."}
                {callStatus === "active" && (isSpeaking ? "AI is speaking..." : "Listening...")}
                {callStatus === "ended" && "Conversation ended"}
              </p>

              {callStatus === "active" && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs">
                  <Mic className="w-3 h-3" />
                  <span>Microphone active</span>
                </div>
              )}
            </div>

            {/* Transcript Area */}
            {transcripts.length > 0 && (
              <div className="border-t border-white/5">
                <div className="px-6 py-3 flex items-center gap-2 text-gray-500 text-xs">
                  <MessageSquare className="w-3 h-3" />
                  <span>Live Transcript</span>
                </div>
                <SlimScrollArea className="px-6 pb-6 max-h-48 space-y-3">
                  {transcripts.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          entry.role === "user"
                            ? "bg-cyan-600/20 text-cyan-100 rounded-br-sm"
                            : "bg-white/5 text-gray-300 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-50">
                          {entry.role === "user" ? "You" : "AI Assistant"}
                        </p>
                        {entry.text}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={transcriptEndRef} />
                </SlimScrollArea>
              </div>
            )}

            {/* Footer Info */}
            <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02]">
              <p className="text-gray-600 text-[11px] text-center">
                This AI can check, book, update, and cancel calendar appointments.
                <br />
                Powered by Vapi • Your microphone audio is not stored.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
