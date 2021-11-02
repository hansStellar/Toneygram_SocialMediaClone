<template>
  <div class="items-center userPageBase">
    <!-- Act Info -->
    <div class="absolute" style="opacity: 0">
      {{ getInfoUserPage }}
    </div>
    <!-- Top -->
    <div class="myCardBaseUser">
      <!-- Img -->
      <div class="pictureBaseLeftSide">
        <div v-if="Object.values(userInfomation).length" class="imgBaseUser">
          <q-img
            :ratio="16 / 9"
            :src="userInfomation.img"
            class="imageMyCardProfile"
          />
        </div>
        <!-- Skeleton -->
        <q-skeleton
          v-if="!Object.values(userInfomation).length"
          type="circle"
          size="150px"
          class="skeletonDesktop"
        />
        <!-- Skeleton Mobile -->
        <q-skeleton
          v-if="!Object.values(userInfomation).length"
          type="circle"
          size="90px"
          class="skeletonMobile"
        />
      </div>
      <!-- Info Upper -->
      <div class="infoUpper">
        <!-- Username -->
        <div class="userNameUpperBase">
          <!-- Info -->
          <div
            v-if="Object.values(userInfomation).length"
            class="nameAndSettingsPart"
          >
            <!-- Name -->
            <div class="text-weight-light text-h5 usernameDesktop">
              {{ userInfomation.name }}
            </div>
            <!-- Edit profile -->
            <q-btn
              v-if="currentUserInfoData.id === userInfomation.id"
              class="showButtonDesktopSettings"
              dense
              color="black"
              flat
              icon-right="settings"
              style="
                min-width: 9rem;
                max-height: 2rem;
                border: solid 1px lightgray;
              "
              size=".8rem"
              no-caps
            >
              Edit Profile&nbsp;
            </q-btn>
            <!-- Follow -->
            <q-btn
              v-if="
                !(currentUserInfoData.id in followers) &&
                userInfomation.id !== currentUserInfoData.id
              "
              no-caps
              color="light-blue"
              class="q-px-md no-shadow"
              style="height: 0.5rem; width: 6rem"
              text-color="white"
              dense
              @click="followUser"
            >
              Follow
            </q-btn>
            <!-- Remove Follower -->
            <q-btn
              v-if="
                currentUserInfoData.id in followers &&
                userInfomation.id !== currentUserInfoData.id
              "
              flat
              icon="person_remove_alt_1"
              color="black"
              dense
              style="width: 4rem; border: solid 1px lightgray"
              class="q-mr-md"
              @click="unfollowUser"
            />
            <!-- Message -->
            <q-btn
              no-caps
              v-if="
                currentUserInfoData.id in followers &&
                userInfomation.id !== currentUserInfoData.id
              "
              outline
              color="black"
              class="q-px-md"
              style="width: 7rem; border: solid 1px lightgray"
              text-color="black"
              flat
              dense
            >
              Message
            </q-btn>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="180px" height="2rem" v-else />
        </div>
        <!-- Followers, following and posts -->
        <div class="row q-py-md text-center upperFFP">
          <div v-if="Object.values(userInfomation).length" class="row">
            <!-- Post -->
            <div class="row">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(posts).length }}
              </div>
              <div class="text-black text-weight-light">posts</div>
            </div>
            <!-- Following -->
            <div class="row q-mx-lg">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(following).length }}
              </div>
              <div class="text-black text-weight-light">following</div>
            </div>
            <!-- Followers -->
            <div class="row">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(followers).length }}
              </div>
              <div class="text-black text-weight-light">followers</div>
            </div>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="250px" height="2rem" v-else />
        </div>
        <!-- Resume -->
        <div class="resumeBaseUpper">
          <div v-if="Object.values(userInfomation).length">
            <!-- Name -->
            <div class="text-weight-medium">{{ userInfomation.fullname }}</div>
            <!-- Description -->
            <div v-if="userInfomation.description">
              {{ userInfomation.description }}
            </div>
            <!-- Pagina web -->
            <div v-if="userInfomation.url">{{ userInfomation.url }}</div>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="150px" v-else />
        </div>
      </div>
      <!-- Resume Mobile Version -->
      <div class="resumeBaseMobile">
        <div v-if="Object.values(userInfomation).length">
          <!-- Name -->
          <div class="text-weight-medium">{{ userInfomation.fullname }}</div>
          <!-- Description -->
          <div v-if="userInfomation.description">
            {{ userInfomation.description }}
          </div>
          <!-- Pagina web -->
          <div v-if="userInfomation.url">{{ userInfomation.url }}</div>
        </div>
        <!-- Skeleton -->
        <q-skeleton width="150px" v-else />
      </div>
    </div>
    <!-- Bar Desktop -->
    <q-separator size="1px" color="grey-4" class="barOnlyDesktop" />
    <!-- Post, following and followers -->
    <div class="ffpBase">
      <q-separator color="grey-4" size="1px" />
      <div class="ffp q-py-sm">
        <!-- Post -->
        <div v-if="userInfomation.id">
          <div class="text-weight-medium">
            {{ Object.values(posts).length }}
          </div>
          <div class="text-grey">posts</div>
        </div>
        <q-skeleton width="150px" v-else class="q-ma-sm" />
        <!-- Following -->
        <div v-if="userInfomation.id">
          <div class="text-weight-medium">
            {{ Object.values(following).length }}
          </div>
          <div class="text-grey">following</div>
        </div>
        <q-skeleton width="150px" v-else class="q-ma-sm" />
        <!-- Followers -->
        <div v-if="userInfomation.id">
          <div class="text-weight-medium">
            {{ Object.values(followers).length }}
          </div>
          <div class="text-grey">followers</div>
        </div>
        <q-skeleton width="150px" v-else class="q-ma-sm" />
      </div>
      <q-separator color="grey-4" size="1px" />
    </div>
    <!-- Images -->
    <div class="postsBase" v-if="userInfomation.id">
      <div
        class="cursor-pointer imgPost"
        v-for="(post, index) in posts"
        :key="index"
        @click="goToPost(post.idPost, post.userInfo.userId)"
      >
        <q-img :ratio="1" class="no-shadow" :src="post.imagesUploaded[0]" />
      </div>
    </div>
    <div class="postsBase" v-else>
      <q-img :ratio="1" v-for="times in 10" :key="times">
        <q-skeleton width="100%" height="100%" />
      </q-img>
    </div>
  </div>
