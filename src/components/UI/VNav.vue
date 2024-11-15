<template>
  <nav class="nav">
    <router-link to="/kreditnie-karty" class="link" @click="closeMenu"
      >Кредитные карты</router-link
    >
    <router-link to="/debetovie-karty" class="link" @click="closeMenu"
      >Дебетовые карты</router-link
    >
    <router-link to="/zaimy" class="link" @click="closeMenu">Займы</router-link>
    <router-link to="/rko" class="link" @click="closeMenu"
      >Счета для бизнеса</router-link
    >
    <!--    <router-link to="/blog" class="link" @click="closeMenu">Блог</router-link>-->
    <router-link v-if="isFooter === true" to="/policy" class="link policy"
      >Пользовательское соглашение</router-link
    >
  </nav>
</template>

<script>
export default {
  props: {
    isFooter: { type: Boolean },
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>

<style lang="sass">
@import '@/assets/styles/base/adaptive'
.nav
  display: flex
  grid-gap: 30px
  align-items: center
  .link
    font-size: 0.875rem
    font-weight: 400
    transition: .3s ease
    &:hover
      color: var(--main-color)
      transition: .3s ease
</style>
