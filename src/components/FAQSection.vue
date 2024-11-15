<template>
  <section class="faq-section content">
    <h2 class="h2">Частые вопросы <slot name="title"></slot></h2>
    <div class="faqs">
      <div v-for="faq in faqData" :key="faq" class="item">
        <p class="question">{{ faq.question }}</p>
        <div class="button-cont">
          <button class="open-btn" @click="showAnswer($event)">
            <img
              class="image"
              src="@/assets/images/icons/open-faq.svg"
              alt=""
            />
          </button>
        </div>
        <p class="answer">{{ faq.answer }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    faqData: { type: Array },
  },
  methods: {
    showAnswer(event) {
      const questionItem = event.target.closest(".item");
      const answer = questionItem.querySelector(".answer");
      const image = questionItem.querySelector(".image");
      answer.classList.toggle("answer--opened");
      image.classList.toggle("image--opened");
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.faq-section
  padding-bottom: 150px
  .h2
    text-align: center
    margin-bottom: 40px
  .faqs
    padding: 0 100px
    .item
      display: grid
      grid-gap: 0 40px
      grid-template-areas: 'question open' 'answ answ'
      grid-template-columns: 1fr auto
      padding: 40px 0
      border-bottom: 1px solid var(--ad-color)
      .question
        grid-area: question
        display: flex
        align-items: center
        font-size: 1.25rem
        font-weight: 500
      .button-cont
        grid-area: open
        display: flex
        justify-content: flex-end
        .open-btn
          padding: unset
          display: flex
          align-items: center
          .image
            transition: 0.3s ease
          .image--opened
            transform: rotate(45deg)
            transition: 0.3s ease
      .answer
        grid-area: answ
        max-height: 0
        overflow: hidden
        opacity: 0
        transition: 0.3s ease
        font-size: 1.125rem
        font-weight: 400
      .answer--opened
        grid-area: answ
        max-height: 200px
        opacity: 1
        padding: 30px 0 0
        transition: 0.3s ease
@media only screen and (max-width: $bp-pc)
  .faq-section
    padding-right: 0
    padding-left: 0
    padding-bottom: 100px
    .h2
      margin-bottom: 40px
    .faqs
      padding: 0 34px
      .item
        padding: 20px 0
        &:first-child
          padding-top: 0
        .question
          font-size: 1rem
          font-weight: 500
        .button-cont
          grid-area: open
          display: flex
          justify-content: flex-end
          .open-btn
            padding: unset
            display: flex
            align-items: center
            .image
              width: 30px
              height: 30px
              transition: 0.3s ease
            .image--opened
              transform: rotate(45deg)
              transition: 0.3s ease
        .answer
          font-size: 0.875rem
        .answer--opened
          padding: 25px 0 0
@media only screen and (max-width: $bp-tablet)
  .faq-section
    padding-bottom: 80px
    padding-right: 15px
    padding-left: 15px
    display: flex
    flex-direction: column
    align-items: center
    .h2
      margin-bottom: 30px
      width: 70%
    .faqs
      padding: 0
      .item
        padding: 20px 0 15px
        &:first-child
          padding-top: 0
        .question
          font-size: 0.875rem
          font-weight: 500
        .answer
          font-size: 0.75rem
        .answer--opened
          padding: 20px 0 0
</style>
