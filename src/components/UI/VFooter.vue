<template>
  <footer v-if="$route.name !== 'tekhnicheskie-raboty'" id="footer">
    <div class="content">
      <router-link to="/" class="logo">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Subtract"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.10638 0C2.28621 0 0 2.28621 0 5.10638V30.8936C0 33.7138 2.28621 36 5.10638 36H30.8936C33.7138 36 36 33.7138 36 30.8936V5.10638C36 2.28621 33.7138 0 30.8936 0H5.10638ZM9.06383 9.00261V17.9899V24.2914C9.06383 25.9571 9.89838 27.5127 11.2878 28.4367L18.0535 32.9362L24.7387 28.4367C26.1116 27.5127 26.9362 25.9571 26.9362 24.2914V17.9899L18.0535 23.9684L9.06383 17.9899L15.8438 13.4146C17.225 12.4826 18.0535 10.9207 18.0535 9.24907V2.93617L9.06383 9.00261ZM23.458 17.3448C25.379 17.3448 26.9362 15.7802 26.9362 13.8502C26.9362 11.9201 25.379 10.3555 23.458 10.3555C21.5371 10.3555 19.9799 11.9201 19.9799 13.8502C19.9799 15.7802 21.5371 17.3448 23.458 17.3448Z"
            fill="var(--white-color)"
          />
        </svg>
        <p class="text">Подбери Ру</p>
      </router-link>

      <div class="information">
        <a class="email" href="mailto: info@podberiru.ru">info@podberiru.ru</a>
        <div class="socials">
          <a class="item" href="https://t.me/Podberi_ru" target="_blank">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="ic:baseline-telegram" clip-path="url(#clip0_991_651)">
                <path
                  id="Vector"
                  d="M18 0C8.064 0 0 8.064 0 18C0 27.936 8.064 36 18 36C27.936 36 36 27.936 36 18C36 8.064 27.936 0 18 0ZM26.352 12.24C26.082 15.084 24.912 21.996 24.318 25.182C24.066 26.532 23.562 26.982 23.094 27.036C22.05 27.126 21.258 26.352 20.25 25.686C18.666 24.642 17.766 23.994 16.236 22.986C14.454 21.816 15.606 21.168 16.632 20.124C16.902 19.854 21.51 15.66 21.6 15.282C21.6125 15.2247 21.6108 15.1653 21.5952 15.1088C21.5795 15.0524 21.5502 15.0006 21.51 14.958C21.402 14.868 21.258 14.904 21.132 14.922C20.97 14.958 18.45 16.632 13.536 19.944C12.816 20.43 12.168 20.682 11.592 20.664C10.944 20.646 9.72 20.304 8.802 19.998C7.668 19.638 6.786 19.44 6.858 18.81C6.894 18.486 7.344 18.162 8.19 17.82C13.446 15.534 16.938 14.022 18.684 13.302C23.688 11.214 24.714 10.854 25.398 10.854C25.542 10.854 25.884 10.89 26.1 11.07C26.28 11.214 26.334 11.412 26.352 11.556C26.334 11.664 26.37 11.988 26.352 12.24Z"
                  fill="var(--white-color)"
                />
              </g>
              <defs>
                <clipPath id="clip0_991_651">
                  <rect width="36" height="36" fill="var(--white-color)" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a class="item" href="https://vk.com/podberiru" target="_blank">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="cib:vk" clip-path="url(#clip0_991_653)">
                <path
                  id="Vector"
                  d="M23.525 0H12.4741C2.38965 0 -0.000976562 2.39062 -0.000976562 12.4751V23.526C-0.000976562 33.6105 2.38965 36.0011 12.4741 36.0011H23.525C33.6095 36.0011 36.0001 33.6105 36.0001 23.526V12.4751C36.0001 2.39062 33.5859 0 23.525 0ZM29.0623 25.6815H26.4489C25.4589 25.6815 25.154 24.8962 23.3731 23.0917C21.8263 21.5921 21.1411 21.393 20.7598 21.393C20.2209 21.393 20.0679 21.5449 20.0679 22.284V24.6454C20.0679 25.2787 19.8688 25.659 18.1925 25.659C15.4205 25.659 12.3448 23.9827 10.1881 20.8597C6.93577 16.2833 6.0459 12.8554 6.0459 12.1466C6.0459 11.7653 6.19777 11.4086 6.93015 11.4086H9.54915C10.2118 11.4086 10.4638 11.7135 10.7214 12.4222C12.0163 16.1606 14.1729 19.4355 15.0628 19.4355C15.3913 19.4355 15.5431 19.2836 15.5431 18.4455V14.5845C15.443 12.8036 14.5059 12.6506 14.5059 12.0184C14.5059 11.7135 14.7579 11.4086 15.1618 11.4086H19.2804C19.8373 11.4086 20.042 11.7135 20.042 12.3694V17.5781C20.042 18.1406 20.294 18.3398 20.4459 18.3398C20.7744 18.3398 21.0556 18.1406 21.6643 17.5309C23.5453 15.4215 24.893 12.1691 24.893 12.1691C25.0685 11.7878 25.3734 11.4311 26.036 11.4311H28.655C29.4403 11.4311 29.6158 11.835 29.4403 12.3975C29.1118 13.9208 25.9066 18.4444 25.9066 18.4444C25.631 18.9011 25.5253 19.1003 25.9066 19.6099C26.1879 19.9912 27.1025 20.7821 27.7111 21.4909C28.8305 22.7621 29.6911 23.8286 29.9206 24.5666C30.1783 25.299 29.798 25.6804 29.0589 25.6804L29.0623 25.6815Z"
                  fill="var(--white-color)"
                />
              </g>
              <defs>
                <clipPath id="clip0_991_653">
                  <rect width="36" height="36" fill="var(--white-color)" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            class="item"
            href="https://ok.ru/group/70000003040300"
            target="_blank"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="fa-brands:odnoklassniki-square"
                clip-path="url(#clip0_991_655)"
              >
                <path
                  id="Vector"
                  d="M14.8018 11.6598C14.8018 9.88393 16.2402 8.44554 18 8.44554C19.7598 8.44554 21.1982 9.88393 21.1982 11.6598C21.1982 13.4277 19.7598 14.858 18 14.858C16.2402 14.858 14.8018 13.4196 14.8018 11.6598ZM36 3.85714V32.1429C36 34.2723 34.2723 36 32.1429 36H3.85714C1.72768 36 0 34.2723 0 32.1429V3.85714C0 1.72768 1.72768 0 3.85714 0H32.1429C34.2723 0 36 1.72768 36 3.85714ZM11.483 11.6598C11.483 15.2438 14.408 18.1607 18 18.1607C21.592 18.1607 24.517 15.2518 24.517 11.6598C24.517 8.05982 21.592 5.14286 18 5.14286C14.408 5.14286 11.483 8.05179 11.483 11.6598ZM25.5054 18.9482C25.1357 18.217 24.1152 17.5982 22.7652 18.6589C22.7652 18.6589 20.9411 20.1054 18 20.1054C15.0589 20.1054 13.2348 18.6589 13.2348 18.6589C11.8848 17.5982 10.8643 18.217 10.4946 18.9482C9.85982 20.242 10.583 20.8527 12.2143 21.9214C13.6045 22.8134 15.525 23.1429 16.7625 23.2714L15.7259 24.308C14.2634 25.7545 12.8732 27.1607 11.8929 28.1411C10.4786 29.5554 12.7527 31.8214 14.175 30.4393L18.008 26.5902C19.4705 28.0527 20.8768 29.4589 21.8411 30.4393C23.2554 31.8214 25.5375 29.5795 24.1393 28.1411L20.3062 24.308L19.2616 23.2714C20.5071 23.1429 22.4036 22.7973 23.7777 21.9214C25.417 20.8527 26.1321 20.2339 25.5054 18.9482Z"
                  fill="var(--white-color)"
                />
              </g>
              <defs>
                <clipPath id="clip0_991_655">
                  <rect width="36" height="36" fill="var(--white-color)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
      <div class="bottom">
        <VNav :is-footer="isFooter" />
        <div class="bottom-info">
          <router-link v-if="isFooter === true" to="/policy" class="link policy"
            >Пользовательское соглашение</router-link
          >
          <p class="text">Подбери Ру © {{ getCurrentYear }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import VNav from "@/components/UI/VNav.vue";

export default {
  components: { VNav },
  data() {
    return {
      isFooter: true,
    };
  },
  computed: {
    getCurrentYear: function () {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/base/adaptive"
#footer
  background: var(--main-color)
  margin: 0 auto
  .content
    display: grid
    grid-template-areas: 'logo info' 'bottom bottom'
    justify-content: space-between
    padding: 20px 34px 40px
    grid-gap: 100px 0
    .logo
      grid-area: logo
      display: flex
      align-items: center
      flex-direction: row
      .text
        color: var(--white-color)
        margin-left: 15px
        font-size: 1.25rem
        font-weight: 500
    .information
      grid-area: info
      display: flex
      flex-direction: row
      align-items: center
      gap: 40px
      justify-content: flex-end
      .email
        color: var(--white-color)
        font-family: Manrope
        font-size: 1.25rem
        font-weight: 700
        transition: .3s ease
        &:hover
          color: var(--gray-color)
          transition: .3s ease
      .socials
        display: flex
        flex-direction: row
        align-items: center
        gap: 20px
        .item
          display: flex
          svg
            g
              path
                transition: .3s ease
          &:hover
            transition: .3s ease
            svg
              g
                path
                  fill: var(--gray-color)
    .bottom
      grid-area: bottom
      display: flex
      flex-direction: row
      justify-content: space-between
      .nav
        color: var(--white-color)
        display: flex
        flex-direction: row
        gap: 30px
        .link
          font-weight: 400
          &:hover
            color: var(--gray-color)
      .bottom-info
        .policy
          display: none
        .text
          color: var(--white-color)
          font-weight: 400
@media only screen and (max-width: $bp-pc)
  #footer
    .content
      grid-template-areas: 'logo info' 'bottom bottom'
      grid-gap: 60px 0
      .logo
        svg
          width: 30px
          height: 30px
        .text
          font-size: 1.125rem
          margin-left: 10px
      .information
        flex-direction: row
        gap: 30px
        .email
          font-size: 1.125rem
        .socials
          gap: 15px
          .item
            svg
              width: 30px
              height: 30px
      .bottom
        flex-direction: column
        gap: 30px
        .nav
          flex-direction: row
          justify-content: space-between
          gap: 20px
          .policy
            display: none
          .link
            white-space: nowrap
            font-size: 1rem
        .bottom-info
          display: flex
          flex-direction: row
          align-items: center
          justify-content: space-between
          .policy
            display: block
            color: var(--white-color)
            font-size: 1rem
            font-weight: 400
            transition: .3s ease
            &:hover
              color: var(--main-color)
              transition: .3s ease
@media only screen and (max-width: $bp-tablet)
  #footer
    .content
      grid-template-areas: 'logo logo' 'info info' 'bottom bottom'
      justify-content: center
      grid-gap: 50px 0
      .logo
        justify-content: center
        svg
          width: 30px
          height: 30px
        .text
          font-size: 1rem
          margin-left: 10px
      .information
        flex-direction: column
        gap: 30px
        .email
          font-size: 1rem
        .socials
          .item
            svg
              width: 30px
              height: 30px
      .bottom
        flex-direction: column
        gap: 50px
        .policy
          display: none
        .nav
          flex-direction: column
          gap: 20px
          .policy
            display: block
          .link
            font-size: 0.875rem
        .bottom-info
          display: flex
          justify-content: center
          .policy
            display: none
          .text
            text-align: center
</style>
