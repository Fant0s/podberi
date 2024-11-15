<template>
  <Head>
    <title>ПодбериРУ: Карта "{{ card.name }}"</title>
    <meta name="description" content="" />
  </Head>
  <div v-if="loading" class="container-loader">
    <div class="loader"></div>
  </div>
  <section v-else class="card-page credit-card-page content">
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
        <p class="card-type">Кредитная карта</p>
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
            <p class="key">Лимит</p>
            <p class="value">до {{ formatNumber(card.credit_limit) }} руб.</p>
          </div>
          <div class="line">
            <p class="key">Ставка</p>
            <p class="value">от {{ card.min_percent }}%</p>
          </div>
          <div class="line">
            <p class="key">Кэшбек</p>
            <p class="value">{{ cashback }}</p>
          </div>
          <div class="line">
            <p class="key">Льготный период</p>
            <p class="value">{{ card.no_percent_period }} дней</p>
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
    <!--      <template #title>про кредитную карту "{{ card.name }}"</template>-->
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
      type: "kreditnie-karty",
      faqData: [],
      loading: true,
    };
  },
  computed: {
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
        .get(`/credit_cards?slug=${this.$route.params.slug}`)
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
