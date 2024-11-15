<template>
  <router-link
    v-if="$route.name === 'debetovie-karty' || bestOffer === 'debetovie-karty'"
    :to="{
      path: `/debetovie-karty/${card.slug}`,
    }"
    class="mini-card"
  >
    <div class="top-section" :style="{ background: color }">
      <img
        :src="$api.defaults.baseURL + '/files/' + card.bank_details?.logo"
        alt=""
        class="bank-image"
      />
      <span class="card-name">{{ card.name }}</span>
    </div>
    <div class="card-info">
      <span class="line">
        Кэшбек рублями до {{ card.max_cashback_percent }}%
      </span>
      <span
        v-if="
          card.interest_on_balance !== 0 && card.interest_on_balance !== '0'
        "
        class="line"
      >
        До {{ card.interest_on_balance }}% на остаток
      </span>
      <span class="line">{{ service }}</span>
      <span class="line">
        {{ randomFeature }}
      </span>
      <span
        v-if="
          card.interest_on_balance === 0 || card.interest_on_balance === '0'
        "
        class="line line-hidden"
      ></span>
    </div>

    <div class="bot-section">
      <button class="apply-btn" @click.prevent="openLink">Оформить</button>
      <router-link
        :to="{
          path: `/debetovie-karty/${card.slug}`,
        }"
        class="more-btn"
      >
        <img src="@/assets/images/icons/more-btn.svg" alt="" />
      </router-link>
      <p class="ad-bank">Реклама "{{ card.bank_details?.bank_name }}"</p>
    </div>
  </router-link>

  <router-link
    v-if="$route.name === 'kreditnie-karty' || bestOffer === 'kreditnie-karty'"
    :to="{
      path: `/kreditnie-karty/${card.slug}`,
    }"
    class="mini-card"
  >
    <div class="top-section" :style="{ background: color }">
      <img
        :src="$api.defaults.baseURL + '/files/' + card.bank_details?.logo"
        alt=""
        class="bank-image"
      />
      <span class="card-name">{{ card.name }}</span>
    </div>
    <div class="card-info">
      <span class="line">
        Лимит до
        {{ card.credit_limit ? formatNumber(card.credit_limit) : "0" }} руб.
      </span>
      <span class="line"> Ставка от {{ card.min_percent }}% </span>
      <span class="line">
        Льготный период {{ card.no_percent_period }} дней
      </span>
      <span class="line">
        Кэшбек баллами до {{ card.max_cashback_percent }}%
      </span>
    </div>

    <div class="bot-section">
      <button class="apply-btn" @click.prevent="openLink">Оформить</button>
      <router-link
        :to="{
          path: `/kreditnie-karty/${card.slug}`,
        }"
        class="more-btn"
      >
        <img src="@/assets/images/icons/more-btn.svg" alt="" />
      </router-link>
      <p class="ad-bank">Реклама "{{ card.bank_details?.bank_name }}"</p>
    </div>
  </router-link>

  <div
    v-if="$route.name === 'zaimy' || bestOffer === 'zaimy'"
    class="mini-card mini-card-zaimy"
  >
    <div class="top-section" :style="{ background: zaimyColor }">
      <img
        :src="$api.defaults.baseURL + '/files/' + card.image"
        alt=""
        class="bank-image"
      />
      <span class="card-name">{{ card.name }}</span>
    </div>
    <div class="card-info">
      <span class="line"
        >Займ до {{ card.sum ? formatNumber(card.sum) : "0" }} руб.</span
      >
      <span class="line">Ставка от {{ card.interest_on_balance }}% </span>
      <span class="line">
        Срок от {{ card.min_term }} до {{ card.max_term }} дней
      </span>
    </div>
    <div class="bot-section">
      <button class="apply-btn" @click="openLink">Оформить</button>
    </div>
  </div>

  <router-link
    v-if="
      $route.name === 'rko' ||
      bestOffer === 'rko' ||
      $route.name === 'rko-card-main' ||
      $route.name === 'rko-card-other'
    "
    :to="{
      path: `/rko/${card.slug}/${cardMain.name}`,
    }"
    class="mini-card mini-card-rko"
  >
    <div class="top-section" :style="{ background: color }">
      <img
        :src="$api.defaults.baseURL + '/files/' + card.bank_details?.logo"
        alt=""
        class="bank-image"
      />
      <span class="card-name">Тариф "{{ card.ratesName }}"</span>
    </div>
    <div class="card-info">
      <span class="line">
        Обслуживание от {{ cardMain.service_1_month }} руб.
      </span>
      <span class="line">Эквайринг от {{ card.min_eq }}% </span>
      <span v-for="feat in features" :key="feat" class="line">
        {{ feat }}
      </span>
    </div>
    <div class="bot-section">
      <button class="apply-btn" @click.prevent="openLink">Оформить</button>
      <router-link
        v-if="
          $route.name === 'rko' ||
          bestOffer === 'rko' ||
          $route.name === 'rko-card-main' ||
          $route.name === 'rko-card-other'
        "
        :to="{
          path: `/rko/${card.slug}/${cardMain.name}`,
        }"
        class="more-btn"
      >
        <img src="@/assets/images/icons/more-btn.svg" alt="" />
      </router-link>
      <p class="ad-bank">Реклама "{{ card.bank_details?.bank_name }}"</p>
      <router-link
        v-if="card.rates?.length - 1 !== 0"
        :to="{
          path: `/rko/${card.slug}/${cardMain.name}`,
          query: { scrollToAnchor: 'true' },
        }"
        class="more-rates"
      >
        <span class="text">{{ rates }}</span>
        <span class="arrow-cont">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
          >
            <path
              d="M7.33333 1.625L11.5 6M11.5 6L7.33333 10.375M11.5 6L1.5 6"
              stroke="#0149FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </router-link>
      <div v-else class="hidden"></div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    card: Object,
    bestOffer: String,
  },
  data() {
    return {
      cardType: "",
      cardMain: {},
      features: [],
    };
  },
  computed: {
    service: function () {
      if (this.card.min_service === this.card.max_service) {
        if (this.card.min_service === 0 || this.card.min_service === "0") {
          return "Бесплатное обслуживание";
        }
        return `${this.card.max_service} руб.`;
      } else {
        return `Обслуживание от ${this.card.min_service} руб.`;
      }
    },
    randomFeature: function () {
      let a = Math.floor(Math.random() * this.card.features?.length);
      if (isNaN(a) || a === undefined) {
        return ``;
      } else return `${this.card.features[a]}`;
    },
    color: function () {
      return `#${this.card.bank_details?.color}`;
    },
    zaimyColor: function () {
      return `#${this.card.color}`;
    },
    rates: function () {
      if (this.card.rates?.length - 1 === 1) {
        return "Еще 1 тариф";
      } else if (
        this.card.rates?.length - 1 > 1 &&
        this.card.rates?.length - 1 < 5
      ) {
        return `Еще ${this.card.rates?.length - 1} тарифа`;
      } else {
        return `Еще ${this.card.rates?.length - 1} тарифов`;
      }
    },
  },
  mounted() {
    if (this.$route.name === "rko" || this.bestOffer === "rko") {
      this.getMain();
      this.getFeats();
    }
  },
  methods: {
    getMain() {
      this.card.rates?.forEach((rate) => {
        if (rate.main === true) {
          this.cardMain = rate;
        }
      });
    },
    getFeats() {
      if (this.card.features?.length >= 0 && this.card.features?.length < 2) {
        this.features = this.card.features;
      } else {
        this.features = this.card.features?.slice(0, 2);
      }
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    openLink() {
      window.open(this.card.ref_link);
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.mini-card
  display: flex
  flex-direction: column
  gap: 25px
  border-radius: 10px
  box-shadow: var(--block-shadow)
  transition: .3s ease-out
  padding: 20px
  .top-section
    border-top-left-radius: 10px
    border-top-right-radius: 10px
    width: 325px
    display: flex
    flex-direction: column
    gap: 20px
    margin: -20px -20px 0 -20px
    padding: 20px
    .bank-image
      width: 60px
      height: 60px
      border-radius: 10px
    .card-name
      color: var(--white-color)
      font-size: 1.25rem
      font-weight: 600
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
  .card-info
    display: flex
    flex-direction: column
    gap: 5px
    .line-hidden
      height: 20px
    .line
      font-size: 1rem
      font-weight: 400
  .bot-section
    display: grid
    grid-gap: 15px 10px
    grid-template-areas: 'apply more' 'ad ad'
    .apply-btn
      grid-area: apply
      border-radius: 10px
      width: 225px
      background: var(--main-color)
      border: 2px solid var(--main-color)
      padding: 13px 20px
      color: var(--white-color)
      font-size: 1rem
      font-weight: 600
      transition: .3s ease
      &:hover
        transition: .3s ease
        border: 2px solid var(--main-color)
        color: var(--main-color)
        background: var(--white-color)
    .more-btn
      grid-area: more
      display: flex
      align-items: center
      justify-content: center
      padding: unset
      width: 50px
      height: 50px
      transition: .3s ease
      border-radius: 10px
      border: 2px solid var(--bg-gray-color)
      &:hover
        transition: .3s ease
        border: 2px solid var(--main-color)
    .ad-bank
      grid-area: ad
      text-align: center
      color: var(--ad-color)
      font-size: 0.875rem
      font-weight: 400
.mini-card-zaimy
  .bot-section
    grid-gap: 0
    grid-template-areas: 'apply apply'
    .apply-btn
      width: 100%
.mini-card-rko
  .card-info
    flex: 1 0 0
  .bot-section
    grid-template-areas: 'apply more' 'ad ad' 'more-rates more-rates'
    .hidden
      grid-area: more-rates
      display: flex
      height: 24px
    .more-rates
      grid-area: more-rates
      display: flex
      flex-direction: row
      gap: 5px
      height: 24px
      justify-content: center
      align-items: center
      .text
        color: var(--main-color)
        font-size: 1rem
        font-weight: 500
      .arrow-cont
        display: flex
        align-items: center
        justify-content: center
        transition: .3s ease
        margin-top: 1px
        width: 24px
        height: 24px
        svg
          width: 13px
          height: 12px
      &:hover
        .arrow-cont
          transition: .3s ease
          transform: translateX(5px)
@media only screen and (max-width: $bp-pc)
  .mini-card
    gap: 20px
    padding: 15px
    .top-section
      gap: 10px
      width: 250px
      margin: -15px -15px 0 -15px
      padding: 15px
      .bank-image
        width: 40px
        height: 40px
      .card-name
        width: unset
        font-size: 1rem
    .card-info
      .line-hidden
        height: 18px
      .line
        font-size: 0.875rem
    .bot-section
      grid-template-columns: auto 40px
      .apply-btn
        width: 170px
        height: 40px
        font-size: 0.875rem
        padding: 0 20px
      .more-btn
        height: 40px
        width: 40px
        img
          height: 24px
          width: 24px
  .mini-card-zaimy
    .bot-section
      grid-gap: 0
      grid-template-areas: 'apply apply'
      .apply-btn
        width: 100%
  .mini-card-rko
    .bot-section
      .hidden
        height: 20px
      .more-rates
        grid-area: more-rates
        display: flex
        flex-direction: row
        gap: 5px
        height: 20px
        justify-content: center
        align-items: center
        .text
          font-size: 0.875rem
        .arrow-cont
          margin-top: 2px
          width: 20px
          height: 20px
          svg
            width: 14px
            height: 10px
        &:hover
          .arrow-cont
            transition: .3s ease
            transform: translateX(4px)
@media only screen and (max-width: $bp-tablet)
  .mini-card
    gap: 15px
    padding: 15px 10px
    .top-section
      width: 200px
      gap: 10px
      margin: -15px -10px 0 -10px
      padding: 15px 10px
      .bank-image
        width: 35px
        height: 35px
      .card-name
        width: unset
        font-size: 0.875rem
    .card-info
      .line-hidden
        height: 15px
      .line
        font-size: 0.75rem
        font-style: normal
        font-weight: 400
    .bot-section
      grid-gap: 10px
      .apply-btn
        display: flex
        width: 135px
        height: fit-content
        padding: 8px
        font-size: 0.75rem
        font-weight: 600
        align-items: center
        justify-content: center
      .more-btn
        width: 35px
        height: 35px
        img
          width: 20px
          height: 20px
      .ad-bank
        font-size: 0.625rem
        font-weight: 400
        line-height: 130%
  .mini-card-zaimy
    .bot-section
      grid-gap: 0
      grid-template-areas: 'apply apply'
      .apply-btn
        width: 100%
  .mini-card-rko
    .bot-section
      .hidden
        height: 20px
      .more-rates
        grid-area: more-rates
        display: flex
        flex-direction: row
        gap: 3px
        height: 20px
        justify-content: center
        align-items: center
        .text
          font-size: 0.75rem
        .arrow-cont
          margin-top: 2px
          width: 20px
          height: 20px
          svg
            width: 12px
            height: 9px
        &:hover
          .arrow-cont
            transition: .3s ease
            transform: translateX(4px)
</style>
