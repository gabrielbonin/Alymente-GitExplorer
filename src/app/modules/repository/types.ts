import type { GithubRepository } from '@/shared/types/github';

export interface RepositoryScreenParams {
  owner: string;
  repo: string;
}

export type RepositoryDetail = GithubRepository;
