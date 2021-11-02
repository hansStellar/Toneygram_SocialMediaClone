<template>
  <!-- Desktop New One -->
  <q-page
    class="flex row justify-between q-pt-md baseFeed"
    style="max-width: 940px; margin: auto"
  >
    <!-- No Activity -->
    <section
      class="col-12 col-sm-8 items-center relative-position"
      v-if="allSet && this.postsToShow.length === 0"
    >
      <div class="absolute-top-center text-center">
        <h4 class="col">No activity :(</h4>
        <p class="text-light-blue-5">Go to explore section ...</p>
      </div>
    </section>
    <!-- Left Side -->
    <section
      class="col-12 col-sm-8"
      v-if="allSet && this.postsToShow.length > 0"
    >
      <!-- Base -->
      <q-card
        class="no-shadow no-border-radius col column q-mb-lg"
        style="border: solid 1px lightgray"
        v-for="(post, index) in postsToShow"
        :key="index"
      >
        <!-- Header -->
        <q-card-section class="no-padding">
          <!-- Banner name and avatar -->
          <q-item>
            <q-item-section avatar>
              <q-img
                class="cursor-pointer"
                style="border-radius: 100%"
                @click="goToUser(post.userInfo.userId)"
                :ratio="1"
                :src="post.userInfo.userImg"
                width="32px"
                height="32px"
                v-if="allSet"
              />
              <q-skeleton type="circle" size="32px" v-else />
            </q-item-section>

            <q-item-section>
              <q-item-label
                @click="goToUser(post.userInfo.userId)"
                class="cursor-pointer text-weight-bold"
                v-if="allSet"
                style="max-width: max-content"
                >{{ post.userInfo.userName }}</q-item-label
              >
              <q-skeleton width="150px" v-else />
              <q-item-label caption style="max-width: max-content">
                Subhead
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator color="grey-3" size="1px" />
        <!-- Img -->
        <q-carousel
          animated
          v-model="post.scrollIndex"
          :arrows="Object.values(post.imagesUploaded).length > 1"
          swipeable
          :navigation="Object.values(post.imagesUploaded).length > 1"
          infinite
          v-if="allSet"
          class="no-padding full-width full-height"
        >
          <q-carousel-slide
            v-for="(image, index) in post.imagesUploaded"
            :key="index"
            style="padding: 0; margin: 0; width: 100%; height: 100%"
            class=""
            :name="index"
          >
            <q-img
              :ratio="2 / 2"
              class="no-shadow"
              :src="image"
              style="padding: 0; margin: 0; width: 100%; height: 100%"
            />
          </q-carousel-slide>
        </q-carousel>
        <q-img :ratio="2 / 2" class="no-border-radius" v-else>
          <q-skeleton class="no-border-radius" height="100%" width="100%" />
        </q-img>
        <q-separator color="grey-3" size="1px" />
        <!-- Like and comment -->
        <q-card-actions class="q-pb-none q-px-none full-width" align="left">
          <q-btn
            dense
            round
            flat
            v-if="post.likes && currentUserInfoData.id in post.likes"
            @click="unlikePost(post.idPost, post.userInfo.userId)"
            icon="favorite"
            color="red"
          />
          <q-btn
            dense
            round
            flat
            icon="favorite_border"
            v-else
            @click="likePost(post.idPost, post.userInfo.userId)"
          />
          <q-btn dense round flat icon="far fa-comment" />
        </q-card-actions>
        <!-- Likes -->
        <q-card-actions
          v-if="allSet"
          class="q-py-none text-weight-bold full-width"
          align="left"
        >
          <div v-if="post.likes">
            {{ Object.values(post.likes).length }} likes
          </div>
          <div v-else>0 likes</div>
        </q-card-actions>
        <!-- Description -->
        <q-list class="q-py-none full-width">
          <q-card-actions class="q-py-none">
            <span
              class="cursor-pointer text-weight-bold"
              @click="goToUser(post.userInfo.userId)"
            >
              {{ post.userInfo.userName }} &nbsp;
            </span>
            <span> {{ post.description }} </span>
          </q-card-actions>
        </q-list>
        <!-- Comments -->
        <q-list
          style="max-height: 120px; overflow: overlay"
          class="q-py-none full-width"
          v-if="post.messages"
        >
          <q-card-actions
            class="q-py-none"
            v-for="(comment, index) in post.messages"
            :key="index"
          >
            <span
              class="cursor-pointer text-weight-bold"
              @click="goToUser(comment.idUser)"
            >
              {{ comment.userName }} &nbsp;
            </span>
            <span class="ellipsis"> {{ comment.message }} </span>
          </q-card-actions>
        </q-list>
        <q-separator color="grey-3" size="1px" />
        <!-- Create Comment -->
        <div class="bg-white full-width q-px-sm ccInfo">
          <q-input
            color="grey-6"
            v-model="textMessage"
            label="Add a comment ..."
            autofocus
            autocomplete="off"
            borderless
          >
            <template v-slot:append>
              <q-btn
                label="POST"
                dense
                flat
                color="primary"
                @click="sendText(post.userInfo.userId, post.idPost)"
                :disable="textMessage.length <= 0"
              />
            </template>
          </q-input>
        </div>
      </q-card>
    </section>
    <!-- Skeleton -->
    <section
      class="col-12 col-sm-8"
      v-if="!allSet && this.postsToShow.length === 0"
    >
      <q-card
        class="no-shadow no-border-radius col column q-mb-lg"
        style="border: solid 1px lightgray"
        v-for="(post, index) in skeletonTimes"
        :key="index"
      >
        <!-- Header -->
        <q-card-section class="no-padding">
          <!-- Banner name and avatar -->
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="circle" size="32px" />
            </q-item-section>

            <q-item-section>
              <q-skeleton width="150px" class="q-mb-sm" />
              <q-item-label caption>
                <q-skeleton width="70px" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator color="grey-3" size="1px" />
        <!-- Img -->
        <q-img
          :ratio="2 / 2"
          class="no-shadow"
          style="padding: 0; margin: 0; width: 100%; height: 100%"
        >
          <q-skeleton class="no-border-radius" height="100%" width="100%" />
        </q-img>
        <q-separator color="grey-3" size="1px" />
        <!-- Like and comment -->
        <q-card-actions class="q-mb-sm q-pb-none full-width" align="left">
          <q-skeleton width="150px" />
        </q-card-actions>
      </q-card>
    </section>
    <!-- Right Side -->
    <section
      v-if="allSet"
      class="col-0 col-sm-4 q-pl-md newSideRight relative-position row"
    >
      <article class="fixed full-width" style="max-width: 20rem">
        <!-- My Card -->
        <q-list class="q-mt-none">
          <q-item class="q-my-sm">
            <!-- Img -->
            <q-item-section avatar>
              <q-img
                class="cursor-pointer"
                style="border-radius: 100%; border: solid 1px lightgray"
                :ratio="1"
                :src="currentUserInfoData.img"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: currentUserInfoData.id,
                    },
                  })
                "
              />
            </q-item-section>
            <!-- Left Side -->
            <q-item-section>
              <q-item-label
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: currentUserInfoData.id,
                    },
                  })
                "
                class="cursor-pointer text-weight-medium"
                >{{ currentUserInfoData.name }}</q-item-label
              >
              <q-item-label class="text-weight-regular" caption lines="1">{{
                currentUserInfoData.fullname
              }}</q-item-label>
            </q-item-section>
            <!-- Right Side -->
            <q-item-section side>
              <q-btn
                class="text-caption text-weight-bold"
                color="light-blue-7"
                dense
                flat
                no-caps
                @click="logOff"
              >
                Switch
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- New Side Desktop -->
        <q-list v-if="allSet">
          <q-item-label header class="q-pb-sm"
            >Suggestions for you</q-item-label
          >
          <q-item
            v-for="(user, index) in suggetionsUsers"
            :key="index"
            class="q-py-none"
          >
            <!-- Img -->
            <q-item-section avatar>
              <q-img
                class="cursor-pointer"
                style="border-radius: 100%; border: solid 1px lightgray"
                :ratio="1"
                :src="user.userInformation.img"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: user.userInformation.id,
                    },
                  })
                "
              />
            </q-item-section>
            <!-- Left Side -->
            <q-item-section>
              <q-item-label
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: user.userInformation.id,
                    },
                  })
                "
                class="cursor-pointer text-weight-medium"
                >{{ user.userInformation.name }}</q-item-label
              >
              <q-item-label class="text-weight-regular" caption lines="1">{{
                user.userInformation.fullname
              }}</q-item-label>
            </q-item-section>
            <!-- Right Side -->
            <q-item-section side>
              <q-btn
                dense
                no-caps
                flat
                class="text-caption text-weight-bold"
                v-if="user.userInformation.id in following"
                @click="unFollowUser(user.userInformation.id)"
                color="black"
              >
                Unfollow
              </q-btn>
              <q-btn
                dense
                no-caps
                v-else
                flat
                class="text-caption text-weight-bold"
                @click="followUser(user.userInformation.id)"
                color="light-blue-7"
              >
                Follow
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Footer -->
        <div class="text-grey-5 text-weight-light text-overline q-pl-md">
          © 2021 Toneygram
        </div>
      </article>
    </section>
    <!-- Skeleton -->
    <section v-else class="col-0 col-sm-4 q-pl-md newSideRight">
      <!-- My Card -->
      <q-list class="q-mt-none">
        <q-item class="q-my-sm">
          <!-- Img -->
          <q-item-section avatar>
            <q-skeleton type="circle" size="32px" />
          </q-item-section>
          <!-- Left Side -->
          <q-item-section>
            <q-item-label class="cursor-pointer"
              ><q-skeleton width="150px"
            /></q-item-label>
            <q-item-label caption lines="1"
              ><q-skeleton width="70px"
            /></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- New Side Desktop -->
      <q-list>
        <q-item-label header class="q-pb-sm"
          ><q-skeleton width="150px"
        /></q-item-label>
        <q-item
          class="q-my-sm"
          v-for="(item, index) in skeletonTimes"
          :key="index"
        >
          <!-- Img -->
          <q-item-section avatar>
            <q-skeleton type="circle" size="32px" />
          </q-item-section>
          <!-- Left Side -->
          <q-item-section>
            <q-item-label class="cursor-pointer"
              ><q-skeleton width="150px"
            /></q-item-label>
            <q-item-label caption lines="1"
              ><q-skeleton width="70px"
            /></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Footer -->
      <div class="text-grey-5 text-weight-light text-overline q-pl-md">
        © 2021 Toneygram
      </div>
    </section>
  </q-page>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { mapState } from "vuex";
