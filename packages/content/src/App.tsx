import { useState } from "react";

import { browser } from "@rju/core";
import { TConfig } from "@rju/types";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./lib/routes";
import { handleSandboxLoad } from "./lib/sandbox";

const router = createBrowserRouter(ROUTES);

const sandboxUrl = browser.runtime.getURL("sandbox.html");

export default function App({ config }: { config: TConfig }) {
  const [initialized, setInitialized] = useState<boolean>(false);

  return (
    <>
      {initialized && <RouterProvider router={router} />}
      <div id="rju-content"></div>
      <iframe
        id="rju-sandbox"
        src={sandboxUrl}
        onLoad={handleSandboxLoad({
          config,
          initialize: () => setInitialized(true),
        })}
      />
    </>
  );
}
