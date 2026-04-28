import type { GithubRepository } from "@/shared/types/github";

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

export async function getRepository(
  owner: string,
  repo: string
): Promise<GithubRepository> {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
    headers: buildHeaders(),
  });
  return handleResponse<GithubRepository>(res);
}
