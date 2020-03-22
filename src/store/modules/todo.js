import api from "@/api";

const state = {
  todoList: [],
  total: null
};
const getters = {};
const mutations = {
  SET_TODO_LIST(state, payload) {
    state.todoList = payload;
  },
  SET_TOTAL(state, payload) {
    state.total = payload;
  }
};
const actions = {
  async fetchTodoList({ commit }, payload) {
    try {
      const url = payload != null ? `/todos?status=${payload}` : `/todos`;
      const res = await api.get(url);
      if (res.data.status == 200) {
        commit("SET_TODO_LIST", res.data.data);
        commit("SET_TOTAL", res.data.total);
      }
    } catch (error) {
      // todo
    }
  },

  async fetchTodoListSearch({ commit }, payload) {
    try {
      const res = await api.get(`/todos?textSearch=${payload}`);
      if (res.data.status == 200) {
        commit("SET_TODO_LIST", res.data.data);
        commit("SET_TOTAL", res.data.total);
      }
    } catch (error) {
      // todo
    }
  },

  async addTodo({ dispatch }, payload) {
    try {
      const res = await api.post("/todos", { title: payload });
      if (res.data.status == 200) {
        dispatch("fetchTodoList");
      }
    } catch (error) {
      // todo
    }
  },

  async updateTodo({ dispatch }, payload) {
    try {
      const res = await api.put(`/todos/${payload.id}`, {
        status: payload.status
      });
      if (res.data.status == 200) {
        dispatch("fetchTodoList", payload.filter);
      }
    } catch (error) {
      // todo
    }
  },

  async deleteTodo({ dispatch }, payload) {
    try {
      const res = await api.delete(`/todos/${payload.id}`);
      if (res.data.status == 200) {
        dispatch("fetchTodoList", payload.filter);
      }
    } catch (error) {
      // todo
    }
  },

  async changeStatusAll({ dispatch }, payload) {
    try {
      const res = await api.put("/todos", {
        status: payload.status
      });
      if (res.data.status == 200) {
        dispatch("fetchTodoList", payload.filter);
      }
    } catch (error) {
      // todo
    }
  },

  async deleteComplete({ dispatch }, payload) {
    try {
      const res = await api.delete("/todos");
      if (res.data.status == 200) {
        dispatch("fetchTodoList", payload);
      }
    } catch (error) {
      // todo
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
