import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { radius } from "@/design-system/tokens/radius";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  initial?: string;
  uri?: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, number> = { sm: 28, md: 36, lg: 48 };

export function Avatar({ initial, uri, size = "md" }: AvatarProps) {
  const { theme } = useTheme();
  const dim = sizeMap[size];

  const containerStyle = {
    width:  dim,
    height: dim,
    borderRadius: radius.md,
    backgroundColor: theme.colors.primary,
    alignItems:      "center"  as const,
    justifyContent:  "center"  as const,
    overflow:        "hidden"  as const,
  };

  if (uri) {
    return (
      <View style={containerStyle}>
        <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Text variant="body" weight="bold" color="text" size={size === "lg" ? "lg" : "md"}>
        {(initial ?? "?").charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}
