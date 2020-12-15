<!--
 * @Author: your name
 * @Date: 2020-12-03 22:23:23
 * @LastEditTime: 2020-12-15 23:57:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /out/vue3-admin-template/src/views/Home.vue
-->
<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        {{ state.a }}
        <button @click="increment">加一</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { reactive, onMounted } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
export default defineComponent({
    setup() {
        const state = reactive({
            a: 0
        });
        function increment() {
            state.a++;
        }
        onMounted(() => {
            console.log('mounted!');
        });
        return {
            state,
            increment
        };
    },
    components: {
        HelloWorld
    }
})
</script>
