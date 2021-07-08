<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { to } = toRefs(props)
    const isExternalLink = computed(() => {
      return isExternal(to.value)
    })

    const type = computed(() => {
      if (isExternalLink.value) {
        return 'a'
      }
      return 'router-link'
    })

    const linkProps = () => {
      if (isExternalLink.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener',
        }
      }
      return {
        to: to,
      }
    }

    return { type, linkProps }
  },
})
</script>
