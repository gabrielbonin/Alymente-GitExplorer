import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";

interface ErrorMessageProps {
  error: unknown;
  onRetry?: () => void;
}

function parseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("rate limit") || msg.includes("403") || msg.includes("429")) {
      return "Limite de requisições atingido. Tente novamente em alguns minutos ou adicione um token no .env.";
    }
    if (msg.includes("network") || msg.includes("fetch") || msg.includes("conexão")) {
      return "Sem conexão com a internet. Verifique sua rede e tente novamente.";
    }
    if (msg.includes("404")) {
      return "Recurso não encontrado.";
    }
    return error.message;
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const { theme } = useTheme();
  const message = parseErrorMessage(error);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.danger + "1a",
            borderColor: theme.colors.danger + "40",
          },
        ]}
      >
        <Text variant="body" size="sm" color="danger" weight="semiBold">
          ⚠️ {message}
        </Text>
      </View>

      {onRetry ? (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.retryBtn, { backgroundColor: theme.colors.primary }]}
          activeOpacity={0.8}
        >
          <Text variant="body" size="sm" weight="semiBold" color="text">
            Tentar novamente
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
    alignItems: "center",
  },
  card: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    width: "100%",
  },
  retryBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
});
