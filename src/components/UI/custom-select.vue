<template>
  <div
    class="custom-select"
    :class="{ 'custom-select--opened': open === true }"
    :tabindex="tabindex"
    @click="open = !open"
    @blur="open = false"
  >
    <span class="name"><slot></slot></span>
    <div
      class="selected"
      :class="{
        open: open,
      }"
    >
      {{ selected?.name ? selected.name : selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        class="item"
        :class="{
          'selected-item': isSelected(option),
          'unselected-item': !isSelected(option),
        }"
        @click="selectOption(option)"
      >
        {{ option.name ? option.name : option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.text,
      open: false,
    };
  },
  watch: {
    options(newOptions) {
      if (newOptions.length > 0 && !this.default) {
        this.selected = this.text;
      } else if (this.default) {
        this.selected = this.default;
      }
    },
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  methods: {
    resetFilters() {
      this.selected = this.text;
      const selected = document.querySelector(".selected");
      selected.style.color = "var(--gray-color)";
    },
    selectOption(option) {
      // const items = event.target.closest(".items");
      // const item = items.querySelector(".item:first-child");
      // if (option === "Любой" || option === "Любая") {
      //   item.style.pointerEvents = null;
      //   item.style.color = "var(--gray-color)";
      // } else {
      //   item.style.pointerEvents = "unset";
      //   item.style.color = "var(--black-color)";
      // }
      this.selected = option.name ? option.name : option;
      const selected = document.querySelector(".selected");
      selected.style.color = "var(--black-color)";
      setTimeout(() => {
        this.open = false;
      }, 0);
      this.$emit("input", option.id ? option.id : option);
    },
    isSelected(option) {
      // const first = document.querySelector('.item:first-child')
      // first.style.color = "var(--black-color)"
      return option === this.selected;
    },
  },
};
</script>

<style lang="sass">
@import '@/assets/styles/base/adaptive'
.custom-select
  position: relative
  width: 100%
  text-align: left
  outline: none
  background: var(--white-color)
  border-radius: 10px
  padding: 15px
  .name
    color: var(--black-color)
    font-size: 1rem
    font-weight: 400
  .selected
    margin-top: 8px
    border-radius: 10px
    cursor: pointer
    user-select: none
    color: var(--gray-color)
    font-variant-numeric: lining-nums proportional-nums
    font-size: 1.125rem
    font-weight: 500
    &::after
      position: absolute
      content: ""
      right: 15px
      top: 0
      width: 30px
      height: 100%
      background-image: url('@/assets/images/icons/select-arrow.svg')
      background-size: 100%
      background-repeat: no-repeat
      background-position: center
      transition: transform 0.3s ease
  .open
    &::after
      transform: rotate(180deg)
  .initial-select
    font-size: 1.125rem
    color: var(--gray-color)
  .items
    color: var(--dark-color)
    overflow: hidden
    position: absolute
    border-radius: 0 0 10px 10px
    background-color: #fff
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15)
    width: 100%
    top: 81px
    left: 0
    right: 0
    padding: 5px 15px
    border: 1px solid var(--gray-text)
    max-height: 405px
    border-bottom: 15px solid var(--white-color)
    border-right: 10px solid var(--white-color)
    overflow-y: scroll
    z-index: 3
    .item
      color: var(--dark-color)
      cursor: pointer
      user-select: none
      margin: 0 -15px
      padding: 10px 15px
      font-size: 1.125rem
      font-weight: 500
      line-height: 100%
      z-index: 2
      //&:first-child
      //  color: var(--gray-color)
      //  pointer-events: none
      //&.unselected-item
      //  color: initial
      &:hover
        color: var(--main-color)
    .selected-item
      font-weight: 600
      font-size: 1rem
      color: var(--gray-color)
      pointer-events: none

.custom-select--opened
  border-bottom-left-radius: 0
  border-bottom-right-radius: 0
.selectHide
  display: none
@media only screen and (max-width: $bp-pc)
  .custom-select
    padding: 12px 15px
    .name
      font-size: 0.875rem
    .selected
      margin-top: 5px
      font-size: 1rem
      &::after
        width: 24px
    .items
      top: 68px
      max-height: 385px
      .item
        font-size: 1rem
        padding: 10px 15px

@media only screen and (max-width: $bp-tablet)
  .custom-select
    padding: 10px 15px
    .name
      font-size: 0.75rem
    .selected
      font-size: 0.875rem
    .items
      top: 62px
      max-height: 325px
      .item
        font-size: 0.875rem
        padding: 8px 15px
</style>
