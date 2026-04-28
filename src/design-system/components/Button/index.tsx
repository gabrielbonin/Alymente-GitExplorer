import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { radius } from "@/design-system/tokens/radius";
import { spacing } from "@/design-system/tokens/spacing";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const heightMap: Record<ButtonSize, number> = { sm: 36, md: 44, lg: 52 };
const paddingMap: Record<ButtonSize, number> = { sm: spacing.md, md: spacing.lg, lg: spacing.lg };
const fontSizeMap: Record<ButtonSize, "sm" | "md" | "lg"> = { sm: "sm", md: "md", lg: "md" };

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  fullWidth = false,
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  const variantStyle = {
    primary: {
      backgroundColor: isDisabled ? theme.colors.muted : theme.colors.primary,
      borderWidth: 0,
      borderColor: "transparent",
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: isDisabled ? theme.colors.muted : theme.colors.primary,
    },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 0,
      borderColor: "transparent",
    },
  }[variant];

  const labelColor = {
    primary: "onPrimary" as const,
    outline: isDisabled ? "muted" as const : "primary" as const,
    ghost:   isDisabled ? "muted" as const : "primary" as const,
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        {
          height: heightMap[size],
          paddingHorizontal: paddingMap[size],
          borderRadius: radius.full,
          ...variantStyle,
        },
        fullWidth && styles.fullWidth,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#ffffff" : theme.colors.primary}
        />
      ) : (
        <View style={styles.inner}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text
            variant="body"
            size={fontSizeMap[size]}
            weight="bold"
            color={labelColor}
          >
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
