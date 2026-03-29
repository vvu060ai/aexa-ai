"use client";

import { useState } from "react";
import { VoiceCallButton } from "@/components/VoiceCallButton";
import { CheckCircle2, User, Phone as PhoneIcon, Mail, Calendar, Stethoscope } from "lucide-react";

export default function DentalDemoPage() {
  const vapiKey = process.env.VAPI_PUBLIC_KEY || process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";
  const [appointmentData, setAppointmentData] = useState<any>(null);

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-dark-accent">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
            AI Dental Receptionist Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of appointment booking. Click the button below to speak with our intelligent voice assistant to schedule your dental visit.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-accent/50 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            {/* Call Action Area */}
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-full">
              <VoiceCallButton 
                vapiKey={vapiKey} 
                onCallResult={(result) => {
                  console.log("Appointment Data Captured:", result);
                  setAppointmentData(result);
                }} 
              />
            </div>

            {/* Live Call Summary / Status */}
            <div className="w-full max-w-lg mt-8 border-t border-gray-100 dark:border-gray-800 pt-8">
              <h3 className="text-xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">Captured Information</h3>
              
              {!appointmentData ? (
                 <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 italic text-center">
                      The details of your appointment will appear here in real-time as the AI collects them...
                    </p>
                 </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-inner border border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md text-blue-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Patient Name</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{appointmentData.name || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md text-green-600">
                        <PhoneIcon size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Phone</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{appointmentData.phone || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md text-purple-600">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{appointmentData.email || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md text-red-600 mt-1">
                      <Stethoscope size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Dental Problem</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{appointmentData.problem || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <div className="bg-blue-600 p-2 rounded-md text-white">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-bold">Confirmed Time</p>
                      <p className="font-bold text-gray-800 dark:text-gray-100">
                        {appointmentData.appointment_time ? new Date(appointmentData.appointment_time).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Success Criteria List */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-dark-accent/30 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-blue-500" />
              What the AI can do
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>Greet the patient naturally</li>
              <li>Ask about their specific dental issue</li>
              <li>Collect name, email, and phone number</li>
              <li>Ask for preferred appointment timings</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-dark-accent/30 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              Backend automation
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>Verify real-time Google Calendar availability</li>
              <li>Suggest alternative dates if fully booked</li>
              <li>Book the event directly onto the calendar</li>
              <li>Dispatch an email confirmation instantly</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
