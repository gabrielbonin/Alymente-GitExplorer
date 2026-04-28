import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import { useTheme } from "@/design-system/theme";
import { fontFamily, fontSize } from "@/design-system/tokens/typography";

type Variant = "heading" | "body" | "caption";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type Weight = "regular" | "semiBold" | "bold" | "extraBold";
type ColorToken =
  | "text"
  | "textSecondary"
  | "muted"
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "onPrimary"
  | "onPrimaryMuted";

interface TextComponentProps
  extends Omit<RNTextProps, "style"> {
  variant?: Variant;
  size?: Size;
  weight?: Weight;
  color?: ColorToken;
  children: React.ReactNode;
}

const variantDefaults: Record<Variant, { size: Size; weight: Weight }> = {
  heading:  { size: "xl",  weight: "extraBold" },
  body:     { size: "md",  weight: "regular"   },
  caption:  { size: "sm",  weight: "regular"   },
};

export function Text({
  variant = "body",
  size,
  weight,
  color = "text",
  children,
  ...rest
}: TextComponentProps) {
  const { theme } = useTheme();

  const resolvedSize   = size   ?? variantDefaults[variant].size;
  const resolvedWeight = weight ?? variantDefaults[variant].weight;

  const style = StyleSheet.create({
    base: {
      fontFamily: fontFamily[resolvedWeight],
      fontSize:   fontSize[resolvedSize],
      color:      (theme.colors as Record<string, string>)[color] ?? theme.colors.text,
    },
  });

  return (
    <RNText style={style.base} {...rest}>
      {children}
    </RNText>
  );
}
