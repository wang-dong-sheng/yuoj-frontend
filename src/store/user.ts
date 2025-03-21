// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated/services/user";
import router from "@/router";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userAccount: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },

    async logout({ commit }) {
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        commit("updateUser", {
          userAccount: "未登录",
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
        await router.push("/user/login");
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
