<script setup lang="ts">

type GradientVariant = 'blue' | 'purple' | 'green' | 'orange'

interface Props {
  title: string
  description?: string
  buttonText?: string
  buttonTo?: string
  variant?: GradientVariant
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  buttonText: undefined,
  buttonTo: undefined,
  variant: 'blue'
})

const gradientClasses = computed(() => {
  const variants = {
    blue: 'bg-primary',
    purple: 'bg-linear-to-br from-purple-600 via-purple-700 to-purple-800',
    green: 'bg-linear-to-br from-green-600 via-green-700 to-green-800',
    orange: 'bg-linear-to-br from-orange-600 via-orange-700 to-orange-800'
  }
  return variants[props.variant]
})

const descriptionColorClass = computed(() => {
  const colors = {
    blue: 'text-blue-100',
    purple: 'text-purple-100',
    green: 'text-green-100',
    orange: 'text-orange-100'
  }
  return colors[props.variant]
})
</script>

<template>
  <div
    :class="[
      'rounded-2xl p-10 text-center text-white shadow-xl',
      gradientClasses
    ]"
  >
    <h2 class="text-2xl sm:text-3xl font-bold mb-5 leading-tight">
      {{ title }}
    </h2>
    <p v-if="description" :class="['mb-8 max-w-2xl mx-auto text-lg leading-relaxed', descriptionColorClass]">
      {{ description }}
    </p>
    <div v-if="$slots.actions" class="flex flex-wrap justify-center gap-4">
      <slot name="actions" />
    </div>
    <UButton
      v-else-if="buttonText && buttonTo"
      :to="buttonTo"
      size="lg"
      color="neutral"
      variant="solid"
      class="mt-4"
    >
      {{ buttonText }}
    </UButton>
  </div>
</template>
