import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 10,
    height: 10,
    firstName: "Jack",
    lastName: "White"
  },
  getters: {
    fullName(state) {
      return `${state.firstName} ${state.lastName}`;
    }
  },
  mutations: {
    addAge(state) {
      state.age++;
    },
    addHeight(state, payload) {
      state.height += payload.height;
    }
  },
  actions: {
    asyncAddHeight({ commit }) {
      return new Promise(res => {
        setTimeout(() => {
          commit({
            type: "addHeight",
            height: 10
          });
          res();
        }, 1 * 1000);
      });
    },
    asyncAddHeightDouble({ dispatch }) {
      dispatch("asyncAddHeight").then(() => dispatch("asyncAddHeight"));
    }
  },
  modules: {
    mouduleNoNameSpace: {
      state: {
        count: 1
      },
      getters: {
        double(state) {
          return state.count * 2;
        },
        triple(state, getters) {
          console.log(getters["mouduleNameSpace/nDouble"]);
          return getters.double + state.count;
        },
        doubleAge(state, getters, rootState) {
          return rootState.age * 2;
        }
      },
      mutations: {
        doubleCount(state) {
          state.count += state.count;
        }
      },
      actions: {}
    },
    mouduleNameSpace: {
      namespaced: true,
      state: {
        count: 1
      },
      getters: {
        nDouble(state) {
          return state.count * 2;
        },
        nTriple(state, getters) {
          return getters.nDouble + state.count;
        },
        nDoubleAge(state, getters, rootState) {
          return rootState.age * 2;
        }
      },
      mutations: {
        nDoubleCount(state) {
          state.count += state.count;
        }
      },
      actions: {}
    },
    mouduleNameSpace1: {
      namespaced: true,
      state: {
        count: 1
      },
      getters: {
        nDouble(state) {
          return state.count * 2;
        },
        nTriple(state, getters) {
          console.log(getters["mouduleNameSpace/nDouble"]);
          return getters.nDouble + state.count;
        },
        nDoubleAge(state, getters, rootState) {
          return rootState.age * 2;
        }
      },
      mutations: {
        nDoubleCount(state) {
          state.count += state.count;
        }
      },
      actions: {}
    }
  }
});
