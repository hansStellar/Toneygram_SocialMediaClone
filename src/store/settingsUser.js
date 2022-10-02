import { firebaseAuth, firebaseDb } from "src/boot/firebase";

const state = {
  currentUserInfoData: {},
  currentUserChat: {},
  currentUserIndex: {},
  userOnPageReadySettings: false,
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
  setUserOnPageReadySettings(state) {
    state.userOnPageReadySettings = true;
  },
};

const actions = {
  setUserOnPageReadySettingsActions({ commit }) {
    commit("setUserOnPageReadySettings");
  },
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

      // Read from firebase database User Actual Page (Following Actual User)
      const followingActRef = await firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/")
        .once("value", (followingList) => {
          dispatch("addFollowingToCurrentUserAction", followingList.val());
        });

      // Read from firebase database User Actual Page (Followers Users On Page)
      const followersActRef = await firebaseDb
        .ref("toneygram/users/" + idUserAdd + "/followers/")
        .once("value", (followersList) => {
          dispatch(
            "actionsOnWeb/updateFollowersListFromUserOnPageAction",
            followersList.val(),
            { root: true }
          );
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

      // Read from firebase database User Actual Page (Following Actual User)
      const UnfollowingActRef = await firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/")
        .once("value", (followingList) => {
          dispatch("addFollowingToCurrentUserAction", followingList.val());
        });

      // Read from firebase database User Actual Page (Followers Users On Page)
      const UnfollowersActRef = await firebaseDb
        .ref("toneygram/users/" + idUserRemove + "/followers/")
        .once("value", (followersList) => {
          dispatch(
            "actionsOnWeb/updateFollowersListFromUserOnPageAction",
            followersList.val(),
            { root: true }
          );
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
    if (state.currentUserInfoData.following === undefined) {
      return (state.currentUserInfoData.following = {});
    }

    return state.currentUserInfoData.following;
  },
  getUserOnPageReadySettings(state) {
    return state.userOnPageReadySettings;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
