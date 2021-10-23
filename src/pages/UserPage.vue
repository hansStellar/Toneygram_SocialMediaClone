<template>
  <!-- iPhone & Tablet -->
  <div class="items-center userPageBase showMobileUserPage">
    <div class="absolute" style="opacity: 0">
      {{ getInfoUserPage }}
    </div>
    <!-- My Card -->
    <div
      class="
        row
        flex
        myCardBaseUser
        items-center
        justify-evenly
        q-px-md q-pt-md
      "
    >
      <!-- Img -->
      <q-avatar
        v-if="Object.values(userInfomation).length"
        class="imgBaseUser shadow-5"
      >
        <img :src="userInfomation.img" class="imageMyCard" />
      </q-avatar>
      <q-skeleton type="circle" size="120px" v-else />
      <!-- Info Upper -->
      <div class="column">
        <!-- Username -->
        <div class="userNameUpperBase items-center">
          <div
            class="text-weight-light q-mb-sm text-h5 usernameDesktop ellipsis"
            v-if="userInfomation.name"
          >
            {{ userInfomation.name }}
            <q-btn
              v-if="
                currentUserId in followers &&
                userInfomation.id !== currentUserId
              "
              flat
              round
              icon="person_remove_alt_1"
              color="negative"
              class=""
              dense
              @click="unfollowUser"
            />
          </div>
          <q-skeleton width="150px" v-else class="q-mb-sm" />
          <q-btn
            class="full-width showButtonMobile"
            dense
            outline
            color="grey-6"
            no-caps
            v-if="currentUserId === userInfomation.id"
          >
            Edit Profile
          </q-btn>
          <q-btn
            no-caps
            color="light-blue"
            class="q-px-md"
            style="height: 1rem; width: 100%"
            text-color="white"
            dense
            @click="followUser"
            v-if="
              !(currentUserId in followers) &&
              userInfomation.id !== currentUserId
            "
          >
            Follow
          </q-btn>

          <q-btn
            no-caps
            v-if="
              currentUserId in followers && userInfomation.id !== currentUserId
            "
            outline
            color="black"
            class="q-px-md"
            style="height: 1rem; width: 100%"
            text-color="black"
            dense
          >
            Message
          </q-btn>
        </div>
      </div>
    </div>
    <!-- Resume -->
    <div class="q-pa-md resumeBase">
      <!-- Name -->
      <div class="text-weight-medium upperName" v-if="userInfomation.fullname">
        {{ userInfomation.fullname }}
      </div>
      <q-skeleton width="150px" v-else />
      <!-- Description -->
      <div class="upperDescription" v-if="userInfomation.description">
        {{ userInfomation.description }}
      </div>

      <!-- Pagina web -->
      <div class="upperWeb" v-if="userInfomation.url">
        {{ userInfomation.url }}
      </div>
    </div>
    <!-- Post, following and followers -->
    <div class="followersPostBase">
      <q-separator color="grey-4" size="1px" />
      <div class="followersPost q-py-sm">
        <!-- Post -->
        <div v-if="userInfomation.id">
          <div class="text-weight-medium">
            {{ Object.values(posts).length }}
          </div>
          <div class="text-grey">posts</div>
        </div>
        <q-skeleton width="150px" v-else class="q-my-sm" />
        <!-- Following -->
        <div v-if="userInfomation.id">
          <div class="text-weight-medium">
            {{ Object.values(following).length }}
          </div>
          <div class="text-grey">following</div>
        </div>
        <q-skeleton width="150px" v-else class="q-my-sm" />
        <!-- Followers -->
        <div v-if="userInfomation.id">
          <div class="text-weight-medium">
            {{ Object.values(followers).length }}
          </div>
          <div class="text-grey">followers</div>
        </div>
        <q-skeleton width="150px" v-else class="q-my-sm" />
      </div>
      <q-separator color="grey-4" size="1px" />
    </div>
    <!-- Bar Desktop -->
    <q-separator size="1px" color="grey-4" class="q-mt-lg barOnlyDesktop" />
    <!-- Images -->
    <div class="postsBase" v-if="userInfomation.id">
      <div
        class="cursor-pointer imgPost shadow-2"
        v-for="(post, index) in posts"
        :key="index"
        :style="{ 'background-image': 'url(' + post.imagesUploaded[0] + ')' }"
        @click="goToPost(index, post.userInfo.userId)"
      />
    </div>
    <div class="postsBase" style="height: 30rem" v-else>
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
    </div>
  </div>
  <!-- Desktop -->
  <div class="items-center userPageBase showDesktopUserPage">
    <div class="absolute" style="opacity: 0">
      {{ getInfoUserPage }}
      {{ getFollowersAndFollowing }}
    </div>
    <!-- My Card -->
    <div class="myCardBaseUser q-px-md q-pt-md">
      <!-- Img -->
      <div>
        <q-avatar
          v-if="Object.values(userInfomation).length"
          class="imgBaseUser shadow-5"
        >
          <img :src="userInfomation.img" class="imageMyCard" />
        </q-avatar>
        <q-skeleton v-else type="circle" size="150px" />
      </div>
      <!-- Info Upper -->
      <div class="column">
        <!-- Username -->
        <div class="userNameUpperBase items-center" style="min-width: 22rem">
          <!-- Info -->
          <div
            v-if="Object.values(userInfomation).length"
            class="row items-center"
          >
            <div class="text-weight-thin text-h5 usernameDesktop ellipsis">
              {{ userInfomation.name }}
            </div>
            <q-btn
              v-if="currentUserId === userInfomation.id"
              class="full-width showButtonDesktop"
              dense
              color="grey-5"
              flat
              icon="settings"
              style="max-height: 2rem; max-width: 1rem"
            />
            <q-btn
              v-if="
                !(currentUserId in followers) &&
                userInfomation.id !== currentUserId
              "
              no-caps
              color="light-blue"
              class="q-px-md"
              style="height: 1rem"
              text-color="white"
              dense
              @click="followUser"
            >
              Follow
            </q-btn>
            <q-btn
              v-if="
                currentUserId in followers &&
                userInfomation.id !== currentUserId
              "
              flat
              round
              icon="person_remove_alt_1"
              color="negative"
              dense
              class="q-mr-md"
              @click="unfollowUser"
            />
            <q-btn
              no-caps
              v-if="
                currentUserId in followers &&
                userInfomation.id !== currentUserId
              "
              outline
              color="black"
              class="q-px-md"
              style="height: 1rem; width: 4rem"
              text-color="black"
              dense
            >
              Message
            </q-btn>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="180px" height="2rem" v-else />
        </div>
        <!-- Followers, following and posts -->
        <div class="row q-py-md text-center followers">
          <div v-if="Object.values(userInfomation).length" class="row">
            <!-- Post -->
            <div class="row q-mr-md">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(posts).length }}
              </div>
              <div class="text-black text-weight-light">posts</div>
            </div>
            <!-- Following -->
            <div class="row q-mr-md">
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
            <div style="max-width: 20rem" v-if="userInfomation.description">
              {{ userInfomation.description }}
            </div>
            <!-- Pagina web -->
            <div v-if="userInfomation.url">{{ userInfomation.url }}</div>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="150px" v-else />
        </div>
      </div>
    </div>
    <!-- Bar Desktop -->
    <q-separator size="1px" color="grey-4" class="q-mt-lg barOnlyDesktop" />
    <!-- Images -->
    <div class="postsBase" v-if="userInfomation.id">
      <div
        class="cursor-pointer imgPost shadow-2"
        v-for="(post, index) in posts"
        :key="index"
        @click="goToPost(index, post.userInfo.userId)"
      >
        <img style="height: 100%; width: 100%" :src="post.imagesUploaded[0]" />
      </div>
    </div>
    <div class="postsBase" style="height: 50rem" v-else>
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
      <q-skeleton width="100%" height="100%" />
    </div>
  </div>
