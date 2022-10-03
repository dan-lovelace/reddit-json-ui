import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { browser, MESSAGE_ACTIONS, STORAGE_KEYS } from "@rju/core";

import CodeEditor from "../CodeEditor";

export default function StyleInput() {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    async function init() {
      const style = await browser.storage.sync.get(STORAGE_KEYS.CURRENT_STYLE);

      if (
        Object.prototype.hasOwnProperty.call(style, STORAGE_KEYS.CURRENT_STYLE)
      ) {
        setValue(style[STORAGE_KEYS.CURRENT_STYLE]);
      }
    }

    init();
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSave = () => {
    browser.runtime.sendMessage({
      action: MESSAGE_ACTIONS.UPDATE_STYLE,
      value,
    });
    browser.storage.sync.set({
      [STORAGE_KEYS.CURRENT_STYLE]: value,
    });
  };

  return (
    <>
      <CodeEditor language="css" value={value} handleChange={handleChange} />
      <Button variant="contained" onClick={handleSave}>
        Apply
      </Button>
    </>
  );
}
