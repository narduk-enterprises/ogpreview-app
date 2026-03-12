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

const isOpen = ref(false)
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

<template>
  <UModal
    v-model:open="isOpen"
    title="Edit Open Graph Details"
    description="Customize your Open Graph meta tags for optimal social media sharing"
    :ui="{
      body: 'p-6',
      content: 'sm:max-w-2xl md:max-w-3xl'
    }"
    scrollable
  >
    <UButton
      label="Edit"
      color="neutral"
      variant="outline"
      icon="i-lucide-edit-3"
      size="md"
      class="shadow-md hover:shadow-lg transition-all duration-200 font-semibold border-2 hover:scale-105"
    />

    <template #body>
      <!-- eslint-disable narduk/no-native-form -- Semantic HTML form element required for @submit.prevent event handling and native form accessibility semantics -->
      <form
        class="space-y-6"
        @submit.prevent
      >
        <!-- Basic Fields Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-primary dark:text-primary">
              Basic Information
            </h3>
            <UBadge
              color="primary"
              variant="subtle"
              label="Required"
            />
          </div>

          <UFormField
            label="Title"
            name="title"
            required
          >
            <UInput
              v-model="localData.title"
              :disabled="isLoading"
              placeholder="Enter your title"
              size="lg"
              variant="outline"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Description"
            name="description"
            required
          >
            <UTextarea
              v-model="localData.description"
              :disabled="isLoading"
              :rows="4"
              placeholder="Enter your description"
              size="lg"
              variant="outline"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Image URL"
            name="image"
            required
          >
            <UInput
              v-model="localData.image"
              type="url"
              :disabled="isLoading"
              placeholder="https://example.com/image.jpg"
              size="lg"
              variant="outline"
              icon="i-lucide-image"
              class="w-full"
            />
          </UFormField>
        </div>

        <USeparator />

        <!-- Advanced Options Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-primary dark:text-primary">
              Advanced Options
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              :trailing-icon="showAdvanced ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
              :label="showAdvanced ? 'Hide' : 'Show'"
              @click="showAdvanced = !showAdvanced"
            />
          </div>

          <div
            v-show="showAdvanced"
            class="space-y-4"
          >
            <UFormField
              label="Site Name"
              name="siteName"
            >
              <UInput
                v-model="localData.siteName"
                placeholder="Your Site Name"
                size="lg"
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
                size="lg"
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
                size="lg"
                variant="outline"
                class="w-full"
              />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField
                label="Image Width"
                name="imageWidth"
              >
                <UInput
                  v-model="localData.imageWidth"
                  placeholder="1200"
                  size="lg"
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
                  size="lg"
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
                size="lg"
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
                size="lg"
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
                size="lg"
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
                <ul class="text-sm space-y-1 mt-2">
                  <li><strong>Facebook/LinkedIn:</strong> 1200 x 630 px (1.91:1)</li>
                  <li><strong>Twitter:</strong> 1200 x 600 px (2:1)</li>
                  <li><strong>General:</strong> Min 600 x 315 px, Max 5MB</li>
                  <li><strong>Format:</strong> JPG, PNG, WebP, GIF</li>
                </ul>
              </template>
            </UAlert>
          </div>
        </div>
      </form>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-between w-full">
        <UButton
          color="error"
          variant="ghost"
          size="md"
          label="Reset All"
          icon="i-lucide-rotate-ccw"
          @click="$emit('reset')"
        />
        <div class="flex gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="outline"
            @click="close"
          />
          <UButton
            label="Save Changes"
            color="primary"
            variant="solid"
            icon="i-lucide-save"
            @click="close"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
