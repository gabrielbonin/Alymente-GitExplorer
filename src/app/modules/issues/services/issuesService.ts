import type { GithubIssue } from "@/shared/types/github";

const BASE_URL = "https://api.github.com";

function buildHeaders(): HeadersInit {
  const token = process.env.EXPO_PUBLIC_GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    const time = reset
      ? new Date(parseInt(reset, 10) * 1000).toLocaleTimeString("pt-BR")
      : null;
    throw new Error(
      `rate limit excedido${time ? ` — reseta às ${time}` : ""}. Adicione EXPO_PUBLIC_GITHUB_TOKEN no .env.`
    );
  }
  if (res.status === 404) throw new Error("Repositório não encontrado.");
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export interface IssuesParams {
  owner: string;
  repo: string;
  page?: number;
  perPage?: number;
  state?: "open" | "closed" | "all";
}

export async function getIssues({
  owner,
  repo,
  page = 1,
  perPage = 30,
  state = "open",
}: IssuesParams): Promise<GithubIssue[]> {
  const params = new URLSearchParams({
    state,
    page: String(page),
    per_page: String(perPage),
  });

  const res = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}/issues?${params}`,
    { headers: buildHeaders() }
  );

  const data = await handleResponse<GithubIssue[]>(res);

  // GitHub /issues endpoint returns PRs mixed in — filter them out
  return data.filter((item) => !item.pull_request);
}
