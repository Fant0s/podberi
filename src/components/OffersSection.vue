<template>
  <section class="our-offers content">
    <div class="top-section-offers">
      <span class="find-offers">Найдено {{ cardCount }} предложений</span>
      <div v-if="$route.name === 'kreditnie-karty'" class="filter-buttons">
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'default' }"
          @click="getSort('default')"
        >
          <span class="text">По умолчанию</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'no_percent' }"
          @click="getSort('no_percent')"
        >
          <span class="text">По льготному периоду</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'credit_limit' }"
          @click="getSort('credit_limit')"
        >
          <span class="text">По лимиту</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'percent' }"
          @click="getSort('percent')"
        >
          <span class="text">По ставке</span>
        </button>
      </div>
      <div v-if="$route.name === 'debetovie-karty'" class="filter-buttons">
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'default' }"
          @click="getSort('default')"
        >
          <span class="text">По умолчанию</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'cashback' }"
          @click="getSort('cashback')"
        >
          <span class="text">По кэшбеку</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'service' }"
          @click="getSort('service')"
        >
          <span class="text">По обслуживанию</span>
        </button>
      </div>
      <div v-if="$route.name === 'zaimy'" class="filter-buttons">
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'default' }"
          @click="getSort('default')"
        >
          <span class="text">По умолчанию</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'sum' }"
          @click="getSort('sum')"
        >
          <span class="text">По сумме займа</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'percent_loan' }"
          @click="getSort('percent_loan')"
        >
          <span class="text">По ставке</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'term' }"
          @click="getSort('term')"
        >
          <span class="text">По сроку</span>
        </button>
      </div>
      <div v-if="$route.name === 'rko'" class="filter-buttons">
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'default' }"
          @click="getSort('default')"
        >
          <span class="text">По умолчанию</span>
        </button>
        <button
          class="btn"
          :class="{ 'btn--active': activeButton === 'serviceRko' }"
          @click="getSort('serviceRko')"
        >
          <span class="text">По обслуживанию</span>
        </button>
      </div>
      <swiper
        class="swiper-filter-buttons"
        slides-per-view="auto"
        :space-between="5"
      >
        <swiper-slide class="swiper-slide">
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'default' }"
            @click="getSort('default')"
          >
            <span class="text">По умолчанию</span>
          </button>
        </swiper-slide>
        <swiper-slide
          v-if="$route.name === 'kreditnie-karty'"
          class="swiper-slide"
        >
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'no_percent' }"
            @click="getSort('no_percent')"
          >
            <span class="text">По льготному периоду</span>
          </button>
        </swiper-slide>
        <swiper-slide
          v-if="$route.name === 'kreditnie-karty'"
          class="swiper-slide"
        >
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'credit_limit' }"
            @click="getSort('credit_limit')"
          >
            <span class="text">По лимиту</span>
          </button>
        </swiper-slide>
        <swiper-slide
          v-if="$route.name === 'kreditnie-karty'"
          class="swiper-slide"
        >
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'percent' }"
            @click="getSort('percent')"
          >
            <span class="text">По ставке</span>
          </button>
        </swiper-slide>

        <swiper-slide
          v-if="$route.name === 'debetovie-karty'"
          class="swiper-slide"
        >
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'cashback' }"
            @click="getSort('cashback')"
          >
            <span class="text">По кэшбеку</span>
          </button>
        </swiper-slide>
        <swiper-slide
          v-if="$route.name === 'debetovie-karty'"
          class="swiper-slide"
        >
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'service' }"
            @click="getSort('service')"
          >
            <span class="text">По обслуживанию</span>
          </button>
        </swiper-slide>

        <swiper-slide v-if="$route.name === 'zaimy'" class="swiper-slide">
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'sum' }"
            @click="getSort('sum')"
          >
            <span class="text">По сумме займа</span>
          </button>
        </swiper-slide>
        <swiper-slide v-if="$route.name === 'zaimy'" class="swiper-slide">
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'percent_loan' }"
            @click="getSort('percent_loan')"
          >
            <span class="text">По ставке</span>
          </button>
        </swiper-slide>
        <swiper-slide v-if="$route.name === 'zaimy'" class="swiper-slide">
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'term' }"
            @click="getSort('term')"
          >
            <span class="text">По сроку</span>
          </button>
        </swiper-slide>
        <swiper-slide v-if="$route.name === 'rko'" class="swiper-slide">
          <button
            class="btn"
            :class="{ 'btn--active': activeButton === 'serviceRko' }"
            @click="getSort('serviceRko')"
          >
            <span class="text">По обслуживанию</span>
          </button>
        </swiper-slide>
      </swiper>
    </div>
    <div v-if="loading" class="container-loader">
      <div class="loader"></div>
    </div>
    <div v-if="$route.name !== 'zaimy' && !loading" class="offers-block">
      <card-item v-for="card in cardData" :key="card" :card="card" />
      <p v-if="cardCount === 0" class="nothing">
        <span class="smile">😥</span>
        <br />
        Кажется, по вашему запросу ничего не найдено..
      </p>
    </div>
    <div v-if="$route.name === 'zaimy' && !loading" class="offers-block-loan">
      <card-item v-for="card in cardData" :key="card" :card="card" />
      <p v-if="cardCount === 0" class="nothing">
        <span class="smile">😥</span>
        <br />
        Кажется, по вашему запросу ничего не найдено..
      </p>
    </div>
    <button
      v-if="$route.name === 'zaimy' && cardData.length !== cardCount"
      class="show-more"
    >
      Загрузить еще
    </button>
    <button
      v-if="$route.name !== 'zaimy' && cardData.length !== cardCount"
      class="show-more"
      @click="requestMoreCards"
    >
      Загрузить еще
    </button>
  </section>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
