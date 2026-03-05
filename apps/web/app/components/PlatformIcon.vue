<script setup lang="ts">
/* eslint-disable atx/no-inline-hex, atx/lucide-icons-only */
interface Props {
  platform: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const platformConfig: Record<string, { icon: string; color: string }> = {
  facebook: { icon: 'i-simple-icons-facebook', color: '#1877F2' },
  twitter: { icon: 'i-simple-icons-x', color: '#000000' },
  linkedin: { icon: 'i-simple-icons-linkedin', color: '#0A66C2' },
  slack: { icon: 'i-simple-icons-slack', color: '#4A154B' },
  discord: { icon: 'i-simple-icons-discord', color: '#5865F2' },
  whatsapp: { icon: 'i-simple-icons-whatsapp', color: '#25D366' },
  telegram: { icon: 'i-simple-icons-telegram', color: '#26A5E4' },
  imessage: { icon: 'i-simple-icons-imessage', color: '#007AFF' },
  meta: { icon: 'i-simple-icons-meta', color: '#0866FF' },
};

const normalizedPlatform = props.platform.toLowerCase().replaceAll(/\s+/g, '');
const config = platformConfig[normalizedPlatform] || {
  icon: 'i-lucide-globe-alt',
  color: '#6B7280',
};

const iconName = computed(() => config.icon);
const brandColor = computed(() => config.color);

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  return sizes[props.size];
});
</script>

<template>
  <UIcon
    :name="iconName"
    :class="['shrink-0 dark:brightness-[1.2]', sizeClass]"
    :style="{ color: brandColor }"
  />
</template>
