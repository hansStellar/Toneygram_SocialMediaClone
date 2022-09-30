<template>
  <div class="items-center userPageBase">
    <!-- Mobile & Tablet -->
    <div class="mobileVersionUserPage">
      <!-- Top -->
      <div class="myCardBaseUser">
        <!-- Img -->
        <div style="align-self: start">
          <div
            v-if="getInfoUserPage.userInfomation !== null"
            class="imgBaseUser"
          >
            <q-img
              :ratio="16 / 9"
              :src="getInfoUserPage.userInfomation.img"
              class="imageMyCardProfile"
              height="75px"
              width="75px"
            />
          </div>
          <!-- Skeleton Mobile -->
          <q-skeleton v-else type="circle" size="90px" class="skeletonMobile" />
        </div>

        <!-- Followers, following and posts -->
        <div class="row q-py-md text-center upperFFP">
          <div v-if="getInfoUserPage.userInfomation !== null" class="row">
            <!-- Post -->
            <div class="column">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(getInfoUserPage.posts).length }}
              </div>
              <div class="text-black text-weight-light">Posts</div>
            </div>
            <!-- Following -->
            <div class="column q-mx-lg">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(getInfoUserPage.following).length }}
              </div>
              <div class="text-black text-weight-light">Following</div>
            </div>
            <!-- Followers -->
            <div class="column">
              <div class="text-weight-medium q-mr-sm">
                {{ Object.values(getInfoUserPage.followers).length }}
              </div>
              <div class="text-black text-weight-light">Followers</div>
            </div>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="180px" height="2rem" v-else />
        </div>

        <!-- Resume Mobile Version -->
        <div class="resumeBaseMobile">
          <div v-if="getInfoUserPage.userInfomation !== null">
            <!-- Name -->
            <div class="text-weight-medium" style="">
              {{ getInfoUserPage.userInfomation.fullname }}
            </div>
            <!-- Description -->
            <div
              v-if="getInfoUserPage.userInfomation.description"
              class=""
              style=""
            >
              {{ getInfoUserPage.userInfomation.description }}
            </div>
            <!-- Pagina web -->
            <div
              class="text-blue-10 text-weight-bold cursor-pointer"
              v-if="getInfoUserPage.userInfomation.website"
              @click="goWebsite(getInfoUserPage.userInfomation.website)"
            >
              {{ getInfoUserPage.userInfomation.website }}
            </div>
          </div>
          <!-- Skeleton -->
          <q-skeleton width="150px" v-else />
        </div>

        <!-- Edit profile -->
        <q-btn
          v-if="currentUserIndex.id === getInfoUserPage.userInfomation.id"
          class="showButtonDesktopSettings"
          dense
          color="black"
          @click="this.settingsDialog = !this.settingsDialog"
          flat
          icon-right="settings"
          style="
            min-width: 9rem;
            max-height: 2rem;
            border: solid 1px lightgray;
            max-width: 12rem;
          "
          size=".8rem"
          no-caps
        >
          Edit Profile&nbsp;
        </q-btn>

        <!-- Follow -->
        <q-btn
          v-if="
            !(currentUserIndex.id in getInfoUserPage.followers) &&
            getInfoUserPage.userInfomation.id !== currentUserIndex.id
          "
          no-caps
          color="light-blue"
          class="q-px-md no-shadow"
          style="width: 100%; border: solid 1px lightgray; max-height: 2rem"
          text-color="white"
          dense
          @click="this.followUser(getInfoUserPage.userInfomation.id)"
        >
          Follow
        </q-btn>

        <!-- Remove Follower -->
        <q-btn
          v-if="
            currentUserIndex.id in getInfoUserPage.followers &&
            getInfoUserPage.userInfomation.id !== currentUserIndex.id
          "
          flat
          color="black"
          dense
          no-caps
          style="width: 100%; border: solid 1px lightgray; max-height: 2rem"
          class="q-mr-md"
          @click="this.unFollowUser(getInfoUserPage.userInfomation.id)"
        >
          Unfollow
        </q-btn>

        <!-- Message -->
        <q-btn
          no-caps
          @click="goToChat(getInfoUserPage.userInfomation.id)"
          v-if="getInfoUserPage.userInfomation.id !== currentUserIndex.id"
          color="light-blue"
          class="q-px-md q-ml-sm"
          style="width: 96%; border: solid 1px lightgray; max-height: 2rem"
          text-color="white"
          dense
        >
          Message
        </q-btn>
      </div>

      <!-- Bar Desktop -->
      <q-separator size="1px" color="grey-4" />

      <!-- Images -->
      <div class="postsBase" v-if="getInfoUserPage.userInfomation !== null">
        <div
          class="cursor-pointer imgPost"
          v-for="(post, index) in posts"
          :key="index"
          @click="
            getPostOnShowAction({
              indexPost: post.idPost,
              userId: post.userInfo.userId,
            })
          "
        >
          <q-img
            fit="cover"
            class="no-shadow"
            style="max-height: 100%; height: 180px"
            :src="post.imagesUploaded[0]"
          />
        </div>
      </div>

      <!-- Skeleton -->
      <div class="postsBase" v-else>
        <q-img :ratio="1" v-for="times in 10" :key="times">
          <q-skeleton width="100%" height="100%" />
        </q-img>
      </div>
    </div>
    <!-- Desktop -->
    <div class="desktopVersionUserPage">
      <!-- Top -->
      <div class="myCardBaseUser">
        <!-- Img -->
        <div style="align-self: start">
          <div
            v-if="getInfoUserPage.userInfomation !== null"
            class="imgBaseUser"
          >
            <q-img
              :ratio="16 / 9"
              :src="getInfoUserPage.userInfomation.img"
              class="imageMyCardProfile"
            />
          </div>
          <!-- Skeleton -->
          <q-skeleton
            v-else
            type="circle"
            size="150px"
            class="skeletonDesktop"
          />
        </div>
        <!-- Info Upper -->
        <div class="infoUpper">
          <!-- Username -->
          <div class="userNameUpperBase">
            <!-- Info -->
            <div
              v-if="getInfoUserPage.userInfomation !== null"
              class="nameAndSettingsPart"
            >
              <!-- Name -->
              <div class="text-weight-light text-h5 usernameDesktop">
                {{ getInfoUserPage.userInfomation.name }}
              </div>
              <!-- Edit profile -->
              <q-btn
                v-if="currentUserIndex.id === getInfoUserPage.userInfomation.id"
                class="showButtonDesktopSettings"
                dense
                color="black"
                @click="this.settingsDialog = !this.settingsDialog"
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
                  !(currentUserIndex.id in getInfoUserPage.followers) &&
                  getInfoUserPage.userInfomation.id !== currentUserIndex.id
                "
                no-caps
                color="light-blue"
                class="q-px-md no-shadow"
                style="height: 0.5rem; width: 6rem"
                text-color="white"
                dense
                @click="this.followUser(user.userInformation.id)"
              >
                Follow
              </q-btn>
              <!-- Remove Follower -->
              <q-btn
                v-if="
                  currentUserIndex.id in followers &&
                  getInfoUserPage.userInfomation.id !== currentUserIndex.id
                "
                flat
                icon="person_remove_alt_1"
                color="black"
                dense
                style="
                  width: 4rem;
                  border: solid 1px lightgray;
                  max-height: 2rem;
                "
                class="q-mr-md"
                @click="this.unFollowUser(user.userInformation.id)"
              />
              <!-- Message -->
              <q-btn
                no-caps
                @click="goToChat(getInfoUserPage.userInfomation.id)"
                v-if="
                  currentUserIndex.id in followers &&
                  getInfoUserPage.userInfomation.id !== currentUserIndex.id
                "
                outline
                color="black"
                class="q-px-md"
                style="
                  width: 7rem;
                  border: solid 1px lightgray;
                  max-height: 2rem;
                "
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
            <div v-if="getInfoUserPage.userInfomation !== null" class="row">
              <!-- Post -->
              <div class="row">
                <div class="text-weight-medium q-mr-sm">
                  {{ Object.values(getInfoUserPage.posts).length }}
                </div>
                <div class="text-black text-weight-light">posts</div>
              </div>
              <!-- Following -->
              <div class="row q-mx-lg">
                <div class="text-weight-medium q-mr-sm">
                  {{ Object.values(getInfoUserPage.following).length }}
                </div>
                <div class="text-black text-weight-light">following</div>
              </div>
              <!-- Followers -->
              <div class="row">
                <div class="text-weight-medium q-mr-sm">
                  {{ Object.values(getInfoUserPage.followers).length }}
                </div>
                <div class="text-black text-weight-light">followers</div>
              </div>
            </div>
            <!-- Skeleton -->
            <q-skeleton width="250px" height="2rem" v-else />
          </div>
          <!-- Resume -->
          <div class="resumeBaseUpper">
            <div v-if="getInfoUserPage.userInfomation !== null">
              <!-- Name -->
              <div class="text-weight-medium">
                {{ getInfoUserPage.userInfomation.fullname }}
              </div>
              <!-- Description -->
              <div
                v-if="getInfoUserPage.userInfomation.description"
                class=""
                style=""
              >
                {{ getInfoUserPage.userInfomation.description }}
              </div>
              <!-- Pagina web -->
              <div
                class="text-blue-10 text-weight-bold cursor-pointer"
                style="max-width: fit-content"
                v-if="getInfoUserPage.userInfomation.website"
                @click="goWebsite(getInfoUserPage.userInfomation.website)"
              >
                {{ getInfoUserPage.userInfomation.website }}
              </div>
            </div>
            <!-- Skeleton -->
            <q-skeleton width="150px" v-else />
          </div>
        </div>
      </div>
      <!-- Bar Desktop -->
      <q-separator size="1px" color="grey-4" class="barOnlyDesktop" />
      <!-- Images -->
      <div class="postsBase" v-if="getInfoUserPage.userInfomation !== null">
        <div
          class="cursor-pointer imgPost"
          style=""
          v-for="(post, index) in posts"
          :key="index"
          @click="
            getPostOnShowAction({
              indexPost: post.idPost,
              userId: post.userInfo.userId,
            })
          "
        >
          <q-img
            fit="contain"
            class="shadow-1 bg-white"
            style="max-height: 270px; height: 270px; width: 100%"
            :src="post.imagesUploaded[0]"
          />
        </div>
      </div>
      <!-- Skeleton -->
      <div class="postsBase" v-else>
        <q-img :ratio="1" v-for="times in 10" :key="times">
          <q-skeleton width="100%" height="100%" />
        </q-img>
      </div>
    </div>
    <!-- Dialogs -->
    <SettingsDialog v-model="settingsDialog" v-on:modalChange="actionModal" />
    <UsernameDialog v-model="username" />
    <FullnameDialog v-model="fullname" />
    <WebsiteDialog v-model="website" />
    <BioDialog v-model="bio" />
    <Picture v-model="picture" />
  </div>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { mapState, mapActions } from "vuex";