export default {
  components: { CardItem, Swiper, SwiperSlide },
  props: {
    cardData: { type: Array },
    cardCount: { type: Number },
    sortQueryDefault: { type: String },
    activeBtnSort: { type: String },
    loading: { type: Boolean },
  },
  emits: ["sort-query", "request-more-cards"],
  data() {
    return {
      sortingQuery: "",
      activeButton: "default",
    };
  },
  methods: {
    requestMoreCards() {
      this.$emit("request-more-cards");
    },
    getSort(sortType) {
      switch (sortType) {
        case "default":
          this.activeButton = "default";
          this.sortingQuery = this.sortQueryDefault;
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "no_percent":
          this.activeButton = "no_percent";
          this.sortingQuery = "no_percent_period=-1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "credit_limit":
          this.activeButton = "credit_limit";
          this.sortingQuery = "credit_limit=-1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "percent":
          this.activeButton = "percent";
          this.sortingQuery = "min_percent=1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "cashback":
          this.activeButton = "cashback";
          this.sortingQuery = "max_cashback_percent=-1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "service":
          this.activeButton = "service";
          this.sortingQuery = "max_service=1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "sum":
          this.activeButton = "sum";
          this.sortingQuery = "sum=-1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "percent_loan":
          this.activeButton = "percent_loan";
          this.sortingQuery = "max_percent=1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "term":
          this.activeButton = "term";
          this.sortingQuery = "max_term=-1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        case "serviceRko":
          this.activeButton = "serviceRko";
          this.sortingQuery = "rates.service_1_month=1";
          this.$emit("sort-query", this.sortingQuery);
          return 1;
        default:
          return "";
      }
    },
    setDefaultSort() {
      this.activeButton = this.activeBtnSort;
    },
  },
};
</script>

<style lang="sass">
@import '@/assets/styles/base/adaptive'
.our-offers
  padding-top: 40px
  display: flex
  flex-direction: column
  .top-section-offers
    margin-bottom: 20px
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: space-between
    align-items: center
    .swiper-filter-buttons
      display: none
    .find-offers
      font-size: 1rem
      font-weight: 500
    .filter-buttons
      display: flex
      flex-direction: row
      gap: 5px
      .btn
        padding: 10px 15px
        border-radius: 100px
        border: 1px solid var(--white-color)
        transition: .3s ease
        .text
          transition: .3s ease
          font-size: 0.9375rem
          font-weight: 400
        &:hover
          transition: .3s ease
          border: 1px solid var(--gray-color)
      .btn--active
        border-radius: 100px
        border: 1px solid var(--main-color)
        .text
          transition: .3s ease
          color: var(--main-color)
        &:hover
          transition: .3s ease
          border: 1px solid var(--main-color)
  .offers-block
    display: flex
    flex-direction: column
    gap: 10px
  .offers-block-loan
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-gap: 20px
    .nothing
      grid-column: 1/5
  .show-more
    color: var(--main-color)
    background: transparent
    border: 2px solid var(--main-color)
    border-radius: 10px
    width: 440px
    margin-top: 20px
    font-size: 1.125rem
    font-weight: 500
    padding: 20px
    transition: .3s ease
    align-self: center
    &:hover
      transition: .3s ease
      color: var(--white-color)
      background: var(--main-color)
  .nothing
    padding: 100px 0
    font-size: 1.125rem
    font-weight: 500
    text-align: center
    .smile
      font-size: 3.5rem
@media only screen and (max-width: $bp-pc)
  .our-offers
    padding-top: 20px
    .top-section-offers
      margin-bottom: 20px
      display: grid
      grid-template-areas: 'slider slider' 'find find'
      grid-gap: 30px
      .find-offers
        grid-area: find
        font-size: 0.875rem
        font-weight: 500
      .filter-buttons
        display: none
      .swiper-filter-buttons
        display: block
        grid-area: slider
        width: 100%
        .swiper-slide
          display: flex
          width: auto
          .btn
            padding: 8px 12px
            border-radius: 100px
            border: 1px solid var(--bg-gray-color)
            transition: .3s ease
            display: flex
            align-items: center
            justify-content: center
            .text
              font-size: 0.875rem
              font-weight: 400
            &:hover
              transition: .3s ease
              border: 1px solid var(--gray-color)
          .btn--active
            border-radius: 100px
            border: 1px solid var(--main-color)
            transition: .3s ease
            .text
              transition: .3s ease
              color: var(--main-color)
            &:hover
              transition: .3s ease
              border: 1px solid var(--main-color)
    .offers-block
      .filter-buttons
        display: none
    .show-more
      width: 300px
      font-size: 0.875rem
      padding: 14px 20px
    .nothing
      padding: 80px 0
      font-size: 0.875rem
      text-align: center
      .smile
        font-size: 3rem
    .offers-block-loan
      grid-template-columns: repeat(3, 1fr)
      grid-gap: 10px
@media only screen and (max-width: $bp-tablet-card)
  .our-offers
    .offers-block-loan
      grid-template-columns: repeat(2, 1fr)
      grid-gap: 10px
@media only screen and (max-width: $bp-tablet)
  .our-offers
    .top-section-offers
      grid-gap: 20px
      .swiper-filter-buttons
        .swiper-slide
          .btn
            .text
              font-size: 0.75rem
              font-weight: 400
    .show-more
      width: 100%
      font-size: 0.875rem
      padding: 14px 20px
    .nothing
      padding: 50px 30px
      .smile
        font-size: 2.8rem
</style>
