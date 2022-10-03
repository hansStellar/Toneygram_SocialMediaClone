import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { Notify } from "quasar";

const state = {
  postsToShow: [],
  suggestedUsers: [],
  allSetForPostsOnIndex: false,
  postOnShow: {},
  postOnShowReady: false,
  userOnPage: {},
  userOnPageReady: false,
  itsSameUser: null,
  postsInExplore: [],
};

const mutations = {
  sendPostsToShow(state, posts) {
    posts.forEach((p) => {
      p.textMessage = "";
    });

    // Likes

    state.postsToShow = posts;
  },
  sendSuggetedUsers(state, users) {
    state.suggestedUsers = users;
  },
  setLogOff(state) {
    state.suggestedUsers = [];
    state.postsToShow = [];
    state.allSetForPostsOnIndex = false;
  },
  setAllSetForPostsOnIndex(state) {
    state.allSetForPostsOnIndex = true;
  },
  setNewLikesToPost(state, payload) {
    // Index
    state.postsToShow.forEach((p) => {
      if (payload.idPost === p.idPost) return (p.likes = payload.likes);
    });
    // Post Single
    if (payload.likes === null) {
      return (state.postOnShow.likes = {});
    }
    if (Object.values(state.postOnShow).length != 0)
      return (state.postOnShow.likes = payload.likes);
  },
  setNewMessagesToPost(state, payload) {
    // Index
    state.postsToShow.forEach((p) => {
      if (payload.idPost === p.idPost) p.messages = payload.messages;
    });
    // Post Single
    if (Object.values(state.postOnShow).length != 0)
      state.postOnShow.messages = payload.messages;

    // Clear text message
    state.postsToShow.forEach((p) => {
      return (p.textMessage = "");
    });
  },
  getPostOnShow(state, payload) {
    state.postOnShow = payload;

    state.postOnShowReady = true;

    if (!payload.hasOwnProperty("likes")) {
      return (state.postOnShow.likes = {});
    }
  },
  removeThePostOnShow(state) {
    state.postOnShow = {};
    state.postOnShowReady = false;
  },
  setUserPageGlobal(state, payload) {
    state.userOnPage = payload.userOnPage;
    state.userOnPageReady = true;

    if (payload.userOnPage.userInformation.id === payload.userIdLoggedIn) {
      return (state.itsSameUser = true);
    }

    if (payload.userOnPage.userInformation.id !== payload.userIdLoggedIn) {
      return (state.itsSameUser = false);
    }
  },
  removeTheUserPageGlobal(state) {
    state.userOnPage = {};
    state.userOnPageReady = false;
  },
  updateFollowersListFromUserOnPage(state, payload) {
    if (Object.keys(state.userOnPage).length != 0)
      state.userOnPage.followers = payload;

    if (payload == null) state.userOnPage.followers = {};
  },
  getPostsFromExplore(state, postsInExplore) {
    state.postsInExplore = postsInExplore;
  },
};

