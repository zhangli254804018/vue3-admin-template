<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px;"
    />

    <el-tree
      ref="tree"
      :data="data"
      :default-node-key="defaultNodeKey"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const tree = ref([])
    const state = reactive({
      filterText: '',
      data: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1',
            },
            {
              id: 6,
              label: 'Level two 2-2',
            },
          ],
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1',
            },
            {
              id: 8,
              label: 'Level two 3-2',
            },
          ],
        },
      ],
      defaultNodeKey: {
        childNodes: 'children',
        label: 'label',
      },
    })

    const filterNode = (value, data) => {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }

    watch(
      () => state.filterText,
      (val) => {
        tree.value.filter((node) => {
          return filterNode(val, node)
        })
      },
    )
    return { ...toRefs(state), tree, filterNode }
  },
})
</script>
