import { useQuery } from "@tanstack/react-query";
import { getRepository } from "@/app/modules/repository/services/repositoryService";

export function useRepository(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repo", owner, repo],
    queryFn: () => getRepository(owner, repo),
    staleTime: 1000 * 60 * 5, // 5 min — evita refetch a cada navegação
    enabled: Boolean(owner && repo),
  });
}
