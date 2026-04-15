"use client";

import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { SlimScrollArea } from "./SlimScrollArea";

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalModalProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  trigger: React.ReactNode;
}

export function LegalModal({ title, lastUpdated, sections, trigger }: LegalModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl max-h-[85dvh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-border shrink-0">
            <div>
              <Dialog.Title className="text-lg sm:text-xl font-bold text-foreground">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground mt-1">
                Last updated: {lastUpdated}
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-muted transition-colors ml-4 shrink-0 mt-0.5">
              <X className="w-4 h-4 text-muted-foreground" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
          <SlimScrollArea className="flex-1 p-5 sm:p-6 max-h-[calc(85dvh-5rem)]">
            <div className="space-y-6">
              {sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {section.heading}
                  </h3>
                  <div className="space-y-2">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SlimScrollArea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