</template>
<script>
import { uid } from "quasar";
import { firebaseAuth, firebaseDb, firebaseStorage } from "src/boot/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfomation: {},
      posts: [],
      followers: {},
      following: {},
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
      let currentUserId = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + currentUserIdPage + "/userInformation/"
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + currentUserId + "/following/" + currentUserIdPage
        );
        currentUserRoute.set(userInfo.val());
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
        currentUserRoute.set(userInfo.val());
      });

      // Read from firebase database User Actual Page (Followers)
      const followerActRef = firebaseDb
        .ref("toneygram/users/" + currentUserIdPage + "/followers/")
        .once("child_added", (newFollower) => {
          let follower = newFollower.val();
          this.followers[newFollower.key] = follower;
        });
    },
    unfollowUser() {
      let currentUserIdPage = this.$route.params.userId;
      let currentUserId = this.currentUserId;
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
        .ref("toneygram/users/" + currentUserIdPage + "/followers")
        .once("child_removed", (newFollower) => {
          console.log(this.followers);
          delete this.followers[newFollower.key];
        });
    },
    likePost() {
      let userId = this.$route.params.userId;
      let postId = this.$route.params.postId;
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          userId +
          "/posts/" +
          postId +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.set(firebaseAuth.currentUser.uid);

      // Read from firebase database
      const postLikeActRef = firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + postId + "/likes/")
        .once("child_added", (like) => {
          this.likeUsers.push(like.val());
        });
    },
  },
  created() {
    let currentUserId = this.$route.params.userId;
    // Read Post User Page
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
    });
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
    setTimeout(() => {
      this.currentUserId = firebaseAuth.currentUser.uid;
    }, 700);
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
    ...mapState("settingsUser", ["currentUserId"]),
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
  .resumeBase {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    justify-items: start;
    grid-template-areas:
      "primero . ."
      "segundo . ."
      "tercero . .";
    text-align: center;
  }
  .upperName {
    grid-area: primero;
  }
  .upperDescription {
    grid-area: segundo;
  }
  .upperWeb {
    grid-area: tercero;
  }
  .showMobileUserPage {
    display: block;
  }
  .showDesktopUserPage {
    display: none;
  }
  .barOnlyDesktop {
    display: none;
  }
  .imgBaseUser {
    height: 70px;
    width: 70px;
  }
  .imageMyCard {
    width: 100%;
    height: 100%;
  }
  .resumeBaseUpper {
    display: none;
  }
  .showButtonMobile {
    display: block;
  }
  .showButtonDesktop {
    display: none;
  }
  .followers {
    display: none;
  }
  .myCardBaseUser {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". . ";
    align-items: center;
    justify-items: start;
  }
  .postsBase {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.5rem;
    width: 100%;

    margin: auto;
  }
  .imgPost {
    width: 100%;
    cursor: pointer;
    height: 6rem;
    background-repeat: round;
  }
  .followersPost {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". . .";
    justify-items: center;
    text-align: center;
  }
}
//Tablet
@media (min-width: 480px) {
  .resumeBase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    justify-items: center;
    grid-template-areas:
      "primero . "
      "segundo . "
      "tercero . ";
    text-align: center;
  }
  .upperName {
    grid-area: primero;
  }
  .upperDescription {
    grid-area: segundo;
  }
  .upperWeb {
    grid-area: tercero;
  }
  .showMobileUserPage {
    display: block;
  }
  .showDesktopUserPage {
    display: none;
  }
  .barOnlyDesktop {
    display: none;
  }
  .imgBaseUser {
    height: 120px;
    width: 120px;
  }
  .imageMyCard {
    width: 100%;
    height: 100%;
  }
  .resumeBaseUpper {
    display: none;
  }
  .showButtonMobile {
    display: block;
  }
  .showButtonDesktop {
    display: none;
  }
  .followers {
    display: none;
  }
  .myCardBaseUser {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". . ";
    align-items: center;
    justify-items: center;
  }
  .postsBase {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
    margin: auto;
  }
  .imgPost {
    width: 100%;
    cursor: pointer;
    height: 12rem;
    background-repeat: round;
  }
  .followersPost {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". . .";
    justify-items: center;
    text-align: center;
  }
}
//Desktop
@media (min-width: 768px) {
  .myCardBaseUser {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0;
    grid-template-areas: ". . .";
    justify-items: center;
    align-items: center;
  }
  .showMobileUserPage {
    display: none;
  }
  .showDesktopUserPage {
    display: block;
  }
  .barOnlyDesktop {
    display: block;
    width: 93.5%;
    margin: 4rem auto 0;
  }
  .imgBaseUser {
    height: 150px;
    width: 150px;
  }
  .userNameUpperBase {
    display: flex;
  }
  .usernameDesktop {
    margin-right: 1rem;
  }
  .resumeBase {
    display: none;
  }
  .resumeBaseUpper {
    display: block;
  }
  .showButtonMobile {
    display: none;
  }
  .showButtonDesktop {
    display: block;
  }
  .followers {
    display: flex;
  }
  .followersPostBase {
    display: none;
  }
  .userPageBase {
    padding: 1rem 0;
    font-size: 1rem;
  }
  .postsBase {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1.5rem;
    width: 93%;
    margin: 2rem auto;
  }
  .imgPost {
    width: 100%;
    height: 100%;
    cursor: pointer;
    height: 18rem;
    background-repeat: round;
  }
}
</style>
