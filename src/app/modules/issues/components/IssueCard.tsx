import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";
import { formatRelativeDate } from "@/shared/utils/formatters";
import type { GithubIssue, GithubLabel } from "@/shared/types/github";

// ── GitHubLabel ───────────────────────────────────────────────────────────────
// A cor das labels vem do GitHub como hex sem "#". Usamos ela como tint (20% alpha)
// no fundo, e escolhemos text/muted baseado na luminosidade da cor original.

function GitHubLabel({ label }: { label: GithubLabel }) {
  const hex = `#${label.color}`;
  const r = parseInt(label.color.slice(0, 2), 16);
  const g = parseInt(label.color.slice(2, 4), 16);
  const b = parseInt(label.color.slice(4, 6), 16);
  const isLight = r * 0.299 + g * 0.587 + b * 0.114 > 160;

  return (
    <View style={[styles.labelPill, { backgroundColor: hex + "33" }]}>
      <Text
        variant="caption"
        size="xs"
        weight="semiBold"
        color={isLight ? "text" : "muted"}
        numberOfLines={1}
      >
        {label.name}
      </Text>
    </View>
  );
}

// ── IssueCard ─────────────────────────────────────────────────────────────────

interface IssueCardProps {
  issue: GithubIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { theme } = useTheme();

  // Avatar com cor estável derivada do login
  const palette = [
    theme.colors.primary,
    theme.colors.primaryVariant,
    theme.colors.warning,
    theme.colors.success,
    theme.colors.danger,
  ];
  const avatarBg =
    palette[(issue.user?.login ?? "").charCodeAt(0) % palette.length];
  const initial = (issue.user?.login ?? "?").charAt(0).toUpperCase();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      {/* ── Top: status icon + título + labels ── */}
      <View style={styles.topRow}>
        <Text variant="body" size="md" color="success">●</Text>

        <View style={styles.body}>
          <Text
            variant="body"
            size="sm"
            weight="semiBold"
            color="text"
            numberOfLines={2}
          >
            {issue.title}
          </Text>

          {issue.labels.length > 0 && (
            <View style={styles.labels}>
              {issue.labels.map((lbl) => (
                <GitHubLabel key={lbl.id} label={lbl} />
              ))}
            </View>
          )}
        </View>
      </View>

      {/* ── Meta: avatar + author · tempo ── */}
      <View style={styles.metaRow}>
        <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
          <Text variant="caption" size="xs" weight="bold" color="onPrimary">
            {initial}
          </Text>
        </View>
        <Text variant="caption" size="xs" color="muted">
          {issue.user?.login ?? "unknown"} · {formatRelativeDate(issue.created_at)}
        </Text>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  body: {
    flex: 1,
    gap: 6,
  },
  labels: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  labelPill: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.lg + spacing.sm, // alinha com o body (pula o ●)
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});
