<template>
  <section class="blog-section content">
    <div class="top">
      <h2 class="h2">Блог</h2>
      <div class="show-btn">
        <show-all-btn />
      </div>
    </div>
    <swiper
      class="blog-slider"
      slides-per-view="auto"
      :space-between="0"
      :breakpoints="{
        320: { spaceBetween: 0 },
        800: { spaceBetween: 0 },
        1200: { spaceBetween: 0 },
      }"
    >
      <swiper-slide v-for="one of 4" :key="one" class="slide">
        <article class="card">
          <div class="image">
            <img
              class="card-image"
              src="@/assets/images/blog-image.webp"
              alt=""
            />
          </div>
          <p class="date">12.12.1212</p>
          <p class="title">
            Эксперты утверждают, что доблесть наших правозащитников продолжает
            удивлять
          </p>
          <p class="tag">Лайфхаки</p>
        </article>
      </swiper-slide>
      <swiper-slide v-if="isMobile" class="slide">
        <div class="card show-btn-blog">
          <show-all-btn />
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import ShowAllBtn from "@/components/UI/show-all-btn.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  components: { Swiper, SwiperSlide, ShowAllBtn },
  setup() {
    return {};
  },
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 1200;
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.blog-section
  display: flex
  flex-direction: column
  gap: 40px
  .top
    display: flex
    flex-direction: row
    justify-content: space-between
    .show-btn
      display: flex
      justify-content: flex-end
  .blog-slider
    width: 100%
    overflow: visible
    .swiper-wrapper
      align-items: flex-start
      justify-content: flex-start
      .slide
        display: flex
        width: auto
        height: auto
        margin-right: 20px
        &:last-child
          margin-right: 0
        .card
          display: flex
          flex-direction: column
          justify-content: space-between
          padding: 20px
          max-width: 325px
          cursor: pointer
          border-radius: 10px
          overflow: hidden
          box-shadow: var(--block-shadow)
          &:hover
            .image
              .card-image
                transition: 0.3s all ease-in-out
                transform: scale(1.1)
            .title
              transition: 0.3s all ease-in-out
              color: var(--main-color)
          .image
            margin: -20px -20px 25px -20px
            border-top-left-radius: 10px
            border-top-right-radius: 10px
            height: 200px
            display: flex
            overflow: hidden
            .card-image
              object-fit: cover
              transition: 0.3s all ease-in-out
          .date
            font-size: 1rem
            font-weight: 300
            margin-bottom: 10px
          .title
            transition: 0.3s all ease-in-out
            font-size: 1.25rem
            font-weight: 500
            margin-bottom: 30px
          .tag
            font-size: 1rem
            font-weight: 600

@media only screen and (max-width: $bp-pc)
  .blog-section
    gap: 20px
    .top
      .show-btn
        display: none
    .blog-slider
      .swiper-wrapper
        .slide
          .card
            max-width: 280px
            .image
              margin: -20px -20px 20px -20px
              height: 130px
              overflow: hidden
              position: relative
              .card-image
                position: absolute
                top: -20px
                left: 0
            .date
              font-size: 0.875rem
              margin-bottom: 5px
            .title
              font-size: 1.125rem
          .show-btn-blog
            width: 280px
            height: 385px
            padding: 0 20px 0 0
            display: flex
            justify-content: center
            box-shadow: none
            .show-all-btn
              width: fit-content
              height: fit-content
              border-radius: 10px
              border: 2px solid var(--main-color)
              padding: 15px 20px
              transition: .3s ease
              .text
                transition: .3s ease
                font-size: 1rem
                color: var(--main-color)
              .btn-image
                path
                  transition: .3s ease
                  stroke: var(--main-color)
              &:hover
                transition: .3s ease
                background: var(--main-color)
                .text
                  transition: .3s ease
                  color: var(--white-color)
                .btn-image
                  path
                    transition: .3s ease
                    stroke: var(--white-color)
@media only screen and (max-width: $bp-tablet)
  .blog-section
    gap: 15px
    .top
      .show-btn
        display: none
    .blog-slider
      .swiper-wrapper
        .slide
          display: flex
          width: auto
          height: auto
          margin-right: 10px
          .card
            padding: 15px
            max-width: 200px
            .image
              margin: -15px -15px 15px -15px
              height: 100px
              .card-image
                width: 100%
            .date
              font-size: 0.6875rem
              margin-bottom: 5px
            .title
              font-size: 0.875rem
              margin-bottom: 15px
            .tag
              font-size: 0.75rem
          .show-btn-blog
            width: 184px
            height: 251px
            padding: 0 20px 0 0
            display: flex
            justify-content: center
            box-shadow: none
            .show-all-btn
              height: fit-content
              border-radius: 10px
              border: 2px solid var(--main-color)
              padding: 15px 20px
              .text
                font-size: 0.875rem
                color: var(--main-color)
              .btn-image
                path
                  stroke: var(--main-color)
              &:hover
                background: var(--main-color)
                .text
                  color: var(--white-color)
                .btn-image
                  path
                    stroke: var(--white-color)
</style>
