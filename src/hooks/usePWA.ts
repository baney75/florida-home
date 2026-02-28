import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWA() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as { standalone?: boolean }).standalone === true;
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Listen for display mode changes
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addEventListener("change", checkStandalone);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setCanInstall(false);
      setIsStandalone(true);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // Check for service worker updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setIsUpdateAvailable(true);
      });

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setIsUpdateAvailable(true);
              }
            });
          }
        });
      });
    }

    return () => {
      mediaQuery.removeEventListener("change", checkStandalone);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  const updatePWA = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
        window.location.reload();
      });
    }
  };

  return {
    isStandalone,
    canInstall,
    isUpdateAvailable,
    installPWA,
    updatePWA,
  };
}
