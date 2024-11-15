<template>
  <router-link
    v-if="$route.name === 'debetovie-karty'"
    :to="{
      path: `/debetovie-karty/${card.slug}`,
    }"
    class="card-item"
  >
    <div class="card-img">
      <img alt="" :src="getImageUrl(card.image)" />
    </div>
    <div v-if="card.best === true" class="best-tag">
      <span class="best-text"> Лучшее предложение </span>
    </div>
    <div class="card-info">
      <div class="name">
        <img :src="getImageUrl(card.bank_details.logo)" alt="" />
        <span class="text">{{ card.name }}</span>
        <span v-if="card.best === true" class="best-offer">
          Лучшее предложение
        </span>
      </div>
      <div class="properties debit-props">
        <div class="line">
          <span class="key">Проценты на остаток </span>
          <span class="value">{{ interest_on_balance }}</span>
        </div>
        <div class="line">
          <span class="key">Обслуживание</span>
          <span class="value">{{ service }}</span>
        </div>
        <div class="line">
          <span class="key">Кэшбек</span>
          <span class="value">{{ cashback }}</span>
        </div>
      </div>

      <div class="features">
        <div
          v-for="feat in card.features.slice(0, 3)"
          :key="feat"
          class="feature"
        >
          <span class="text">
            {{ feat }}
          </span>
        </div>
      </div>
      <span class="ad-block">Реклама “{{ card.bank_details?.bank_name }}”</span>
      <div class="licence-block">
        <span class="bank">{{ card.bank_details?.bank_name }}</span>
        <span class="licence"
          >лиц. №{{ card.bank_details?.license_number }}</span
        >
      </div>
      <div class="card-btns">
        <button class="apply" @click="openLink">Оформить</button>
        <router-link
          :to="{
            path: `/debetovie-karty/${card.slug}`,
          }"
          class="more"
        >
          <img src="@/assets/images/icons/more-btn.svg" alt="" />
        </router-link>
      </div>
    </div>
  </router-link>

  <router-link
    v-if="$route.name === 'kreditnie-karty'"
    :to="{
      path: `/kreditnie-karty/${card.slug}`,
    }"
    class="card-item"
  >
    <div class="card-img">
      <img alt="" :src="getImageUrl(card.image)" />
    </div>
    <div v-if="card.best === true" class="best-tag">
      <span class="best-text"> Лучшее предложение </span>
    </div>
    <div class="card-info">
      <div class="name">
        <img :src="getImageUrl(card.bank_details.logo)" alt="" />
        <span class="text">{{ card.name }}</span>
        <span v-if="card.best === true" class="best-offer">
          Лучшее предложение
        </span>
      </div>
      <div class="properties credit-props">
        <div class="line">
          <span class="key">Лимит</span>
          <span class="value">
            до {{ formatNumber(card.credit_limit) }} руб.
          </span>
        </div>
        <div class="line">
          <span class="key">Ставка</span>
          <span class="value">от {{ card.min_percent }}%</span>
        </div>
        <div class="line">
          <span class="key">Льготный период </span>
          <span class="value">{{ card.no_percent_period }} дней</span>
        </div>
        <div class="line">
          <span class="key">Кэшбек</span>
          <span class="value">{{ cashback }}</span>
        </div>
      </div>

      <div class="features">
        <div
          v-for="feat in card.features.slice(0, 3)"
          :key="feat"
          class="feature"
        >
          <span class="text">
            {{ feat }}
          </span>
        </div>
      </div>
      <span class="ad-block">Реклама “{{ card.bank_details?.bank_name }}”</span>
      <div class="licence-block">
        <span class="bank">{{ card.bank_details?.bank_name }}</span>
        <span class="licence"
          >лиц. №{{ card.bank_details?.license_number }}</span
        >
      </div>
      <div class="card-btns">
        <button class="apply" @click="openLink">Оформить</button>
        <router-link
          :to="{
            path: `/kreditnie-karty/${card.slug}`,
          }"
          class="more"
        >
          <img src="@/assets/images/icons/more-btn.svg" alt="" />
        </router-link>
      </div>
    </div>
  </router-link>

  <div
    v-if="$route.name === 'zaimy'"
    class="loan-item"
    :class="{ bestMini: card.best }"
  >
    <div class="card-img">
      <img class="loan-img" alt="" :src="getImageUrl(card.image)" />
      <span class="text">{{ card.name }}</span>
      <span v-if="card.best === true" class="best-offer">
        Лучшее предложение
      </span>
    </div>

    <div class="card-info">
      <div class="properties">
        <span class="line">Займ до {{ formatNumber(card.sum) }} руб. </span>
        <span class="line">Ставка от {{ card.min_percent }}%</span>
        <span class="line">
          Срок от {{ card.min_term }} до {{ card.max_term }} дней
        </span>
      </div>
      <button class="apply-btn" @click="openLink">Оформить</button>
    </div>
  </div>

  <router-link
    v-if="$route.name === 'rko'"
    :to="{
      name: 'rko-card-main',
      params: { slug: card.slug, main: cardMain.name },
    }"
    class="rko-item"
    :class="{ 'rko-item--opened': allOpen }"
  >
    <div v-if="card.best === true" class="best-rko">Лучшее предложени</div>
    <div
      class="card-info"
      :class="{ 'card-info-gap': othersRates.length === 0 }"
    >
      <div class="name">
        <img :src="getImageUrl(card.bank_details.logo)" alt="" />
        <span class="text">Тариф "{{ cardMain.name }}"</span>
        <span v-if="card.best === true" class="best-offer">
          Лучшее предложение
        </span>
      </div>
      <div class="properties">
        <div class="line">
          <span class="key">Кому подойдет</span>
          <span class="value">{{ forWho }}</span>
        </div>
        <div class="line">
          <span class="key">Эквайринг</span>
          <span class="value">от {{ card.min_eq }}%</span>
        </div>
        <div class="line">
          <span class="key">Стоимость обслуживания</span>
          <span class="value">{{ cardMain.service_1_month }} руб./мес.</span>
        </div>
        <div class="line">
          <span class="key">Переводы юрлицам</span>
          <span class="value">{{ cardMain.free_transfers_ur }} бесплатно</span>
        </div>
      </div>
      <div class="features">
        <div
          v-for="feat in card.features.slice(0, 3)"
          :key="feat"
          class="feature"
        >
          <span class="text">
            {{ feat }}
          </span>
        </div>
      </div>
      <div class="wide-block">
        <button
          v-if="othersRates.length !== 0"
          class="all-rates-btn"
          @click.prevent="openTariff($event)"
        >
          <span class="text">{{ tariffs }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16.375 12.8333L12 17M12 17L7.625 12.8333M12 17L12 7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div v-if="width >= 1300" class="features-block">
          <div
            v-for="feat in card.features.slice(0, 3)"
            :key="feat"
            class="feature"
          >
            <span class="text">
              {{ feat }}
            </span>
          </div>
        </div>
        <div v-if="width < 1300" class="features-block">
          <div
            v-for="feat in card.features.slice(0, 2)"
            :key="feat"
            class="feature"
          >
            <span class="text">
              {{ feat }}
            </span>
          </div>
        </div>
        <span class="ad-bank-block"
          >Реклама “{{ card.bank_details?.bank_name }}”</span
        >
      </div>
      <div class="wide-block2">
        <div v-if="width >= 1300" class="features-block">
          <div
            v-for="feat in card.features.slice(0, 3)"
            :key="feat"
            class="feature"
          >
            <span class="text">
              {{ feat }}
            </span>
          </div>
        </div>
        <div v-if="width < 1300" class="features-block">
          <div
            v-for="feat in card.features.slice(0, 2)"
            :key="feat"
            class="feature"
          >
            <span class="text">
              {{ feat }}
            </span>
          </div>
        </div>
        <span class="ad-bank-block"
          >Реклама “{{ card.bank_details?.bank_name }}”</span
        >
      </div>
      <button
        v-if="othersRates.length !== 0"
        class="all-rates-btn-tablet"
        @click.prevent="openTariff($event)"
      >
        <span class="text">{{ tariffs }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.375 12.8333L12 17M12 17L7.625 12.8333M12 17L12 7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <span class="ad-block" :class="{ 'ad-margin': othersRates.length === 0 }"
        >Реклама “{{ card.bank_details?.bank_name }}”</span
      >
      <div class="licence-block">
        <span class="bank">{{ card.bank_details?.bank_name }}</span>
        <span class="licence">
          лиц. №{{ card.bank_details?.license_number }}
        </span>
      </div>
      <button
        v-if="othersRates.length !== 0"
        class="all-rates"
        @click.prevent="openTariff($event)"
      >
        <span class="text">{{ tariffs }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.375 12.8333L12 17M12 17L7.625 12.8333M12 17L12 7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="card-btns">
        <button class="apply" @click.prevent="openLink">Оформить</button>
        <router-link
          :to="{
            name: 'rko-card-main',
            params: { slug: card.slug, main: cardMain.name },
          }"
          class="more"
        >
          <img src="@/assets/images/icons/more-btn.svg" alt="" />
        </router-link>
      </div>
    </div>

    <div v-if="allOpen" class="all-rates-block">
      <router-link
        v-for="rate in othersRates"
        :key="rate"
        :to="{
          name: 'rko-card-other',
          params: { slug: card.slug, other: rate.name },
        }"
        class="rate"
      >
        <p class="name">"{{ rate.name }}"</p>
        <div class="properties">
          <div class="line">
            <span class="key">Эквайринг</span>
            <span class="value">от {{ rate.min_eq }}%</span>
          </div>
          <div class="line">
            <span class="key">Стоимость обслуживания</span>
            <span class="value">{{ rate.service_1_month }} руб./мес.</span>
          </div>
          <div class="line">
            <span class="key">Переводы юрлицам</span>
            <span class="value">{{ rate.free_transfers_ur }} бесплатно</span>
          </div>
        </div>
        <div class="card-btns">
          <button class="apply" @click.prevent="openLink">Оформить</button>
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
      </router-link>
    </div>
  </router-link>
</template>

<script>
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();
export default {
  props: {
    card: { type: Object },
  },
  data() {
    return {
      cardType: "",
      cardMain: {},
      othersRates: [],
      allOpen: false,
      width: width,
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
        return `до ${this.card.max_service} руб.`;
      }
    },
    interest_on_balance: function () {
      if (
        this.card.interest_on_balance === 0 ||
        this.card.interest_on_balance === "0"
      ) {
        return "Нет";
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
    tariffs: function () {
      if (this.othersRates.length === 1) {
        return `Еще 1 тариф`;
      } else if (this.othersRates.length > 1 && this.othersRates.length <= 4) {
        return `Еще ${this.othersRates.length} тарифа`;
      } else {
        return `Еще ${this.othersRates.length} тарифов`;
      }
    },
    forWho: function () {
      if (this.card.for_ip === true && this.card.for_ooo === true) {
        return "Для ИП и ООО";
      } else if (this.card.for_ip === true && this.card.for_ooo === false) {
        return "Для ИП";
      } else {
        return "Для ООО";
      }
    },
  },
  beforeMount() {
    if (this.$route.name === "rko") {
      this.getMain();
    }
  },
  mounted() {
    if (this.$route.name === "rko") {
      this.othersRates = this.card.rates.filter((rate) => {
        if (rate.main !== true) {
          return true;
        }
      });
    }
  },
  methods: {
    getMain() {
      const rates = this.card.rates;
      rates.forEach((rate) => {
        if (rate.main === true) {
          this.cardMain = rate;
        }
      });
    },
    openTariff(event) {
      this.allOpen = !this.allOpen;
      const card = event.target.closest(".rko-item");
      const btn = card.querySelector(".all-rates-btn");
      const medBtn = card.querySelector(".all-rates-btn-tablet");
      const miniBtn = card.querySelector(".all-rates");
      const text = btn.querySelector(".text");
      btn.classList.toggle("all-rates-btn--opened");
      if (this.allOpen === true) {
        text.textContent = "Скрыть";
        btn.style.width = "186px";
      } else {
        text.textContent = this.tariffs;
        btn.style.width = "unset";
      }
      const miniText = miniBtn.querySelector(".text");
      miniBtn.classList.toggle("all-rates--opened");
      if (this.allOpen === true) {
        miniText.textContent = "Скрыть";
      } else {
        miniText.textContent = this.tariffs;
      }
      const medText = medBtn.querySelector(".text");
      medBtn.classList.toggle("all-rates-btn-tablet--opened");
      if (this.allOpen === true) {
        medText.textContent = "Скрыть";
      } else {
        medText.textContent = this.tariffs;
      }
    },
    openLink() {
      window.open(this.card.ref_link);
    },
    getImageUrl(imagePath) {
      return this.$api.defaults.baseURL + "/files/" + imagePath;
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.card-item
  border-radius: 20px
  transition: .3s ease-out
  border: 2px solid var(--bg-gray-color)
  display: flex
  flex-direction: row
  &:hover
    transition: .3s ease-out
    box-shadow: var(--block-shadow)
  .card-img
    border-top-left-radius: 20px
    border-bottom-left-radius: 20px
    background: var(--bg-gray-color)
    display: flex
    align-items: center
    justify-content: center
    width: 17%
    img
      width: 59.18%
  .best-tag
    display: none
  .card-info
    width: 83%
    padding: 30px 40px 30px 30px
    display: grid
    grid-template-areas: 'name licence' 'properties btns' 'features ad'
    //grid-template-columns: repeat(auto-fit, minmax(150px, auto))
    grid-gap: 20px
    .name
      grid-area: name
      display: flex
      flex-direction: row
      align-items: center
      min-width: 50px
      gap: 20px
      img
        width: 50px
        border: 1px solid var(--ad-color)
        border-radius: 10px
      .text
        padding-right: 20px
        font-size: 1.25rem
        font-weight: 600
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .best-offer
        color: var(--white-color)
        font-size: 0.875rem
        font-weight: 500
        background: var(--orange-color)
        padding: 10px 15px
        border-radius: 100px
        white-space: nowrap
    .properties
      grid-area: properties
      display: flex
      flex-direction: row
      gap: 40px
      .line
        display: flex
        flex-direction: column
        gap: 5px
        .key
          color: var(--gray-color)
          font-size: 0.875rem
          font-weight: 400
        .value
          font-size: 1rem
          font-weight: 500
          white-space: nowrap
    .features
      grid-area: features
      max-width: 100%
      display: flex
      flex-direction: row
      gap: 10px
      .feature
        padding: 8px 15px
        border-radius: 100px
        border: 1px solid var(--gray-color)
        .text
          white-space: nowrap
          color: var(--gray-color)
          font-size: 0.875rem
          font-weight: 500
    .ad-block
      grid-area: ad
      text-align: end
      align-self: center
      color: var(--gray-color)
      font-size: 0.875rem
      font-weight: 300
    .licence-block
      grid-area: licence
      display: flex
      flex-direction: row
      align-items: center
      justify-content: end
      gap: 20px
      .bank
        font-size: 0.9375rem
        font-weight: 300
      .licence
        font-size: 0.9375rem
        font-weight: 300
    .card-btns
      grid-area: btns
      display: flex
      flex-direction: row
      justify-content: flex-end
      gap: 10px
      .apply
        padding: 18px
        width: 215px
        color: var(--white-color)
        font-size: 1rem
        font-weight: 600
        border-radius: 10px
        background: var(--main-color)
        border: 2px solid var(--main-color)
        transition: .3s ease
        &:hover
          transition: .3s ease
          color: var(--main-color)
          background: var(--white-color)
      .more
        padding: unset
        display: flex
        align-items: center
        justify-content: center
        width: 60px
        height: 60px
        border-radius: 10px
        border: 2px solid var(--bg-gray-color)
        transition: .3s ease
        &:hover
          transition: .3s ease
          border: 2px solid var(--main-color)
.loan-item
  border: 2px solid var(--bg-gray-color)
  border-radius: 10px
  .card-img
    background: var(--bg-gray-color)
    display: grid
    grid-template-areas: 'img best' 'name name'
    grid-template-columns: auto 1fr
    grid-gap: 20px
    padding: 20px
    margin-bottom: 25px
    border-top-left-radius: 10px
    border-top-right-radius: 10px
    .best-offer
      grid-area: best
      display: flex
      height: fit-content
      width: fit-content
      white-space: nowrap
      padding: 10px 15px
      color: var(--white-color)
      font-size: 0.75rem
      font-weight: 600
      background: var(--orange-color)
      border-radius: 100px
      justify-self: end
    .loan-img
      grid-area: img
      border-radius: 10px
    .text
      grid-area: name
      font-size: 1.125rem
      font-weight: 600
  .card-info
    padding: 0 20px
    display: flex
    flex-direction: column
    gap: 25px
    .properties
      display: flex
      flex-direction: column
      gap: 5px
      .line
        font-size: 1rem
        font-weight: 400
    .apply-btn
      background: var(--main-color)
      padding: 13px
      border-radius: 10px
      color: var(--white-color)
      font-size: 1rem
      font-weight: 600
      margin-bottom: 25px
      border: 2px solid var(--main-color)
      transition: .3s ease
      &:hover
        transition: .3s ease
        color: var(--main-color)
        background: var(--white-color)
        border: 2px solid var(--main-color)
.rko-item
  border-radius: 20px
  border: 2px solid var(--bg-gray-color)
  transition: .3s ease-out
  padding: 30px
  width: 100%
  display: grid
  &:hover
    transition: .3s ease-out
    box-shadow: var(--block-shadow)
  .best-rko
    display: none
  .card-info
    display: grid
    grid-template-areas: "name lic" "props buttons" "wide wide"
    grid-template-columns: 1fr auto
    gap: 20px 10px
    .name
      grid-area: name
      display: flex
      flex-direction: row
      align-items: center
      gap: 20px
      img
        width: 50px
        height: 50px
        border-radius: 10px
        border: 1px solid var(--ad-color)
      .text
        font-size: 1.25rem
        font-weight: 600
      .best-offer
        margin-left: 20px
        padding: 10px 15px
        border-radius: 100px
        font-size: 0.875rem
        font-weight: 500
        color: var(--white-color)
        background: var(--orange-color)
    .properties
      grid-area: props
      display: flex
      flex-direction: row
      align-items: center
      gap: 60px
      .line
        display: flex
        flex-direction: column
        gap: 5px
        .key
          font-size: 0.875rem
          font-weight: 400
          color: var(--gray-color)
        .value
          font-size: 1rem
          font-weight: 500
    .features
      display: none
      flex-direction: row
      gap: 10px
      .feature
        height: fit-content
        padding: 8px 15px
        border-radius: 100px
        border: 1px solid var(--gray-color)
        .text
          font-size: 0.875rem
          font-weight: 500
          color: var(--gray-color)
    .wide-block
      grid-area: wide
      display: flex
      flex-direction: row
      gap: 10px
      justify-content: space-between
      .all-rates-btn
        border-radius: 100px
        background: var(--main-color)
        padding: 4px 30px
        display: flex
        width: 186px
        flex-direction: row
        align-items: center
        justify-content: center
        gap: 5px
        svg
          transition: .3s ease
        .text
          color: var(--white-color)
          font-size: 0.875rem
          font-weight: 500
      .all-rates-btn--opened
        svg
          transition: .3s ease
          transform: rotate(180deg)
      .features-block
        display: flex
        flex-direction: row
        flex: 1 0 0
        gap: 10px
        .feature
          height: fit-content
          padding: 7px 15px
          border-radius: 100px
          display: flex
          border: 1px solid var(--gray-color)
          .text
            font-size: 0.875rem
            font-weight: 500
            color: var(--gray-color)
      .ad-bank-block
        text-align: end
        align-self: center
        color: var(--gray-color)
        font-size: 0.875rem
        font-weight: 300
    .wide-block2
      display: none
    .all-rates-btn-tablet
      display: none
    .ad-block
      display: none
      align-self: center
      text-align: end
      color: var(--gray-color)
      font-size: 0.875rem
      font-weight: 300
    .licence-block
      grid-area: lic
      display: flex
      align-items: center
      justify-content: flex-end
      gap: 20px
      .bank
        font-size: 0.9375rem
        font-weight: 300
      .licence
        font-size: 0.9375rem
        font-weight: 300
    .card-btns
      grid-area: buttons
      display: flex
      flex-direction: row
      gap: 10px
      .apply
        width: 215px
        border-radius: 10px
        background: var(--main-color)
        padding: 18px 20px
        font-size: 1rem
        font-weight: 600
        color: var(--white-color)
        border: 2px solid var(--main-color)
        transition: .3s ease
        &:hover
          transition: .3s ease
          color: var(--main-color)
          background: var(--white-color)
          border: 2px solid var(--main-color)
      .more
        width: 60px
        height: 60px
        display: flex
        align-items: center
        justify-content: center
        border-radius: 10px
        border: 2px solid var(--bg-gray-color)
        transition: .3s ease
        img
          width: 32px
          height: 32px
        &:hover
          transition: .3s ease
          border: 2px solid var(--main-color)
    .all-rates
      display: none
      width: fit-content
  .all-rates-block
    margin-top: 30px
    display: flex
    flex-direction: column
    .rate
      display: grid
      grid-template-areas: 'name props btns'
      align-items: center
      grid-template-columns: 220px 1fr 285px
      transition: .3s ease-out
      margin: 0 -30px
      padding: 23px 30px
      gap: 30px
      border-top: 1px solid var(--white-color)
      border-bottom: 1px solid var(--white-color)
      &:hover
        transition: .3s ease-out
        border-top: 1px solid var(--gray-color)
        border-bottom: 1px solid var(--gray-color)
      .name
        grid-area: name
        max-width: 220px
        overflow: hidden
        text-overflow: ellipsis
        font-size: 1rem
        font-weight: 600
      .properties
        grid-area: props
        display: flex
        flex-direction: row
        gap: 30px
        .line
          display: flex
          flex-direction: column
          gap: 5px
          .key
            color: var(--gray-color)
            font-size: 0.875rem
            font-weight: 400
          .value
            font-size: 1rem
            font-weight: 500
      .card-btns
        grid-area: btns
        display: flex
        flex-direction: row
        gap: 10px
        .apply
          width: 211px
          border-radius: 10px
          background: var(--main-color)
          padding: 20px
          font-size: 1rem
          font-weight: 600
          color: var(--white-color)
          transition: .3s ease
          border: 2px solid var(--main-color)
          &:hover
            transition: .3s ease
            background: var(--white-color)
            color: var(--main-color)
            border: 2px solid var(--main-color)
        .more
          width: 60px
          height: 60px
          display: flex
          align-items: center
          justify-content: center
          border-radius: 10px
          border: 2px solid var(--bg-gray-color)
          background: var(--white-color)
          transition: .3s ease
          img
            width: 32px
            height: 32px
          &:hover
            transition: .3s ease
            border: 2px solid var(--main-color)
      &:nth-child(2n)
        background: var(--bg-gray-color)
.rko-item--opened
  padding-bottom: 15px
@media only screen and (max-width: $bp-pc)
  .card-item
    border-radius: 10px
    .card-img
      display: none
    .card-info
      width: 100%
      padding: 20px
      grid-template-columns: repeat(auto-fit, minmax(150px, auto))
      .name
        grid-area: name
        gap: 15px
        img
          width: 40px
          border-radius: 10px
        .text
          padding-right: 5px
          font-size: 1rem
        .best-offer
          white-space: nowrap
          font-size: 0.75rem
          padding: 6px 12px
      .properties
        grid-area: properties
        flex-direction: row
        flex-wrap: wrap
        gap: 10px 20px
        .line
          width: 45%
          .key
            font-size: 0.75rem
          .value
            font-size: 0.875rem
      .features
        grid-area: features
        gap: 15px
        .feature
          padding: unset
          border: unset
          .text
            white-space: nowrap
            font-size: 0.625rem
      .ad-block
        grid-area: ad
        font-size: 0.625rem
      .licence-block
        grid-area: licence
        flex-direction: column
        justify-content: center
        align-items: end
        gap: 5px
        .bank
          font-size: 0.75rem
        .licence
          font-size: 0.75rem
      .card-btns
        grid-area: btns
        display: flex
        flex-direction: row
        align-items: center
        justify-content: flex-end
        gap: 10px
        .apply
          padding: 14px
          width: 180px
          height: fit-content
          font-size: 0.875rem
        .more
          width: 50px
          height: 50px
  .loan-item
    .card-img
      grid-gap: 15px 10px
      padding: 15px 10px
      margin-bottom: 20px
      .best-offer
        padding: 5px 8px
        font-size: 0.625rem
      .loan-img
        max-width: 40px
        max-height: 40px
      .text
        font-size: 1rem
    .card-info
      padding: 0 15px
      gap: 20px
      .properties
        .line
          font-size: 0.875rem
      .apply-btn
        padding: 10px
        font-size: 0.875rem
  .rko-item
    border-radius: 20px
    padding: 20px
    width: 100%
    .best-rko
      display: none
    .card-info
      display: grid
      grid-template-areas: "name lic" "props buttons" "wide wide" "all all"
      grid-template-columns: 1fr auto
      gap: 20px 10px
      .name
        grid-area: name
        display: flex
        flex-direction: row
        align-items: center
        gap: 15px
        img
          width: 40px
          height: 40px
        .text
          font-size: 1rem
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .best-offer
          margin-left: unset
          white-space: nowrap
          padding: 6px 12px
          font-size: 0.75rem
      .properties
        grid-area: props
        display: grid
        grid-template-columns: repeat(2, auto)
        gap: 10px 20px
        .line
          .key
            font-size: 0.6875rem
          .value
            font-size: 0.875rem
      .wide-block
        display: none
      .wide-block2
        grid-area: wide
        display: flex
        flex-direction: row
        justify-content: space-between
        .features-block
          display: flex
          flex-direction: row
          gap: 10px
          .feature
            display: flex
            height: fit-content
            padding: 5px 10px
            border-radius: 100px
            border: 1px solid var(--gray-color)
            .text
              font-size: 0.6875rem
              color: var(--gray-color)
        .ad-bank-block
          color: var(--gray-color)
          font-size: 0.625rem
          font-weight: 300
          align-self: center
      .all-rates-btn-tablet
        grid-area: all
        display: flex
        align-items: center
        justify-content: center
        background: var(--main-color)
        padding: 10px 20px
        margin: 0 -20px -20px -20px
        border-bottom-left-radius: 20px
        border-bottom-right-radius: 20px
        transition: .3s ease
        .text
          color: var(--white-color)
          font-size: 0.75rem
          font-weight: 500
        svg
          margin-top: 1px
          width: 20px
          height: 20px
      .all-rates-btn-tablet--opened
        transition: .3s ease
        border-bottom-left-radius: unset
        border-bottom-right-radius: unset
        svg
          transition: .3s ease
          transform: rotate(180deg)
      .ad-block
        display: none
        align-self: center
        text-align: end
        color: var(--gray-color)
        font-size: 0.875rem
        font-weight: 300
      .licence-block
        grid-area: lic
        display: flex
        align-items: center
        justify-content: flex-end
        gap: 10px
        .bank
          font-size: 0.75rem
        .licence
          font-size: 0.75rem
      .card-btns
        align-self: center
        grid-area: buttons
        display: flex
        flex-direction: row
        gap: 10px
        .apply
          width: calc(100% - 50px)
          height: 50px
          border-radius: 10px
          background: var(--main-color)
          padding: 0 20px
          font-size: 1rem
          font-weight: 600
          color: var(--white-color)
          border: 2px solid var(--main-color)
        .more
          width: 50px
          height: 50px
          display: flex
          align-items: center
          justify-content: center
          border-radius: 10px
          border: 2px solid var(--bg-gray-color)
          transition: .3s ease
          img
            width: 24px
            height: 24px
          &:hover
            transition: .3s ease
            border: 2px solid var(--main-color)
      .all-rates
        display: none
        width: fit-content
    .card-info-gap
      grid-template-areas: "name lic" "props buttons" "wide wide"
    .all-rates-block
      margin-top: 20px
      display: flex
      flex-direction: column
      .rate
        display: grid
        grid-template-areas: 'name name' 'props btns'
        align-items: center
        grid-template-columns: repeat(2, auto)
        margin: 0 -20px
        padding: 25px 20px
        gap: 20px 10px
        .name
          grid-area: name
          max-width: unset
          overflow: hidden
          text-overflow: ellipsis
          font-size: 1rem
          font-weight: 600
        .properties
          grid-area: props
          display: grid
          grid-template-columns: repeat(2, auto)
          gap: 15px
          .line
            .key
              font-size: 0.6875rem
            .value
              font-size: 0.875rem
        .card-btns
          grid-area: btns
          display: flex
          align-self: start
          justify-content: flex-end
          flex-direction: row
          gap: 10px
          .apply
            width: 160px
            height: 50px
            border-radius: 10px
            background: var(--main-color)
            padding: 0 20px
            font-size: 1rem
            font-weight: 600
          .more
            width: 50px
            height: 50px
            display: flex
            align-items: center
            justify-content: center
            border-radius: 10px
            border: 2px solid var(--bg-gray-color)
            background: var(--white-color)
            transition: .3s ease
            img
              width: 32px
              height: 32px
            &:hover
              transition: .3s ease
              border: 2px solid var(--main-color)
        &:nth-child(2n)
          background: var(--bg-gray-color)
  .rko-item--opened
    padding-bottom: 15px
@media only screen and (max-width: $bp-tablet-card)
  .card-item
    border-radius: 10px
    border: unset
    box-shadow: var(--block-shadow)
    flex-direction: column
    .card-img
      display: none
    .best-tag
      display: flex
      justify-content: center
      background: var(--orange-color)
      border-top-left-radius: 10px
      border-top-right-radius: 10px
      padding: 8px 12px
      .best-text
        font-size: 0.75rem
        font-weight: 500
        color: var(--white-color)
    .card-info
      width: 100%
      padding: 20px 15px
      display: grid
      grid-template-areas: 'licence licence' 'name name' 'properties properties' 'features features' 'btns btns' 'ad ad'
      grid-template-columns: unset
      grid-gap: 15px
      .name
        grid-area: name
        gap: 10px
        img
          width: 40px
          border-radius: 5px
        .text
          padding-right: unset
          font-size: 1rem
        .best-offer
          display: none
      .properties
        grid-area: properties
        display: flex
        flex-direction: row
        flex-wrap: wrap
        gap: 15px 10px
        margin-bottom: 5px
        .line
          gap: 3px
          width: 48%
          .key
            font-size: 0.6875rem
          .value
            font-size: 0.875rem
      .features
        grid-area: features
        flex-wrap: wrap
        gap: 10px
        margin-bottom: 5px
        .feature
          padding: unset
          border: unset
          width: 48%
          .text
            font-size: 0.625rem
      .ad-block
        grid-area: ad
        text-align: center
        align-self: center
        font-size: 0.625rem
      .licence-block
        grid-area: licence
        flex-direction: row
        justify-content: space-between
        .bank
          font-size: 0.75rem
        .licence
          font-size: 0.75rem
      .card-btns
        .apply
          padding: 10px
          width: unset
          flex: 1 0 0
          height: 50px
          font-size: 0.75rem
          border-radius: 5px
        .more
          width: 50px
          height: 50px
          border-radius: 5px
  .loan-item
    .card-img
      grid-gap: 10px
      padding: 10px
      margin-bottom: 15px
      .best-offer
        padding: 5px 10px
        font-size: 0.625rem
      .loan-img
        max-width: 35px
        max-height: 35px
      .text
        font-size: 0.875rem
    .card-info
      padding: 0 10px
      gap: 15px
      .properties
        .line
          font-size: 0.625rem
      .apply-btn
        padding: 10px
        font-size: 0.75rem
        margin-bottom: 15px
  .rko-item
    border-radius: 10px
    border: 2px solid var(--bg-gray-color)
    padding: 15px
    width: 100%
    display: grid
    box-shadow: var(--block-shadow)
    .best-rko
      display: block
      margin: -15px -15px 20px -15px
      padding: 8px 12px
      background: var(--orange-color)
      border-top-left-radius: 10px
      border-top-right-radius: 10px
      text-align: center
      color: var(--white-color)
      font-size: 0.75rem
      font-weight: 500
    .card-info
      display: grid
      grid-template-areas: "lic lic" "name name" "props props" "feats feats" "buttons buttons" "ad ad" "all all"
      grid-template-columns: unset
      gap: 15px 10px
      .name
        grid-area: name
        display: flex
        flex-direction: row
        align-items: center
        gap: 10px
        img
          width: 40px
          height: 40px
          border-radius: 10px
          border: 1px solid var(--ad-color)
        .text
          font-size: 1rem
        .best-offer
          display: none
      .properties
        grid-area: props
        display: grid
        grid-template-columns: repeat(2, auto)
        gap: 15px 10px
        margin-bottom: 5px
        .line
          gap: 3px
          .key
            font-size: 0.6875rem
          .value
            font-size: 0.875rem
      .features
        grid-area: feats
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: center
        gap: 10px
        margin-bottom: 5px
        .feature
          display: flex
          height: fit-content
          padding: 0
          border: unset
          .text
            font-size: 0.6875rem
      .wide-block
        display: none
      .wide-block2
        display: none
      .all-rates-btn-tablet
        display: none
      .ad-block
        grid-area: ad
        display: flex
        justify-content: center
        font-size: 0.625rem
        font-weight: 300
        margin-bottom: 5px
      .ad-margin
        margin-bottom: 0
      .licence-block
        grid-area: lic
        justify-content: space-between
        .bank
          font-size: 0.75rem
        .licence
          font-size: 0.75rem
      .card-btns
        grid-area: buttons
        .apply
          width: calc(100% - 40px)
          height: 40px
          border-radius: 5px
          padding: 10px 20px
          font-size: 0.75rem
        .more
          width: 40px
          height: 40px
          border-radius: 5px
          img
            width: 24px
            height: 24px
      .all-rates
        grid-area: all
        display: flex
        justify-content: center
        align-items: center
        background: var(--main-color)
        margin: 0 -15px -15px -15px
        padding: 10px 20px
        width: calc(100% + 30px)
        border-bottom-left-radius: 10px
        border-bottom-right-radius: 10px
        transition: .3s ease
        svg
          width: 20px
          height: 20px
          margin-top: 1px
          transition: .3s ease
        .text
          color: var(--white-color)
          font-size: 0.75rem
          font-weight: 500
      .all-rates--opened
        transition: .3s ease
        border-bottom-left-radius: unset
        border-bottom-right-radius: unset
        svg
          transition: .3s ease
          transform: rotate(180deg)
    .card-info-gap
      grid-template-areas: "lic lic" "name name" "props props" "feats feats" "buttons buttons" "ad ad"
      .all-rates
        display: none
    .all-rates-block
      margin-top: 15px
      display: flex
      flex-direction: column
      .rate
        display: grid
        grid-template-areas: 'name name' 'props props' 'btns btns'
        align-items: unset
        grid-template-columns: repeat(2, auto)
        margin: 0 -15px
        padding: 20px 15px
        gap: 15px
        .name
          max-width: 100%
          text-overflow: ellipsis
          font-size: 1rem
        .properties
          grid-area: props
          display: grid
          grid-template-columns: repeat(2, auto)
          margin-bottom: 5px
          gap: 10px
          .line
            .key
              font-size: 0.6875rem
            .value
              overflow: hidden
              text-overflow: ellipsis
              font-size: 0.8125rem
        .card-btns
          grid-area: btns
          display: flex
          flex-direction: row
          gap: 10px
          .apply
            width: calc(100% - 40px)
            height: 40px
            border-radius: 5px
            padding: 10px 20px
            font-size: 0.75rem
          .more
            width: 40px
            height: 40px
            border-radius: 5px
            img
              width: 24px
              height: 24px
        &:nth-child(2n)
          background: var(--bg-gray-color)
  .rko-item--opened
    padding-bottom: 15px
  .bestMini
    grid-column: 1/-1
</style>
