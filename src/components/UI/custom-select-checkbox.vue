<template>
  <div ref="extra-filter" class="extra-filter">
    <span
      v-show="stringFilter === '' || showString === true"
      ref="textContent"
      class="text"
      @click="openFilter($event)"
    >
      <slot name="title"></slot>
    </span>
    <span v-show="stringFilter !== '' && showString === false" class="text">
      {{ stringFilter }}
    </span>
    <button class="open-extra" @click="openFilter($event)">
      <img
        class="btn-img"
        src="@/assets/images/icons/select-arrow.svg"
        alt=""
      />
    </button>
    <div class="extra-menu">
      <div v-for="(option, i) of options" :key="i" class="item">
        <p class="label">{{ option }}</p>
        <button class="checkbox" @click="checkBoxClick($event)"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ["send-checkboxes"],
  data() {
    return {
      filterName: "",
      filterClicked: [],
      stringFilter: "",
      showString: false,
    };
  },
  watch: {
    filterClicked: {
      deep: true,
      handler() {
        this.$emit("send-checkboxes", this.filterName, this.filterClicked);
      },
    },
  },
  mounted() {
    this.filterName = this.$refs.textContent.innerText;
    if (this.options.length > 10) {
      this.$refs["extra-filter"]
        .querySelector(".extra-menu")
        .classList.add("scrollable");
    }
  },
  methods: {
    openFilter(event) {
      const filter = event.target.closest(".extra-filter");
      const menu = filter.querySelector(".extra-menu");
      const image = filter.querySelector(".btn-img");
      filter.classList.toggle("extra-filter--opened");
      this.showString = filter.classList.contains("extra-filter--opened");
      menu.classList.toggle("extra-menu--opened");
      image.classList.toggle("btn-img--opened");
    },
    stringifyArr() {
      if (this.filterClicked.length > 2) {
        this.stringFilter = `${this.filterClicked.slice(0, 2).join(", ")} +
          ${this.filterClicked.length - 2}`;
      } else {
        this.stringFilter = this.filterClicked.join(", ");
      }
    },
    checkBoxClick(event) {
      const item = event.target.closest(".item");
      const checkbox = item.querySelector(".checkbox");
      const label = item.querySelector(".label");
      if (!this.filterClicked.includes(label.textContent)) {
        this.filterClicked.push(label.textContent);
        this.stringifyArr();
      } else {
        this.filterClicked = this.filterClicked.filter(
          (item) => item !== label.textContent
        );
        this.stringifyArr();
      }
      checkbox.classList.toggle("checkbox--clicked");
    },
    resetCheckboxes() {
      const extra_filters = document.querySelectorAll(".extra-filter");
      extra_filters.forEach((extra_filter) => {
        const menu = extra_filter.querySelector(".extra-menu");
        const items = menu.querySelectorAll(".checkbox");
        items.forEach((item) => {
          item.classList.remove("checkbox--clicked");
        });
        this.filterClicked = [];
        this.stringFilter = "";
        this.showString = false;
      });
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
.extra-filter
  padding-bottom: 25px
  border-bottom: 1px solid var(--ad-color)
  display: grid
  grid-template-areas: 'name btn' 'menu menu'
  grid-template-columns: 1fr auto
  .text
    grid-area: name
    font-size: 1.125rem
    font-weight: 400
    text-overflow: ellipsis
  .open-extra
    grid-area: btn
    padding: unset
    .btn-img
      transition: .3s ease
    .btn-img--opened
      transition: .3s ease
      transform: rotate(180deg)
  .extra-menu
    grid-area: menu
    width: 100%
    background: var(--white-color)
    transition: max-height 0.3s ease, margin-top 0.3s ease
    max-height: 0
    margin-top: 0
    overflow-y: hidden
    .item
      padding: 5px 20px 5px 0
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      .label
        font-size: 1.125rem
        font-weight: 500
      .checkbox
        padding: 0
        width: 30px
        height: 30px
        background-image: url("@/assets/images/icons/checkbox.svg")
        background-size: 100% 100%
        transition: .3s ease
      .checkbox--clicked
        padding: 0
        width: 30px
        height: 30px
        background-image: url("@/assets/images/icons/checkbox-mark.svg")
        background-size: 100% 100%
        transition: .3s ease
      &:first-child
        padding: 0 20px 5px 0
  .extra-menu--opened
    margin-top: 25px
    max-height: 410px
    transition: max-height 0.3s ease, margin-top 0.3s ease
    border-bottom: 20px solid var(--white-color)
  .scrollable
    overflow-y: scroll
.extra-filter--opened
  padding-bottom: 0
@media only screen and (max-width: $bp-pc)
  .extra-filter
    .text
      grid-area: name
      font-size: 1rem
      font-weight: 400
    .open-extra
      grid-area: btn
      padding: unset
      .btn-img
        transition: .3s ease
      .btn-img--opened
        transition: .3s ease
        transform: rotate(180deg)
    .extra-menu
      grid-area: menu
      width: 100%
      background: var(--white-color)
      overflow-y: scroll
      transition: max-height 0.3s ease, margin-top 0.3s ease
      max-height: 0
      margin-top: 0
      .item
        padding: 5px 20px 5px 0
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .label
          font-size: 1rem
          font-weight: 400
        .checkbox
          padding: 0
          width: 30px
          height: 30px
          background-image: url("@/assets/images/icons/checkbox.svg")
          background-size: 100% 100%
          transition: .3s ease
        .checkbox--clicked
          padding: 0
          width: 30px
          height: 30px
          background-image: url("@/assets/images/icons/checkbox-mark.svg")
          background-size: 100% 100%
          transition: .3s ease
        &:first-child
          padding: 0 20px 5px 0
    .extra-menu--opened
      margin-top: 25px
      max-height: 410px
      transition: max-height 0.3s
      border-bottom: 20px solid var(--white-color)
  .extra-filter--opened
    padding-bottom: 0
@media only screen and (max-width: $bp-tablet)
  .extra-filter
    padding-bottom: 15px
    .text
      font-size: 0.875rem
    .open-extra
      img
        width: 24px
        height: 24px
    .extra-menu
      .item
        .label
          font-size: 0.875rem
          font-weight: 400
        .checkbox
          padding: 0
          width: 24px
          height: 24px
          background-image: url("@/assets/images/icons/checkbox.svg")
          background-size: 100% 100%
          transition: .3s ease
        .checkbox--clicked
          padding: 0
          width: 24px
          height: 24px
          background-image: url("@/assets/images/icons/checkbox-mark.svg")
          background-size: 100% 100%
          transition: .3s ease
    .extra-menu--opened
      margin-top: 25px
      max-height: 355px
      transition: max-height 0.3s
      border-bottom: 20px solid var(--white-color)
</style>
