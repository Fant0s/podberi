<template>
  <Head>
    <title>ПодбериРУ: Технические работы</title>
    <meta name="description" content="" />
  </Head>
  <section class="tech-page content">
    <div class="tech">
      <img class="image" src="@/assets/images/techwork-image.webp" alt="" />
      <p class="title">
        На сайте ведутся технические работы <br />
        Приносим извинения за доставленные неудобства
      </p>
      <div class="information">
        <p class="text">Следите за новостями в социальных сетях</p>
        <div class="second-sect">
          <div class="socials">
            <a class="item" href="/">
              <img src="@/assets/images/icons/vk_logo.svg" alt="" />
            </a>
            <a class="item" href="/">
              <img src="@/assets/images/icons/telegram_logo.svg" alt="" />
            </a>
            <a class="item" href="/">
              <img src="@/assets/images/icons/odnoklassniki_logo.svg" alt="" />
            </a>
          </div>
          <a class="email" href="mailto: info@podberiru.ru">
            info@podberiru.ru
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Head } from "@vueuse/head";

export default {
  components: { Head },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"

.tech-page
  padding: 0 34px
  .tech
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    gap: 40px
    height: calc(100vh - 76px)
    .image
      height: 400px
    .title
      font-size: 1.5rem
      font-weight: 400
      text-align: center
    .information
      display: flex
      width: 100%
      flex-direction: row
      margin-top: 40px
      padding: 30px 40px
      border-radius: 10px
      background: var(--main-color)
      justify-content: space-between
      align-items: center
      .text
        font-size: 1.5rem
        font-weight: 700
        font-family: Manrope, serif
        color: var(--white-color)
      .second-sect
        display: flex
        flex-direction: row
        align-items: center
        gap: 40px
        .email
          color: var(--white-color)
          font-family: Manrope, serif
          font-size: 1.25rem
          font-weight: 500
        .socials
          display: flex
          flex-direction: row
          gap: 30px
@media only screen and (max-width: $bp-pc)
  .tech-page
    .tech
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      gap: 20px
      .image
        height: 280px
      .title
        font-size: 1.125rem
        font-weight: 400
      .information
        flex-direction: column
        margin-top: 20px
        padding: 20px
        gap: 20px
        .text
          text-align: center
          font-size: 1.125rem
          font-weight: 700
        .second-sect
          flex-direction: row
          gap: 30px
          .socials
            gap: 20px
            .item
              img
                width: 30px
                height: 30px
          .email
            font-size: 1rem
            font-weight: 500
@media only screen and (max-width: $bp-tablet)
  .tech-page
    padding: 0 15px
    .tech
      gap: 15px
      .image
        height: 160px
      .title
        font-size: 0.875rem
        font-weight: 400
      .information
        flex-direction: column
        margin-top: 15px
        padding: 15px 20px
        gap: 20px
        .text
          text-align: center
          font-size: 0.875rem
          font-weight: 700
        .second-sect
          flex-direction: column
          gap: 15px
          .socials
            gap: 20px
            .item
              img
                width: 24px
                height: 24px
          .email
            font-size: 0.75rem
            font-weight: 500
</style>
