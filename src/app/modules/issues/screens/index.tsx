import React, { useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";

import { Loading } from "@/shared/components/Loading";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { EmptyState } from "@/shared/components/EmptyState";

import { IssueCard } from "@/app/modules/issues/components/IssueCard";
import { useIssues, flattenIssues } from "@/app/modules/issues/hooks/useIssues";
import { useRepository } from "@/app/modules/repository/hooks/useRepository";
import type { GithubIssue } from "@/shared/types/github";
import type { RootStackParamList } from "@/app/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Issues">;

export default function IssuesScreen({ route, navigation }: Props) {
  const { owner, repo } = route.params;
  const { theme } = useTheme();

  // Repo já está no cache (veio da tela anterior) — busca o total de issues
  const { data: repoData } = useRepository(owner, repo);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useIssues(owner, repo);

  const issues = flattenIssues(data);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<GithubIssue>) => (
      <IssueCard issue={item} />
    ),
    []
  );

  const renderSeparator = useCallback(
    () => (
      <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
    ),
    [theme.colors.border]
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
    (item: GithubIssue) => String(item.id),
    []
  );

  const totalCount = repoData?.open_issues_count;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.surface }]}
      edges={["top"]}
    >
      {/* ── NavBar ── */}
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text variant="body" size="lg" color="primary">←</Text>
        </TouchableOpacity>

        <Text
          variant="body"
          size="md"
          weight="bold"
          color="text"
          numberOfLines={1}
        >
          {owner}/{repo} · Issues
        </Text>

        {/* Badge com total de issues abertas */}
        {totalCount !== undefined && (
          <View
            style={[
              styles.countBadge,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Text variant="caption" size="xs" weight="bold" color="primary">
              {totalCount}
            </Text>
          </View>
        )}
      </View>

      {/* ── Content ── */}
      {isLoading ? (
        <Loading fullScreen />
      ) : isError ? (
        <ErrorMessage error={error} onRetry={refetch} />
      ) : (
        <FlatList
          data={issues}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={
            <EmptyState
              title="Nenhuma issue aberta"
              description={`${owner}/${repo} não tem issues abertas no momento.`}
            />
          }
          ListFooterComponent={renderFooter}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          onRefresh={refetch}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: theme.colors.background }}
          contentContainerStyle={
            issues.length === 0 ? styles.emptyContent : undefined
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  navBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
  },
  navBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  countBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginLeft: "auto",
  },

  separator: {
    height: 1,
  },
  footerLoader: {
    paddingVertical: spacing.md,
  },
  emptyContent: {
    flex: 1,
  },
});
