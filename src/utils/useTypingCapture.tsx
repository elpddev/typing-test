import { useCallback, useEffect, useState } from "react";
import { KeyCode } from "../KeyCode";

export function useTypingCapture(
  onCapture: (a: { code: KeyCode; char: string }) => void
) {
  const [isCapturing, setIsCapturing] = useState(false);

  const typingCallback = useCallback((event: KeyboardEvent) => {
    // console.log('** event', event);
    event.stopPropagation();
    event.preventDefault();
    onCapture({ code: event.code as KeyCode, char: event.key });
  }, []);

  const startCapture = useCallback(() => {
    setIsCapturing((prev) => {
      if (prev) {
        return prev;
      }

      document.addEventListener("keydown", typingCallback);
      return true;
    });
  }, []);

  const stopCapture = useCallback(() => {
    setIsCapturing((prev) => {
      if (!prev) {
        return prev;
      }

      document.removeEventListener("keydown", typingCallback);
      return false;
    });
  }, []);

  return {
    isCapturing,
    startCapture,
    stopCapture,
  };
}