import { Notify, uid } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      skeletonTimes: [1, 2, 3],
      slide: 0,
      following: {},
      allSet: false,
      postsToShow: [],
      suggetionsUsers: [],
      textMessage: "",
      contador: 0,
    };
  },
  methods: {
    followUser(idUserAdd) {
      let userIdAuth = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + idUserAdd
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
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
      currentUserRouteFollowers.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + idUserAdd + "/followers/" + userIdAuth
        );
        currentUserRoute.set(user.userInformation);
      });

      // Read from firebase database User Actual Page (Followers)
      const followerActRef = firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/")
        .once("child_added", (newFollower) => {
          let follower = newFollower.val();
          this.following[newFollower.key] = follower;
        });
    },
    unFollowUser(idUserRemove) {
      let userIdAuth = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + idUserRemove + "/userInformation/"
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
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
      currentUserRouteFollowers.once("value", (userInfo) => {
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + idUserRemove + "/followers/" + userIdAuth
        );
        currentUserRoute.remove();
      });

      // Read from firebase database User Actual Page (Followers)
      const UnfollowerActRef = firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/" + idUserRemove)
        .once("value", (newFollower) => {
          delete this.following[newFollower.key];
        });
    },
    likePost(idPost, idUser) {
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          idUser +
          "/posts/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.set(firebaseAuth.currentUser.uid);
      // Posts ref Global
      const postsGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          idUser +
          "/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postsGlobalRef.set(firebaseAuth.currentUser.uid);

      // Read from firebase database
      // Make a loop of this posts to show
      this.postsToShow.forEach((Post) => {
        if (Post.idPost === idPost) {
          const postLikeActRef = firebaseDb
            .ref(
              "toneygram/users/" +
                Post.userInfo.userId +
                "/posts/" +
                Post.idPost +
                "/likes/"
            )
            .once("value", (like) => {
              if (!Post.likes) {
                Post.likes = like.val();
              } else {
                Post.likes = like.val();
              }
            });
        }
      });
    },
    unlikePost(idPost, idUser) {
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          idUser +
          "/posts/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.remove();
      // Posts ref Global
      const postGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          idUser +
          "/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postGlobalRef.remove();
      this.postsToShow.forEach((Post) => {
        if (Post.idPost === idPost) {
          const postLikeActRef = firebaseDb
            .ref(
              "toneygram/users/" +
                Post.userInfo.userId +
                "/posts/" +
                Post.idPost +
                "/likes/"
            )
            .once("value", (like) => {
              Post.likes = like.val();
            });
        }
      });
    },
    sendText(userId, postId) {
      let randomId = uid();
      // set on User private
      const MessagesBaseRef = firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + postId)
        .once("value", (Post) => {
          if (!Post.hasChild("messages")) {
            let allMesagesArray = [];
            let newMessage = {
              userName: firebaseAuth.currentUser.displayName,
              imgUser: firebaseAuth.currentUser.photoURL,
              idUser: firebaseAuth.currentUser.uid,
              message: this.textMessage,
              date: new Date().getTime(),
            };
            allMesagesArray.push(newMessage);

            const nuevoRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            nuevoRef.set(allMesagesArray);
            this.postsToShow.forEach((post) => {
              if (post.idPost === Post.key) {
                post.messages = allMesagesArray;
              }
            });
            this.textMessage = "";
          } else {
            let allMesagesArray = [];
            const messagesRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            messagesRef
              .once("child_added", (allMesages) => {
                allMesagesArray.push(allMesages.val());
              })
              .then(() => {
                let newMessage = {
                  userName: firebaseAuth.currentUser.displayName,
                  imgUser: firebaseAuth.currentUser.photoURL,
                  idUser: firebaseAuth.currentUser.uid,
                  message: this.textMessage,
                  date: new Date().getTime(),
                };
                allMesagesArray.push(newMessage);
                allMesagesArray.sort((a, b) => {
                  return a.date - b.date;
                });
                messagesRef.set(allMesagesArray);
                this.postsToShow.forEach((post) => {
                  if (post.idPost === Post.key) {
                    post.messages = allMesagesArray;
                  }
                });
              });
          }
        });
      // set on global
      const MessageGlobalRef = firebaseDb
        .ref("toneygram/posts/" + userId + "/" + postId)
        .once("value", (Post) => {
          if (!Post.hasChild("messages")) {
            let allMesagesArray = [];
            let newMessage = {
              userName: firebaseAuth.currentUser.displayName,
              imgUser: firebaseAuth.currentUser.photoURL,
              idUser: firebaseAuth.currentUser.uid,
              message: this.textMessage,
              date: new Date().getTime(),
            };
            allMesagesArray.push(newMessage);

            const nuevoRef = firebaseDb.ref(
              "toneygram/posts/" + userId + "/" + postId + "/messages"
            );
            nuevoRef.set(allMesagesArray);
          } else {
            let allMesagesArray = [];
            const messagesRef = firebaseDb.ref(
              "toneygram/posts/" + userId + "/" + postId + "/messages"
            );
            messagesRef
              .once("child_added", (allMesages) => {
                allMesagesArray.push(allMesages.val());
              })
              .then(() => {
                let newMessage = {
                  userName: firebaseAuth.currentUser.displayName,
                  imgUser: firebaseAuth.currentUser.photoURL,
                  idUser: firebaseAuth.currentUser.uid,
                  message: this.textMessage,
                  date: new Date().getTime(),
                };
                allMesagesArray.push(newMessage);
                allMesagesArray.sort((a, b) => {
                  return a.date - b.date;
                });
                messagesRef.set(allMesagesArray);
                this.textMessage = "";
              });
          }
        });
    },
    goToTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    },
    goToUser(id) {
      this.$router.push({
        name: "User",
        params: {
          userId: id,
        },
      });
    },
    logOff() {
      firebaseAuth.signOut().then(() => {
        this.$router.push({ name: "Auth" }).then(() => {
          Notify.create({
            message: "You have logged off",
            color: "light-blue-5",
          });
        });
      });
    },
    onScroll(position) {
      console.log(position);
    },
  },
  computed: {
    ...mapState("settingsUser", ["currentUserInfoData"]),
  },
  mounted() {
    setTimeout(() => {
      window.scrollTo(0, 0);
      let postCurrentUserStatus = false;
      let postsFromFollowingStatus = false;
      let suggestesUsersStatus = false;
      let userId = this.currentUserInfoData.id;
      let baseRef = firebaseDb.ref("toneygram");
      baseRef
        .once("value", (allData) => {
          let allDataVar = allData.val();
        })
        .then((value) => {
          // ------ Get all the posts of current user ------ //
          let postsCurrentUser = value.val().users[userId];
          // If user has posts
          if (postsCurrentUser.posts) {
            Object.values(postsCurrentUser.posts).forEach((Post) => {
              this.postsToShow.push(Post);
              //Order
              this.postsToShow.sort((a, b) => {
                return b.fullD - a.fullD;
              });
              postCurrentUserStatus = true;
            });
          } /* If User does not have posts */ else {
            postCurrentUserStatus = true;
          }

          // ----- Get all the followings from current User -------- //
          let followingSectionCurrentUser = value.val().users[userId];
          // Get all the posts from following users
          let postsFromFollowing = value.val().posts;
          // if current user has following
          if (followingSectionCurrentUser.following) {
            for (const following in followingSectionCurrentUser.following) {
              if (following in postsFromFollowing) {
                Object.values(postsFromFollowing[following]).forEach((Post) => {
                  this.postsToShow.push(Post);
                });
                this.postsToShow.sort((a, b) => {
                  return b.fullD - a.fullD;
                });
              }
            }
            postsFromFollowingStatus = true;
          } /* if doesnt has any following */ else {
            postsFromFollowingStatus = true;
          }

          // ------ Suggested Users --------- //
          let allUsers = value.val().users;
          // if user doesnt has any following
          if (!followingSectionCurrentUser.following) {
            Object.values(allUsers).forEach((User) => {
              if (User.userInformation.id !== userId) {
                this.suggetionsUsers.push(User);
                if (this.suggetionsUsers.length > 5) {
                  this.suggetionsUsers.splice(5, this.suggetionsUsers.length);
                }
              }
            });
            suggestesUsersStatus = true;
          }
          // ------- If the user follows any user --------- //
          else {
            for (const user in allUsers) {
              if (!(user in postsCurrentUser.following) && user !== userId) {
                this.suggetionsUsers.push(allUsers[user]);
                if (this.suggetionsUsers.length > 5) {
                  this.suggetionsUsers.splice(5, this.suggetionsUsers.length);
                }
              }
            }
            suggestesUsersStatus = true;
          }
        })
        .then(() => {
          if (
            postCurrentUserStatus &&
            postsFromFollowingStatus &&
            suggestesUsersStatus
          ) {
            this.allSet = true;
          } else {
            this.allSet = false;
          }
        })
        .then(() => {
          window.scrollTo(0, 0);
        });
    }, 2000);
    // let baseRef = firebaseDb.ref('toneygram')
    // baseRef.

    // // Posts Ref
    // let postsRef = firebaseDb.ref("toneygram/posts/");

    // // Current User All Info Ref
    // let currentUserAllInfo = firebaseDb.ref("toneygram/users/" + userId);

    // // Current User Following Path
    // let followingCurrentUserPosts = firebaseDb.ref(
    //   "toneygram/users/" + userId + "/following"
    // );

    // // --------- Where all begins
    // currentUserAllInfo
    //   .once("value", (allUserInfo) => {
    //     let allUserInfoVar = allUserInfo.val();
    //     /*  ------------- Read Posts From Followings  ------------- */
    //     //  If user has following
    //     if (allUserInfoVar.following) {
    //       // Loop though the following users
    //       followingCurrentUserPosts.once("value", (UsersFromFollowing) => {
    //         let usersFromFollowingVar = UsersFromFollowing.val();
    //         postsRef
    //           .once("child_added", (users) => {
    //             if (users.key in usersFromFollowingVar) {
    //               Object.values(users.val()).forEach((post) => {
    //                 this.postsToShow.push(post);
    //                 this.postsToShow.sort((a, b) => {
    //                   return (
    //                     new Date(b.fullD).getTime() -
    //                     new Date(a.fullD).getTime()
    //                   );
    //                 });
    //               });
    //             }
    //           })
    //           .then(() => {
    //             this.postsFollowingStatus = true;
    //           })
    //           .catch(() => {
    //             this.postsFollowingStatus = false;
    //           });
    //       });
    //       // ----------------------------------------- If user doesn't have any following ------------------------------------- //
    //     } else {
    //       this.postsToShow = [];
    //       this.postsFollowingStatus = true;
    //     }
    //     /*  ------------- Read Posts From Current User  ------------- */
    //     currentUserAllInfo.once("value", (allData) => {
    //       let allDataVar = allData.val();
    //       if (allDataVar.posts) {
    //         let postsCurrentUser = firebaseDb.ref(
    //           "toneygram/users/" + userId + "/posts"
    //         );
    //         postsCurrentUser
    //           .once("child_added", (postsFromCurrentUser) => {
    //             let posts = postsFromCurrentUser.val();
    //             this.postsToShow.push(posts);
    //             this.postsToShow.sort((a, b) => {
    //               return a.fullD - b.fullD;
    //             });
    //           })
    //           .then(() => {
    //             this.postsCurrentUserStatus = true;
    //           })
    //           .catch(() => {
    //             this.postsCurrentUserStatus = false;
    //           });
    //       } else {
    //         this.postsCurrentUserStatus = true;
    //       }
    //     });
    //     /*  ------------- Suggested Users  ------------- */
    //     const allUsers = firebaseDb.ref("toneygram/users");
    //     allUsers.once("value", (allUsers) => {
    //       let allUsersVar = allUsers.val();
    //       // Actual User followings
    //       const actualUserInfo = firebaseDb.ref("toneygram/users/" + userId);
    //       actualUserInfo
    //         .once("value", (userInfoActual) => {
    //           let actualUserInfo = userInfoActual.val();
    //           // If doesnt has any following
    //           if (actualUserInfo.following === undefined) {
    //             Object.values(allUsersVar).forEach((User) => {
    //               if (User.userInformation.id !== userId) {
    //                 this.suggetionsUsers.push(User);
    //                 if (this.suggetionsUsers.length > 5) {
    //                   this.suggetionsUsers.splice(
    //                     5,
    //                     this.suggetionsUsers.length
    //                   );
    //                 }
    //               }
    //             });
    //           }
    //           // If the user follows any user
    //           else {
    //             for (const user in allUsersVar) {
    //               if (
    //                 !(user in actualUserInfo.following) &&
    //                 user !== userId
    //               ) {
    //                 this.suggetionsUsers.push(allUsersVar[user]);
    //                 if (this.suggetionsUsers.length > 5) {
    //                   this.suggetionsUsers.splice(
    //                     5,
    //                     this.suggetionsUsers.length
    //                   );
    //                 }
    //               }
    //             }
    //           }
    //         })
    //         .then(() => {
    //           this.suggestedUsersStatus = true;
    //         })
    //         .catch(() => {
    //           this.suggestedUsersStatus = false;
    //         });
    //     });
    //   })
    //   .then(() => {
    //     if (
    //       this.postsCurrentUserStatus ||
    //       this.suggestedUsersStatus ||
    //       this.postsFollowingStatus
    //     ) {
    //       this.allSet = true;
    //     } else {
    //       this.allSet = false;
    //     }
    //   })
    //   .catch(() => {
    //     if (
    //       this.postsCurrentUserStatus &&
    //       this.suggestedUsersStatus &&
    //       this.postsFollowingStatus
    //     ) {
    //       this.allSet = true;
    //     } else {
    //       this.allSet = false;
    //     }
    //   });
  },
};
</script>
<style lang="scss">
// iPhone
@media (max-width: 480px) {
  .newSideRight {
    display: none;
  }
  .baseFeed {
    justify-content: center;
    padding: 0;
  }
}

// Tablet
@media (min-width: 480px) {
  .newSideRight {
    display: none;
  }
  .baseFeed {
    padding: 0rem 0 0;
    justify-content: center;
  }
}

// Desktop
@media (min-width: 768px) {
  .newSideRight {
    display: flex;
    flex-direction: column;
  }
  .baseFeed {
    padding: 2rem 0 0;
  }
}
</style>
