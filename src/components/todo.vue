<template lang="pug">
  .todo
    .todo__main
      .d-flex.justify-content-between.align-items-center.pb-2.border-bottom.border-light
        .todo__main__title THINGS TO DO
        input.todo__main__input.border-0.px-3.py-2(v-model="tempTodo" placeholder="ADD A NEW MISSION" @keydown.enter="add(tempTodo)")
      .todo__main__content
        .pt-4.d-flex
          .d-flex.flex-column.w-25.mr-2
            .d-flex.align-items-center.todo__main__content--title
              .mr-2 DONE
              i.fas.fa-sort-down.todo__main__content--arrow(@click="display1 = !display1" :class="{'rotate': display1}")
            .d-flex.flex-column(v-if="!display1")
          .d-flex.flex-column.w-25.mr-2
            .d-flex.align-items-center.todo__main__content--title
              .mr-2 TO-DO
              i.fas.fa-sort-down.todo__main__content--arrow(@click="display2 = !display2" :class="{'rotate': display2}")
            .d-flex.flex-column(v-if="!display2")
              p.todo__main__content--items(v-for="item in todos") {{ item.todo }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tempTodo: '',
      display1: false,
      display2: false,
      todos: [],
    }
  },
  methods: {
    getTodos() {
      const vm = this;
      const transaction = this.$store.state.db.transaction(["Todos"], "readwrite");
      const objectStore = transaction.objectStore("Todos");
      let request = objectStore.getAll();
      request.onsuccess = function(e) {
        vm.todos = request.result;
        console.log('get todos success');
      }
    },
    add(value) {
      const vm = this;
      const temp = {
        id: Number(window.localStorage.getItem('todoId')) + 1,
        todo: value,
      };
      const transaction = this.$store.state.db.transaction(["Todos"], "readwrite");
      const objectStore = transaction.objectStore("Todos");
      transaction.oncomplete = function(event) {
        console.log("add done!");
      };
      let request = objectStore.add(temp);
      request.onsuccess = function(e) {
        vm.$store.dispatch('setTodoId', Number(window.localStorage.getItem('todoId')) + 1);
        console.log('todo add success');
        vm.getTodos();
      }
    },
  },
  mounted() {
    this.getTodos();
  }
}
</script>

<style lang="scss" scoped>
  .todo {
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

      &__input {
        border-radius: 15px;
        background-color: #ffffff;
        font-size: 16px;
        font-family: 'Open Sans';
        outline: none;

        &::placeholder {
          color: #eeddd3;
        }
      }

      &__content {
        &--arrow {
          transition: .5s;
        }

        &--title {
          font-size: 25px;
          font-family: 'Open Sans';
          color: #c38d69;
        }

        &--items {
          color: #c38d69;
          font-size: 16px;
        }
      }
    }
  }

  .rotate {
    transform: rotate(-180deg);
  }
</style>
