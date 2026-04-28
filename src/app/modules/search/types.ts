import type { GithubRepository } from '@/shared/types/github';

export interface SearchParams {
  query: string;
  page: number;
  perPage?: number;
}

export interface SearchState {
  query: string;
  results: GithubRepository[];
  isLoading: boolean;
  error: string | null;
}
