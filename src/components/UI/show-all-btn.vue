<template>
  <router-link :to="`/${bestOffer}`" class="show-all-btn">
    <span class="text">Смотреть все</span>
    <div class="btn-image">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Icon"
          d="M6.83333 1.625L11 6M11 6L6.83333 10.375M11 6L1 6"
          stroke="var(--black-color)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    bestOffer: String,
  },
};
</script>

<style lang="sass">
.show-all-btn
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  gap: 5px
  cursor: pointer
  &:hover, &:focus, &:active
    .text
      color: var(--main-color)
    .btn-image
      transform: translateX(5px)
      svg
        path
          transition-duration: 0.5s
          stroke: var(--main-color)
  .text
    font-size: 1rem
    font-weight: 500
    white-space: nowrap
    align-self: end
    transition-duration: 0.5s
  .btn-image
    display: flex
    align-items: center
    justify-content: center
    align-self: end
    width: 24px
    height: 18px
    transition-duration: 0.3s
    svg
      path
        transition-duration: 0.5s
</style>
