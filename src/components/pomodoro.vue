<template lang="pug">
  .poromodo
    .poromodo__side.mr-4
      .poromodo__side__block.mb-4
        .poromodo__side__block--title TODAY
        .poromodo__side__block--content
          p {{ date }}
            span.ml-4 {{ now }}
          p mission numbers
            span.ml-4 {{ todos.length }}
      .poromodo__side__block
        .poromodo__side__block--title THINGS TO DO
        .poromodo__side__block--content2
          .w-100.d-flex.justify-content-between.align-items-center.mb-1.p-2(
            v-for="item in todos"
            :key="item.id"
            :class="{'active': activeTodo === item.id}"
            style="cursor: pointer"
            @click="setActiveTodo(item.id)"
          )
            p {{ item.todo }}
        .d-flex.align-items-center.justify-content-between.position-relative
          input.w-100.poromodo__side__block--add(
            v-model="tempTodo"
            placeholder="ADD A NEW MISSION"
            @keydown.enter="add(tempTodo)"
          )
          i.poromodo__side__block--addIcon.fas.fa-plus.text-light.position-absolute
    .poromodo__main
      .d-flex.justify-content-between.align-items-center
        .poromodo__main__title
          .color-light.mr-1 Now
          i.fas.fa-angle-right.color-light
          i.fas.fa-angle-right.color-light.mr-2
          .todo(v-if="todo") {{ todo.todo }}
        .poromodo__main__choose.position-relative
          i.fas.fa-history.color-dark(@click="dropDownList = !dropDownList")
          ul.dropDownList.position-absolute(v-if="dropDownList")
            li(v-for="item in countDownOption" @click="setTime(item)") {{ item }}
      .poromodo__main__timer
        .poromodo__main__timer--content
          .time {{ countDown }}
        .poromodo__main__timer--controller.d-flex.flex-column
          i.fas.fa-pause-circle.pause(@click="pause")
          i.fas.fa-play-circle.play(@click="play")
          i.fas.fa-undo-alt.undo(@click="restart")
</template>

<script>
import { mapState, mapGetters } from 'vuex';

let countDowner;
export default {
  data() {
    return {
      component: '',
      type: true,
      tempTodo: '',
      countDownOption: [5, 10, 15, 20, 25, 30, 35, 40],
      countDownMin: 15,
      countDownSec: 0,
      tempTime: 15,
      time: '',
      timer: null,
      counting: false,
      dropDownList: false,
      todos: [],
    };
  },
  errorCaptured(err, vm, info) {
    console.log(err, vm, info);
  },
  methods: {
    getTodos() {
      const vm = this;
      const transaction = this.$store.state.db.transaction(["Todos"], "readwrite");
      const objectStore = transaction.objectStore("Todos");
      let request = objectStore.getAll();
      request.onsuccess = function(e) {
        vm.setActiveTodo(request.result[0].id);
        vm.todos = request.result;
        console.log('get todos success');
      }
    },
    setActiveTodo(id) {
      this.$store.commit('setTodo', id);
    },
    setTime(time) {
      this.counting = false;
      this.tempTime = time;
      this.countDownMin = time;
      this.countDownSec = 0;
    },
    play() {
      if (!this.counting) {
        let seconds = this.countDownMin * 60 + this.countDownSec;
        seconds -= 1;
        this.countDownMin = Math.floor(seconds / 60);
        this.countDownSec = seconds % 60;
        countDowner = setInterval(() => {
          seconds -= 1;
          this.countDownMin = Math.floor(seconds / 60);
          this.countDownSec = seconds % 60;
          if (seconds < 0) {
            clearInterval(countDowner);
          }
        }, 1000);
        this.counting = true;
      }
    },
    pause() {
      this.getTodos();
      this.counting = false;
      clearInterval(countDowner);
    },
    restart() {
      this.counting = false;
      clearInterval(countDowner);
      this.setTime(this.tempTime);
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
  computed: {
    ...mapState([
      'activeTodo',
    ]),
    todo() {
      return this.todos.filter((item) => item.id === this.activeTodo)[0]
    },
    countDown() {
      return `${this.countDownMin} : ${this.countDownSec < 10 ? `0${this.countDownSec}` : this.countDownSec}`;
    },
    date() {
      const temp = this.time.split(' ');
      const str = `${temp[1]}${temp[2]},${temp[3]}`;
      return str;
    },
    now() {
      const temp = this.time.split(' ');
      return temp[4];
    },
  },
  created() {
    this.time = Date();
    this.timer = setInterval(() => {
      this.time = Date();
    }, 1000);
  },
  mounted() {
    this.getTodos();
  }
};
</script>

<style lang="scss" scoped>
.poromodo {
  background-color: #fff8f5;
  width: 100%;
  flex: 1;
  padding: 50px 50px 50px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &__block {
      border-radius: 34px;
      background-color: #eeddd3;
      display: flex;
      flex-direction: column;
      padding: 0 20px 10px;

      &--title {
        font-family: 'Open Sans';
        font-size: 25px;
        font-weight: 800;
        color: #5a5a5a;
        letter-spacing: 2px;
        padding: 25px 0px 6px;
        border-bottom: 1px solid white;
      }

      &--content {
        padding: 15px 0px 18px;
        font-family: 'Open Sans';
        font-size: 18px;
        font-weight: bold;
        color: #c38d69;
        letter-spacing: 1.25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 30px;

        .active {
          background-color: #c38d69;
          color: #eeddd3;
          border-radius: 30px;
        }
      }

      &--content2 {
        padding: 18px 0px 20px;
        font-family: 'Open Sans';
        font-size: 18px;
        font-weight: bold;
        color: #c38d69;
        letter-spacing: 1.25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 30px;
        height: 220px;
        overflow: auto;

        .active {
          background-color: #c38d69;
          color: #eeddd3;
          border-radius: 30px;
        }

        &::-webkit-scrollbar {
          display: none;
        }
      }

      &--add {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        background-color: #eeddd3;
        border: none;
        padding: 10px 0;
        outline: none;

        &::placeholder {
          color: white;
        }
      }

      &--addIcon {
        right: 0;
      }
    }
  }

  &__main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__title {
      display: flex;
      align-items: center;

      .todo {
        color: #c38d69;
        font-size: 25px;
        font-family: 'Open Sans';
      }
    }

    &__choose {
      font-size: 25px;

      .dropDownList {
        transition: 4s ease-in-out 1s;

        li {
          font-size: 20px;
          color: rgba(195, 141, 105, 0.3);

          &:hover {
            color: #c38d69;
          }
        }
      }
    }

    &__timer {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      &--content {
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 20px double #c38d69;
        background-color: #c38d69;
        background-clip: padding-box;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-family: 'Open Sans';
        font-size: 90px;
      }

      &--controller {
        font-size: 50px;
        color: #eeddd3;

        .pause {
          transform: translate(-30px, -30px);
        }

        .play {
          border-radius: 50%;
        }

        .undo {
          transform: translate(-30px, 30px);
        }
      }
    }
  }
}

.color-light {
  color: #eeddd3;
}

.color-dark {
  color: #c38d69;
}
</style>
