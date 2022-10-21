import { TextInput } from "@mantine/core";
import { useCallback } from "react";
import { KeyCode } from "../KeyCode";

export function TypingPanel({
  value,
  onTyping,
}: {
  value: string;
  onTyping: (char: string, code: KeyCode) => void;
}) {
  const onChange = useCallback(() => {}, []);

  return (
    <TextInput
      value={value}
      onKeyDown={(event) => {
        // console.log('** onKeyDown', event);
        onTyping(event.key, event.code as KeyCode);
      }}
      onChange={onChange}
    />
  );
}
