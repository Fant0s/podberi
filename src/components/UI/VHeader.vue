<template>
  <header
    v-if="$route.name === 'tekhnicheskie-raboty'"
    id="header"
    :class="{
      tech: $route.name === 'tekhnicheskie-raboty',
    }"
  >
    <div class="content">
      <router-link to="/" class="logo center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Subtract"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.10638 0C2.28621 0 0 2.28621 0 5.10638V30.8936C0 33.7138 2.28621 36 5.10638 36H30.8936C33.7138 36 36 33.7138 36 30.8936V5.10638C36 2.28621 33.7138 0 30.8936 0H5.10638ZM9.06383 9.00261V17.9899V24.2914C9.06383 25.9571 9.89838 27.5127 11.2878 28.4367L18.0535 32.9362L24.7387 28.4367C26.1116 27.5127 26.9362 25.9571 26.9362 24.2914V17.9899L18.0535 23.9684L9.06383 17.9899L15.8438 13.4146C17.225 12.4826 18.0535 10.9207 18.0535 9.24907V2.93617L9.06383 9.00261ZM23.458 17.3448C25.379 17.3448 26.9362 15.7802 26.9362 13.8502C26.9362 11.9201 25.379 10.3555 23.458 10.3555C21.5371 10.3555 19.9799 11.9201 19.9799 13.8502C19.9799 15.7802 21.5371 17.3448 23.458 17.3448Z"
            fill="var(--main-color)"
          />
        </svg>
        <p class="text">Подбери Ру</p>
      </router-link>
    </div>
  </header>
  <header
    v-else
    id="header"
    :class="{
      'blue-bg':
        $route.name === 'kreditnie-karty' ||
        $route.name === 'debetovie-karty' ||
        $route.name === 'zaimy' ||
        $route.name === 'blog',
      'black-bg': $route.name === 'rko',
    }"
  >
    <div class="content">
      <router-link to="/" class="logo center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Subtract"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.10638 0C2.28621 0 0 2.28621 0 5.10638V30.8936C0 33.7138 2.28621 36 5.10638 36H30.8936C33.7138 36 36 33.7138 36 30.8936V5.10638C36 2.28621 33.7138 0 30.8936 0H5.10638ZM9.06383 9.00261V17.9899V24.2914C9.06383 25.9571 9.89838 27.5127 11.2878 28.4367L18.0535 32.9362L24.7387 28.4367C26.1116 27.5127 26.9362 25.9571 26.9362 24.2914V17.9899L18.0535 23.9684L9.06383 17.9899L15.8438 13.4146C17.225 12.4826 18.0535 10.9207 18.0535 9.24907V2.93617L9.06383 9.00261ZM23.458 17.3448C25.379 17.3448 26.9362 15.7802 26.9362 13.8502C26.9362 11.9201 25.379 10.3555 23.458 10.3555C21.5371 10.3555 19.9799 11.9201 19.9799 13.8502C19.9799 15.7802 21.5371 17.3448 23.458 17.3448Z"
            fill="var(--main-color)"
          />
        </svg>
        <p class="text">Подбери Ру</p>
      </router-link>
      <VNav />
      <!--      <button-->
      <!--        style="-->
      <!--          background: var(&#45;&#45;main-color);-->
      <!--          color: white;-->
      <!--          border: 1px solid #fb5607;-->
      <!--        "-->
      <!--        @click="vkID"-->
      <!--      >-->
      <!--        VK ID-->
      <!--      </button>-->
      <svg
        v-if="showMenu === false"
        class="burger"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        @click="toggleMenu"
      >
        <path
          d="M32.4001 28.8H3.6001M32.4001 18H3.6001M32.4001 7.20001H3.6001"
          stroke="var(--black-color)"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      <svg
        v-if="showMenu === true"
        class="close-burger"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        @click="toggleMenu"
      >
        <path
          d="M28.5 7.5L7.5 28.5M28.5 28.5L7.5 7.5"
          stroke="var(--black-color)"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <div v-if="showMenu" class="menu">
        <VNav class="menu-nav" @close-menu="closeMenu" />
      </div>
    </div>
  </header>
</template>

<script>
import VNav from "@/components/UI/VNav.vue";

export default {
  components: { VNav },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    vkID() {
      window.location.assign(
        "https://id.vk.com/auth?uuid=2281488&app_id=51845860&response_type=silent_token&redirect_uri=https://test.podberiru.ru/auth/vk"
      );
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
      const header = document.getElementById("header");
      if (this.showMenu) {
        document.documentElement.style.overflowY = "hidden";
        header.classList.remove("blue-bg");
        header.classList.remove("black-bg");
      } else {
        document.documentElement.style.overflowY = "auto";
        if (
          this.$route.name === "kreditnie-karty" ||
          this.$route.name === "debetovie-karty" ||
          this.$route.name === "zaimy" ||
          this.$route.name === "blog"
        ) {
          header.classList.add("blue-bg");
        } else if (this.$route.name === "rko") {
          header.classList.add("black-bg");
        }
      }
    },
    closeMenu() {
      this.showMenu = false;
      const header = document.getElementById("header");
      if (
        this.$route.name === "kreditnie-karty" ||
        this.$route.name === "debetovie-karty" ||
        this.$route.name === "zaimy" ||
        this.$route.name === "blog"
      ) {
        header.classList.add("blue-bg");
      } else if (this.$route.name === "rko") {
        header.classList.add("black-bg");
      }
      document.documentElement.style.overflowY = "auto";
    },
  },
};
</script>

