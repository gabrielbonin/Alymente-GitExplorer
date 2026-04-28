import React, { useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "@/design-system/components/Text";
import { Button } from "@/design-system/components/Button";
import { Avatar } from "@/design-system/components/Avatar";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";
import { fontFamily } from "@/design-system/tokens/typography";

import { Loading } from "@/shared/components/Loading";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { formatCount, formatRelativeDate } from "@/shared/utils/formatters";

import { useRepository } from "@/app/modules/repository/hooks/useRepository";
import type { RootStackParamList } from "@/app/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Repository">;

// ── Sub-components ────────────────────────────────────────────────────────────

function StatItem({ value, label }: { value: string; label: string }) {
  const { theme } = useTheme();
  return (
    <View style={styles.statItem}>
      <Text variant="heading" size="lg" weight="extraBold" color="primary">
        {value}
      </Text>
      <Text variant="caption" size="xs" weight="semiBold" color="muted">
        {label}
      </Text>
    </View>
  );
}

function StatDivider() {
  const { theme } = useTheme();
  return (
    <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      {children}
    </View>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metaRow}>
      <Text variant="caption" size="sm" color="primary">{icon}</Text>
      <View style={styles.metaLabel}>
        <Text variant="body" size="sm" color="textSecondary">{label}</Text>
      </View>
      <Text variant="body" size="sm" weight="bold" color="text">
        {value}
      </Text>
    </View>
  );
}

function LanguageChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text variant="caption" size="xs" weight="semiBold" color="onPrimary">
        {label}
      </Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function RepositoryScreen({ route, navigation }: Props) {
  const { owner, repo } = route.params;
  const { theme } = useTheme();

  const { data, isLoading, isError, error, refetch } = useRepository(owner, repo);

  const handleIssues = useCallback(() => {
    navigation.navigate("Issues", { owner, repo });
  }, [navigation, owner, repo]);

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

        <Text variant="body" size="lg" weight="bold" color="text">
          Repositório
        </Text>

        <View style={styles.navBtn} />
      </View>

      {/* ── Content ── */}
      {isLoading ? (
        <Loading fullScreen />
      ) : isError ? (
        <ErrorMessage error={error} onRetry={refetch} />
      ) : data ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          style={{ backgroundColor: theme.colors.background }}
        >
          {/* ── Hero Card (primary bg) ── */}
          <View style={[styles.heroCard, { backgroundColor: theme.colors.primary }]}>
            {/* Avatar + owner + repo name */}
            <View style={styles.heroTop}>
              <Avatar
                uri={data.owner.avatar_url}
                initial={data.owner.login}
                size="lg"
              />
              <View style={styles.heroMeta}>
                <Text variant="caption" size="sm" weight="semiBold" color="onPrimaryMuted">
                  {data.owner.login}
                </Text>
                <Text variant="heading" size="lg" weight="extraBold" color="onPrimary">
                  {data.name}
                </Text>
              </View>
            </View>

            {/* Description */}
            {data.description ? (
              <Text variant="body" size="sm" color="onPrimaryMuted">
                {data.description}
              </Text>
            ) : null}

            {/* Language + topics chips */}
            <View style={styles.chips}>
              {data.language ? <LanguageChip label={data.language} /> : null}
              {data.open_issues_count > 0 ? (
                <LanguageChip label="Issues abertas" />
              ) : null}
            </View>
          </View>

          {/* ── Stats Row ── */}
          <View
            style={[
              styles.statsRow,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <StatItem value={formatCount(data.stargazers_count)} label="Stars" />
            <StatDivider />
            <StatItem value={formatCount(data.forks_count)} label="Forks" />
            <StatDivider />
            <StatItem value={formatCount(data.watchers_count)} label="Watchers" />
          </View>

          {/* ── Detail body ── */}
          <View style={styles.body}>
            {/* Sobre */}
            {data.description ? (
              <SectionCard>
                <Text variant="caption" size="sm" weight="bold" color="muted">
                  Sobre
                </Text>
                <Text variant="body" size="sm" color="textSecondary">
                  {data.description}
                </Text>
              </SectionCard>
            ) : null}

            {/* Informações */}
            <SectionCard>
              <Text variant="caption" size="sm" weight="bold" color="muted">
                Informações
              </Text>
              {data.language ? (
                <MetaRow icon="⟨⟩" label="Linguagem principal" value={data.language} />
              ) : null}
              {data.license ? (
                <MetaRow icon="⚖" label="Licença" value={data.license.name} />
              ) : null}
              <MetaRow
                icon="📅"
                label="Atualizado"
                value={formatRelativeDate(data.updated_at)}
              />
            </SectionCard>

            {/* CTA */}
            <Button
              label="Ver Issues do Repositório"
              onPress={handleIssues}
              variant="primary"
              size="lg"
              fullWidth
            />
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  // NavBar
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

  // Scroll
  scroll: { paddingBottom: spacing.xl * 2 },

  // Hero
  heroCard: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  heroMeta: { flex: 1, gap: 2 },
  chips: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
  },

  // Body
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  metaLabel: {
    flex: 1,
  },
});
