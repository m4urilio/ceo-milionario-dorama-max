declare global {
  interface Window {
    twq?: (...args: unknown[]) => void;
  }
}

export function trackInitiateCheckout(): void {
  try {
    if (typeof window !== "undefined" && typeof window.twq === "function") {
      window.twq("event", "tw-rd4y1-rd4y9", {});
    }
  } catch {
    // Silently ignore (AdBlocker, script load failure, etc.)
  }
}
