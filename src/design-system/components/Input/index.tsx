import React, { forwardRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { fontFamily, fontSize } from "@/design-system/tokens/typography";
import { radius } from "@/design-system/tokens/radius";
import { spacing } from "@/design-system/tokens/spacing";

/**
 * tone="default"  → superfície branca + borda + texto escuro (formulários padrão)
 * tone="inverted" → fundo semitransparente branco (#ffffff1a) + texto branco
 *                   para uso sobre headers coloridos (ex: SearchBar no header verde)
 */
type InputTone = "default" | "inverted";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  tone?: InputTone;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      tone = "default",
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();

    const isInverted = tone === "inverted";

    const rowStyle = isInverted
      ? {
          backgroundColor: "rgba(255,255,255,0.1)",
          borderWidth: 0,
          borderRadius: radius.full,
        }
      : {
          backgroundColor: theme.colors.surface,
          borderColor: error ? theme.colors.danger : theme.colors.border,
          borderWidth: 1,
          borderRadius: radius.lg,
        };

    const textColor = isInverted ? "#ffffff" : theme.colors.text;
    const placeholderColor = isInverted
      ? "rgba(255,255,255,0.5)"
      : theme.colors.muted;

    return (
      <View style={styles.wrapper}>
        {label ? (
          <Text variant="caption" weight="semiBold" color="textSecondary" size="sm">
            {label}
          </Text>
        ) : null}

        <View style={[styles.inputRow, rowStyle]}>
          {leftIcon ? (
            <View style={styles.iconSlot}>{leftIcon}</View>
          ) : null}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                color: textColor,
                fontFamily: fontFamily.regular,
                fontSize: fontSize.md,
                flex: 1,
              },
            ]}
            placeholderTextColor={placeholderColor}
            {...rest}
          />

          {rightIcon ? (
            <TouchableOpacity
              style={styles.iconSlot}
              onPress={onRightIconPress}
              activeOpacity={0.7}
              disabled={!onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          ) : null}
        </View>

        {error ? (
          <Text variant="caption" color="danger" size="xs">
            {error}
          </Text>
        ) : helperText ? (
          <Text variant="caption" color="muted" size="xs">
            {helperText}
          </Text>
        ) : null}
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: spacing.md,
  },
  iconSlot: {
    marginRight: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 0,
  },
});
