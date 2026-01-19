import Link from "next/link";

type Problem = {
  id: number;
  slug: string;
  title: string;
  difficulty: string;
  tags: string[];
  description: string;
  ideal_solution_outline?: string | null;
  example_prompts_for_ai?: string[];
};

import { supabase } from "@/lib/supabase";

async function fetchProblem(slug: string): Promise<Problem | null> {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching problem:', error);
    return null;
  }

  return data;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProblemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = await fetchProblem(slug);

  if (!problem) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-10">
        <p className="text-sm text-red-600 dark:text-red-400">
          Problem not found.
        </p>
        <Link
          href="/problems"
          className="text-sm text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
        >
          Back to problem set
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {problem.title}
            </h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {problem.slug}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {problem.difficulty}
            </span>
            {problem.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr),minmax(0,2.4fr)]">
        <article className="space-y-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Problem
          </h2>
          <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {problem.description}
          </p>
          {problem.ideal_solution_outline && (
            <div className="space-y-2 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                One possible workflow outline
              </p>
              <pre className="whitespace-pre-wrap text-xs leading-5">
                {problem.ideal_solution_outline}
              </pre>
            </div>
          )}
          {problem.example_prompts_for_ai &&
            problem.example_prompts_for_ai.length > 0 && (
              <div className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Example prompts for AI
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  {problem.example_prompts_for_ai.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
        </article>

        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Workspace (test)
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Use this pane like you would in real work: draft your approach on
            the left, and sketch how you&apos;d collaborate with AI on the
            right. (AI calls to the backend can be wired next.)
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Your attempt / notes
              </p>
              <textarea
                className="min-h-[160px] w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-400 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500"
                placeholder="Outline steps you’d take, data you’d need, and how you’d structure the workflow..."
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                How you would use AI
              </p>
              <textarea
                className="min-h-[160px] w-full rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-400 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500"
                placeholder="Write example prompts you’d send to the AI (e.g., “Summarize today’s metrics into 5 bullets…”) and how you’d iterate on the answers."
              />
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Later, this area will send your plan and prompts to the backend
                `/ai` endpoints and show responses inline.
              </p>
            </div>
          </div>
        </section>
      </section>

      <footer className="mt-4 flex items-center justify-between">
        <Link
          href="/problems"
          className="text-sm text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
        >
          Back to problem set
        </Link>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          This is a POC workspace; data isn&apos;t yet saved or sent to AI.
        </p>
      </footer>
    </main>
  );
}