const actions = {
  setNewMessagesToPostAction({ commit }, payload) {
    commit("setNewMessagesToPost", payload);
  },
  setNewLikesToPostAction({ commit }, payload) {
    commit("setNewLikesToPost", payload);
  },
  showPostsAction({ commit }, id) {
    let postsToShow = [];
    let suggestedUsers = [];
    let userId = id;
    let baseRef = firebaseDb.ref("toneygram");
    baseRef
      .once("value", async (allData) => {
        let allDataVar = await allData.val();
      })
      .then(async (value) => {
        // ------ Get all the posts of current user ------ //
        let postsCurrentUser = await value.val().users[userId];

        // If user has posts
        if (postsCurrentUser.posts) {
          Object.values(postsCurrentUser.posts).forEach((Post) => {
            // Push all the post into the array
            postsToShow.push(Post);
            //Order the posts by date
            postsToShow.sort((a, b) => {
              return b.fullD - a.fullD;
            });

            return postsToShow;
          });
        }

        // ----- Get all the followings from current User -------- //
        let followingSectionCurrentUser = await value.val().users[userId];

        // Get all the posts from following users
        let postsFromFollowing = await value.val().posts;

        // if current user is following users, we get the posts from those users and we push them into the array
        if (followingSectionCurrentUser.following) {
          for (const following in followingSectionCurrentUser.following) {
            if (following in postsFromFollowing) {
              Object.values(postsFromFollowing[following]).forEach((Post) => {
                postsToShow.push(Post);
              });
              postsToShow.sort((a, b) => {
                return b.fullD - a.fullD;
              });
            }
          }
        }

        commit("sendPostsToShow", postsToShow);

        // ------ Suggested Users --------- //
        let allUsers = await value.val().users;
        // if user doesnt has any following
        if (!followingSectionCurrentUser.following) {
          Object.values(allUsers).forEach((User) => {
            if (User.userInformation.id !== userId) {
              suggestedUsers.push(User);
              if (suggestedUsers.length > 5) {
                suggestedUsers.splice(5, suggestedUsers.length);
                commit("sendSuggetedUsers", suggestedUsers);
              }
            }
          });
        }
        // ------- If the user follows any user --------- //
        else {
          for (const user in allUsers) {
            if (!(user in postsCurrentUser.following) && user !== userId) {
              suggestedUsers.push(allUsers[user]);
              if (suggestedUsers.length > 5) {
                suggestedUsers.splice(5, suggestedUsers.length);
                commit("sendSuggetedUsers", suggestedUsers);
              }
            }
          }
        }

        commit("setAllSetForPostsOnIndex", true);
      });
  },
  logOff({ commit }) {
    firebaseAuth.signOut().then(() => {
      commit("setLogOff");
      this.$router.push({ name: "Auth" });
    });
  },

  async likePost({ dispatch, getters }, payload) {
    try {
      let idUser = payload.userId;
      let idPost = payload.idPost;
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          idUser +
          "/posts/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      await postRef.set(firebaseAuth.currentUser.uid);
      // Posts ref Global
      const postsGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          idUser +
          "/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      await postsGlobalRef.set(firebaseAuth.currentUser.uid);

      // Read from firebase database
      // Make a loop of these posts to show

      const postLikeActRef = await firebaseDb
        .ref("toneygram/users/" + idUser + "/posts/" + idPost + "/likes/")
        .once("value", (like) => {
          const payload = {
            likes: like.val(),
            idPost,
          };
          dispatch("setNewLikesToPostAction", payload);
        });
    } catch (error) {
      console.log(new Error("Error"));
    }
  },
  async unlikePost({ dispatch, getters }, payload) {
    try {
      let idUser = payload.userId;
      let idPost = payload.idPost;
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          idUser +
          "/posts/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      await postRef.remove();
      // Posts ref Global
      const postGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          idUser +
          "/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      await postGlobalRef.remove();
      const postLikeActRef = await firebaseDb
        .ref("toneygram/users/" + idUser + "/posts/" + idPost + "/likes/")
        .once("value", (like) => {
          const payload = {
            likes: like.val(),
            idPost,
          };
          dispatch("setNewLikesToPostAction", payload);
        });
    } catch (error) {
      console.log(new Error("Cant"));
    }
  },
  async sendText({ dispatch, getters }, payload) {
    let userId = payload.userId;
    let postId = payload.idPost;
    let message = payload.message;
    try {
      // set on User private
      const MessagesBaseRef = await firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + postId)
        .once("value", async (Post) => {
          if (!Post.hasChild("messages")) {
            let allMesagesArray = [];
            let newMessage = {
              userName: firebaseAuth.currentUser.displayName,
              imgUser: firebaseAuth.currentUser.photoURL,
              idUser: firebaseAuth.currentUser.uid,
              message,
              date: new Date().getTime(),
            };
            allMesagesArray.push(newMessage);

            const nuevoRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            await nuevoRef.set(allMesagesArray);

            // Read
            let payload = {
              idPost: postId,
              messages: allMesagesArray,
            };
            dispatch("setNewMessagesToPostAction", payload);
          } else {
            let allMesagesArray = [];
            const messagesRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            await messagesRef
              .once("child_added", (allMesages) => {
                allMesagesArray.push(allMesages.val());
              })
              .then(async () => {
                let newMessage = {
                  userName: firebaseAuth.currentUser.displayName,
                  imgUser: firebaseAuth.currentUser.photoURL,
                  idUser: firebaseAuth.currentUser.uid,
                  message,
                  date: new Date().getTime(),
                };
                allMesagesArray.push(newMessage);
                allMesagesArray.sort((a, b) => {
                  return a.date - b.date;
                });
                await messagesRef.set(allMesagesArray);

                // Read
                let payload = {
                  idPost: postId,
                  messages: allMesagesArray,
                };
                dispatch("setNewMessagesToPostAction", payload);
              });
          }
        });
      // set on global
      const MessageGlobalRef = await firebaseDb
        .ref("toneygram/posts/" + userId + "/" + postId)
        .once("value", async (Post) => {
          if (!Post.hasChild("messages")) {
            let allMesagesArray = [];
            let newMessage = {
              userName: firebaseAuth.currentUser.displayName,
              imgUser: firebaseAuth.currentUser.photoURL,
              idUser: firebaseAuth.currentUser.uid,
              message,
              date: new Date().getTime(),
            };
            allMesagesArray.push(newMessage);

            const nuevoRef = firebaseDb.ref(
              "toneygram/posts/" + userId + "/" + postId + "/messages"
            );
            await nuevoRef.set(allMesagesArray).then(() => {});
          } else {
            let allMesagesArray = [];
            const messagesRef = firebaseDb.ref(
              "toneygram/posts/" + userId + "/" + postId + "/messages"
            );
            await messagesRef
              .once("child_added", (allMesages) => {
                allMesagesArray.push(allMesages.val());
              })
              .then(async () => {
                let newMessage = {
                  userName: firebaseAuth.currentUser.displayName,
                  imgUser: firebaseAuth.currentUser.photoURL,
                  idUser: firebaseAuth.currentUser.uid,
                  message,
                  date: new Date().getTime(),
                };
                allMesagesArray.push(newMessage);
                allMesagesArray.sort((a, b) => {
                  return a.date - b.date;
                });
                await messagesRef.set(allMesagesArray).then(() => {});
              });
          }
        });
    } catch (error) {
      console.log(new Error("error"));
    }
  },
  async getPostOnShowAction({ commit }, payload) {
    let indexPost = payload.indexPost;
    let userId = payload.userId;
    try {
      // Get the post and set it to the state
      let postRef = await firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + indexPost)
        .once("value", (post) => {
          commit("getPostOnShow", post.val());
        })
        .then(() => {
          // Go to the page
          this.$router.push({
            name: "Post",
            params: { userId: userId, postId: indexPost },
          });
        });
    } catch (error) {
      console.log(error);
    }
  },
  async removeThePostOnShowAction({ commit }) {
    commit("removeThePostOnShow");
  },
  async goToUser({ commit }, payload) {
    try {
      const currentUserInformationRef = await firebaseDb
        .ref("toneygram/users/" + payload.userId)
        .once("value", (userInPage) => {
          let payloadx2 = {
            userOnPage: userInPage.val(),
            userIdLoggedIn: payload.userIdLoggedIn,
          };
          commit("setUserPageGlobal", payloadx2);
        });

      this.$router.push({
        name: "User",
        params: {
          userId: payload.userId,
        },
      });
    } catch (error) {
      console.log(new Error("Error"));
    }
  },
  async removeTheUserOnPageAction({ commit }) {
    commit("removeTheUserPageGlobal");
  },
  async updateFollowersListFromUserOnPageAction({ commit }, payload) {
    commit("updateFollowersListFromUserOnPage", payload);
  },
  async getPostsFromExploreAction({ commit }) {
    // Loop through the no following users
    const postsRef = firebaseDb.ref("toneygram/posts");
    postsRef.once("value", (allUsers) => {
      // First we loop on the all users section
      let allUsersVar = allUsers.val();
      let allUsersVarArray = Object.values(allUsersVar);
      let arrayUsers = [];
      let postsExplore = [];

      // We loop 5 times the object, so we ended passing 5 users to the arrayUsers
      do {
        for (let index = 0; index <= allUsersVarArray.length; index++) {
          let user =
            allUsersVarArray[
              Math.floor(Math.random() * allUsersVarArray.length)
            ];
          arrayUsers.push(user);
          arrayUsers.length = allUsersVarArray.length;
        }
        arrayUsers = arrayUsers.filter(function (item, pos) {
          return arrayUsers.indexOf(item) == pos;
        });
      } while (arrayUsers.length < allUsersVarArray.length);
      // We loop every user that is in the array in order to get 1 post of each one of them
      arrayUsers.forEach((User) => {
        // For every user we must have one post
        if (Object.values(User).length > 1) {
          postsExplore.push(
            Object.values(User)[
              Math.floor(Math.random() * Object.values(User).length)
            ]
          );
          commit("getPostsFromExplore", postsExplore);
        } else {
          postsExplore.push(Object.values(User)[0]);
          commit("getPostsFromExplore", postsExplore);
        }
      });
    });
  },
};

const getters = {
  showPostsGetter(state) {
    return state.postsToShow;
  },
  getStatusForPostsOnIndex(state) {
    return state.allSetForPostsOnIndex;
  },
  getSuggetedsUsers(state) {
    return state.suggestedUsers;
  },
  getPostOnShow(state) {
    return state.postOnShow;
  },
  getPostOnShowReady(state) {
    return state.postOnShowReady;
  },
  getUserOnPageGlobal(state) {
    return state.userOnPage;
  },
  getUserOnPageGlobalReady(state) {
    return state.userOnPageReady;
  },
  getItsSameUser(state) {
    return state.itsSameUser;
  },
  getPostsInExplore(state) {
    return state.postsInExplore;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
