<template>
  <section
    class="filter-section"
    :class="{ 'rko-filter-section': $route.name === 'rko' }"
  >
    <div class="content">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>

      <div
        v-if="$route.name === 'kreditnie-karty'"
        class="filters credit-filters"
      >
        <div class="filter-item with-rub">
          <div class="left-sec">
            <span class="name">Кредитный лимит</span>
            <input
              ref="money"
              v-model="filterData.limitPretty"
              class="input"
              type="text"
              placeholder="Любой"
              @input="moneyInputLimit"
            />
          </div>
        </div>
        <div class="filter-item">
          <div class="left-sec">
            <span class="name">Льготный период</span>
            <input
              v-model="filterData.freePeriod"
              class="input"
              type="text"
              placeholder="Любой"
              @input="dayInputFree"
            />
          </div>
        </div>
        <custom-select
          ref="select1"
          :options="percent"
          text="Любая"
          @input="getPercentInput"
        >
          Ставка
        </custom-select>
        <button class="show-offers-btn" @click="applyFilters">
          Показать предложения
        </button>
      </div>

      <div
        v-if="$route.name === 'debetovie-karty'"
        class="filters debit-filters"
      >
        <custom-select
          ref="select2"
          :options="banks"
          text="Любой"
          @input="getBankInput"
        >
          Банк
        </custom-select>
        <button class="show-offers-btn" @click="applyFilters">
          Показать предложения
        </button>
      </div>

      <div v-if="$route.name === 'zaimy'" class="filters zaimy-filters">
        <div class="filter-item with-rub">
          <div class="left-sec">
            <span class="name">Сумма займа</span>
            <input
              ref="money"
              v-model="filterData.sumPretty"
              class="input"
              type="text"
              placeholder="Любая"
              @input="moneyInputSum"
            />
          </div>
        </div>
        <div class="filter-item">
          <div class="left-sec">
            <span class="name">Срок займа</span>
            <input
              v-model="filterData.term"
              class="input"
              type="text"
              placeholder="Любой"
              @input="dayInputTerm"
            />
          </div>
        </div>
        <custom-select
          ref="select3"
          :options="percent"
          text="Любая"
          @input="getPercentLoanInput"
        >
          Ставка
        </custom-select>
        <button class="show-offers-btn" @click="applyFilters">
          Показать предложения
        </button>
      </div>

      <div v-if="$route.name === 'rko'" class="filters rko-filters">
        <custom-select
          ref="select4"
          :options="banks"
          text="Любой"
          @input="getBankInput"
        >
          Банк
        </custom-select>
        <button class="show-offers-btn" @click="applyFilters">
          Показать предложения
        </button>
      </div>

      <div
        v-if="$route.name === 'zaimy'"
        class="bottom-filter zaimy-bot-filter"
      >
        <div class="hidden-block"></div>
        <button
          v-if="!filterDataIsEmpty || filterQueryFull === true"
          class="button clear-filters"
          @click="clearFilters"
        >
          <span class="text">Сбросить</span>
          <img src="@/assets/images/icons/clear-filter.svg" alt="" />
        </button>
      </div>
      <div v-else class="bottom-filter">
        <button class="button more-filters" @click="openFilterMenu">
          <span class="text">Еще фильтры</span>
          <img src="@/assets/images/icons/more-filters.svg" alt="" />
        </button>
        <button
          v-if="!filterDataIsEmpty || filterQueryFull === true"
          class="button clear-filters"
          @click="clearFilters"
        >
          <span class="text">Сбросить</span>
          <img src="@/assets/images/icons/clear-filter.svg" alt="" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import CustomSelect from "@/components/UI/custom-select.vue";

