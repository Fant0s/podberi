<template>
  <div class="menu-features">
    <div
      v-for="item in features"
      :key="item"
      class="item-feature"
      @click="clickToggle($event)"
    >
      <p class="text">{{ item.feature }}</p>
      <div class="checkbox-toggle">
        <span class="ball"></span>
      </div>
    </div>
    <div
      v-if="$route.name === 'debetovie-karty'"
      class="item-feature"
      @click="clickToggle($event)"
    >
      <p class="text">С процентом на остаток</p>
      <div class="checkbox-toggle">
        <span class="ball"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["feature-return"],
  data() {
    return {
      features: [],
      checkedFeatures: [],
    };
  },
  watch: {
    checkedFeatures: {
      deep: true,
      handler() {
        this.$emit("feature-return", this.checkedFeatures);
      },
    },
  },
  mounted() {
    this.checkPage();
  },
  methods: {
    async checkPage() {
      if (this.$route.name === "kreditnie-karty") {
        await this.$api
          .get("/credit_cards_features")
          .then((response) => {
            this.features = response.data.items;
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (this.$route.name === "debetovie-karty") {
        await this.$api
          .get("/debit_cards_features")
          .then((response) => {
            this.features = response.data.items;
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (this.$route.name === "rko") {
        await this.$api
          .get("/rko_features")
          .then((response) => {
            this.features = response.data.items;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    clickToggle(event) {
      const item = event.target.closest(".item-feature");
      const toggle = item.querySelector(".ball");
      const text = item.querySelector(".text");
      text.classList.toggle("text--on");
      toggle.classList.toggle("ball--on");
      if (!this.checkedFeatures.includes(text.textContent)) {
        this.checkedFeatures.push(text.textContent);
      } else {
        this.checkedFeatures = this.checkedFeatures.filter(
          (item) => item !== text.textContent
        );
      }
    },
    resetFeatures() {
      const menu_features = document.querySelector(".menu-features");
      const items = menu_features.querySelectorAll(".item-feature");
      items.forEach((item) => {
        item.querySelector(".ball").classList.remove("ball--on");
        item.querySelector(".text").classList.remove("text--on");
      });
      this.checkedFeatures = [];
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.menu-features
  display: flex
  flex-direction: column
  gap: 20px
  .item-feature
    display: flex
    flex-direction: row
    justify-content: space-between
    .text
      font-size: 1.125rem
      font-weight: 400
      transition: .3s ease
    .text--on
      color: var(--main-color)
      transition: .3s ease
    .checkbox-toggle
      width: 45px
      height: 25px
      border-radius: 100px
      border: 2px solid var(--ad-color)
      position: relative
      .ball
        position: absolute
        top: 2px
        left: 2px
        right: unset
        display: flex
        border-radius: 50%
        width: 17px
        height: 17px
        background: var(--ad-color)
        transition: .5s ease
      .ball--on
        position: absolute
        left: unset
        transform: translateX(22px)
        background: var(--main-color)
        transition: .5s ease
@media only screen and (max-width: $bp-pc)
  .menu-features
    gap: 15px
    .item-feature
      .text
        font-size: 1rem
@media only screen and (max-width: $bp-tablet)
  .menu-features
    gap: 10px
    .item-feature
      .text
        font-size: 0.875rem
      .checkbox-toggle
        width: 40px
        height: 23px
        border-radius: 100px
        border: 2px solid var(--ad-color)
        position: relative
        .ball
          position: absolute
          top: 2px
          left: 2px
          right: unset
          display: flex
          border-radius: 50%
          width: 15px
          height: 15px
          background: var(--ad-color)
          transition: .5s ease
        .ball--on
          position: absolute
          left: unset
          transform: translateX(19px)
          background: var(--main-color)
          transition: .5s ease
</style>
