<template>
  <Head>
    <title>ПодбериРУ: РКО "{{ cardMain.name }}"</title>
    <meta name="description" content="" />
  </Head>
  <div v-if="loading" class="container-loader">
    <div class="loader"></div>
  </div>
  <section v-else class="card-page rko-page content">
    <div
      class="card-top-section"
      :class="{ 'card-top-section-gap': othersRates.length === 0 }"
    >
      <div
        class="color-block"
        :style="{ background: `#${card.bank_details.color}` }"
      >
        <img
          :src="$api.defaults.baseURL + '/files/' + card.bank_details.logo"
          alt=""
          class="bank-image"
        />
        <p class="card-type">Счет для бизнеса</p>
        <p class="card-name">Тариф "{{ cardMain.name }}"</p>
        <p class="card-text">
          И нет сомнений, что некоторые особенности внутренней политики набирают
          популярность среди определенных слоев населения, а значит, должны быть
          объективно рассмотрены соответствующими инстанциями.
        </p>
        <div class="card-bottom-block">
          <button class="apply-btn" @click="openLink">Оформить</button>
          <p class="ad-block">Реклама "{{ card.bank_details?.bank_name }}"</p>
        </div>
      </div>
      <div class="attr-block">
        <div class="card-image">
          <img
            :src="
              $api.defaults.baseURL + '/files/' + card.bank_details.big_logo
            "
            alt=""
          />
        </div>
        <div class="card-props">
          <div class="line">
            <p class="key">Переводы юрлицам</p>
            <p class="value">{{ cardMain.free_transfers_ur }} бесплатно</p>
          </div>
          <div class="line">
            <p class="key">Обслуживание</p>
            <p class="value">от {{ cardMain.service_1_month }} руб./мес.</p>
          </div>
          <div class="line">
            <p class="key">Кому подойдет</p>
            <p class="value">{{ forWho }}</p>
          </div>
          <div class="line">
            <p class="key">Эквайринг</p>
            <p class="value">от {{ card.min_eq }}%</p>
          </div>
        </div>
        <div class="card-features">
          <div v-for="feat in card.features" :key="feat" class="feature">
            {{ feat }}
          </div>
        </div>
      </div>
      <div
        v-if="othersRates.length !== 0"
        id="anchor"
        class="additional-rates"
        @click="showAddRates"
      >
        <p class="add-text">Дополнительные тарифы</p>
        <button class="show">
          <span class="text">Показать</span>
          <svg
            class="arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16.375 12.8333L12 17M12 17L7.625 12.8333M12 17L12 7"
              stroke="#0149FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div v-if="showAllRates" class="all-tariffs">
        <div v-for="rate in othersRates" :key="rate" class="rate">
          <p class="name">"{{ rate.name }}"</p>
          <div class="properties">
            <div class="line">
              <span class="key">Эквайринг</span>
              <span class="value">от {{ card.min_eq }}%</span>
            </div>
            <div class="line">
              <span class="key">Стоимость обслуживания</span>
              <span class="value">{{ rate.service_1_month }} руб.</span>
            </div>
            <div class="line">
              <span class="key">Переводы юрлицам</span>
              <span class="value">{{ rate.free_transfers_ur }} бесплатно</span>
            </div>
          </div>
          <div class="card-btns">
            <button class="apply">Оформить</button>
            <router-link
              :to="{
                name: 'rko-card-other',
                params: { slug: card.slug, other: rate.name },
              }"
              class="more"
            >
              <img src="@/assets/images/icons/more-btn.svg" alt="" />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <card-page-info :card-main="cardMain" :type="type" :card="card" />
    <best-offers :type="type" />
    <!--    <f-a-q-section :faq-data="faqData">-->
    <!--      <template #title>про счет для бизнеса "{{ cardMain.name }}"</template>-->
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
      othersRates: {},
      cardMain: {},
      type: "rko",
      faqData: [],
      loading: true,
      showAllRates: false,
    };
  },
  computed: {
    forWho: function () {
      if (this.card.for_ip === true && this.card.for_ooo === true) {
        return "Для ИП и ООО";
      } else if (this.card.for_ip === true && this.card.for_ooo === false) {
        return "Для ИП";
      } else if (this.card.for_ip === false && this.card.for_ooo === true) {
        return "Для ООО";
      } else {
        return "Для ИП и ОО";
      }
    },
  },
  watch: {
    loading(newValue) {
      if (!newValue) {
        this.handlePostLoadActions();
      }
    },
  },
  mounted() {
    this.fetchCardData();
    window.addEventListener("load", this.scrollToAnchorAndOpenMenu);
  },
  beforeUnmount() {
    window.removeEventListener("load", this.scrollToAnchorAndOpenMenu);
  },
  methods: {
    handlePostLoadActions() {
      if (this.$route.query.scrollToAnchor === "true") {
        this.scrollToAnchorAndOpenMenu();
      }
    },
    scrollToAnchorAndOpenMenu() {
      this.$nextTick(() => {
        const anchorElement = document.getElementById("anchor");
        if (anchorElement) {
          anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
          document
            .querySelector(".card-top-section")
            .classList.toggle("card-top-section--opened");
          this.showAllRates = true;
          const btn = document.querySelector(".show");
          const arrow = btn.querySelector(".arrow");
          const text = btn.querySelector(".text");
          if (this.showAllRates) {
            text.textContent = "Скрыть";
            arrow.classList.add("arrow--opened");
          } else {
            text.textContent = "Показать";
            arrow.classList.remove("arrow--opened");
          }
        }
      });
    },
    async fetchCardData() {
      await this.$api
        .get(`/rko?slug=${this.$route.params.slug}`)
        .then((response) => {
          this.card = response.data.items[0];
          this.othersRates = this.card.rates.filter((rate) => {
            if (rate.main !== true) {
              return true;
            }
          });
          this.getMain();
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showAddRates() {
      this.showAllRates = !this.showAllRates;
      document
        .querySelector(".card-top-section")
        .classList.toggle("card-top-section--opened");
      const btn = document.querySelector(".show");
      const arrow = btn.querySelector(".arrow");
      const text = btn.querySelector(".text");
      if (this.showAllRates) {
        text.textContent = "Скрыть";
        arrow.classList.add("arrow--opened");
      } else {
        text.textContent = "Показать";
        arrow.classList.remove("arrow--opened");
      }
    },
    getMain() {
      const rates = this.card.rates;
      rates.forEach((rate) => {
        if (rate.main === true) {
          this.cardMain = rate;
        }
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
@import "@/assets/styles/rko-styles.sass"
</style>
