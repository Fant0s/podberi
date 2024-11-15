<template>
  <section class="request-section">
    <div class="content">
      <div class="block debit">
        <p class="title">Дебетовые карты</p>
        <div class="list">
          <router-link class="item" to="">Лучшие дебетовые карты</router-link>
          <router-link class="item" to=""
            >Дебетовые карты с кэшбэком</router-link
          >
          <router-link class="item" to=""
            >Дебетовые карты для ребенка</router-link
          >
          <router-link class="item" to=""
            >С бесплатным обслуживанием</router-link
          >
          <router-link class="item" to=""
            >Виртуальные дебетовые карты</router-link
          >
          <router-link class="item" to="">Дебетовые карты МИР</router-link>
          <router-link class="item" to="">С процентами на остаток</router-link>
          <router-link class="item" to=""
            >Дебетовые карты для пенсионеров</router-link
          >
          <router-link class="item" to="">Дебетовые карты UnionPay</router-link>
        </div>
      </div>
      <div class="block credit">
        <p class="title">Кредитные карты</p>
        <div class="list">
          <router-link class="item" to="">Лучшие кредитные карты</router-link>
          <router-link class="item" to=""
            >Кредитные карты без отказа</router-link
          >
          <router-link class="item" to=""
            >Кредитные карты с плохой КИ</router-link
          >
          <router-link class="item" to=""
            >Виртуальные кредитные карты</router-link
          >
          <router-link class="item" to="">Карты рассрочки</router-link>
          <router-link class="item" to=""
            >Карты со 100 % одобрением</router-link
          >
          <router-link class="item" to="">С моментальным решением</router-link>
          <router-link class="item" to=""
            >Кредитные карты с доставкой</router-link
          >
          <router-link class="item" to="">Кредитные карты UnionPay</router-link>
        </div>
      </div>
      <div class="block loan">
        <p class="title">Займы</p>
        <div class="list">
          <router-link class="item" to="">Займы на карту</router-link>
          <router-link class="item" to="">Займы без процентов</router-link>
          <router-link class="item" to="">Займы без проверок</router-link>
          <router-link class="item" to="">Займы онлайн</router-link>
          <router-link class="item" to=""
            >Займы на карту без отказа</router-link
          >
          <router-link class="item" to="">Займы под ПТС</router-link>
          <router-link class="item" to="">Займы без отказа</router-link>
          <router-link class="item" to="">Займы с плохой КИ</router-link>
        </div>
      </div>
      <div class="block rko">
        <p class="title">Счета для бизнеса</p>
        <div class="list">
          <router-link class="item" to="">Кредит для бизнеса</router-link>
          <router-link class="item" to="">Кредит для ИП</router-link>
          <router-link class="item" to="">Кредит для ООО</router-link>
          <router-link class="item" to="">Депозиты для бизнеса</router-link>
          <router-link class="item" to="">Зарплатный проект</router-link>
          <router-link class="item" to="">Эквайринг</router-link>
          <router-link class="item" to="">Интернет-эквайринг</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.request-section
  background: var(--bg-gray-color)
  padding: 60px 0 150px
  .content
    padding-top: 0
    padding-bottom: 0
    display: flex
    flex-direction: row
    justify-content: space-between
    gap: 20px
    .block
      .title
        font-size: 1rem
        font-weight: 500
        margin-bottom: 20px
      .list
        display: flex
        flex-direction: column
        gap: 10px
        .item
          pointer-events: none
          cursor: default
          color: var(--gray-color)
          font-size: 1rem
          font-weight: 400
          transition: 0.3s ease
          //&:hover
          //  transition: 0.3s ease
          //  color: var(--ad-color)
@media only screen and (max-width: $bp-pc)
  .request-section
    padding: 40px 0 100px
    .content
      display: grid
      grid-template-areas: 'debit credit' 'loan rko'
      justify-content: unset
      gap: 42px 20px
      .block
        .title
          margin-bottom: 15px
          line-height: 100%
        .list
          display: flex
          flex-direction: column
          gap: 10px
          .item
            line-height: 130%
      .debit
        grid-area: debit
      .credit
        grid-area: credit
      .loan
        grid-area: loan
      .rko
        grid-area: rko
@media only screen and (max-width: $bp-tablet)
  .request-section
    padding: 30px 0 80px
    .content
      display: flex
      flex-direction: column
      gap: 30px
      .block
        .title
          margin-bottom: 15px
          font-size: 0.875rem
        .list
          gap: 10px
          .item
            font-size: 0.875rem
</style>
