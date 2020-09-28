<template>
  <div id="app">
    <layout v-if="!$route.meta.layoutShow">
      <template slot="layoutContent">
        <router-view />
      </template>
    </layout>
    <router-view v-if="$route.meta.layoutShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '@/components/layout/Layout.vue';

@Component({
  components: {
    Layout,
  },
})
export default class App extends Vue {

}

</script>

<style lang="less">
body {
  background-color: #f0f2f5;
}
</style>
