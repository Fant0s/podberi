<template>
  <Head>
    <title>ПодбериРУ: Карта "{{ card.name }}"</title>
    <meta name="description" content="" />
  </Head>
  <div v-if="loading" class="container-loader">
    <div class="loader"></div>
  </div>
  <section v-else class="card-page debit-card-page content">
    <div class="card-top-section">
      <div
        class="color-block"
        :style="{ background: `#${card.bank_details.color}` }"
      >
        <img
          :src="$api.defaults.baseURL + '/files/' + card.bank_details.logo"
          alt=""
          class="bank-image"
        />
        <p class="card-type">Дебетовая карта</p>
        <p class="card-name">{{ card.name }}</p>
        <p class="card-text">
          И нет сомнений, что некоторые особенности внутренней политики набирают
          популярность среди определенных слоев населения, а значит, должны быть
          объективно рассмотрены соответствующими инстанциями.
        </p>
        <div class="card-bottom-block">
          <button class="apply-btn" @click="openLink">Оформить</button>
          <p class="ad-block">Реклама "{{ card.bank_name }}"</p>
        </div>
      </div>
      <div class="attr-block">
        <div class="card-image">
          <img :src="$api.defaults.baseURL + '/files/' + card.image" alt="" />
        </div>
        <div class="card-props">
          <div class="line">
            <p class="key">Проценты на остаток</p>
            <p class="value">{{ interest_on_balance }}</p>
          </div>
          <div class="line">
            <p class="key">Обслуживание</p>
            <p class="value">{{ service }}</p>
          </div>
          <div class="line">
            <p class="key">Кэшбек</p>
            <p class="value">{{ cashback }}</p>
          </div>
        </div>
        <div class="card-features">
          <div v-for="feat in card.features" :key="feat" class="feature">
            {{ feat }}
          </div>
        </div>
      </div>
    </div>
    <card-page-info :type="type" :card="card" />
    <best-offers :type="type" />
    <!--    <f-a-q-section :faq-data="faqData">-->
    <!--      <template #title>про дебетовую карту "{{ card.name }}"</template>-->
    <!--    </f-a-q-section>-->
  </section>
</template>

<script>
import { Head } from "@vueuse/head";
import CardPageInfo from "@/components/CardPageInfo.vue";
// import FAQSection from "@/components/FAQSection.vue";
import BestOffers from "@/components/BestOffers.vue";

export default {
  components: { BestOffers, CardPageInfo, Head },
  props: {},
  data() {
    return {
      card: [],
      type: "debetovie-karty",
      faqData: [],
      loading: true,
    };
  },
  computed: {
    service: function () {
      if (this.card.min_service === this.card.max_service) {
        if (this.card.min_service === 0 || this.card.min_service === "0") {
          return "Бесплатно";
        }
        return `${this.card.max_service} руб.`;
      } else {
        return `от ${this.card.min_service} руб.`;
      }
    },
    interest_on_balance: function () {
      if (
        this.card.interest_on_balance === 0 ||
        this.card.interest_on_balance === "0"
      ) {
        return `Нет`;
      } else {
        return `до ${this.card.interest_on_balance}%`;
      }
    },
    cashback: function () {
      if (this.card.cashback_format === "баллов") {
        return `Баллами до ${this.card.max_cashback_percent}%`;
      } else if (this.card.cashback_format === "рублей") {
        return `Рублями до ${this.card.max_cashback_percent}%`;
      } else {
        return `Милями до ${this.card.max_cashback_percent}%`;
      }
    },
  },
  mounted() {
    this.fetchCardData();
  },
  methods: {
    async fetchCardData() {
      await this.$api
        .get(`/debit_cards?slug=${this.$route.params.slug}`)
        .then((response) => {
          this.card = response.data.items[0];
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
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
@import "@/assets/styles/cards-styles"
</style>
