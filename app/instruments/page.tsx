import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function InstrumentsData() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select();

  if (error) {
    return <p className="text-red-500">Error loading instruments: {error.message}</p>;
  }

  return (
    <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-mono overflow-auto">
      {JSON.stringify(instruments, null, 2)}
    </pre>
  );
}

export default function Instruments() {
  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        Instruments
      </h1>
      <Suspense fallback={<div className="text-zinc-500">Loading instruments...</div>}>
        <InstrumentsData />
      </Suspense>
    </div>
  );
}
