"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const icons = {
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />,
  destructive: <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />,
  default: <Info className="h-5 w-5 shrink-0 text-blue-500" />,
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          {icons[variant ?? "default"]}
          <div className="grid flex-1 gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
