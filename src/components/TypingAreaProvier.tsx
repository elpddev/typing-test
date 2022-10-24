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
    (top: number) => {
      if (
        top >= viewport.current.scrollTop &&
        top < viewport.current.scrollTop + viewport.current.clientHeight
      ) {
        return;
      }

      viewport.current.scrollTo({ top });
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
