import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "@/design-system/components/Text";
import { Badge } from "@/design-system/components/Badge";
import { Avatar } from "@/design-system/components/Avatar";
import { Button } from "@/design-system/components/Button";
import { Card, Surface } from "@/design-system/components/Card";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";
import type { RootStackParamList } from "@/app/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Showcase">;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text variant="caption" size="xs" weight="bold" color="muted">
        {title}
      </Text>
      <View style={[styles.sectionContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        {children}
      </View>
    </View>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

export default function ShowcaseScreen({ navigation }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.surface }]}
      edges={["top"]}
    >
      {/* NavBar */}
      <View style={[styles.navBar, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text variant="body" size="lg" color="primary">←</Text>
        </TouchableOpacity>
        <Text variant="body" size="lg" weight="bold" color="text">Design System</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.navBtn} activeOpacity={0.7}>
          <Text variant="body" size="md" color="muted">
            {theme.mode === "light" ? "🌙" : "☀️"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ backgroundColor: theme.colors.background }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Cores ── */}
        <Section title="CORES — LIGHT / DARK">
          <Row>
            {(["primary", "success", "warning", "danger"] as const).map((key) => (
              <View key={key} style={styles.colorChip}>
                <View style={[styles.colorDot, { backgroundColor: theme.colors[key] }]} />
                <Text variant="caption" size="xs" color="muted">{key}</Text>
              </View>
            ))}
          </Row>
          <Row>
            {(["background", "surface", "surfaceVariant", "border"] as const).map((key) => (
              <View key={key} style={styles.colorChip}>
                <View style={[styles.colorDot, { backgroundColor: theme.colors[key], borderWidth: 1, borderColor: theme.colors.border }]} />
                <Text variant="caption" size="xs" color="muted">{key}</Text>
              </View>
            ))}
          </Row>
        </Section>

        {/* ── Tipografia ── */}
        <Section title="TIPOGRAFIA — NUNITO">
          <Text variant="heading" size="xxl" weight="extraBold" color="text">Heading xxl ExtraBold</Text>
          <Text variant="heading" size="xl" weight="bold" color="text">Heading xl Bold</Text>
          <Text variant="body" size="md" weight="semiBold" color="text">Body md SemiBold</Text>
          <Text variant="body" size="sm" color="textSecondary">Body sm Regular — textSecondary</Text>
          <Text variant="caption" size="xs" color="muted">Caption xs — muted</Text>
        </Section>

        {/* ── Badge ── */}
        <Section title="BADGE">
          <Row>
            {(["primary", "success", "warning", "danger", "neutral"] as const).map((tone) => (
              <Badge key={tone} label={tone} tone={tone} />
            ))}
          </Row>
        </Section>

        {/* ── Avatar ── */}
        <Section title="AVATAR">
          <Row>
            <Avatar initial="G" size="sm" />
            <Avatar initial="GB" size="md" />
            <Avatar initial="A" size="lg" />
            <Avatar uri="https://avatars.githubusercontent.com/u/9919" size="md" />
          </Row>
        </Section>

        {/* ── Button ── */}
        <Section title="BUTTON">
          <Button label="Primary" onPress={() => {}} variant="primary" />
          <Button label="Outline" onPress={() => {}} variant="outline" />
          <Button label="Ghost" onPress={() => {}} variant="ghost" />
          <Button label="Loading..." onPress={() => {}} loading />
          <Button label="Disabled" onPress={() => {}} disabled />
          <Button label="Full Width" onPress={() => {}} fullWidth />
        </Section>

        {/* ── Card / Surface ── */}
        <Section title="CARD / SURFACE">
          <Text variant="caption" size="xs" color="muted">Card outlined / filled / elevated</Text>
          <Card variant="outlined" size="md">
            <Text variant="body" size="sm" color="text">Card outlined</Text>
            <Text variant="caption" size="xs" color="muted">Borda visível, sem preenchimento especial</Text>
          </Card>
          <Card variant="filled" size="md">
            <Text variant="body" size="sm" color="text">Card filled</Text>
            <Text variant="caption" size="xs" color="muted">Fundo surfaceVariant</Text>
          </Card>
          <Card variant="elevated" size="md">
            <Text variant="body" size="sm" color="text">Card elevated</Text>
            <Text variant="caption" size="xs" color="muted">Sombra / elevação</Text>
          </Card>
          <Card variant="outlined" size="sm" onPress={() => {}}>
            <Text variant="caption" size="xs" color="primary">Card sm + onPress (pressável)</Text>
          </Card>
          <Text variant="caption" size="xs" color="muted">Surface default / variant</Text>
          <Row>
            <View style={styles.surfaceWrap}>
              <Surface variant="default">
                <View style={styles.surfaceInner}>
                  <Text variant="caption" size="xs" color="text">Surface default</Text>
                </View>
              </Surface>
            </View>
            <View style={styles.surfaceWrap}>
              <Surface variant="variant">
                <View style={styles.surfaceInner}>
                  <Text variant="caption" size="xs" color="text">Surface variant</Text>
                </View>
              </Surface>
            </View>
          </Row>
        </Section>

        {/* ── Tokens ── */}
        <Section title="ESPAÇAMENTO">
          <Row>
            {([4, 8, 16, 24, 32] as const).map((val) => (
              <View key={val} style={styles.spaceChip}>
                <View style={[styles.spaceBar, { width: val, backgroundColor: theme.colors.primary }]} />
                <Text variant="caption" size="xs" color="muted">{val}</Text>
              </View>
            ))}
          </Row>
        </Section>
      </ScrollView>
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
  scroll: {
    padding: spacing.md,
    gap: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  section: { gap: spacing.sm },
  sectionContent: {
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    alignItems: "center",
  },
  colorChip: { alignItems: "center", gap: 4 },
  colorDot: { width: 36, height: 36, borderRadius: radius.sm },
  spaceChip: { alignItems: "center", gap: 4 },
  spaceBar: { height: 8, borderRadius: 2 },
  surfaceWrap: { flex: 1 },
  surfaceInner: { padding: 12 },
});
