<template lang="pug">
  .notice
    .notice__main
      .d-flex.justify-content-between.align-items-center.pb-2.border-bottom.border-light
        .notice__main__title RINGTONES
      .notice__main__content.pt-3
        .d-flex
          .d-flex.flex-column.w-50
            .notice__main__content--title WORK
            .d-flex.align-items-center.flex-wrap
              .d-flex.align-items-center.w-25.notice__main__content--items(v-for="item in 3" :key="item")
                //- input.mr-2(type="checkbox" :id="work-item")
                //- label.m-0(for="work-1") 123
          .d-flex.flex-column.w-50
            .notice__main__content--title BREAK
            .d-flex.align-items-center.flex-wrap
              .d-flex.align-items-center.w-25.notice__main__content--items(v-for="item in 5" :key="item")
                //- input.mr-2(type="checkbox" :id="item")
                //- label.m-0(:for="item") 123
</template>


<style lang="scss" scoped>
  .notice {
    background-color: #fff8f5;
    width: 100%;
    flex: 1;
    padding: 60px;

    &__main {
      background-color: #eeddd3;
      height: 100%;
      border-radius: 20px;
      padding: 30px 70px;

      &__title {
        font-family: 'Open Sans';
        font-size: 30px;
        color: #5a5a5a;
      }

      &__content {
        &--title {
          font-family: 'Open Sans';
          font-size: 25px;
          color: #c38d69;
        }

        &--items {
          font-family: 'Open Sans';
          font-size: 16px;
          color: #c38d69;

          // input[type="checkbox"]:checked + label {
          //   color: red;
          // }
          input {
            color: red;
          }

          input:checked ~ label {
            color: red;
          }

        }
      }
    }
  }
</style>
