// Necessary: Nuxt UI rule normalizes native <ul> to UL and flags it; custom components UrlHistoryModal/UrlHistoryQuick are flagged due to U prefix.
export default [
  {
    files: ['**/*.vue'],
    rules: {
      'narduk/no-unknown-nuxt-ui-component': [
        'error',
        { additionalComponents: ['UL', 'UrlHistoryModal', 'UrlHistoryQuick'] },
      ],
    },
  },
]
