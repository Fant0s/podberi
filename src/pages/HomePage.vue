<template>
  <Head>
    <title>ПодбериРУ</title>
    <meta name="description" content="" />
  </Head>
  <div class="home-page">
    <section class="start content">
      <div class="nav-btns">
        <button class="btn next">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="chevron-right">
              <path
                id="Icon"
                d="M10.6 7.20001L15.4 12L10.6 16.8"
                stroke="#BBBBBB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </button>

        <button class="btn prev">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="chevron-right">
              <path
                id="Icon"
                d="M10.6 7.20001L15.4 12L10.6 16.8"
                stroke="#BBBBBB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>
      <swiper
        class="start-slider"
        :modules="modules"
        :navigation="{ nextEl: '.next', prevEl: '.prev' }"
        :space-between="30"
        :pagination="pagination"
        :effect="'fade'"
        :slides-per-view="1"
        :loop="true"
        :loop-fill-group-with-blank="true"
        :autoplay="{
          delay: 9000,
          disableOnInteraction: false,
          pauseOnVisibilityChange: false,
        }"
        @swiper="setStartSwiper"
        @slideChangeTransitionStart="onSlideChange"
        @init="onSwiperInit"
      >
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Кредитные карты с выгодными условиями</h1>
            <p class="text">
              Выбирайте из разнообразных предложений ведущих банков, сравнивайте
              условия и находите идеальную карту для своих финансовых целей!
            </p>
            <router-link to="/kreditnie-karty" class="button">
              Выбрать карту
            </router-link>
          </div>
          <div class="container credit-container">
            <img class="image" src="@/assets/images/credit_start.webp" alt="" />
          </div>
          <!--          <div class="swiper-anim"></div>-->
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Дебетовые карты с максимальной выгодой</h1>
            <p class="text">
              Исследуйте предложения лучших банков, сравнивайте условия и
              находите идеальную карту для максимально эффективного управления
              финансами!
            </p>
            <router-link to="/debetovie-karty" class="button">
              Выбрать карту
            </router-link>
          </div>
          <div class="container debit-container">
            <img class="image" src="@/assets/images/debit_start.webp" alt="" />
          </div>
          <!--          <div class="swiper-anim"></div>-->
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Займы с высоким уровнем одобрения</h1>
            <p class="text">
              Изучите предложения от надежных МФО и подберите займ для решения
              финансовых вопросов в короткие сроки — быстро, просто и надежно!
            </p>
            <router-link to="/zaimy" class="button">Выбрать займ</router-link>
          </div>
          <div class="container loan-container">
            <img class="image" src="@/assets/images/loan_start.webp" alt="" />
          </div>
          <!--          <div class="swiper-anim"></div>-->
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Счета для бизнеса с нужными инструментами</h1>
            <p class="text">
              Оцените разнообразие предложений ведущих банков, сравните
              функционал и выбирите счет с подходящим спектром инструментов для
              эффективного управления вашим бизнесом
            </p>
            <router-link to="/rko" class="button">Выбрать счет</router-link>
          </div>
          <div class="container rko-container">
            <img class="image" src="@/assets/images/rko_start.webp" alt="" />
          </div>
          <!--          <div class="swiper-anim"></div>-->
        </swiper-slide>
      </swiper>
      <div class="pagination"></div>
      <swiper
        class="start-slider-mini"
        :modules="modules"
        effect="fade"
        :loop="true"
        :loop-fill-group-with-blank="true"
        :controller="{ control: secondSwiper }"
        @swiper="setFirstSwiper"
      >
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Кредитные карты с выгодными условиями</h1>
            <p class="text">
              Выбирайте из разнообразных предложений ведущих банков, сравнивайте
              условия и находите идеальную карту для своих финансовых целей!
            </p>
            <router-link to="/kreditnie-karty" class="button">
              Выбрать карту
            </router-link>
          </div>
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Дебетовые карты с максимальной выгодой</h1>
            <p class="text">
              Исследуйте предложения лучших банков, сравнивайте условия и
              находите идеальную карту для максимально эффективного управления
              финансами!
            </p>
            <router-link to="/debetovie-karty" class="button">
              Выбрать карту
            </router-link>
          </div>
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Займы с высоким уровнем одобрения</h1>
            <p class="text">
              Изучите предложения от надежных МФО и подберите займ для решения
              финансовых вопросов в короткие сроки — быстро, просто и надежно!
            </p>
            <router-link to="/zaimy" class="button">Выбрать займ</router-link>
          </div>
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <h1 class="title">Счета для бизнеса с нужными инструментами</h1>
            <p class="text">
              Оцените разнообразие предложений ведущих банков, сравните
              функционал и выбирите счет с подходящим спектром инструментов для
              эффективного управления вашим бизнесом
            </p>
            <router-link to="/rko" class="button">Выбрать счет</router-link>
          </div>
        </swiper-slide>
      </swiper>
      <swiper
        class="start-slider-mini2"
        :modules="modules"
        :pagination="{ clickable: true }"
        effect="fade"
        :loop="true"
        :loop-fill-group-with-blank="true"
        :autoplay="{
          delay: 9000,
          disableOnInteraction: false,
        }"
        :controller="{ control: firstSwiper }"
        @swiper="setSecondSwiper"
      >
        <swiper-slide class="slide">
          <div class="card">
            <img
              class="image credit"
              src="@/assets/images/credit-mini.webp"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <img
              class="image debit"
              src="@/assets/images/debit-mini.webp"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <img
              class="image loan"
              src="@/assets/images/loan-mini.webp"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide class="slide">
          <div class="card">
            <img class="image rko" src="@/assets/images/rko-mini.webp" alt="" />
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <BestOffers />
    <!--    <BlogSection />-->
    <!--    <FAQSection :faq-data="faqData" />-->
    <RequestsSection />
  </div>
