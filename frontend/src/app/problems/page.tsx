import Link from "next/link";

type Problem = {
  id: number;
  slug: string;
  title: string;
  difficulty: string;
  tags: string[];
};

import { supabase } from "@/lib/supabase";

async function fetchProblems(): Promise<Problem[]> {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching problems:', error);
    return [];
  }

  return data || [];
}

export default async function ProblemsPage() {
  const problems = await fetchProblems();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Problem set
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Practice real-work scenarios and learn how to collaborate with AI.
          </p>
        </div>
      </header>
      <section className="space-y-2">
        {problems.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No problems found yet. Seed some problems in the backend.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {problems.map((p) => (
              <li key={p.id} className="py-3">
                <Link
                  href={`/problems/${p.slug}`}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {p.title}
                    </h2>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                        {p.difficulty}
                      </span>
                      {p.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}


