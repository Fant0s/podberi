<template>
  <transition name="wrapper">
    <div
      v-if="filterMenuOpen"
      class="filter-wrapper"
      @click="closeFilterMenu"
    ></div>
  </transition>
  <transition name="filters">
    <div v-if="filterMenuOpen" class="filters-menu">
      <div class="filter-head">
        <div class="head">Дополнительные фильтры</div>
        <button class="filter-close" @click="closeFilterMenu">
          <img src="@/assets/images/icons/close-filter.svg" alt="" />
        </button>
      </div>
      <div
        v-if="
          $route.name === 'kreditnie-karty' || $route.name === 'debetovie-karty'
        "
        class="extra-filters"
      >
        <custom-select-checkbox
          ref="filter1"
          :options="banks"
          @send-checkboxes="getCheckboxesMenu"
        >
          <template #title>Банк</template>
        </custom-select-checkbox>
        <custom-select-checkbox
          ref="filter2"
          :options="cashbackFormat"
          @send-checkboxes="getCheckboxesMenu"
        >
          <template #title>Формат кэшбека</template>
        </custom-select-checkbox>
        <custom-select-checkbox
          ref="filter3"
          :options="paymentSystem"
          @send-checkboxes="getCheckboxesMenu"
        >
          <template #title>Платежная система</template>
        </custom-select-checkbox>
        <filter-menu-features
          ref="menu-features"
          @feature-return="getFeaturesMenu"
        />
        <div class="extra-bottom">
          <transition name="clear-filters">
            <button
              v-if="extraFilterData.features.length !== 0 || showResult"
              class="show-result-btn"
              @click="sendFilterMenu"
            >
              Показать предложения
            </button>
          </transition>
          <transition name="clear-filters">
            <button
              v-if="extraFilterData.features.length !== 0 || showClear"
              class="clear-filters-btn"
              @click="resetFilters"
            >
              Сбросить
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M18 18L6 6"
                  stroke="#BBBBBB"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </transition>
        </div>
      </div>

      <div v-if="$route.name === 'rko'" class="extra-filters">
        <custom-select-checkbox
          ref="filter4"
          :options="banks"
          @send-checkboxes="getCheckboxesMenu"
        >
          <template #title>Банк</template>
        </custom-select-checkbox>
        <filter-menu-features
          ref="menu-features2"
          @feature-return="getFeaturesMenu"
        />
        <div class="extra-bottom">
          <transition name="clear-filters">
            <button
              v-if="extraFilterData.features.length !== 0 || showResult"
              class="show-result-btn"
              @click="sendFilterMenu"
            >
              Показать предложения
            </button>
          </transition>
          <transition name="clear-filters">
            <button
              v-if="extraFilterData.features.length !== 0 || showClear"
              class="clear-filters-btn"
              @click="resetFilters"
            >
              Сбросить
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M18 18L6 6"
                  stroke="#BBBBBB"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import customSelectCheckbox from "@/components/UI/custom-select-checkbox.vue";
