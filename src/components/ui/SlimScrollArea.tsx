interface SlimScrollAreaProps {
  className?: string;
  children: React.ReactNode;
}

export function SlimScrollArea({ className, children }: SlimScrollAreaProps) {
  return (
    <div className={`overflow-y-auto slim-scroll ${className ?? ""}`}>
      {children}
    </div>
  );
}
