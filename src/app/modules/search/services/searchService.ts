import type { SearchRepositoriesResponse } from "@/shared/types/github";

const BASE_URL = "https://api.github.com";

function buildHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 403 || res.status === 429) {
    const resetAt = res.headers.get("x-ratelimit-reset");
    const resetDate = resetAt
      ? new Date(parseInt(resetAt, 10) * 1000).toLocaleTimeString("pt-BR")
      : null;
    throw new Error(
      `rate limit excedido${resetDate ? ` — reseta às ${resetDate}` : ""}. Adicione um GITHUB_TOKEN no .env para aumentar o limite.`
    );
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export interface SearchParams {
  query: string;
  page?: number;
  perPage?: number;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
}

export async function searchRepositories({
  query,
  page = 1,
  perPage = 20,
  sort = "stars",
  order = "desc",
}: SearchParams): Promise<SearchRepositoriesResponse> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    per_page: String(perPage),
    sort,
    order,
  });

  const res = await fetch(`${BASE_URL}/search/repositories?${params}`, {
    headers: buildHeaders(),
  });

  return handleResponse<SearchRepositoriesResponse>(res);
}