export default {
  components: { CustomSelect },
  props: {
    filterQueryFull: { type: Boolean },
  },
  emits: ["open-filter-menu", "send-query", "default-sort", "clear-btn"],
  data() {
    return {
      filterQuery: "?",
      defaultSort: "best=-1&",
      percent: [
        "до 10%",
        "до 20%",
        "до 30%",
        "до 40%",
        "до 50%",
        "до 60%",
        "до 70%",
      ],
      banks: [],
      filterData: {
        term: "",
        sum: "",
        freePeriod: "",
        limitPretty: "",
        limit: "",
        percentInput: "",
        percentLoanInput: "",
        bank: "",
      },
    };
  },
  computed: {
    filterDataIsEmpty: function () {
      const hasNonEmptyValue = Object.values(this.filterData).some(
        (value) => value !== ""
      );
      return !hasNonEmptyValue;
    },
  },
  // watch: {
  //   filterData: {
  //     deep: true,
  //     handler() {
  //       console.log(this.filterData);
  //     },
  //   },
  // },
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
    openFilterMenu() {
      this.$emit("open-filter-menu");
    },
    clearFilters() {
      this.filterQuery = "";
      this.$emit("clear-btn");
      this.$emit("send-query", this.filterQuery);
      this.filterData.limitPretty = "";
      this.filterData.limit = "";
      this.filterData.freePeriod = "";
      this.filterData.percentInput = "";
      this.filterData.bank = "";
      this.filterData.term = "";
      this.filterData.sumPretty = "";
      this.filterData.sum = "";
      this.filterData.percentLoanInput = "";
      if (this.$refs.select1) {
        this.$refs.select1.resetFilters();
      }
      if (this.$refs.select2) {
        this.$refs.select2.resetFilters();
      }
      if (this.$refs.select3) {
        this.$refs.select3.resetFilters();
      }
      if (this.$refs.select4) {
        this.$refs.select4.resetFilters();
      }
    },
    applyFilters() {
      this.filterQuery = "";
      const hasNonEmptyValue = Object.values(this.filterData).some(
        (value) => value !== ""
      );
      if (hasNonEmptyValue) {
        const nonEmptyFields = {};
        Object.entries(this.filterData).forEach(([key, value]) => {
          if (value !== "") {
            nonEmptyFields[key] = value;
          }
        });
        if (
          "freePeriod" in nonEmptyFields &&
          nonEmptyFields.freePeriod !== ""
        ) {
          this.filterQuery += `no_percent_period$lte=${nonEmptyFields.freePeriod}&`;
        }
        if ("limit" in nonEmptyFields && nonEmptyFields.limit !== "") {
          this.filterQuery += `credit_limit$lte=${nonEmptyFields.limit}&`;
        }
        if (
          "percentInput" in nonEmptyFields &&
          nonEmptyFields.percentInput !== ""
        ) {
          const percent = nonEmptyFields.percentInput.replace(/\D+/g, "");
          this.filterQuery += `max_percent$lte=${percent}&`;
        }
        if ("bank" in nonEmptyFields && nonEmptyFields.bank !== "") {
          this.filterQuery += `bank_details.bank_name=${nonEmptyFields.bank}&`;
        }
        if (
          "percentLoanInput" in nonEmptyFields &&
          nonEmptyFields.percentLoanInput !== ""
        ) {
          const percent = nonEmptyFields.percentLoanInput.replace(/\D+/g, "");
          this.filterQuery += `max_percent$lte=${percent}&`;
        }
        if ("term" in nonEmptyFields && nonEmptyFields.term !== "") {
          this.filterQuery += `max_term$lte=${nonEmptyFields.term}&`;
        }
        if ("sum" in nonEmptyFields && nonEmptyFields.sum !== "") {
          this.filterQuery += `sum$lte=${nonEmptyFields.sum}&`;
        }
        this.$emit("send-query", this.filterQuery);
      }
    },
    getPercentInput(a) {
      if (a === "Любая") {
        a = "";
      }
      this.filterData.percentInput = a;
    },
    getPercentLoanInput(a) {
      if (a === "Любая") {
        a = "";
      }
      this.filterData.percentLoanInput = a;
    },
    getBankInput(a) {
      if (a === "Любой") {
        a = "";
      }
      this.filterData.bank = a;
    },
    dayInputFree(event) {
      const inputValue = event.target.value.replace(/\D+/g, "");
      this.filterData.freePeriod = inputValue;
    },
    dayInputTerm(event) {
      const inputValue = event.target.value.replace(/\D+/g, "");
      this.filterData.term = inputValue;
    },
    moneyInputSum(event) {
      const inputValue = event.target.value.replace(/\D+/g, "");
      this.filterData.sumPretty = inputValue;
      this.filterData.sum = inputValue;
      this.filterData.sumPretty = this.filterData.sumPretty
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    moneyInputLimit(event) {
      const inputValue = event.target.value.replace(/\D+/g, "");
      this.filterData.limitPretty = inputValue;
      this.filterData.limit = inputValue;
      this.filterData.limitPretty = this.filterData.limitPretty
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.filter-section
  background: var(--main-color)
  padding-top: 60px
  position: relative
  .filters-menu
    position: absolute
    display: flex
    height: 100svh
    background: var(--white-color)
  .content
    padding-top: 0
    padding-bottom: 0
    .title
      text-align: center
      font-size: 2.5rem
      font-weight: 500
      color: var(--white-color)
      margin-bottom: 40px
    .filters
      display: flex
      flex-direction: row
      gap: 20px
      .show-offers-btn
        width: 100%
        color: var(--white-color)
        font-size: 1.125rem
        font-weight: 500
        padding: 20px
        border-radius: 10px
        border: 2px solid var(--white-color)
        transition: .3s ease
        &:hover
          transition: .3s ease
          background: var(--white-color)
          color: var(--main-color)
          border: 2px solid var(--main-color)
      .filter-item
        background: var(--white-color)
        border-radius: 10px
        width: 100%
        display: flex
        flex-direction: row
        justify-content: space-between
        padding: 15px
        position: relative
        .left-sec
          display: flex
          flex-direction: column
          gap: 8px
          width: 90%
          .input
            color: var(--black-color)
            font-size: 1.125rem
            font-weight: 500
            padding: unset
            &::placeholder
              color: var(--gray-color)
              font-size: 1.125rem
              font-weight: 500
      .with-rub
        &:after
          position: absolute
          content: ""
          right: 15px
          top: 0
          width: 24px
          height: 100%
          background-image: url(@/assets/images/icons/rub.svg)
          background-size: 100%
          background-repeat: no-repeat
          background-position: center

    .debit-filters
      display: flex
      .custom-select
        width: 75%
      .show-offers-btn
        padding: 20px 10px
        width: 25%
    .rko-filters
      display: flex
      .custom-select
        width: 75%
      .show-offers-btn
        padding: 20px 10px
        width: 25%
        &:hover
          border: 2px solid white
    .bottom-filter
      display: flex
      flex-direction: row
      justify-content: space-between
      margin-top: 30px
      .button
        display: flex
        flex-direction: row
        gap: 10px
        .text
          color: var(--white-color)
          font-size: 1.125rem
          font-weight: 500
    .zaimy-bot-filter
      justify-content: flex-end
      .hidden-block
        height: 26px
.rko-filter-section
  background: var(--black-color)
@media only screen and (max-width: $bp-pc)
  .filter-section
    padding-top: 40px
    padding-bottom: 40px
    .content
      .title
        font-size: 2rem
        margin-bottom: 30px
      .filters
        display: grid
        grid-template-areas: 'filter filter' 'filter filter'
        grid-gap: 20px
        .filter-item
          padding: 12px 15px
          .left-sec
            .name
              font-size: 0.875rem
            .input
              font-size: 1rem
              &::placeholder
                font-size: 1rem
        .show-offers-btn
          font-size: 0.875rem
        .with-rub
          &:after
            width: 20px
      .debit-filters
        display: flex
        .custom-select
          width: 60%
        .show-offers-btn
          padding: 20px 10px
          width: 40%
      .rko-filters
        display: flex
        .custom-select
          width: 64%
        .show-offers-btn
          padding: 20px 10px
          width: 36%
      .bottom-filter
        .button
          .text
            font-size: 1rem
          img
            width: 24px
            height: 24px
@media only screen and (max-width: $bp-tablet)
  .filter-section
    padding-top: 30px
    padding-bottom: 30px
    .content
      .title
        font-size: 1.5rem
        margin-bottom: 20px
      .filters
        display: flex
        flex-direction: column
        gap: 15px
        .filter-item
          padding: 10px 15px
          .left-sec
            gap: 5px
            .name
              font-size: 0.75rem
            .input
              font-size: 0.875rem
              &::placeholder
                font-size: 0.875rem
        .show-offers-btn
          font-size: 0.875rem
      .debit-filters
        display: flex
        .custom-select
          width: 100%
        .show-offers-btn
          padding: 20px 10px
          width: 100%
      .bottom-filter
        .button
          .text
            font-size: 0.875rem
          img
            width: 20px
            height: 20px
      .zaimy-bot-filter
        .hidden-block
          height: 22px
      .rko-filters
        display: flex
        .custom-select
          width: 100%
        .show-offers-btn
          padding: 20px 10px
          width: 100%
</style>
