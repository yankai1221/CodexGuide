import { inject } from "@vercel/analytics";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance: () => {
    if (import.meta.env.PROD && typeof window !== "undefined") {
      inject();
    }
  },
});
