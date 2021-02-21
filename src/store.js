import Vue from 'vue';
import Vuex from 'vuex';
import { newDB, newSheet, newIndex } from '../public/db';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    dbname: 'TodoDatabase',
    dbVersion: window.localStorage.getItem('todoDatabase_version') ? Number(window.localStorage.getItem('todoDatabase_version')) : 1,
    db: null,
    objectStore: null,
    activeTodo: 0,
    done: [
    ],
  },
  mutations: {
    SET_DATABASE(state, db) {
      state.db = db;
    },
    SET_DATAOBJECTSTORE(state, objectStore) {
      state.objectStore = objectStore;
    },
    setTodo(state, value) {
      state.activeTodo = value;
    },
    addTodo(state, value) {
      state.todos.push(value);
    },
  },
  actions: {
    setDatabase({ state, commit }) {
      newDB(state.dbname, state.dbVersion).then((db) => {
        commit('SET_DATABASE', db);
        if (!window.localStorage.getItem('todoDatabase_version')) {
          newSheet(db, 'Todos', 'id').then((objectStore) => {
            commit('SET_DATAOBJECTSTORE', objectStore);
            window.localStorage.setItem('todoDatabase_version', state.dbVersion);
          })
        }
      })
    },
    setDataSheet(store, payload) {
      newDB(dbname, store.state.versiom + 1).then((db) => {
        commit('SET_DATABASE', db);
        newSheet(db, payload.sheetname, payload.key).then((objectStore) => {
          commit('SET_DATAOBJECTSTORE', objectStore);
        })
      })
    },
    setDataIndex(store, payload = []) {
      console.log(payload);
      newIndex(store.state.objectStore, ...payload).then(() => {});
    },
    setTodoId(store, id) {
      window.localStorage.setItem('todoId', id);
    }
  },
});

export default store;