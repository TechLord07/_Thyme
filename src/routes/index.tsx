import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/thyme.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(html as string, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
  component: () => null,
});
