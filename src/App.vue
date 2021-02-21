<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  data() {
    return {
      todosDate: {
        work: [
          { hello: 'fsdfsdfsdfd' },
          { hello2: '12312s123123' },
        ],
        break: [
          { hello3: 'fsdfsdfsdfd' },
          { hello4: '12312s123123' },
        ],
      },
    };
  },
  methods: {
    setDatabase() {
      this.$store.dispatch('setDatabase');
    },
    checkTodoId() {
      if (!window.localStorage.getItem('todoId')) {
        this.$store.dispatch('setTodoId', 0);
      }
    },
    init() {
      this.setDatabase();
      this.checkTodoId();
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
@import './assets/scss/reset.css';
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

p {
  margin: 0;
}
</style>
