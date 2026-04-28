export interface GithubOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: GithubOwner;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  license: { name: string } | null;
  updated_at: string;
  open_issues_count: number;
  html_url: string;
}

export interface GithubIssue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: GithubOwner;
  labels: GithubLabel[];
  created_at: string;
  updated_at: string;
  html_url: string;
  /** Present only on pull requests — used to filter them out */
  pull_request?: { url: string };
}

export interface GithubLabel {
  id: number;
  name: string;
  color: string;
  description: string | null;
}

export interface SearchRepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}
