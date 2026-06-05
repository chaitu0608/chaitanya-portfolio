import { githubProof } from "@/data/github";

export function GithubProof() {
  return (
    <div className="rounded border border-zinc-800 bg-zinc-950/50 p-4 font-mono">
      <p className="text-emerald-400">$ github --stats</p>
      <div className="mt-3 grid gap-2 text-xs text-zinc-300 sm:grid-cols-2">
        <p>repositories: {githubProof.metrics.repositories}</p>
        <p>commits: {githubProof.metrics.commits}</p>
        <p>pull_requests: {githubProof.metrics.pullRequests}</p>
        <p>hackathons: {githubProof.metrics.hackathons}</p>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <img
          src={githubProof.widgets.profile}
          alt="GitHub profile stats"
          loading="lazy"
          className="w-full rounded border border-zinc-800 bg-[#0a0a0a]"
        />
        <img
          src={githubProof.widgets.topLangs}
          alt="Top GitHub languages"
          loading="lazy"
          className="w-full rounded border border-zinc-800 bg-[#0a0a0a]"
        />
      </div>
    </div>
  );
}
