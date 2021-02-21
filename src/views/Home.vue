<template lang="pug">
  #home
    .navbar
      .navbar__links
        .navbar__links__title.mr-5(@click="changeView('pomodoro')") POMODORO
        .navbar__links__page.mr-4(@click="changeView('pomodoro')" :class="{'text-light': view === 'pomodoro'}")
          i.fas.fa-history
        .navbar__links__page.mr-4(@click="changeView('todo')" :class="{'text-light': view === 'todo'}")
          i.fas.fa-chart-bar
        .navbar__links__page.mr-4(@click="changeView('analysis')" :class="{'text-light': view === 'analysis'}")
          i.fas.fa-list
        .navbar__links__page.mr-4(@click="changeView('notice')" :class="{'text-light': view === 'notice'}")
          i.far.fa-bell
      .navbar__member
        .navbar__member__name.mr-4 Neil
        .navbar__member__photo
    components(:is="view")
</template>

<script>
import pomodoro from '@/components/pomodoro.vue';
import todo from '@/components/todo.vue';
import analysis from '@/components/analysis.vue';
import notice from '@/components/notice.vue';

export default {
  components: {
    pomodoro,
    todo,
    analysis,
    notice,
  },
  data() {
    return {
      view: 'pomodoro',
    }
  },
  methods: {
    changeView(value) {
      this.view = value;
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 26px 65px;
    background-color: #c38d69;

    &__links {
      display: flex;
      align-items: center;

      &__page {
        font-size: 25px;
        color: rgba(255, 248, 245, 0.4);
        cursor: pointer;
      }

      &__title {
        font-family: 'Rubik Mono One';
        font-size: 25px;
        letter-spacing: 1.75px;
        text-align: left;
        color: #fff8f5;
      }
    }

    &__member {
      display: flex;
      align-items: center;

      &__name {
        font-size: 20px;
        font-family: 'OpenSans';
        font-weight: bold;
        letter-spacing: 1.5px;
        color: white;
      }

      &__photo {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: url('../assets/photo_2019-01-15_10-01-20.jpg') no-repeat top;
        background-size: cover;
      }
    }
  }
}
</style>

