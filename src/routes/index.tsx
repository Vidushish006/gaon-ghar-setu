import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { GramProvider } from "@/lib/gram/store";
import { GramSetuApp } from "@/components/gram/App";

const title = "Gram Setu — Gaon se Zarurat Tak";
const description =
  "Rural marketplace to find tractors, harvesters, crop residue, farm labour and storage near your village. Search, match and call the provider directly.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <GramProvider>
      <GramSetuApp />
      <Toaster position="top-center" />
    </GramProvider>
  );
}
