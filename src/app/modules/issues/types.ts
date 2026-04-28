import type { GithubIssue } from '@/shared/types/github';

export interface IssuesScreenParams {
  owner: string;
  repo: string;
}

export type IssueItem = GithubIssue;
