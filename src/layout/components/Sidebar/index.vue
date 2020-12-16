<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variableSty.menuBg"
        :text-color="variableSty.menuText"
        :unique-opened="false"
        :active-text-color="variableSty.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  components: { SidebarItem, Logo },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const routes = computed(() => {
      return router.options.routes
    })

    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    const showLogo = computed(() => {
      return store.state.settings.sidebarLogo
    })

    const variableSty = computed(() => {
      return variables
    })

    const isCollapse = computed(() => {
      return !store.getters.sidebar.opened
    })

    return { routes, activeMenu, showLogo, variableSty, isCollapse }
  },
})
</script>
