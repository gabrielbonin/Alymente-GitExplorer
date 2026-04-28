/**
 * Reactotron — debug config (somente __DEV__)
 *
 * Desktop app: https://github.com/infinitered/reactotron/releases
 *
 * O que aparece no Reactotron:
 *  - Timeline → todas as chamadas fetch (GitHub API, rate limit headers, etc.)
 *  - React Query → cache por queryKey, status, staleTime, dados paginados
 *  - Logs via console.tron.log('mensagem')
 */
import Reactotron from "reactotron-react-native";
import { reactotronReactQuery, QueryClientManager } from "reactotron-react-query";
import type { QueryClient } from "@tanstack/react-query";

export function setupReactotron(queryClient: QueryClient): void {
  if (!__DEV__) return;

  const queryClientManager = new QueryClientManager({ queryClient });

  Reactotron.configure({ name: "GitExplorer" })
    .useReactNative({
      networking: {
        // ignora requests internas do Metro — foco na API do GitHub
        ignoreUrls: /symbolicate|hot-update|inspector/,
      },
    })
    .use(reactotronReactQuery(queryClientManager))
    .connect();

  // Limpa o log a cada hot reload
  Reactotron.clear?.();

  // console.tron.log('msg') disponível em qualquer arquivo durante dev
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (console as any).tron = Reactotron.log?.bind(Reactotron);
}
