import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { DrawerMenu, HamburgerIcon } from "@/shared/components/DrawerMenu";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";
import { fontFamily, fontSize } from "@/design-system/tokens/typography";

import { EmptyState } from "@/shared/components/EmptyState";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { Loading } from "@/shared/components/Loading";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { GithubRepository } from "@/shared/types/github";

import { RepoCard } from "@/app/modules/search/components/RepoCard";
import { useSearchRepos, flattenRepos } from "@/app/modules/search/hooks/useSearchRepos";
import type { RootStackParamList } from "@/app/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function SearchScreen({ navigation }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerItems = [
    {
      icon: "🎨",
      label: "Design System",
      onPress: () => navigation.navigate("Showcase"),
    },
  ];
  const debouncedQuery = useDebounce(query, 400);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useSearchRepos(debouncedQuery);

  const repos = flattenRepos(data);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<GithubRepository>) => (
      <RepoCard
        repo={item}
        onPress={() =>
          navigation.navigate("Repository", {
            owner: item.owner.login,
            repo: item.name,
          })
        }
      />
    ),
    [navigation]
  );

  const renderFooter = useCallback(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator
          size="small"
          color={theme.colors.primary}
          style={styles.footerLoader}
        />
      ) : null,
    [isFetchingNextPage, theme.colors.primary]
  );

  const keyExtractor = useCallback(
    (item: GithubRepository) => String(item.id),
    []
  );

  return (
    /*
     * SafeAreaView com backgroundColor = primary → a área do status bar
     * fica verde, unindo visualmente com o header.
     * O conteúdo abaixo usa uma View filha com backgroundColor = background.
     */
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.primary }]}
      edges={["top"]}
    >
      {/* ── Drawer ── */}
      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={drawerItems}
      />

      {/* ── Header verde ── */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        {/* Linha: hamburger + título + botão de tema */}
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => setDrawerOpen(true)}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <HamburgerIcon color="#ffffff" />
          </TouchableOpacity>

          <Text variant="heading" size="xxl" weight="extraBold" color="onPrimary">
            GitExplorer
          </Text>

          <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7} style={styles.themeBtn}>
            <Text variant="caption" size="sm" color="onPrimaryMuted">
              {theme.mode === "light" ? "🌙" : "☀️"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text variant="body" size="sm" color="onPrimaryMuted">
          Busque repositórios do GitHub
        </Text>

        {/* Search pill — feito inline para garantir o fundo rgba no iOS */}
        <View style={styles.searchPill}>
          <Text variant="body" size="md" color="onPrimaryMuted">🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="react native, typescript…"
            placeholderTextColor="rgba(255,255,255,0.5)"
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            style={[
              styles.searchInput,
              {
                color: "#ffffff",
                fontFamily: fontFamily.regular,
                fontSize: fontSize.md,
              },
            ]}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>

      {/* ── Content — fundo do tema ── */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
          {isLoading ? (
            <Loading fullScreen />
          ) : isError ? (
            <ErrorMessage error={error} onRetry={refetch} />
          ) : debouncedQuery.trim().length < 2 ? (
            <EmptyState
              title="Busque um repositório"
              description="Digite ao menos 2 caracteres para começar"
            />
          ) : repos.length === 0 ? (
            <EmptyState
              title="Nenhum resultado"
              description={`Não encontramos repositórios para "${debouncedQuery}"`}
            />
          ) : (
            <FlatList
              data={repos}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.list}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.4}
              ListFooterComponent={renderFooter}
              onRefresh={refetch}
              refreshing={isLoading}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeBtn: {
    padding: spacing.xs,
  },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.full,
    height: 48,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  content: {
    flex: 1,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.sm,
  },
  footerLoader: {
    paddingVertical: spacing.md,
  },
});