import SettingsDialog from "components/ModalsSettings/SettingsDialog.vue";
import UsernameDialog from "components/ModalsSettings/Username.vue";
import FullnameDialog from "components/ModalsSettings/Fullname.vue";
import WebsiteDialog from "components/ModalsSettings/Website.vue";
import BioDialog from "components/ModalsSettings/Bio.vue";
import Picture from "components/ModalsSettings/Picture.vue";
export default {
  data() {
    return {
      userInfomation: {},
      posts: [],
      followers: {},
      following: {},
      timesShow: 9,
      settingsDialog: false,
      username: false,
      fullname: false,
      website: false,
      bio: false,
      picture: false,
    };
  },
  components: {
    SettingsDialog,
    UsernameDialog,
    FullnameDialog,
    WebsiteDialog,
    BioDialog,
    Picture,
  },
  methods: {
    ...mapActions("actionsOnWeb", ["getPostOnShowAction"]),
    ...mapActions("settingsUser", ["followUser", "unfollowUser"]),
    actionModal(option) {
      if (option === "username") this.username = !this.username;
      else if (option === "fullname") this.fullname = !this.fullname;
      else if (option === "website") this.website = !this.website;
      else if (option === "bio") this.bio = !this.bio;
      else if (option === "picture") this.picture = !this.picture;
      this.settingsDialog = false;
    },
    goToPost(indexPost, userId) {
      this.$router.push({
        name: "Post",
        params: { userId: userId, postId: indexPost },
      });
    },
    goWebsite(page) {
      window.location.replace(`https://${page}`);
    },
    goToChat(idChat) {
      this.$router.push({ name: "Chat", params: idChat });
    },
  },
  computed: {
    getInfoUserPage() {
      let infoUserPage;
      let currentUserId = this.$route.params.userId;
      const currentUserInformationRef = firebaseDb.ref(
        "toneygram/users/" + currentUserId
      );
      // Change user on page
      currentUserInformationRef.on("value", (userInPage) => {
        let userInformation = userInPage.val();
        // User information

        this.userInfomation = {
          id: userInformation.userInformation.id,
          img: userInformation.userInformation.img,
          name: userInformation.userInformation.name,
          fullname: userInformation.userInformation.fullname,
          website: userInformation.userInformation.website,
          description: userInformation.userInformation.bio,
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
      infoUserPage = {
        following: this.following,
        followers: this.followers,
        posts: this.posts,
        userInfomation: this.userInfomation,
      };
      return infoUserPage;
    },
    ...mapState("settingsUser", ["currentUserId", "currentUserIndex"]),
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
    grid-template-columns: 0.1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      ". ."
      "resumeBaseMobile resumeBaseMobile"
      "showButtonDesktopSettings showButtonDesktopSettings";
    gap: 0.3rem 0rem;
    /* justify-items: center; */
    align-items: center;
    padding-bottom: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .resumeBaseMobile {
    grid-area: resumeBaseMobile;
    justify-self: flex-start;
    width: 100%;
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
    justify-content: flex-start;
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
    place-self: flex-start;
    grid-area: showButtonDesktopSettings;
    width: 100%;
  }

  /* --- Followers, following and Post upper/bottom section --- */
  .upperFFP {
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
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
    grid-template-rows: 1fr;
    gap: 0.3rem;
    width: 100%;
    margin: 0;
    align-items: start;
    max-height: fit-content;
  }
  .imgPost {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-repeat: round;
    display: flex;
    align-items: center;
  }

  /* Versions */
  .desktopVersionUserPage {
    display: none;
  }
  .mobileVersionUserPage {
    display: flex;
    flex-direction: column;
  }
}
//Tablet
@media (min-width: 480px) {
  /* --- Grid Base --- */
  .userPageBase {
    padding: 1rem 0 0;
    font-size: 1rem;
  }
  .myCardBaseUser {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      ". ."
      "resumeBaseMobile resumeBaseMobile"
      "showButtonDesktopSettings showButtonDesktopSettings";
    gap: 1rem 0rem;
    /* justify-items: center; */
    align-items: center;
    padding-bottom: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
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
    justify-content: flex-start;
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
    place-self: flex-start;
    grid-area: showButtonDesktopSettings;
    width: 100%;
  }

  /* --- Followers, following and Post upper/bottom section --- */
  .upperFFP {
    display: flex;
    justify-content: center;
    font-size: 1rem;
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
    align-items: start;
    max-height: fit-content;
    grid-template-rows: 1fr;
  }
  .imgPost {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-repeat: round;
    display: flex;
    align-items: center;
  }

  /* Versions */
  .desktopVersionUserPage {
    display: none;
  }
  .mobileVersionUserPage {
    display: flex;
    flex-direction: column;
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
    margin-bottom: 0;
  }
  .resumeBaseUpper {
    display: flex;
    width: 100%;
  }
  //Following follower post section
  .ffpBase {
    display: none;
  }
  .upperFFP {
    display: flex;
    justify-content: start;
    font-size: 1rem;
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
  /* Versions */
  .desktopVersionUserPage {
    display: flex;
    flex-direction: column;
  }
  .mobileVersionUserPage {
    display: none;
  }
}
</style>
