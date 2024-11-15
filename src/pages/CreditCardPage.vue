<template>
  <Head>
    <title>ПодбериРУ: Кредитные карты</title>
    <meta name="description" content="" />
  </Head>
  <div class="credit-page">
    <FilterMenu
      :filter-menu-open="filterMenuOpen"
      @send-filter-menu="getFilterMenu"
      @close-filter-menu="openFilterMenu"
    />
    <VFilter
      :filter-query-full="filterQueryFull"
      @open-filter-menu="openFilterMenu"
      @send-query="getFilters"
      @clear-btn="filterQueryFull = false"
    >
      <template #title>Кредитные карты</template>
    </VFilter>
    <OffersSection
      ref="offerSection"
      :card-count="cardCount"
      :card-data="cardData"
      :sort-query="sortQuery"
      :sort-query-default="sortQueryDefault"
      :active-btn-sort="activeBtnSort"
      :loading="loading"
      @sort-query="getSort"
    />
    <best-offers />
    <!--    <f-a-q-section :faq-data="faqData">-->
    <!--      <template #title>про кредитные карты</template>-->
    <!--    </f-a-q-section>-->
  </div>
</template>

<script>
import { Head } from "@vueuse/head";
import VFilter from "@/components/vFilter.vue";
import OffersSection from "@/components/OffersSection.vue";
import BestOffers from "@/components/BestOffers.vue";
// import FAQSection from "@/components/FAQSection.vue";
import FilterMenu from "@/components/FilterMenu.vue";

export default {
  components: {
    FilterMenu,
    BestOffers,
    OffersSection,
    VFilter,
    Head,
  },
  data() {
    return {
      filterQuery: "",
      filterQueryFull: false,
      activeBtnSort: "default",
      sortQueryDefault: "best=-1&",
      sortQuery: "best=-1&",
      cardCount: 0,
      cardDefault: [],
      cardData: [],
      faqData: [],
      filterMenuOpen: false,
      loading: true,
    };
  },
  mounted() {
    this.getCards();
    this.getFAQ();
  },
  methods: {
    openFilterMenu() {
      this.filterMenuOpen = !this.filterMenuOpen;
      if (this.filterMenuOpen) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "auto";
      }
    },
    getFilterMenu(a) {
      this.loading = true;
      Object.keys(a.checkboxes).forEach((key) => {
        if (key === "Банк" && a.checkboxes["Банк"] !== []) {
          a.checkboxes["Банк"].forEach((bank) => {
            this.filterQuery += `bank_details.bank_name=${bank}&`;
          });
        }
        if (key === "Формат кэшбека" && a.checkboxes["Формат кэшбека"] !== []) {
          a.checkboxes["Формат кэшбека"].forEach((form) => {
            if (form === "Рубли") {
              this.filterQuery += `cashback_format=рублей&`;
            } else if (form === "Баллы") {
              this.filterQuery += `cashback_format=баллов&`;
            } else {
              this.filterQuery += `cashback_format=миль&`;
            }
          });
        }
        if (
          key === "Платежная система" &&
          a.checkboxes["Платежная система"] !== []
        ) {
          a.checkboxes["Платежная система"].forEach((sys) => {
            this.filterQuery += `payment_system=${sys}&`;
          });
        }
      });
      a.features.forEach((feat) => {
        this.filterQuery += `features=${feat}&`;
      });
      this.sortQuery = this.sortQueryDefault;
      this.$refs.offerSection.setDefaultSort();
      this.filterQueryFull = true;
      this.filterMenuOpen = false;
      document.documentElement.style.overflowY = "auto";
      this.getCards();
    },
    getSort(a) {
      this.loading = true;
      this.sortQuery = a;
      this.getCards();
    },
    getFilters(a) {
      this.loading = true;
      this.filterQuery = a;
      this.sortQuery = this.sortQueryDefault;
      this.$refs.offerSection.setDefaultSort();
      this.getCards();
    },
    async getCards() {
      await this.$api
        .get(`/credit_cards?sort$${this.sortQuery}&${this.filterQuery}`)
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
        .get("/faq_credit_cards")
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

<style lang="sass">
@import '@/assets/styles/base/adaptive'
</style>
