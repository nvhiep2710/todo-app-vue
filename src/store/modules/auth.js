import api from "@/api";
import router from "../../router/index";

const state = {
  infoUser: {},
  register: false,
  errorPassword: false,
  errorRegister: false,
  token: ""
};
const getters = {};
const mutations = {
  LOGIN_SUCCESS(state, payload) {
    state.infoUser = payload;
  },
  SET_ACCESS_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_ERROR_PASSWORD(state, payload) {
    state.errorPassword = payload;
  },
  REGISTER_SUCCESS(state, payload) {
    state.register = payload;
  },
  SET_ERROR_REGISTER(state, payload) {
    state.errorRegister = payload;
  }
};
const actions = {
  async login({ commit }, payload) {
    try {
      const res = await api.post("/login", {
        email: payload.email,
        password: payload.password
      });
      if (res.data.status == 400) {
        commit("SET_ERROR_PASSWORD", true);
      }
      if (res.data.status == 200) {
        commit("LOGIN_SUCCESS", res.data.data.user);
        commit("SET_ACCESS_TOKEN", res.data.data.access_token);
        router.push({ name: "todo" });
      }
    } catch (error) {
      // todo
    }
  },

  async register({ commit }, payload) {
    try {
      const res = await api.post("/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password
      });
      if (res.data.status == 400) {
        commit("SET_ERROR_REGISTER", true);
      }
      if (res.data.status == 200) {
        commit("REGISTER_SUCCESS", true);
        router.push({ name: "login" });
      }
    } catch (error) {
      // todo
    }
  },

  // login google
  async loginGoogle({ commit }, payload) {
    try {
      const res = await api.post("/login-social", {
        social_id: payload.social_id,
        social_type: "Google",
        name: payload.name
      });
      if (res.data.status == 200) {
        commit("LOGIN_SUCCESS", res.data.data.user);
        commit("SET_ACCESS_TOKEN", res.data.data.access_token);
        router.push({ name: "todo" });
      }
    } catch (error) {
      // todo
    }
  },

  // login google
  async loginFacebook({ commit }, payload) {
    try {
      const res = await api.post("/login-social", {
        social_id: payload,
        social_type: "Facebook"
      });
      if (res.data.status == 200) {
        commit("LOGIN_SUCCESS", res.data.data.user);
        commit("SET_ACCESS_TOKEN", res.data.data.access_token);
        router.push({ name: "todo" });
      }
    } catch (error) {
      // todo
    }
  },

  async logout({ commit }) {
    try {
      await commit("SET_ACCESS_TOKEN", "");
      router.push({ name: "login" });
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
