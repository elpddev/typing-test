import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface TypingAreaStore {
  scrollToSelf: (top: number) => void;
}

const typingAreaStoreEmpty: TypingAreaStore = {
  scrollToSelf: (top: number) => {},
};

export const TypingAreaContext =
  createContext<TypingAreaStore>(typingAreaStoreEmpty);

export function TypingAreaProvider({
  viewport,
  children,
}: {
  viewport: MutableRefObject<HTMLDivElement>;
  children: ReactNode;
}) {
  const scrollToSelf = useCallback(
    (target: number) => {
      if (
        target >= viewport.current.scrollTop &&
        target < viewport.current.scrollTop + viewport.current.clientHeight
      ) {
        return;
      }

      viewport.current.scrollTo({ top: target, behavior: "smooth" });
    },
    [viewport]
  );

  const store = useMemo(() => {
    return {
      scrollToSelf,
    };
  }, [viewport]);

  return (
    <TypingAreaContext.Provider value={store}>
      {children}
    </TypingAreaContext.Provider>
  );
}