</template>
<script>
import { firebaseDb } from "src/boot/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfomation: {},
      posts: [],
      followers: {},
      following: {},
      timesShow: 9,
    };
  },
  methods: {
    goToPost(indexPost, userId) {
      this.$router.push({
        name: "Post",
        params: { userId: userId, postId: indexPost },
      });
    },
    followUser() {
      let currentUserIdPage = this.$route.params.userId;
      let currentUserId = this.currentUserInfoData.id;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + currentUserIdPage
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + currentUserId + "/following/" + currentUserIdPage
        );
        currentUserRoute.set(user.userInformation);
      });
      // Followers Steps
      const currentUserRouteFollowers = firebaseDb.ref(
        "toneygram/users/" + currentUserId
      );
      currentUserRouteFollowers.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + currentUserIdPage + "/followers/" + currentUserId
        );
        currentUserRoute.set(user.userInformation);
      });

      // Read from firebase database User Actual Page (Followers)
      const followerActRef = firebaseDb
        .ref("toneygram/users/" + currentUserIdPage + "/followers/")
        .on("child_added", (newFollower) => {
          let follower = newFollower.val();
          this.followers[newFollower.key] = follower;
        });
    },
    unfollowUser() {
      let currentUserIdPage = this.$route.params.userId;
      let currentUserId = this.currentUserInfoData.id;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + currentUserIdPage + "/userInformation/"
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + currentUserId + "/following/" + currentUserIdPage
        );
        currentUserRoute.remove();
      });
      // Followers Steps
      const currentUserRouteFollowers = firebaseDb.ref(
        "toneygram/users/" + currentUserId + "/userInformation/"
      );
      currentUserRouteFollowers.once("value", (userInfo) => {
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + currentUserIdPage + "/followers/" + currentUserId
        );
        currentUserRoute.remove();
      });

      // Read from firebase database User Actual Page (Followers)
      const UnfollowerActRef = firebaseDb
        .ref(
          "toneygram/users/" + currentUserIdPage + "/followers/" + currentUserId
        )
        .once("value", (newFollower) => {
          delete this.followers[newFollower.key];
        });
    },
  },
  created() {
    let currentUserId = this.$route.params.userId;
    // Read Post User Page
    let currentUserInformationRef = firebaseDb.ref(
      "toneygram/users/" + currentUserId
    );
    currentUserInformationRef
      .once("value", (userInPage) => {
        let userInformation = userInPage.val();
        // User information
        this.userInfomation = {
          id: userInformation.userInformation.id,
          img: userInformation.userInformation.img,
          name: userInformation.userInformation.name,
          fullname: userInformation.userInformation.fullname,
        };
        // User Posts
        if (!userInformation.posts) {
          this.posts = [];
        } else {
          let arrayNoSirve = [];
          Object.values(userInformation.posts).forEach((Post) => {
            arrayNoSirve.push(Post);
            arrayNoSirve.sort((a, b) => {
              return b.fullD - a.fullD;
            });
            this.posts = arrayNoSirve;
          });
        }
      })
      .then(() => {
        // Read Followers
        let userPageFollowersRef = firebaseDb.ref(
          "toneygram/users/" + currentUserId + "/followers/"
        );
        userPageFollowersRef.once("value", (followers) => {
          let followersUserPage = followers.val();
          if (!followersUserPage) {
            this.followers = {};
          } else {
            this.followers = followersUserPage;
          }
        });
        // Read Following
        let userPageFollowingRef = firebaseDb.ref(
          "toneygram/users/" + currentUserId + "/following/"
        );
        userPageFollowingRef.once("value", (following) => {
          let followingUserPage = following.val();
          if (!followingUserPage) {
            this.following = {};
          } else {
            this.following = followingUserPage;
          }
        });
      });
  },
  computed: {
    getInfoUserPage() {
      let infoUserPage = {};
      let currentUserId = this.$route.params.userId;
      let currentUserInformationRef = firebaseDb.ref(
        "toneygram/users/" + currentUserId
      );
      currentUserInformationRef.once("value", (userInPage) => {
        let userInformation = userInPage.val();
        // User information
        this.userInfomation = {
          id: userInformation.userInformation.id,
          img: userInformation.userInformation.img,
          name: userInformation.userInformation.name,
          fullname: userInformation.userInformation.fullname,
        };
        // User pictures
        if (!userInformation.posts) {
          this.posts = [];
        } else {
          this.posts = userInformation.posts;
        }
        // User Followers
        if (userInformation.followers) {
          this.followers = userInformation.followers;
        } else {
          this.followers = {};
        }
        // User Following
        if (userInformation.following) {
          this.following = userInformation.following;
        } else {
          this.following = {};
        }
      });
      return infoUserPage;
    },
    ...mapState("settingsUser", ["currentUserId", "currentUserInfoData"]),
  },
};
</script>
<style lang="scss">
.userPageBase {
  max-width: 970px;
  margin: auto;
}
//iPhone
@media (max-width: 480px) {
  /* --- Grid Base --- */
  .userPageBase {
    padding: 1rem 0 0;
    font-size: 1rem;
  }
  .myCardBaseUser {
    display: grid;
    grid-template-columns: 0.7fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    grid-template-areas:
      ". ."
      "resumeBaseMobile resumeBaseMobile";
    gap: 0 2rem;
    /* justify-items: center; */
    align-items: center;
    padding-bottom: 1.5rem;
    padding-left: 1rem;
  }
  .resumeBaseMobile {
    grid-area: resumeBaseMobile;
    justify-self: flex-start;
  }
  .infoUpper {
    margin-top: 0.6rem;
    width: 100%;
    align-self: start;
  }

  /* Bars */
  .barOnlyDesktop {
    display: none;
  }

  /* -- Pictures -- */
  .imgBaseUser {
    height: 90px;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 100%;
  }
  .imageMyCardProfile {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: lightgray 1px solid;
  }

  /* Username */
  .userNameUpperBase {
    display: flex;
  }
  .usernameDesktop {
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }

  /*------ Resume --------------*/
  .resumeBaseUpper {
    display: none;
  }
  .nameAndSettingsPart {
    display: flex;
    flex-direction: column;
  }
  .showButtonDesktopSettings {
    display: flex;
    place-self: center;
  }

  /* --- Followers, following and Post upper/bottom section --- */
  .upperFFP {
    display: none;
  }
  .ffpBase {
    display: block;
  }
  .ffp {
    display: flex;
    text-align: center;
    justify-content: space-around;
  }

  // Skeleton

  .skeletonMobile {
    display: block;
  }

  .skeletonDesktop {
    display: none;
  }

  /* -- ----------Post Base------------- -- */
  .postsBase {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.3rem;
    width: 100%;
    margin: 0;
  }
  .imgPost {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-repeat: round;
  }
}
//Tablet
@media (min-width: 480px) {
  /* --- Grid Base --- */
  .myCardBaseUser {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;

    gap: 0 2rem;
    justify-items: center;
    align-items: center;
  }
  .infoUpper {
    margin-top: 0.6rem;
    width: 100%;
    align-self: start;
  }
  .barOnlyDesktop {
    display: block;
    width: 93.5%;
    margin: 4rem auto 0;
  }
  .userPageBase {
    padding: 3rem 0 0;
    font-size: 1rem;
  }
  .resumeBaseMobile {
    display: none;
  }
  /* -- Profile Picture -- */
  .imgBaseUser {
    height: 150px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 100%;
  }
  .imageMyCardProfile {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: lightgray 1px solid;
  }
  .nameAndSettingsPart {
    display: flex;
    flex-direction: row;
  }

  // Follower Following Post
  .ffpBase {
    display: none;
  }
  .userNameUpperBase {
    display: flex;
  }
  .usernameDesktop {
    margin-right: 1rem;
  }
  .showButtonDesktopSettings {
    display: flex;
    place-self: center;
  }

  // Post Base
  .postsBase {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.3rem;
    width: 100%;
    margin: 0;
  }
  .imgPost {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-repeat: round;
  }

  // Skeleton
  .skeletonMobile {
    display: none;
  }
  .skeletonDesktop {
    display: block;
  }
}

