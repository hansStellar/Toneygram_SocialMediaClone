import { firebaseAuth, firebaseDb } from "src/boot/firebase";

const state = {
  currentUserInfoData: {},
  currentUserChat: {},
  currentUserIndex: {},
  userOnPageReadySettings: false,
  itsNewUser: false,
};

const mutations = {
  logOff(state) {
    state.currentUserInfoData = {};
    state.currentUserChat = {};
    state.currentUserIndex = {};
    state.userOnPageReadySettings = false;
    state.itsNewUser = false;
  },
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
  setActualFollowingToCurrentUser(state, payload) {
    state.currentUserInfoData.following = payload;
  },
  setItsNewUser(state) {
    state.itsNewUser = true;
  },
};

const actions = {
  setItsNewUserAction({ commit }) {
    commit("setItsNewUser");
  },
  setLoggedOff({ commit }) {
    commit("logOff");
  },
  setUserOnPageReadySettingsActions({ commit }) {
    commit("setUserOnPageReadySettings");
  },
  addFollowingToCurrentUserAction({ commit }, payload) {
    if (payload === null) payload = {};

    commit("addFollowingToCurrentUser", payload);
  },
  async followUser({ dispatch }, idUserAdd) {
    try {
      let userIdAuth = firebaseAuth.currentUser.uid;

      // Following Section
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

      // Followers Section
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

      // Update The Global State from the current user
      dispatch("actionsOnWeb/showPostsAction", userIdAuth, { root: true });
      dispatch("actionsOnWeb/getSuggetedsUsersAction", userIdAuth, {
        root: true,
      });
    } catch (error) {}
  },
  async unFollowUser({ dispatch }, idUserRemove) {
    try {
      let userIdAuth = firebaseAuth.currentUser.uid;

      // Following Section
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
      // Followers Section
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

      // Update The Global State from the current user
      dispatch("actionsOnWeb/showPostsAction", userIdAuth, { root: true });
      dispatch("actionsOnWeb/getSuggetedsUsersAction", userIdAuth, {
        root: true,
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
  setActualFollowingToCurrentUserAction({ commit }, payload) {
    if (!payload.following) {
      return (payload.following = {});
    }

    if (payload.following === undefined) {
      return (payload.following = {});
    }

    commit("setActualFollowingToCurrentUser", payload.following);
  },
};

const getters = {
  getCurrentUserIndex(state) {
    return state.currentUserIndex;
  },
  getFollowingFromCurrentUser(state) {
    return state.currentUserInfoData.following;
  },
  getUserOnPageReadySettings(state) {
    return state.userOnPageReadySettings;
  },
  getItsNewUser(state) {
    return state.itsNewUser;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
