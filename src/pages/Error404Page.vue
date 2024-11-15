<template>
  <Head>
    <title>404: Страница не найдена</title>
    <meta name="description" content="Ошибка 404." />
  </Head>
  <section class="error-page content">
    <div class="error">
      <img src="@/assets/images/error-image.webp" class="image" alt="" />
      <p class="title">
        Кажется страница потерялась в виртуальном пространстве <br />
        Может, поищем её в другом месте?
      </p>
      <router-link to="/" class="btn"> На главную</router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.error-page
  height: calc(100svh - 76px)
  display: flex
  align-items: center
  justify-content: center
  .error
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    margin-top: -76px
    width: 100%
    gap: 30px
    .image
      width: 670px
    .title
      font-size: 1.375rem
      font-weight: 400
      line-height: 130%
      text-align: center
    .btn
      display: flex
      justify-content: center
      align-items: center
      margin-top: 30px
      width: 300px
      padding: 20px
      background: var(--main-color)
      border-radius: 10px

      color: var(--white-color)
      font-size: 1.25rem
      font-weight: 500

@media only screen and (max-width: $bp-pc)
  .error-page
    .error
      gap: 20px
      .image
        width: 460px
      .title
        font-size: 1rem
        font-weight: 500
      .btn
        font-size: 1rem
        margin-top: 10px
@media only screen and (max-width: $bp-tablet)
  .error-page
    .error
      gap: 15px
      .image
        width: 290px
      .title
        font-size: 0.875rem
        font-weight: 400
        width: 290px
      .btn
        margin-top: 15px
        width: 100%
        height: 50px
        font-size: 0.875rem
</style>
