import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";

// ── Surface ───────────────────────────────────────────────────────────────────
// Base para qualquer container elevado — sem padding próprio, sem borda forçada.
// Use quando precisar apenas do background + sombra.

interface SurfaceProps {
  children: React.ReactNode;
  variant?: "default" | "variant"; // default = surface, variant = surfaceVariant
}

export function Surface({ children, variant = "default" }: SurfaceProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.surface,
        {
          backgroundColor:
            variant === "variant"
              ? theme.colors.surfaceVariant
              : theme.colors.surface,
        },
      ]}
    >
      {children}
    </View>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
// Container com padding, borda e cantos arredondados.
// Suporta variante pressável (onPress).

type CardSize = "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  size?: CardSize;
  onPress?: () => void;
  variant?: "outlined" | "filled" | "elevated";
}

const paddingMap: Record<CardSize, number> = {
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

export function Card({ children, size = "md", onPress, variant = "outlined" }: CardProps) {
  const { theme } = useTheme();

  const variantStyle = {
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
    filled: {
      backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 0,
      borderColor: "transparent",
      shadowOpacity: 0,
      elevation: 0,
    },
    elevated: {
      backgroundColor: theme.colors.surface,
      borderWidth: 0,
      borderColor: "transparent",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
  }[variant];

  const inner = (
    <View
      style={[
        styles.card,
        { padding: paddingMap[size], borderRadius: radius.md },
        variantStyle,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
        {inner}
      </TouchableOpacity>
    );
  }

  return inner;
}

const styles = StyleSheet.create({
  surface: {
    borderRadius: radius.md,
  },
  card: {
    // base — sobrescrito por variantStyle acima
  },
});
