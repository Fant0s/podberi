<template>
  <section class="card-info-block">
    <div class="info-nav-slider">
      <swiper
        v-if="type === 'rko'"
        class="swiper"
        slides-per-view="auto"
        :space-between="10"
        :breakpoints="{
          320: { spaceBetween: 10 },
          600: { spaceBetween: 15 },
          1200: { spaceBetween: 20 },
        }"
      >
        <swiper-slide
          v-for="item in info_nav_items_rko"
          :key="item"
          class="slide"
        >
          <button
            class="btn"
            :class="{ 'filled-black': activeItem === item }"
            @click="getInfoItem(item)"
          >
            {{ item }}
          </button>
        </swiper-slide>
      </swiper>
      <swiper
        v-else
        class="swiper"
        slides-per-view="auto"
        :space-between="10"
        :breakpoints="{
          320: { spaceBetween: 10 },
          600: { spaceBetween: 15 },
          1200: { spaceBetween: 20 },
        }"
      >
        <swiper-slide v-for="item in info_nav_items" :key="item" class="slide">
          <button
            class="btn"
            :class="{ 'filled-black': activeItem === item }"
            @click="getInfoItem(item)"
          >
            {{ item }}
          </button>
        </swiper-slide>
      </swiper>
    </div>
    <div
      v-if="activeItem === 'Условия и тарифы' && type === 'debetovie-karty'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Обслуживание</p>
        <p class="text">{{ service }}</p>
      </div>
      <div class="line">
        <p class="name">Процент на остаток</p>
        <p class="text">{{ interest_on_balance }}</p>
      </div>
      <div class="line">
        <p class="name">Кэшбек</p>
        <p class="text">до {{ card.max_cashback_percent }}%</p>
      </div>
      <div class="line">
        <p class="name">Максимальный кэшбек</p>
        <p class="text">
          до {{ card.max_cashback }} {{ card.cashback_format }}
        </p>
      </div>
      <div class="line">
        <p class="name">Начисление бонусов</p>
        <div class="text" v-html="card.conditions.accrual_of_bonuses"></div>
      </div>

      <div class="line">
        <p class="name">Снятие наличных</p>
        <div class="text" v-html="card.conditions.cash_withdrawal"></div>
      </div>
      <div class="line">
        <p class="name">Овердрафт</p>
        <p class="text">{{ overdraft }}</p>
      </div>
      <div class="line">
        <p class="name">Валюты карты</p>
        <p class="text">{{ card.currencies }}</p>
      </div>
      <div class="line">
        <p class="name">Выпуск и перевыпуск карты</p>
        <div class="text">
          <p class="text-item">Выпуск - {{ issue }}</p>
          <p class="text-item">Перевыпуск карты - {{ reissue }}</p>
        </div>
      </div>
      <div class="line">
        <p class="name">Акции и предложения</p>
        <div class="text" v-html="card.descriptions.stocks"></div>
      </div>
      <div class="line">
        <p class="name">SMS-уведомления</p>
        <p class="text">{{ messages }}</p>
      </div>
    </div>
    <div
      v-if="activeItem === 'Описание' && type === 'debetovie-karty'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Оформление и получение карты</p>
        <div class="text" v-html="card.descriptions.execution"></div>
      </div>
      <div class="line">
        <p class="name">Обслуживание</p>
        <div class="text" v-html="card.descriptions.service"></div>
      </div>
      <div class="line">
        <p class="name">Начисление процентов</p>
        <div class="text" v-html="card.descriptions.interest_calculation"></div>
      </div>
      <div class="line">
        <p class="name">Переводы</p>
        <div class="text" v-html="card.descriptions.transfers"></div>
      </div>
      <div class="line">
        <p class="name">Снятие наличных</p>
        <div class="text" v-html="card.descriptions.cash_withdrawal"></div>
      </div>
      <div class="line">
        <p class="name">Подключаемые опции</p>
        <div class="text" v-html="card.descriptions.connectable_options"></div>
      </div>
      <div class="line">
        <p class="name">Акции и скидки</p>
        <div class="text" v-html="card.descriptions.stocks"></div>
      </div>
      <div class="line">
        <p class="name">Итог по карте</p>
        <div class="text" v-html="card.descriptions.result"></div>
      </div>
    </div>
    <div
      v-if="
        activeItem === 'Документы и требования' && type === 'debetovie-karty'
      "
      class="info-section"
    >
      <div class="line">
        <p class="name">Гражданство РФ</p>
        <p class="text">{{ citizenship_russia }}</p>
      </div>
      <div class="line">
        <p class="name">Постоянная регистрация в РФ</p>
        <p class="text">{{ reg_russia }}</p>
      </div>
      <div class="line">
        <p class="name">Возраст</p>
        <p class="text">{{ age }}</p>
      </div>
    </div>
    <div
      v-if="activeItem === 'О банке' && type === 'debetovie-karty'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Название организации</p>
        <p class="text">{{ card.bank_details.juridical_name }}</p>
      </div>
      <div class="line">
        <p class="name">Адрес головного офиса</p>
        <p class="text">{{ card.bank_details.main_office_address }}</p>
      </div>
      <div class="line">
        <p class="name">Номер лицензии ЦБ РФ</p>
        <p class="text">{{ card.bank_details.license_number }}</p>
      </div>
      <div class="line">
        <p class="name">Телефон</p>
        <p class="text">
          <a :href="`tel:${card.bank_details.phone_number}`">
            {{ card.bank_details.phone_number }}
          </a>
        </p>
      </div>
      <div class="line">
        <p class="name">Сайт</p>
        <p class="text">
          <a :href="`${card.bank_details.site}`" target="_blank">
            {{ card.bank_details.site }}
          </a>
        </p>
      </div>
      <div class="line">
        <p class="name">ОГРН</p>
        <p class="text">{{ card.bank_details.ogrn }}</p>
      </div>
    </div>

    <div
      v-if="activeItem === 'Условия и тарифы' && type === 'kreditnie-karty'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Льготный период</p>
        <p class="text">до {{ card.no_percent_period }} дней</p>
      </div>
      <div class="line">
        <p class="name">Кредитная ставка</p>
        <p class="text">от {{ card.min_percent }} до {{ card.max_percent }}%</p>
      </div>
      <div class="line">
        <p class="name">Кредитный лимит</p>
        <p class="text">{{ formatNumber(card.credit_limit) }} руб.</p>
      </div>
      <div class="line">
        <p class="name">Обслуживание</p>
        <p class="text">{{ service }}</p>
      </div>
      <div class="line">
        <p class="name">Снятие наличных</p>
        <div class="text" v-html="card.conditions.cash_withdrawal"></div>
      </div>
      <div class="line">
        <p class="name">Кэшбек</p>
        <p class="text">до {{ card.max_cashback_percent }}%</p>
      </div>
      <div class="line">
        <p class="name">Максимальный кэшбек</p>
        <p class="text">
          до {{ card.max_cashback }} {{ card.cashback_format }}
        </p>
      </div>
      <div class="line">
        <p class="name">Условия кэшбека</p>
        <div class="text" v-html="card.conditions.cashback"></div>
      </div>
      <div class="line">
        <p class="name">Акции</p>
        <div class="text" v-html="card.conditions.stocks"></div>
      </div>
      <div class="line">
        <p class="name">Выпуск и перевыпуск карты</p>
        <div class="text">
          <p class="text-item">Выпуск - {{ issue }}</p>
          <p class="text-item">Перевыпуск карты - {{ reissue }}</p>
        </div>
      </div>
      <div class="line">
        <p class="name">SMS-информирование</p>
        <p class="text">{{ messages }}</p>
      </div>
      <div class="line">
        <p class="name">Условия по карте</p>
        <div class="text">
          <a :href="`${card.all_conditions_link}`" target="_blank"> Открыть </a>
        </div>
      </div>
    </div>
    <div
      v-if="activeItem === 'Описание' && type === 'kreditnie-karty'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Оформление и получение карты</p>
        <div class="text" v-html="card.descriptions.execution"></div>
      </div>
      <div class="line">
        <p class="name">Беспроцентный период</p>
        <div class="text" v-html="card.descriptions.no_percent"></div>
      </div>
      <div class="line">
        <p class="name">Тарифы и лимиты</p>
        <div class="text" v-html="card.descriptions.rates"></div>
      </div>
      <div class="line">
        <p class="name">Дополнительные услуги</p>
        <div class="text" v-html="card.descriptions.add_services"></div>
      </div>
      <div class="line">
        <p class="name">Снятие наличных</p>
        <div class="text" v-html="card.descriptions.cash_withdrawal"></div>
      </div>
      <div class="line">
        <p class="name">Переводы</p>
        <div class="text" v-html="card.descriptions.transfers"></div>
      </div>
      <div class="line">
        <p class="name">Рефинансирование</p>
        <div class="text" v-html="card.descriptions.refinancing"></div>
      </div>
      <div class="line">
        <p class="name">Итог по карте</p>
        <div class="text" v-html="card.descriptions.result"></div>
      </div>
    </div>
    <div
      v-if="
        activeItem === 'Документы и требования' && type === 'kreditnie-karty'
      "
      class="info-section"
    >
      <div class="line">
        <p class="name">Документы</p>
        <div class="text">
          <p v-for="doc in card.credit_rates" :key="doc" class="text-item">
            {{ doc }}
          </p>
        </div>
      </div>
      <div class="line">
        <p class="name">Гражданство РФ</p>
        <p class="text">{{ citizenship_russia }}</p>
      </div>
      <div class="line">
        <p class="name">Постоянная регистрация в РФ</p>
        <p class="text">{{ reg_russia }}</p>
      </div>
      <div class="line">
        <p class="name">Возраст</p>
        <p class="text">{{ age }}</p>
      </div>
      <div class="line">
        <p class="name">Стаж на последнем месте работы</p>
        <p class="text">{{ card.work_exp }}</p>
      </div>
      <div class="line">
        <p class="name">Дополнительные требования</p>
        <div class="text" v-html="card.conditions.add_requirements"></div>
      </div>
    </div>
    <div
      v-if="activeItem === 'О банке' && type === 'kreditnie-karty'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Название организации</p>
        <p class="text">{{ card.bank_details.juridical_name }}</p>
      </div>
      <div class="line">
        <p class="name">Адрес головного офиса</p>
        <p class="text">{{ card.bank_details.main_office_address }}</p>
      </div>
      <div class="line">
        <p class="name">Номер лицензии ЦБ РФ</p>
        <p class="text">{{ card.bank_details.license_number }}</p>
      </div>
      <div class="line">
        <p class="name">Телефон</p>
        <p class="text">
          <a :href="`tel:${card.bank_details.phone_number}`">
            {{ card.bank_details.phone_number }}
          </a>
        </p>
      </div>
      <div class="line">
        <p class="name">Сайт</p>
        <p class="text">
          <a :href="`${card.bank_details.site}`" target="_blank">
            {{ card.bank_details.site }}
          </a>
        </p>
      </div>
      <div class="line">
        <p class="name">ОГРН</p>
        <p class="text">{{ card.bank_details.ogrn }}</p>
      </div>
    </div>

    <div
      v-if="activeItem === 'Условия и тарифы' && type === 'rko'"
      class="info-section"
    >
      <div class="line">
        <p class="name">Обслуживание</p>
        <div class="text">
          <p class="text-item">
            При оплате за 1 месяц: {{ cardMain.service_1_month }} рублей в месяц
          </p>
          <p class="text-item">
            При оплате за 6 месяцев: {{ cardMain.service_6_month }} рублей в
            месяц
          </p>
          <p class="text-item">
            При оплате за год: {{ cardMain.service_1_year }} рублей в месяц
          </p>
        </div>
      </div>
      <div class="line">
        <p class="name">Бесплатные переводы юрлицам</p>
        <p class="text">{{ cardMain.free_transfers_ur }} переводов в месяц</p>
      </div>
      <div class="line">
        <p class="name">Стоимость перевода юрлицам</p>
        <p class="text">{{ cardMain.price_transfers_ur }} рублей за платеж</p>
      </div>
      <div class="line">
        <p class="name">Для ИП</p>
        <p class="text">{{ for_ip }}</p>
      </div>
      <div class="line">
        <p class="name">Для ООО</p>
        <p class="text">{{ for_ooo }}</p>
      </div>
      <div class="line">
        <p class="name">Акции и спецпредложения</p>
        <div class="text" v-html="cardMain.descriptions.stocks"></div>
      </div>
      <div class="line">
        <p class="name">Эквайринг</p>
        <p class="text">от {{ card.min_eq }}%</p>
      </div>
      <div class="line">
        <p class="name">Открытие без личной встречи</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Овернайт</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Стоимость открытия</p>
        <p class="text">{{ price_open }}</p>
      </div>
      <div class="line">
        <p class="name">Скорость открытия</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Переводы физлицам</p>
        <div
          class="text"
          v-html="cardMain.description?.transfer_commission"
        ></div>
      </div>
      <div class="line">
        <p class="name">Снятие наличных</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Внесение наличных</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Операционный день</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Депозиты</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Кредиты для бизнеса</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Онлайн-бухгалтерия</p>
        <p class="text"></p>
      </div>
      <div class="line">
        <p class="name">Подходит для госзакупок</p>
        <p class="text"></p>
      </div>
    </div>
    <div
      v-if="activeItem === 'Описание' && type === 'rko'"
      class="info-section"
    ></div>
    <div v-if="activeItem === 'О банке' && type === 'rko'" class="info-section">
      <div class="line">
        <p class="name">Название организации</p>
        <p class="text">{{ card.bank_details.juridical_name }}</p>
      </div>
      <div class="line">
        <p class="name">Адрес головного офиса</p>
        <p class="text">{{ card.bank_details.main_office_address }}</p>
      </div>
      <div class="line">
        <p class="name">Номер лицензии ЦБ РФ</p>
        <p class="text">{{ card.bank_details.license_number }}</p>
      </div>
      <div class="line">
        <p class="name">Телефон</p>
        <p class="text">
          <a :href="`tel:${card.bank_details.phone_number}`">
            {{ card.bank_details.phone_number }}
          </a>
        </p>
      </div>
      <div class="line">
        <p class="name">Сайт</p>
        <p class="text">
          <a :href="`${card.bank_details.site}`" target="_blank">
            {{ card.bank_details.site }}
          </a>
        </p>
      </div>
      <div class="line">
        <p class="name">ОГРН</p>
        <p class="text">{{ card.bank_details.ogrn }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
export default {
  components: { Swiper, SwiperSlide },
  props: {
    card: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    cardMain: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      info_nav_items: [
        "Описание",
        "Условия и тарифы",
        "Документы и требования",
        "О банке",
      ],
      info_nav_items_rko: ["Описание", "Условия и тарифы", "О банке"],
      activeItem: "Условия и тарифы",
    };
  },
  computed: {
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
    issue: function () {
      if (this.card.issue === 0) {
        return "бесплатно";
      } else return `${this.card.issue} руб.`;
    },
    reissue: function () {
      if (this.card.reissue === 0) {
        return "бесплатно";
      } else return `${this.card.reissue} руб.`;
    },
    age: function () {
      if (this.card.min_age && this.card.max_age) {
        return `от ${this.card.min_age} до ${this.card.max_age} лет`;
      } else if (!this.card.max_age) {
        return `от ${this.card.min_age} лет`;
      } else {
        return `до ${this.card.max_age} лет`;
      }
    },
    cashback: function () {
      if (this.card.cashback === 0) {
        return "Нет";
      } else return `до ${this.card.cashback} %`;
    },
    service: function () {
      if (this.card.min_service === this.card.max_service) {
        if (this.card.min_service === 0 || this.card.min_service === "0") {
          return "Бесплатно";
        }
        return `${this.card.max_service} руб.`;
      } else {
        return `от ${this.card.min_service} до ${this.card.max_service} руб.`;
      }
    },
    overdraft: function () {
      if (this.card.overdraft === true) {
        return "Да";
      } else return "Нет";
    },
    messages: function () {
      if (this.card.min_sms === this.card.max_sms) {
        if (this.card.min_sms === 0) {
          return `Бесплатно`;
        }
        return `${this.card.min_sms} руб./месяц`;
      } else {
        return `От ${this.card.min_sms} до ${this.card.max_sms} руб./месяц`;
      }
    },
    price_open: function () {
      if (this.card.price_open === 0) {
        return "Бесплатно";
      } else {
        return `${this.card.price_open} рублей`;
      }
    },
    for_ip: function () {
      if (this.card.for_ip === true) {
        return "Да";
      } else return "Нет";
    },
    for_ooo: function () {
      if (this.card.for_ooo === true) {
        return "Да";
      } else return "Нет";
    },
    reg_russia: function () {
      if (this.card.reg_russia === true) {
        return "Да";
      } else return "Нет";
    },
    citizenship_russia: function () {
      if (this.card.citizenship_russia === true) {
        return "Да";
      } else return "Нет";
    },
  },
  methods: {
    getInfoItem(val) {
      this.activeItem = val;
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.card-info-block
  display: flex
  flex-direction: column
  gap: 40px
  padding-top: 0
  .info-nav-slider
    max-width: 100%
    .swiper
      overflow: visible
      max-width: 100%
      .slide
        display: flex
        width: auto
        height: auto
        .btn
          padding: 15px 30px
          font-size: 1.125rem
          font-weight: 400
          border-radius: 10px
          background-color: var(--bg-gray-color)
          border: 2px solid var(--bg-gray-color)
          transition: .3s ease
          &:hover
            transition: .3s ease
            border: 2px solid var(--gray-color)
        .filled-black
          cursor: default
          background-color: var(--black-color)
          border: 2px solid var(--black-color)
          color: #fff
          border-radius: 10px
          transition: .3s ease
          &:hover
            transition: .3s ease
            border: 2px solid var(--black-color)
  .info-section
    display: flex
    flex-direction: column
    .line
      border-bottom: 1px solid var(--ad-color)
      padding: 30px 0
      gap: 20px
      display: flex
      flex-direction: row
      .name
        width: 33.2%
        font-size: 1.125rem
        font-weight: 500
        display: flex
        height: fit-content
        flex-direction: row
        gap: 10px
        .tip
          display: flex
          margin-top: 2px
          align-items: center
          cursor: help
          position: relative
          .tip-content
            transition: .3s ease
            opacity: 0
          &:hover
            .tip-content
              visibility: visible
              transition: .3s ease
              opacity: 1
        .tip-content
          visibility: hidden
          width: 150px
          box-shadow: var(--block-shadow)
          background: var(--white-color)
          color: var(--black-color)
          border-radius: 10px
          padding: 10px
          font-size: 0.75rem
          position: absolute
          z-index: 1
          top: 20px
          left: 20px
          opacity: 0
          transition: opacity 0.3s
      .text
        width: 66.8%
        font-size: 1.125rem
        font-weight: 400
        padding-right: 17%
        .text-item
          padding: 30px 0
          border-bottom: 1px solid var(--ad-color)
          &:first-child
            padding-top: 0
          &:last-child
            padding-bottom: 0
            border-bottom: unset
        a
          color: var(--main-color)

@media only screen and (max-width: $bp-pc)
  .card-info-block
    gap: 20px
    padding-bottom: 50px
    .info-nav-slider
      .swiper
        .slide
          .btn
            padding: 10px 20px
            font-size: 0.875rem
          .filled-black
            &:hover
              border-color: var(--black-color)
    .info-section
      .line
        margin: 0 -34px
        padding: 15px 34px
        gap: 30px
        .name
          font-size: 0.875rem
          .tip
            svg
              width: 16px
              height: 16px
        .text
          font-size: 0.875rem
          padding-right: 0
          .text-item
            border-color: transparent
            padding: 10px 0
@media only screen and (max-width: $bp-tablet)
  .card-info-block
    gap: 20px
    padding-bottom: 40px
    .info-nav-slider
      .swiper
        .slide
          .btn
            padding: 8px 12px
            font-size: 0.75rem
          .filled-black
            &:hover
              border-color: var(--black-color)
    .info-section
      margin: 0 -15px
      .line
        flex-direction: column
        padding: 20px 15px
        gap: 10px
        margin: unset
        .name
          width: 100%
          font-size: 0.75rem
          gap: 5px
          .tip
            svg
              width: 13px
              height: 13px
        &:first-child
          padding-top: 0
        .text
          width: 100%
          font-size: 0.75rem
          padding: unset
          .text-item
            padding: 5px 0
            border-bottom: unset
</style>
