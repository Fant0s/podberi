<template>
  <section class="best-offers content">
    <h2 v-if="$route.name === 'home'" class="h2">Лучшие предложения для вас</h2>
    <h2
      v-else-if="
        $route.name === 'kreditnie-karty' || $route.name === 'credit-card'
      "
      class="h2"
    >
      Лучшие кредитные карты
    </h2>
    <h2
      v-else-if="
        $route.name === 'debetovie-karty' || $route.name === 'debit-card'
      "
      class="h2"
    >
      Лучшие дебетовые карты
    </h2>
    <h2 v-else-if="$route.name === 'zaimy'" class="h2">Лучшие займы</h2>
    <h2
      v-else-if="
        $route.name === 'rko' ||
        $route.name === 'rko' ||
        $route.name === 'rko-card-main' ||
        $route.name === 'rko-card-other'
      "
      class="h2"
    >
      Лучшие счета для бизнеса
    </h2>
    <div v-if="$route.name === 'home'" class="top-btns">
      <div class="navigation">
        <button
          class="btn"
          :class="{ activeBtn: bestOffer === 'kreditnie-karty' }"
          @click="navClick('kreditnie-karty')"
        >
          Кредитные карты
        </button>
        <button
          class="btn"
          :class="{ activeBtn: bestOffer === 'debetovie-karty' }"
          @click="navClick('debetovie-karty')"
        >
          Дебетовые карты
        </button>
        <button
          class="btn"
          :class="{ activeBtn: bestOffer === 'zaimy' }"
          @click="navClick('zaimy')"
        >
          Займы
        </button>
        <button
          class="btn"
          :class="{ activeBtn: bestOffer === 'rko' }"
          @click="navClick('rko')"
        >
          Счета для бизнеса
        </button>
      </div>
      <swiper
        class="nav-slider"
        :space-between="10"
        slides-per-view="auto"
        :breakpoints="{
          320: { spaceBetween: 10 },
          600: { spaceBetween: 15 },
          1200: { spaceBetween: 20 },
        }"
      >
        <swiper-slide
          class="slide"
          :class="{ activeBtn: bestOffer === 'kreditnie-karty' }"
          @click="navClick('kreditnie-karty')"
        >
          <span class="text">Кредитные карты</span>
        </swiper-slide>
        <swiper-slide
          class="slide"
          :class="{ activeBtn: bestOffer === 'debetovie-karty' }"
          @click="navClick('debetovie-karty')"
        >
          <span class="text">Дебетовые карты</span>
        </swiper-slide>
        <swiper-slide
          class="slide"
          :class="{ activeBtn: bestOffer === 'zaimy' }"
          @click="navClick('zaimy')"
        >
          <span class="text">Займы</span>
        </swiper-slide>
        <swiper-slide
          class="slide"
          :class="{ activeBtn: bestOffer === 'rko' }"
          @click="navClick('rko')"
        >
          <span class="text">Счета для бизнеса</span>
        </swiper-slide>
      </swiper>

      <show-all-btn :best-offer="bestOffer" />
    </div>
    <div v-if="loading" class="container-loader">
      <div class="loader"></div>
    </div>
    <swiper
      v-else
      class="card-slider"
      slides-per-view="auto"
      :space-between="20"
      :breakpoints="{
        320: { spaceBetween: 10 },
        600: { spaceBetween: 20 },
      }"
    >
      <swiper-slide
        v-for="card in bestOffers"
        :key="card"
        class="slide"
        :best="card"
      >
        <MiniCard :best-offer="bestOffer" :card="card" />
      </swiper-slide>
      <swiper-slide v-if="isMobile && $route.name === 'home'" class="slide">
        <div class="card show-btn">
          <show-all-btn :best-offer="bestOffer" />
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import MiniCard from "@/components/MiniCard.vue";
import ShowAllBtn from "@/components/UI/show-all-btn.vue";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();
export default {
  components: {
    ShowAllBtn,
    MiniCard,
    Swiper,
    SwiperSlide,
  },
  props: {
    type: { type: String },
  },
  data() {
    return {
      bestOffers: [],
      bestOffer: "kreditnie-karty",
      bestOfferLink: "credit_cards",
      width: width,
      isMobile: false,
      loading: true,
    };
  },
  watch: {
    bestOffer(value) {
      if (value === "kreditnie-karty") {
        this.bestOfferLink = "credit_cards";
      } else if (value === "debetovie-karty") {
        this.bestOfferLink = "debit_cards";
      } else {
        this.bestOfferLink = value;
      }
    },
  },
  async updated() {
    await this.getBestOffers();
  },
  mounted() {
    this.loading = true;
    if (this.type !== undefined) {
      this.bestOffer = this.type;
    }
    this.getPageName();
    this.getBestOffers();
    this.checkMobile();
  },
  methods: {
    checkMobile() {
      this.isMobile = this.width <= 1200;
    },
    navClick(best) {
      if (this.bestOffer === best) {
        return;
      } else {
        this.loading = true;
        this.bestOffer = best;
        setTimeout(async () => {
          await this.getBestOffers();
        }, 0);
      }
    },
    getPageName() {
      if (this.$route.name !== "home") {
        if (this.$route.name === "kreditnie-karty") {
          this.bestOffer = "kreditnie-karty";
        } else if (this.$route.name === "debetovie-karty") {
          this.bestOffer = "debetovie-karty";
        } else if (this.$route.name === "zaimy") {
          this.bestOffer = "zaimy";
        } else if (this.$route.name === "rko") {
          this.bestOffer = "rko";
        }
      }
    },
    async getBestOffers() {
      await this.$api
        .get(`/${this.bestOfferLink}?best=true`)
        .then((response) => {
          this.bestOffers = response.data.items;
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.best-offers
  .h2
    margin-bottom: 40px
  .top-btns
    display: flex
    flex-direction: row
    gap: 40px
    justify-content: space-between
    margin-bottom: 30px
    .nav-slider
      display: none
    .navigation
      display: flex
      flex-direction: row
      gap: 20px
      .btn
        font-size: 1.125rem
        font-weight: 400
        background: var(--bg-gray-color)
        border: 1px solid var(--bg-gray-color)
        padding: 15px 20px
        border-radius: 10px
        transition: .3s ease
        &:hover
          border: 1px solid var(--gray-color)
          transition: .3s ease
      .activeBtn
        background: var(--black-color)
        border: 1px solid var(--black-color)
        color: var(--white-color)
        border-radius: 10px
        transition: .3s ease
        cursor: default
        &:hover
          border: 1px solid var(--black-color)
          transition: .3s ease
  .card-slider
    width: 100%
    max-width: 100%
    overflow: visible
    .slide
      width: auto
      height: auto
      display: flex
@media only screen and (max-width: $bp-pc)
  .best-offers
    .h2
      margin-bottom: 20px
    .top-btns
      margin-bottom: 18px
      .show-all-btn
        display: none
      .nav-slider
        display: block
        width: 100%
        max-width: 100%
        overflow: visible
        .slide
          width: auto
          display: flex
          background: var(--bg-gray-color)
          border: 1px solid var(--bg-gray-color)
          padding: 10px 15px
          border-radius: 10px
          transition: .3s ease
          cursor: pointer
          .text
            transition: .3s ease
            white-space: nowrap
            font-size: 0.875rem
          &:hover
            border: 1px solid var(--gray-color)
            transition: .3s ease
        .activeBtn
          background: var(--black-color)
          border: 1px solid var(--black-color)
          border-radius: 10px
          transition: .3s ease
          cursor: default
          .text
            transition: .3s ease
            color: var(--white-color)
          &:hover
            border: 1px solid var(--black-color)
            transition: .3s ease
      .navigation
        display: none
      .navigation
        gap: 15px
        .btn
          font-size: 1rem
    .card-slider
      .slide
        .card
        .show-btn
          width: 280px
          padding: 0 20px 0 0
          display: flex
          align-items: center
          box-shadow: none
          .show-all-btn
            height: fit-content
            border-radius: 10px
            border: 2px solid var(--main-color)
            padding: 15px 20px
            transition: .3s ease
            .text
              font-size: 1rem
              color: var(--main-color)
            .btn-image
              svg
                path
                  stroke: var(--main-color)
            &:hover
              transition: .3s ease
              background: var(--main-color)
              .text
                color: var(--white-color)
                transition: .3s ease
              .btn-image
                svg
                  path
                    transition: .3s ease
                    stroke: var(--white-color)
@media only screen and (max-width: $bp-tablet)
  .best-offers
    .h2
      margin-bottom: 15px
    .top-btns
      margin-bottom: 10px
      .show-all-btn
        display: none
      .nav-slider
        display: block
        width: 100%
        max-width: 100%
        overflow: visible
        .slide
          width: auto
          display: flex
          background: var(--bg-gray-color)
          padding: 8px 12px
          border-radius: 5px
          .text
            white-space: nowrap
            font-size: 0.75rem
        .activeBtn
          background: var(--black-color)
          border-radius: 5px
          transition: .3s ease
          .text
            transition: .3s ease
            color: var(--white-color)
      .navigation
        display: none
    .card-slider
      .slide
        .card
          display: flex
          flex-direction: column
          gap: 25px
          border-radius: 10px
          box-shadow: var(--block-shadow)
          padding: 20px
          width: 280px
        .show-btn
          width: 184px
          padding: 0 20px 0 0
          display: flex
          justify-content: center
          box-shadow: none
          .show-all-btn
            border-radius: 10px
            border: 2px solid var(--main-color)
            padding: 15px 20px
            .text
              font-size: 0.875rem
              color: var(--main-color)
            .btn-image
              svg
                path
                  stroke: var(--main-color)
            &:hover
              background: var(--main-color)
              .text
                color: var(--white-color)
              .btn-image
                svg
                  path
                    stroke: var(--white-color)
</style>
