import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRepositories } from "@/app/modules/search/services/searchService";
import type { GithubRepository } from "@/shared/types/github";

const PER_PAGE = 20;

export function useSearchRepos(query: string) {
  return useInfiniteQuery({
    queryKey: ["repos", "search", query],
    queryFn: ({ pageParam }) =>
      searchRepositories({ query, page: pageParam as number, perPage: PER_PAGE }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * PER_PAGE;
      if (loaded >= lastPage.total_count) return undefined;
      return allPages.length + 1;
    },

    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 5, // 5 min — evita refetch desnecessário
  });
}

/** Flatten all pages into a single array */
export function flattenRepos(
  data: ReturnType<typeof useSearchRepos>["data"]
): GithubRepository[] {
  return data?.pages.flatMap((page) => page.items) ?? [];
}
