<template>
  <Head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" href="/favicon.png" />
    <meta name="yandex-verification" content="79ac8339bf362db1" />
  </Head>
  <VHeader />
  <router-view></router-view>
  <VFooter />
</template>

<script>
import VHeader from "@/components/UI/VHeader.vue";
import VFooter from "@/components/UI/VFooter.vue";
import { Head } from "@vueuse/head";

export default {
  components: {
    Head,
    VFooter,
    VHeader,
  },
  data() {
    return {
      payload: {},
    };
  },
  mounted() {},
};
</script>
<style lang="sass">
#app
</style>