</template>

<script>
import { Head } from "@vueuse/head";
import {
  EffectFade,
  Navigation,
  Pagination,
  Grid,
  Autoplay,
  Controller,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import BestOffers from "@/components/BestOffers.vue";
// import BlogSection from "@/components/BlogSection.vue";
// import FAQSection from "@/components/FAQSection.vue";
import RequestsSection from "@/components/RequestsSection.vue";
import { ref } from "vue";
export default {
  components: {
    RequestsSection,
    // FAQSection,
    BestOffers,
    Head,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const firstSwiper = ref(null);
    const secondSwiper = ref(null);
    const startSwiper = ref(null);
    const paginationSwiper = ref(null);

    const setStartSwiper = (swiper) => {
      startSwiper.value = swiper;
    };
    const setPaginationSwiper = (swiper) => {
      paginationSwiper.value = swiper;
    };
    const setFirstSwiper = (swiper) => {
      firstSwiper.value = swiper;
    };
    const setSecondSwiper = (swiper) => {
      secondSwiper.value = swiper;
    };
    return {
      firstSwiper,
      secondSwiper,
      startSwiper,
      paginationSwiper,
      setFirstSwiper,
      setSecondSwiper,
      setStartSwiper,
      setPaginationSwiper,
    };
  },
  data() {
    return {
      faqData: [],
      modules: [EffectFade, Navigation, Autoplay, Pagination, Grid, Controller],
      pagination: {
        clickable: true,
        el: ".pagination",
        renderBullet: function (index, className) {
          const pag_titles = [
            "Кредитные карты",
            "Дебетовые карты",
            "Займы",
            "Счета для бизнеса",
          ];
          return `<span class="${className}"><p class="text">${pag_titles[index]}</p><span class="progress"></span></span>`;
        },
      },
    };
  },
  mounted() {
    this.getFAQ();
  },
  methods: {
    async getFAQ() {
      await this.$api
        .get("/faq")
        .then((response) => {
          this.faqData = response.data.items;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSwiperInit(swiper) {
      this.swiper = swiper;
      setTimeout(() => {
        this.resetProgressBar();
        this.startProgressBar();
      }, 0);
    },
    onSlideChange() {
      this.resetProgressBar();
      setTimeout(() => {
        this.startProgressBar();
      }, 0);
    },
    resetProgressBar() {
      document
        .querySelectorAll(".swiper-pagination-bullet .progress")
        .forEach((el) => {
          el.style.width = "0%";
          el.style.transition = "unset";
        });
    },
    startProgressBar() {
      const activeBullet = document.querySelector(
        ".swiper-pagination-bullet-active .progress"
      );
      if (activeBullet) {
        activeBullet.style.transition = `width ${this.swiper.params.autoplay.delay}ms linear`;
        activeBullet.style.width = "100%";
      }
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.home-page
  .start
    padding-top: 40px
    position: relative
    .nav-btns
      display: flex
      flex-direction: column
      gap: 20px
      position: absolute
      z-index: 2
      top: 33%
      right: 84px
      .btn
        background: var(--white-color)
        width: 40px
        height: 40px
        border-radius: 100px
        padding: unset
        display: flex
        align-items: center
        justify-content: center
      .next
        svg
          g
            path
              transition: .3s ease
        &:hover
          svg
            g
              path
                stroke: var(--main-color)
                transition: .3s ease
      .prev
        transform: rotate(180deg)
        svg
          g
            path
              transition: .3s ease
        &:hover
          svg
            g
              path
                stroke: var(--main-color)
                transition: .3s ease
    .start-slider-mini, .start-slider-mini2
      display: none
    .start-slider
      .swiper-pagination
        display: none
      .slide
        display: flex
        flex-direction: row
        justify-content: space-between
        background: var(--main-color)
        border-radius: 20px
        padding: 50px
        height: auto
        position: relative
        .card
          display: flex
          flex-direction: column
          justify-content: space-between
          z-index: 3
          .title
            margin-bottom: 30px
            font-size: 3rem
            font-weight: 600
            color: var(--white-color)
            max-width: 670px
          .text
            font-size: 1.25rem
            font-weight: 500
            color: var(--white-color)
            max-width: 620px
            margin-bottom: 40px
            flex: 1 0 0
          .button
            background: var(--white-color)
            color: var(--main-color)
            padding: 20px
            border-radius: 10px
            text-align: center
            font-size: 1.25rem
            font-weight: 600
            border: none
            width: 300px
            transition-duration: 0.3s
            &:hover
              transition-duration: 0.3s
              color: var(--orange-color)
        .container
          position: absolute
          display: flex
          justify-content: flex-end
          bottom: 50px
          right: 0
          margin-right: 10%
          height: 77%
          .image
            height: auto
            object-fit: cover
        .credit-container
          height: 80%
        .debit-container
          height: 77.06%
        .loan-container
          height: 80.3%
        .rko-container
          //margin-right: 8.2%
          margin-right: calc(10% - 25px)
          height: 79%
  .swiper-anim
    position: absolute
    display: flex
    justify-self: center
    bottom: 50px
    left: 50%
    transform: translateX(-50%)
    height: 5px
    width: calc(100% - 80px)
    background: #FB5607
    border-bottom-left-radius: 20px
    border-bottom-right-radius: 20px
    z-index: 3
  .pagination
    display: flex
    flex-direction: row
    gap: 20px
    margin-top: 20px
    .swiper-pagination-bullet
      overflow: hidden
      display: flex
      flex-direction: column
      background: var(--white-color)
      border-radius: 10px
      width: 100%
      height: unset
      position: relative
      padding: 20px
      opacity: unset
      box-shadow: 0 0 20px 0 rgba(1, 73, 255, 0.20)
      .text
        font-size: 1.25rem
        font-weight: 400
        text-align: center
        color: var(--gray-color)
        transition: .3s ease
      &:hover
        .text
          color: var(--main-color)
          transition: .3s ease
    .swiper-pagination-bullet-active
      background: var(--main-color)
      box-shadow: 0 0 20px 0 rgba(1, 73, 255, 0.60)
      .text
        color: var(--white-color)
      .progress
        transition: .3s ease
        position: absolute
        bottom: 0
        left: 0
        height: 5px
        width: 0
        background: var(--white-color)
      &:hover
        .text
          color: var(--white-color)
@media only screen and (max-width: $bp-pc)
  .home-page
    .start
      padding-top: 30px
      .pagination
        display: none
      .nav-btns
        top: unset
        bottom: 79px
        right: 64px
        flex-direction: row-reverse
        gap: 10px
        .btn
          background: var(--white-color)
          width: 40px
          height: 40px
      .start-slider
        overflow: visible
        box-shadow: 0 0 20px 0 rgba(1, 73, 255, 0.60)
        border-radius: 20px
        .swiper-pagination
          display: block
          bottom: 26px
          .swiper-pagination-bullet
            background: transparent
            border: 1px solid var(--white-color)
            opacity: 1
            transition: .3s ease
          .swiper-pagination-bullet-active
            transition: .3s ease
            background: var(--white-color)
        .slide
          padding: 30px
          .card
            .title
              font-size: 1.5rem
              max-width: 59%
              margin-bottom: 20px
            .text
              font-size: 0.875rem
              max-width: 50%
              margin-bottom: 70px
            .button
              font-size: 0.875rem
              width: 201px
          .container
            display: flex
            bottom: unset
            right: unset
            justify-content: flex-end
            height: 77%
            .image
              max-width: unset
              object-fit: contain
          .credit-container
            bottom: 40px
            right: 30px
            margin-right: 2%
            height: 80%
          .debit-container
            bottom: 40px
            right: 30px
            margin-right: 2%
            height: 77%
          .loan-container
            bottom: 40px
            right: 30px
            margin-right: 2%
            height: 80.2%
          .rko-container
            bottom: 40px
            right: 1.4%
            margin-right: 2%
            height: 79%
@media only screen and (max-width: 768px)
  .home-page
    .start
      .start-slider
        .slide
          .container
            display: flex
            bottom: unset
            right: unset
            justify-content: flex-end
            height: 77%
            .image
              object-fit: contain
          .credit-container
            bottom: 100px
            right: 30px
            margin-right: 2%
            height: 50%
          .debit-container
            bottom: 100px
            right: 30px
            margin-right: 2%
            height: 48%
          .loan-container
            bottom: 100px
            right: 30px
            margin-right: 2%
            height: 50.12168%
          .rko-container
            bottom: 100px
            right: 3.1%
            margin-right: 1.7%
            height: 49.4%
@media only screen and (max-width: $bp-tablet)
  .home-page
    .start
      .nav-btns
        display: none
      .start-slider
        display: none
      .start-slider-mini, .start-slider-mini2
        display: block
        .slide
          border-radius: 10px
      .start-slider-mini
        .slide
          display: flex
          width: auto
          height: auto
          background: #0149FF
          .card
            padding: 40px 15px
            display: flex
            flex-direction: column
            justify-content: space-between
            .title
              font-size: 1.25rem
              font-weight: 600
              line-height: 120%
              margin-bottom: 20px
              color: var(--white-color)
            .text
              color: var(--white-color)
              font-size: 0.75rem
              font-weight: 500
              line-height: 130%
              margin-bottom: 40px
              flex: 1 0 0
            .button
              border-radius: 10px
              text-align: center
              color: var(--main-color)
              font-size: 0.875rem
              font-weight: 600
              background: var(--white-color)
              padding: 20px
              width: 100%
              transition: .3s ease
              &:hover
                color: var(--orange-color)
                transition: .3s ease
      .start-slider-mini2
        .slide
          background: var(--orange-color)
          display: flex
          justify-content: center
          .card
            width: 310px
            height: 200px
            position: relative
            display: flex
            justify-content: center
            .image
              position: absolute
              object-fit: cover
            .credit
              width: 60%
            .debit
              width: 55%
              bottom: -40px
            .loan
              width: 45%
              bottom: -33px
            .rko
              width: 65%
              bottom: 30px
        .swiper-pagination
          .swiper-pagination-bullet
            background: transparent
            border: 1px solid var(--white-color)
            opacity: 1
            transition: .3s ease
          .swiper-pagination-bullet-active
            background: var(--white-color)
            transition: .3s ease
  //.home-page
  //  .start
  //    .pagination
  //      display: none
  //    .nav-btns
  //      flex-direction: row-reverse
  //      gap: 10px
  //      top: auto
  //      bottom: 80px
  //      right: 64px
  //      .btn
  //        background: var(--white-color)
  //        width: 40px
  //        height: 40px
  //    .swiper
  //      .slide
  //        padding: 30px
  //        .card
  //          .title
  //            font-size: 1.5rem
  //            margin-bottom: 20px
  //            max-width: 310px
  //          .text
  //            font-size: 0.875rem
  //            max-width: 310px
  //          .button
  //            width: 201px
  //            font-size: 0.875rem
  //        .container
  //          display: flex
  //          bottom: 40px
  //          right: -118px
  //          opacity: unset
  //          .image
  //            max-width: 65%
  //            height: auto
  //        .credit-container
  //          right: -125px
</style>
