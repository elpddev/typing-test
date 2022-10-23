import { MantineProvider } from "@mantine/core";
import { TypingGame } from "./components/TypingGame";

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <TypingGame />
    </MantineProvider>
  );
}
