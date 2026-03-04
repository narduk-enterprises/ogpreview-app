export const usePreviewPlatforms = () => {
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: 'i-lucide-facebook' },
    { id: 'twitter', name: 'Twitter', icon: 'i-lucide-twitter' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'i-lucide-linkedin' },
    { id: 'slack', name: 'Slack', icon: 'i-lucide-slack' },
    { id: 'discord', name: 'Discord', icon: 'i-lucide-message-circle' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'i-lucide-message-circle' },
    { id: 'telegram', name: 'Telegram', icon: 'i-lucide-send' },
    { id: 'imessage', name: 'iMessage', icon: 'i-lucide-message-square' }
  ] as const

  const activePlatform = ref('facebook')

  const setActivePlatform = (platformId: string) => {
    activePlatform.value = platformId
  }

  return {
    platforms,
    activePlatform,
    setActivePlatform
  }
}
