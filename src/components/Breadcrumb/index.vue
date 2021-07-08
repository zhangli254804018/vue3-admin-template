<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { defineComponent, reactive, watch, toRefs } from 'vue'
import { useRoute, useRouter, RouteRecord, RouteLocationMatched } from 'vue-router'
import pathToRegexp from 'path-to-regexp'

export default defineComponent({
//   setup() {
//     const route = useRoute()
//     const router = useRouter()

  //     const state = reactive({
  //       levelList: [] as RouteRecord[],
  //     })

  //     const getBreadcrumb = () => {
  //       // only show routes with meta.title
  //       let matched: RouteLocationMatched[] = route.matched.filter((item) => item.meta && item.meta.title)
  //       const first = matched[0]
  //       // if (!isDashboard(first)) {
  //       //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(
  //       //     matched
  //       //   )
  //       // }
  //       state.levelList = matched.filter(
  //         (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  //       )
  //     }

  //     getBreadcrumb()

  //     const isDashboard = (route) => {
  //       const name = route && route.name
  //       if (!name) {
  //         return false
  //       }
  //       return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
  //     }

  //     const pathCompile = (path) => {
  //       // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  //       const { params } = route
  //       var toPath = pathToRegexp.compile(path)
  //       return toPath(params)
  //     }

  //     const handleLink = (item) => {
  //       const { redirect, path } = item
  //       if (redirect) {
  //         router.push(redirect)
  //         return
  //       }
  //       router.push(pathCompile(path))
  //     }

  //     watch(route, () => {
  //       getBreadcrumb()
  //     })

  //     return { ...toRefs(state), handleLink }
  //   },
  data() {
    return {
      levelList: [],
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        // todo
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
  },
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