//Desktop
@media (min-width: 768px) {
  /* --- Grid Base --- */
  .myCardBaseUser {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0 2rem;
    justify-items: center;
    align-items: center;
  }
  .infoUpper {
    margin-top: 0.6rem;
    width: 100%;
    align-self: start;
  }
  .barOnlyDesktop {
    display: block;
    width: 93.5%;
    margin: 4rem auto 0;
  }
  .userPageBase {
    padding: 3rem 0 0;
    font-size: 1rem;
  }
  .showButtonDesktopSettings {
    display: flex;
    place-self: center;
  }
  .resumeBaseMobile {
    display: none;
  }
  /* -- Profile Picture -- */
  .imgBaseUser {
    height: 150px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 100%;
  }
  .imageMyCardProfile {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: lightgray 1px solid;
  }
  .userNameUpperBase {
    display: flex;
  }
  // Name and Settings
  .nameAndSettingsPart {
    display: flex;
    flex-direction: row;
  }
  .usernameDesktop {
    margin-right: 1rem;
  }
  //Following follower post section
  .ffpBase {
    display: none;
  }
  // Post
  .postsBase {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    width: 93%;
    margin: 2rem auto;
  }
  .imgPost {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-repeat: round;
  }

  // Skeleton
  .skeletonMobile {
    display: none;
  }
  .skeletonDesktop {
    display: block;
  }
}
</style>