<style lang="sass">
@import '@/assets/styles/base/adaptive'

#header
  .content
    display: flex
    align-items: center
    position: relative
    padding-top: 20px
    padding-bottom: 20px
    justify-content: space-between
    .logo
      .text
        margin-left: 15px
        font-size: 1.25rem
        font-weight: 500
    .burger, .close-burger
      display: none
#header.blue-bg
  background: var(--main-color)
  .content
    .logo
      .text
        color: var(--white-color)
      svg
        path
          fill: var(--white-color)
    .nav
      .link
        color: var(--white-color)
        &:hover
          color: var(--gray-color)
    .burger
      transition: .3s ease
      path
        stroke: var(--white-color)
      &:hover
        transition: .3s ease
        path
          stroke: var(--gray-color)
    .close-burger
      transition: .3s ease
      path
        stroke: var(--white-color)
      &:hover
        transition: .3s ease
        path
          stroke: var(--gray-color)
#header.black-bg
  background: var(--black-color)
  .content
    .logo
      .text
        color: var(--white-color)
      svg
        path
          fill: var(--white-color)
    .nav
      .link
        color: var(--white-color)
        &:hover
          color: var(--gray-color)
    .burger
      transition: .3s ease
      path
        stroke: var(--white-color)
      &:hover
        transition: .3s ease
        path
          stroke: var(--gray-color)
    .close-burger
      transition: .3s ease
      path
        stroke: var(--white-color)
      &:hover
        transition: .3s ease
        path
          stroke: var(--gray-color)
#header.tech
  .content
    justify-content: center
@media only screen and (max-width: $bp-pc)
  #header
    .content
      .logo
        svg
          width: 30px
        .text
          font-size: 1.125rem
          margin-left: 10px
@media only screen and (max-width: $bp-tablet-landscape-up)
  #header
    .content
      .nav
        display: none
      .burger, .close-burger
        display: flex
      .burger
        transition: .3s ease
        &:hover
          height: 30px
          transition: .3s ease
          path
            stroke: var(--main-color)
      .close-burger
        transition: .3s ease
        &:hover
          transform: rotate(15deg)
          transition: .3s ease
          path
            stroke: var(--main-color)
      .logo
        svg
          width: 30px
        .text
          font-size: 1.125rem
          margin-left: 10px
      .menu
        background: var(--white-color)
        position: absolute
        z-index: 100
        width: 100%
        height: calc(100svh - 76px)
        top: 100%
        left: 0
        display: flex
        justify-content: center
        align-items: center
        .menu-nav
          display: flex
          flex-direction: column
          margin-bottom: 10%
@media only screen and (max-width: $bp-tablet)
  #header
    .content
      padding: 20px 15px
      .logo
        svg
          width: 30px
        .text
          font-size: 1rem
      .menu
        .menu-nav
          grid-gap: 20px
</style>
