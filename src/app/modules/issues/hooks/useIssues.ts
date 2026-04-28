import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "@/app/modules/issues/services/issuesService";
import type { GithubIssue } from "@/shared/types/github";

const PER_PAGE = 30;

export function useIssues(owner: string, repo: string) {
  return useInfiniteQuery({
    queryKey: ["issues", owner, repo],
    queryFn: ({ pageParam }) =>
      getIssues({ owner, repo, page: pageParam as number, perPage: PER_PAGE }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      // Se a última página retornou menos que o limite, não há próxima
      if (lastPage.length < PER_PAGE) return undefined;
      return allPages.length + 1;
    },

    enabled: Boolean(owner && repo),
    staleTime: 1000 * 60 * 2, // 2 min — issues mudam com mais frequência
  });
}

export function flattenIssues(
  data: ReturnType<typeof useIssues>["data"]
): GithubIssue[] {
  return data?.pages.flat() ?? [];
}
