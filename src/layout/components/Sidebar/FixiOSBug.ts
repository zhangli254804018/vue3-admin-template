import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const device = computed(() => store.state.app.device)

    const subMenu = ref(null)

    function fixBugIniOS() {
      const $subMenu: any = subMenu.value
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e: MouseEvent) => {
          if (device.value === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }

    return { device, subMenu, fixBugIniOS }
  },
})
