<template>
  <div class="w-full h-full flex items-center justify-center p-4 min-h-[200px]">
    <AdSenseAd @ad-status="handleAdStatus" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  adFilled: [filled: boolean]
}>()

const adStatusChecked = ref(false)
const adFilled = ref(false) // Start as false, will be set to true if ad fills

const handleAdStatus = (status: 'filled' | 'unfilled' | 'error') => {
  if (!adStatusChecked.value) {
    adStatusChecked.value = true

    if (status === 'filled') {
      adFilled.value = true
      emit('adFilled', true)
    }
    else {
      // unfilled or error - still emit but don't hide (parent handles visibility)
      adFilled.value = false
      emit('adFilled', false)
    }
  }
}
</script>
