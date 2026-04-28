import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { radius } from "@/design-system/tokens/radius";
import { spacing } from "@/design-system/tokens/spacing";

export type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  const { theme } = useTheme();

  const toneStyles: Record<BadgeTone, { bg: string; text: string }> = {
    primary: { bg: theme.colors.primary + "1a", text: theme.colors.primary },
    success: { bg: theme.colors.success + "1a", text: theme.colors.success },
    warning: { bg: theme.colors.warning + "1a", text: theme.colors.warning },
    danger:  { bg: theme.colors.danger  + "1a", text: theme.colors.danger  },
    neutral: { bg: theme.colors.border,          text: theme.colors.muted   },
  };

  const { bg, text } = toneStyles[tone];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text variant="caption" size="xs" weight="semiBold" color="muted">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
});
