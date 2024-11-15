<template>
  <Head>
    <title>ПодбериРУ: Займы</title>
    <meta name="description" content="" />
  </Head>
  <div class="loan-page">
    <VFilter @send-query="getFilters">
      <template #title>Займы</template>
    </VFilter>
    <OffersSection
      ref="offerSection"
      :card-data="cardData"
      :card-count="cardCount"
      :sort-query="sortQuery"
      :sort-query-default="sortQueryDefault"
      :active-btn-sort="activeBtnSort"
      :loading="loading"
      @sort-query="getSort"
    />
    <best-offers />
    <!--    <f-a-q-section :faq-data="faqData">-->
    <!--      <template #title>про займы</template>-->
    <!--    </f-a-q-section>-->
  </div>
</template>

<script>
import { Head } from "@vueuse/head";
import BestOffers from "@/components/BestOffers.vue";
import VFilter from "@/components/vFilter.vue";
// import FAQSection from "@/components/FAQSection.vue";
import OffersSection from "@/components/OffersSection.vue";

export default {
  components: {
    OffersSection,
    VFilter,
    BestOffers,
    Head,
  },
  data() {
    return {
      type: "zaimy",
      cardData: [],
      faqData: [],
      filterQuery: "",
      activeBtnSort: "default",
      sortQueryDefault: "best=-1&",
      sortQuery: "best=-1&",
      cardCount: 0,
      cardDefault: [],
      loading: true,
    };
  },
  mounted() {
    this.getCards();
    this.getFAQ();
  },
  methods: {
    getFilters(a) {
      this.loading = true;
      this.filterQuery = a;
      this.sortQuery = this.sortQueryDefault;
      this.$refs.offerSection.setDefaultSort();
      this.getCards();
    },
    getSort(a) {
      this.loading = true;
      this.sortQuery = a;
      this.getCards();
    },
    async getCards() {
      await this.$api
        .get(`/zaimy?sort$${this.sortQuery}&${this.filterQuery}`)
        .then((response) => {
          this.cardCount = response.data.items_count;
          this.cardDefault = response.data.items;
          this.cardData = response.data.items;
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getFAQ() {
      await this.$api
        .get("/faq_zaimy")
        .then((response) => {
          this.faqData = response.data.items;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="sass"></style>
