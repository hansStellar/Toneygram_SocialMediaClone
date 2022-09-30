import { firebaseAuth, firebaseDb } from "src/boot/firebase";

const state = {
  currentUserInfoData: {},
  currentUserChat: {},
  currentUserIndex: {},
};

const mutations = {
  getDataUserIndex(state, data) {
    state.currentUserIndex = data;
  },
  getDataUserInfo(state, data) {
    state.currentUserInfoData = data;
  },
  insertNewUser(state, newUser) {
    state.currentUserChat = newUser;
  },
  addFollowingToCurrentUser(state, payload) {
    state.currentUserInfoData.following = payload;
  },
};

const actions = {
  addFollowingToCurrentUserAction({ commit }, payload) {
    commit("addFollowingToCurrentUser", payload);
  },
  async followUser({ dispatch }, idUserAdd) {
    try {
      let userIdAuth = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + idUserAdd
      );
      await currentUserRouteFollowing.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + userIdAuth + "/following/" + idUserAdd
        );
        currentUserRoute.set(user.userInformation);
      });

      // Followers Steps
      const currentUserRouteFollowers = firebaseDb.ref(
        "toneygram/users/" + userIdAuth
      );
      await currentUserRouteFollowers.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + idUserAdd + "/followers/" + userIdAuth
        );
        currentUserRoute.set(user.userInformation);
      });

      // Read from firebase database User Actual Page (Followers)
      const followerActRef = await firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/")
        .once("value", (followingList) => {
          dispatch("addFollowingToCurrentUserAction", followingList.val());
        });
    } catch (error) {}
  },
  async unFollowUser({ dispatch }, idUserRemove) {
    try {
      let userIdAuth = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + idUserRemove + "/userInformation/"
      );
      await currentUserRouteFollowing.once("value", (userInfo) => {
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + userIdAuth + "/following/" + idUserRemove
        );
        currentUserRoute.remove();
      });
      // Followers Steps
      const currentUserRouteFollowers = firebaseDb.ref(
        "toneygram/users/" + userIdAuth + "/userInformation/"
      );
      await currentUserRouteFollowers.once("value", (userInfo) => {
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + idUserRemove + "/followers/" + userIdAuth
        );
        currentUserRoute.remove();
      });

      // Read from firebase database User Actual Page (Followers)
      const UnfollowerActRef = await firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/")
        .once("value", (followingList) => {
          dispatch("addFollowingToCurrentUserAction", followingList.val());
        });
    } catch (error) {}
  },
  sendUserInformation({ commit }, data) {
    commit("getDataUserInfo", data);
  },
  sendUserInformationForIndex({ commit }, data) {
    commit("getDataUserIndex", data);
  },
  changeUserChat({ commit }, newUser) {
    commit("insertNewUser", newUser);
  },
};

const getters = {
  getCurrentUserIndex(state) {
    return state.currentUserIndex;
  },
  getFollowingFromCurrentUser(state) {
    return state.currentUserInfoData.following;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
