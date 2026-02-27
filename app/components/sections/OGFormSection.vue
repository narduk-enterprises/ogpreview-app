<template>
  <UCard :ui="{ body: 'p-6' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
          Additional Details
        </h2>
        <UButton
          color="primary"
          variant="link"
          size="sm"
          :trailing-icon="showAdvanced ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          :label="showAdvanced ? 'Hide Advanced' : 'Show Advanced'"
          @click="showAdvanced = !showAdvanced"
        />
      </div>
    </template>

    <form
      class="space-y-4"
      @submit.prevent
    >
      <!-- Basic Fields -->
      <UFormField
        label="Title"
        name="title"
      >
        <UInput
          v-model="localData.title"
          :disabled="isLoading"
          placeholder="Enter your title"
          size="md"
          variant="outline"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Description"
        name="description"
      >
        <UTextarea
          v-model="localData.description"
          :disabled="isLoading"
          :rows="3"
          placeholder="Enter your description"
          size="md"
          variant="outline"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Image URL"
        name="image"
      >
        <UInput
          v-model="localData.image"
          type="url"
          :disabled="isLoading"
          placeholder="https://example.com/image.jpg"
          size="md"
          variant="outline"
          leading-icon="i-lucide-image"
          class="w-full"
        />
      </UFormField>

      <!-- Advanced Options -->
      <div
        v-show="showAdvanced"
        class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <UFormField
          label="Site Name"
          name="siteName"
        >
          <UInput
            v-model="localData.siteName"
            placeholder="Your Site Name"
            size="md"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Type"
          name="type"
        >
          <USelect
            v-model="localData.type"
            size="md"
            :options="typeOptions"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Image Alt Text"
          name="imageAlt"
        >
          <UInput
            v-model="localData.imageAlt"
            placeholder="Describe your image for accessibility"
            size="md"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-3">
          <UFormField
            label="Image Width"
            name="imageWidth"
          >
            <UInput
              v-model="localData.imageWidth"
              placeholder="1200"
              size="md"
              variant="outline"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Image Height"
            name="imageHeight"
          >
            <UInput
              v-model="localData.imageHeight"
              placeholder="630"
              size="md"
              variant="outline"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          label="Locale"
          name="locale"
        >
          <UInput
            v-model="localData.locale"
            placeholder="en_US"
            size="md"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Author (for articles)"
          name="author"
        >
          <UInput
            v-model="localData.author"
            placeholder="Author name"
            size="md"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Twitter Card Type"
          name="twitterCard"
        >
          <USelect
            v-model="localData.twitterCard"
            size="md"
            :options="twitterCardOptions"
            class="w-full"
          />
        </UFormField>

        <!-- Image Dimensions Info -->
        <UAlert
          color="info"
          variant="soft"
          icon="i-lucide-info"
          title="Recommended Image Dimensions"
        >
          <template #description>
            <ul class="text-xs space-y-1 mt-2">
              <li><strong>Facebook/LinkedIn:</strong> 1200 x 630 px (1.91:1)</li>
              <li><strong>Twitter:</strong> 1200 x 600 px (2:1)</li>
              <li><strong>General:</strong> Min 600 x 315 px, Max 5MB</li>
              <li><strong>Format:</strong> JPG, PNG, WebP, GIF</li>
            </ul>
          </template>
        </UAlert>
      </div>

      <!-- Reset Button -->
      <div class="pt-4">
        <UButton
          color="neutral"
          variant="soft"
          size="md"
          label="Reset All"
          icon="i-lucide-rotate-ccw"
          block
          @click="$emit('reset')"
        />
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
import type { OGData } from '~~/types/og'

interface Props {
  modelValue: OGData
  isLoading?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: OGData): void
  (e: 'reset'): void
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})

const emit = defineEmits<Emits>()

const showAdvanced = ref(false)

const localData = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const typeOptions = [
  { value: 'website', label: 'Website' },
  { value: 'article', label: 'Article' },
  { value: 'product', label: 'Product' },
  { value: 'video', label: 'Video' }
]

const twitterCardOptions = [
  { value: 'summary', label: 'Summary' },
  { value: 'summary_large_image', label: 'Summary Large Image' },
  { value: 'app', label: 'App' },
  { value: 'player', label: 'Player' }
]
</script>
