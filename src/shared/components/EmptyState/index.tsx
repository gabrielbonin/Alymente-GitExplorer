import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/design-system/components/Text";
import { spacing } from "@/design-system/tokens/spacing";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text variant="heading" size="lg" color="muted" weight="bold">
        {title}
      </Text>
      {description ? (
        <Text variant="body" size="sm" color="muted">
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm,
  },
});