import filterMenuFeatures from "@/components/FilterMenuFeatures.vue";
export default {
  components: { customSelectCheckbox, filterMenuFeatures },
  props: {
    filterMenuOpen: { type: Boolean },
  },
  emits: ["close-filter-menu", "send-filter-menu"],
  data() {
    return {
      banks: [],
      openMenu: false,
      cashbackFormat: ["Рубли", "Баллы", "Мили"],
      paymentSystem: ["Mastercard", "VISA", "UnionPay", "МИР"],
      extraFilterData: {
        checkboxes: {},
        features: [],
      },
      showClear: false,
      showResult: false,
    };
  },
  watch: {
    extraFilterData: {
      deep: true,
      handler() {
        this.checkboxFull();
      },
    },
  },
  mounted() {
    this.getBanks();
  },
  methods: {
    async getBanks() {
      await this.$api
        .get("/banks")
        .then((response) => {
          response.data.items.forEach((bank) => {
            this.banks.push(bank.bank_name);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendFilterMenu() {
      this.$emit("send-filter-menu", this.extraFilterData);
    },
    closeFilterMenu() {
      this.$emit("close-filter-menu");
    },
    openFilter(event) {
      const filter = event.target.closest(".extra-filter");
      const answer = filter.querySelector(".menu");
      const image = filter.querySelector(".btn-img");
      filter.classList.toggle("extra-filter--opened");
      answer.classList.toggle("menu--opened");
      image.classList.toggle("btn-img--opened");
    },
    getCheckboxesMenu(name, checkboxes) {
      this.extraFilterData.checkboxes[`${name}`] = checkboxes;
    },
    getFeaturesMenu(features) {
      this.extraFilterData.features = features;
    },
    checkboxFull() {
      let keys = Object.keys(this.extraFilterData.checkboxes);
      if (keys) {
        keys.forEach((item) => {
          if (this.extraFilterData.checkboxes[item].length === 0) {
            this.showClear = false;
            this.showResult = false;
          } else {
            this.showClear = true;
            this.showResult = true;
          }
        });
      }
    },
    resetFilters() {
      if (this.$refs["menu-features"]) {
        this.$refs["menu-features"].resetFeatures();
      }
      if (this.$refs["menu-features2"]) {
        this.$refs["menu-features2"].resetFeatures();
      }
      if (this.$refs.filter1) {
        this.$refs.filter1.resetCheckboxes();
      }
      if (this.$refs.filter2) {
        this.$refs.filter2.resetCheckboxes();
      }
      if (this.$refs.filter3) {
        this.$refs.filter3.resetCheckboxes();
      }
      if (this.$refs.filter4) {
        this.$refs.filter4.resetCheckboxes();
      }
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.clear-filters-enter-active
  transition: all 0.4s ease-out
  opacity: 1
.clear-filters-leave-active
  transition: all 0.3s ease
  opacity: 1
.clear-filters-enter-from,
.clear-filters-leave-to
  opacity: 0

.filters-enter-active
  transition: all 0.4s ease-out
.filters-leave-active
  transition: all 0.3s ease
.filters-enter-from,
.filters-leave-to
  transform: translateX(-100svw)

.wrapper-enter-active
  transition: all 0.4s ease-out
.wrapper-leave-active
  transition: all 0.3s ease
.wrapper-enter-from,
.wrapper-leave-to
  opacity: 0

.filter-wrapper
  position: fixed
  margin-top: -76px
  z-index: 99
  width: 100svw
  height: 100svh
  background: rgba(34, 34, 34, 0.7)
.filters-menu
  position: fixed
  margin-top: -76px
  z-index: 99
  width: fit-content
  max-width: 450px
  height: 100svh
  background: var(--white-color)
  .filter-head
    padding: 40px 30px
    background: var(--black-color)
    display: flex
    flex-direction: row
    justify-content: space-between
    width: 450px
    .head
      font-size: 1.5rem
      font-weight: 500
      color: var(--white-color)
    .filter-close
      padding: unset
      img
        transition: .3s ease
        width: 30px
        height: 30px
  .extra-filters
    padding: 40px 30px
    display: flex
    flex-direction: column
    height: calc(100% - 110px)
    overflow-y: scroll
    gap: 40px
    .extra-bottom
      display: flex
      flex-direction: column
      margin-top: 20px
      gap: 40px
      align-items: center
      .show-result-btn
        border: 2px solid var(--main-color)
        border-radius: 10px
        padding: 20px
        color: var(--main-color)
        font-size: 1.125rem
        font-weight: 500
        width: 100%
        transition: .3s ease
        &:hover
          transition: .3s ease
          background: var(--main-color)
          color: var(--white-color)
      .clear-filters-btn
        display: flex
        align-items: center
        padding: unset
        gap: 10px
        color: var(--gray-color)
        font-size: 1rem
        font-weight: 500
@media only screen and (max-width: $bp-pc)
  .filters-enter-from,
  .filters-leave-to
    transform: translateY(-100svh)
  .filter-wrapper
    position: fixed
  .filters-menu
    position: fixed
    width: 100svw
    max-width: unset
    height: fit-content
    overflow-x: hidden
    .filter-head
      padding: 25px 60px
      width: 100svw
      .head
        font-size: 1rem
      .filter-close
        img
          width: 24px
          height: 24px
    .extra-filters
      padding: 30px 60px 20px 60px
      gap: 20px
      border-bottom: 20px solid var(--white-color)
      overflow-y: scroll
      overflow-x: hidden
      height: calc(100svh - 74px)
      max-height: 880px
      .extra-bottom
        display: flex
        flex-direction: column
        margin-top: 10px
        gap: 30px
        align-items: center
        .show-result-btn
          padding: 23px
          font-size: 1rem
        .clear-filters-btn
          font-size: 1rem
@media only screen and (max-width: $bp-tablet)
  .filters-enter-from,
  .filters-leave-to
    transform: translateY(-100svh)
  .filter-wrapper
    position: fixed
  .filters-menu
    position: fixed
    width: 100svw
    height: fit-content
    .filter-head
      padding: 40px 15px 20px
      width: 100svw
      .head
        font-size: 1rem
      .filter-close
        img
          width: 24px
          height: 24px
    .extra-filters
      padding: 20px 15px
      gap: 20px
      overflow-y: scroll
      overflow-x: hidden
      max-height: calc(100svh - 84px)
      .extra-bottom
        display: flex
        flex-direction: column
        margin-top: 0
        gap: 20px
        align-items: center
        .show-result-btn
          padding: 19px
          font-size: 0.875rem
        .clear-filters-btn
          font-size: 0.875rem
</style>
