type AIInteraction = {
  id: number;
  role: string;
  prompt: string;
  response: string;
  created_at: string;
};

import { supabase } from "@/lib/supabase";

async function fetchInteractions(): Promise<AIInteraction[]> {
  const { data, error } = await supabase
    .from('ai_interactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching interactions:', error);
    return [];
  }

  return data || [];
}

export default async function ProfilePage() {
  const interactions = await fetchInteractions();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Your AI history
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Recent interactions with the AI coach. (POC view; auth wiring
          required.)
        </p>
      </header>
      <section className="space-y-3">
        {interactions.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No AI interactions yet. Try solving a problem with the AI assistant.
          </p>
        ) : (
          <ul className="space-y-3">
            {interactions.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-zinc-200 bg-white p-3 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="mb-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="uppercase tracking-wide">{item.role}</span>
                  <span>{new Date(item.created_at).toLocaleString()}</span>
                </div>
                <p className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
                  Prompt
                </p>
                <p className="mb-2 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                  {item.prompt}
                </p>
                <p className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
                  Response
                </p>
                <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                  {item.response}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}


