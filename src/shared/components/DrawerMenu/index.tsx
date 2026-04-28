import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/design-system/components/Text";
import { useTheme } from "@/design-system/theme";
import { spacing } from "@/design-system/tokens/spacing";
import { radius } from "@/design-system/tokens/radius";

const DRAWER_WIDTH = 300;
const ANIM_DURATION = 260;

interface MenuItem {
  icon: string;
  label: string;
  onPress: () => void;
}

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
}

// ── HamburgerIcon ─────────────────────────────────────────────────────────────
export function HamburgerIcon({ color }: { color: string }) {
  const barStyle = [styles.bar, { backgroundColor: color }];
  return (
    <View style={styles.hamburger}>
      <View style={barStyle} />
      <View style={barStyle} />
      <View style={barStyle} />
    </View>
  );
}

// ── DrawerMenu ────────────────────────────────────────────────────────────────
export function DrawerMenu({ visible, onClose, items }: DrawerMenuProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateX, overlayOpacity]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Overlay escurecido — toque fecha o drawer */}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
      </Animated.View>

      {/* Painel deslizante */}
      <Animated.View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.surface,
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + spacing.lg,
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Cabeçalho do drawer */}
        <View style={[styles.drawerHeader, { borderBottomColor: theme.colors.border }]}>
          <View style={[styles.appIconCircle, { backgroundColor: theme.colors.primary }]}>
            <Text variant="heading" size="lg" weight="extraBold" color="onPrimary">G</Text>
          </View>
          <View>
            <Text variant="heading" size="lg" weight="extraBold" color="text">
              GitExplorer
            </Text>
            <Text variant="caption" size="xs" color="muted">
              GitHub Repository Browser
            </Text>
          </View>
        </View>

        {/* Itens de menu */}
        <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
          {items.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
              onPress={() => { onClose(); item.onPress(); }}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.colors.primary + "1a" }]}>
                <Text variant="body" size="md" color="primary">{item.icon}</Text>
              </View>
              <Text variant="body" size="md" weight="semiBold" color="text">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sobre o Desenvolvedor */}
        <View style={[styles.devSection, { borderTopColor: theme.colors.border }]}>
          <Text variant="caption" size="xs" weight="bold" color="muted">
            SOBRE O DESENVOLVEDOR
          </Text>

          <View style={styles.devCard}>
            <View style={[styles.devAvatar, { backgroundColor: theme.colors.primary }]}>
              <Text variant="heading" size="md" weight="extraBold" color="onPrimary">GB</Text>
            </View>
            <View style={styles.devInfo}>
              <Text variant="body" size="sm" weight="bold" color="text">
                Gabriel Bonin
              </Text>
              <Text variant="caption" size="xs" color="muted">
                Mobile Developer · React Native
              </Text>
            </View>
          </View>

          <View style={styles.devLinks}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://github.com/gabrielbonin")}
              activeOpacity={0.7}
              style={[styles.devLink, { backgroundColor: theme.colors.surfaceVariant }]}
            >
              <Text variant="caption" size="xs" weight="semiBold" color="primary">
                GitHub
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://linkedin.com/in/gabrielbonin")}
              activeOpacity={0.7}
              style={[styles.devLink, { backgroundColor: theme.colors.surfaceVariant }]}
            >
              <Text variant="caption" size="xs" weight="semiBold" color="primary">
                LinkedIn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://wa.me/5519992112018")}
              activeOpacity={0.7}
              style={[styles.devLink, { backgroundColor: "#25D36620" }]}
            >
              <Text variant="caption" size="xs" weight="semiBold" color="success">
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>

          {/* Meus Apps */}
          <Text variant="caption" size="xs" weight="bold" color="muted">
            MEUS APPS
          </Text>
          <View style={styles.devLinks}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.nup&hl=pt_BR"
                )
              }
              activeOpacity={0.7}
              style={[styles.devLink, styles.appLink, { borderColor: theme.colors.border }]}
            >
              <Text variant="caption" size="xs" weight="semiBold" color="text">
                📱 NUP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=br.com.futebolsociety&hl=pt_BR"
                )
              }
              activeOpacity={0.7}
              style={[styles.devLink, styles.appLink, { borderColor: theme.colors.border }]}
            >
              <Text variant="caption" size="xs" weight="semiBold" color="text">
                ⚽ Futebol Society
              </Text>
            </TouchableOpacity>
          </View>

          <Text variant="caption" size="xs" color="muted">
            Feito com React Native · Expo · TanStack Query
          </Text>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Hamburger icon
  hamburger: { gap: 5, padding: spacing.xs },
  bar: { width: 22, height: 2, borderRadius: 1 },

  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  // Panel
  panel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },

  // Drawer header
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    marginBottom: spacing.sm,
  },
  appIconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  // Menu items
  menuList: { flex: 1 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  // Dev section
  devSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    gap: spacing.sm,
  },
  devCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  devAvatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  devInfo: { gap: 2 },
  devLinks: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  devLink: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  appLink: {
    borderWidth: 1,
  },
});
