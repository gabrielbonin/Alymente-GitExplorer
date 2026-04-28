import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@/design-system/components/Text";
import { Badge } from "@/design-system/components/Badge";
import { Avatar } from "@/design-system/components/Avatar";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";
import type { GithubRepository } from "@/shared/types/github";

interface RepoCardProps {
  repo: GithubRepository;
  onPress: () => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function RepoCard({ repo, onPress }: RepoCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {/* Header: avatar + owner + language badge */}
      <View style={styles.header}>
        <Avatar
          uri={repo.owner.avatar_url}
          initial={repo.owner.login}
          size="sm"
        />
        <View style={styles.headerMeta}>
          <Text variant="caption" size="xs" color="muted">
            {repo.owner.login}
          </Text>
          <Text variant="body" size="md" weight="bold" color="text" numberOfLines={1}>
            {repo.name}
          </Text>
        </View>
        {repo.language ? (
          <Badge label={repo.language} tone="neutral" />
        ) : null}
      </View>

      {/* Description */}
      {repo.description ? (
        <Text variant="body" size="sm" color="textSecondary" numberOfLines={2}>
          {repo.description}
        </Text>
      ) : null}

      {/* Stats */}
      <View style={styles.stats}>
        <Text variant="caption" size="xs" color="muted">
          ⭐ {formatCount(repo.stargazers_count)}
        </Text>
        <Text variant="caption" size="xs" color="muted">
          🍴 {formatCount(repo.forks_count)}
        </Text>
        {repo.open_issues_count > 0 ? (
          <Text variant="caption" size="xs" color="muted">
            ● {formatCount(repo.open_issues_count)} issues
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerMeta: {
    flex: 1,
    gap: 1,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xs,
  },
});
