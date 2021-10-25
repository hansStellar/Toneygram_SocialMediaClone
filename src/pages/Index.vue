<template>
  <!-- iPhone and Tablet -->
  <div class="flex flex-center bg-grey-2 homeBase q-gutter-xl mobileBase">
    <!-- Cards -->
    <div>
      <div class="cardBase shadow-2 q-mb-xl q-pb-md">
        <!-- Header -->
        <div>
          <q-banner rounded class="bg-white">
            <template v-slot:avatar>
              <q-avatar class="shadow-2" v-if="prueba">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
              <q-skeleton type="circle" size="50px" v-else />
            </template>
            <span class="text-weight-bold" v-if="prueba">hans___chris</span>
            <q-skeleton width="150px" v-else />
          </q-banner>
        </div>
        <q-separator color="grey-5" />
        <!-- Image/Caroussel -->
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          v-if="prueba"
          style="height: 21rem"
        >
          <q-carousel-slide
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </q-carousel>
        <q-skeleton height="21rem" v-else />
        <q-separator color="grey-5" />
        <!-- Like and Comment-->
        <div class="q-my-sm">
          <q-btn dense round flat icon="favorite_border" />
          <q-btn dense round flat icon="far fa-comment" />
        </div>
        <!-- Likes -->
        <div class="q-mb-sm q-mx-sm text-weight-bold" v-if="prueba">
          21 likes
        </div>
        <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
        <!-- Description -->
        <div class="q-mb-sm q-mx-sm" v-if="prueba">
          <span class="text-weight-bold">hans___chris</span> Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Et pariatur saepe voluptatibus
          assumenda! Aspernatur enim id libero consequuntur necessitatibus, aut
          unde accusantium doloremque, ipsum dicta voluptatibus minus? Quasi,
          itaque corporis.
        </div>
        <q-skeleton width="300px" class="q-ml-sm" v-else />
        <!-- Comments -->
        <div v-if="prueba"></div>
        <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
        <!-- Date -->
        <div class="q-mx-sm text-grey text-overline" v-if="prueba">
          12/02/2021
        </div>
      </div>
    </div>
  </div>
  <!-- Desktop -->
  <div class="flex flex-center bg-grey-2 homeBase q-gutter-xl desktopBase">
    <!-- Cards -->
    <div>
      <div class="cardBase shadow-2 q-mb-xl q-pb-md">
        <!-- Header -->
        <div>
          <q-banner rounded class="bg-white">
            <template v-slot:avatar>
              <q-avatar class="shadow-2" v-if="prueba">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
              <q-skeleton type="circle" size="50px" v-else />
            </template>
            <span class="text-weight-bold" v-if="prueba">hans___chris</span>
            <q-skeleton width="150px" v-else />
          </q-banner>
        </div>
        <q-separator color="grey-5" />
        <!-- Image/Caroussel -->
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          v-if="prueba"
          style="height: 21rem"
        >
          <q-carousel-slide
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </q-carousel>
        <q-skeleton height="21rem" v-else />
        <q-separator color="grey-5" />
        <!-- Like and Comment-->
        <div class="q-my-sm">
          <q-btn dense round flat icon="favorite_border" />
          <q-btn dense round flat icon="far fa-comment" />
        </div>
        <!-- Likes -->
        <div class="q-mb-sm q-mx-sm text-weight-bold" v-if="prueba">
          21 likes
        </div>
        <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
        <!-- Description -->
        <div class="q-mb-sm q-mx-sm" v-if="prueba">
          <span class="text-weight-bold">hans___chris</span> Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Et pariatur saepe voluptatibus
          assumenda! Aspernatur enim id libero consequuntur necessitatibus, aut
          unde accusantium doloremque, ipsum dicta voluptatibus minus? Quasi,
          itaque corporis.
        </div>
        <q-skeleton width="300px" class="q-ml-sm" v-else />
        <!-- Comments -->
        <div v-if="prueba"></div>
        <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
        <!-- Date -->
        <div class="q-mx-sm text-grey text-overline" v-if="prueba">
          12/02/2021
        </div>
      </div>
    </div>
  </div>
  <!-- Desktop New One -->
  <div class="flex flex-center bg-grey-2 homeBase q-gutter-xl desktopBaseNew">
    <!-- Cards -->
    <div v-if="postsToShow.length">
      <div
        class="cardBase shadow-2 q-mb-xl q-pb-md"
        v-for="(post, index) in postsToShow"
        :key="index"
      >
        <!-- Header -->
        <div>
          <q-banner rounded class="bg-white">
            <template v-slot:avatar>
              <q-avatar class="shadow-2" v-if="prueba">
                <img :src="post.userInfo.userImg" />
              </q-avatar>
              <q-skeleton type="circle" size="50px" v-else />
            </template>
            <span class="text-weight-bold" v-if="prueba">{{
              post.userInfo.userName
            }}</span>
            <q-skeleton width="150px" v-else />
          </q-banner>
        </div>
        <q-separator color="grey-5" />
        <!-- Image/Caroussel -->
        <q-carousel
          animated
          v-model="post.scrollIndex"
          arrows
          navigation
          infinite
          v-if="prueba"
          style="height: 21rem"
        >
          <q-carousel-slide
            v-for="(image, index) in post.imagesUploaded"
            :key="index"
            :name="index"
            :img-src="image"
          />
        </q-carousel>
        <q-skeleton height="21rem" v-else />
        <q-separator color="grey-5" />
        <!-- Like and Comment -->
        <div class="q-my-sm">
          <q-btn dense round flat icon="favorite_border" />
          <q-btn dense round flat icon="far fa-comment" />
        </div>
        <!-- Likes -->
        <div class="q-mb-sm q-mx-sm text-weight-bold" v-if="prueba">
          21 likes
        </div>
        <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
        <!-- Description -->
        <div class="q-mb-sm q-mx-sm" v-if="prueba">
          <span class="text-weight-bold">{{ post.userInfo.name }}</span>
          {{ post.description }}
        </div>
        <q-skeleton width="300px" class="q-ml-sm" v-else />
        <!-- Comments -->
        <div v-if="prueba"></div>
        <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
        <!-- Date -->
        <div class="q-mx-sm text-grey text-overline" v-if="prueba">
          {{ post.dateOfPost }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="cardBase shadow-2 q-mb-xl q-pb-md">
        <!-- Header -->
        <div>
          <q-banner rounded class="bg-white">
            <template v-slot:avatar>
              <q-skeleton type="circle" size="50px" />
            </template>

            <q-skeleton width="150px" />
          </q-banner>
        </div>
        <q-separator color="grey-5" />
        <!-- Image/Caroussel -->

        <q-skeleton height="21rem" />
        <q-separator color="grey-5" />
        <!-- Like and Comment -->
        <div class="q-my-sm">
          <q-btn dense round flat icon="favorite_border" />
          <q-btn dense round flat icon="far fa-comment" />
        </div>
        <!-- Likes -->

        <q-skeleton width="150px" class="q-ml-sm q-mb-md" />
        <!-- Description -->

        <q-skeleton width="300px" class="q-ml-sm" />
        <!-- Comments -->

        <q-skeleton width="190px" class="q-ml-sm q-mt-md" />
      </div>
    </div>
    <!-- New Side Desktop -->
    <div style="width: 16rem">
      <div class="q-pt-sm fixed">
        <!-- My Card -->
        <div class="row flex myCardBase items-center justify-between q-mb-lg">
          <div class="row items-center">
            <!-- Img -->
            <q-avatar class="imgBase shadow-5">
              <img
                v-if="allLoaded"
                :src="actualUserInformation.userInformation.img"
                class="imageMyCard"
              />
              <q-skeleton v-else type="circle" size="100%" />
            </q-avatar>
            <!-- Name -->
            <div class="q-pl-md">
              <!-- Username -->
              <div class="text-weight-bold" v-if="allLoaded">
                {{ actualUserInformation.userInformation.name }}
              </div>
              <q-skeleton v-else width="150px" />
              <!-- Name -->
              <div class="text-grey" v-if="allLoaded">
                {{ actualUserInformation.userInformation.fullname }}
              </div>
              <q-skeleton v-else class="q-mt-sm" width="120px" />
            </div>
          </div>
          <!-- Log out button -->
          <q-btn
            icon="logout"
            color="cyan-2"
            round
            flat
            dense
            v-if="allLoaded"
          />
        </div>
        <!-- Suggested users -->
        <p class="text-grey text-weight-medium">Suggestions for you</p>
        <div class="col justify-between q-mb-lg" v-if="allLoaded">
          <!-- User -->
          <div
            class="row items-center q-mb-md justify-between"
            v-for="(user, index) in suggetionsUsers"
            :key="index"
          >
            <div class="row items-center">
              <!-- Img -->
              <q-avatar class="shadow-2">
                <img :src="user.userInformation.img" />
              </q-avatar>

              <!-- Username -->
              <div>
                <div class="q-pl-md text-weight-medium">
                  {{ user.userInformation.name }}
                </div>
                <div class="q-pl-md text-grey">
                  {{ user.userInformation.fullname }}
                </div>
              </div>
            </div>
            <q-btn
              label="Follow"
              dense
              flat
              v-if="!(user.userInformation.id in following)"
              @click="followUser(user.userInformation.id)"
              color="light-blue-3"
            />
            <q-btn
              label="Unfollow"
              dense
              flat
              v-else
              @click="unFollowUser(user.userInformation.id)"
              color="red-3"
            />
          </div>
          <!-- Follow button -->
        </div>
        <!-- Skeleton -->
        <div class="col justify-between q-mb-lg" v-else>
          <!-- User -->
          <div class="row items-center q-mb-md">
            <!-- Img -->
            <q-skeleton type="circle" size="3rem" class="q-mr-md" />
            <!-- Username -->
            <q-skeleton width="120px" />
          </div>
          <!-- Follow button -->
        </div>
        <!-- Footer -->
        <div class="text-grey-5 text-weight-light text-overline">
          © 2021 Toneygram
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth, firebaseDb, firebaseStorage } from "src/boot/firebase";
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      slide: 1,
      actualUserInformation: {},
      followers: [],
      following: {},
      allLoaded: false,
      prueba: false,
      postsToShow: [],
      suggetionsUsers: [],
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
  },
  computed: {
    ...mapGetters("settingsUser", ["getUserId"]),
  },
  mounted() {
    setTimeout(() => {
      const userId = firebaseAuth.currentUser.uid;
      // Read Info Actual User Page
      let currentUserInformationRef = firebaseDb.ref(
        "toneygram/users/" + userId
      );
      currentUserInformationRef
        .once("value", (userAuth) => {
          let userInformation = userAuth.val();
          // User information
          this.actualUserInformation = userInformation;
        })
        .then(() => {
          this.allLoaded = true;
          this.prueba = true;
        })
        .catch(() => {
          this.allLoaded = false;
        });
      // Read Posts From Followings
      let postsRef = firebaseDb.ref("toneygram/posts/");
      let followingCurrentUserPosts = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid + "/following"
      );
      followingCurrentUserPosts.once("value", (UsersFromFollowing) => {
        let usersFromFollowingVar = UsersFromFollowing.val();
        postsRef.once("child_added", (users) => {
          if (users.key in usersFromFollowingVar) {
            Object.values(users.val()).forEach((post) => {
              this.postsToShow.push(post);
              this.postsToShow.sort((a, b) => {
                return (
                  new Date(b.fullD).getTime() - new Date(a.fullD).getTime()
                );
              });
            });
          }
        });
      });
      // Read post from current user
      let postsCurrentUser = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid + "/posts"
      );
      postsCurrentUser.once("child_added", (postsFromCurrentUser) => {
        let posts = postsFromCurrentUser.val();
        this.postsToShow.push(posts);
        this.postsToShow.sort((a, b) => {
          return new Date(b.fullD).getTime() - new Date(a.fullD).getTime();
        });
      });
      // Suggestions for the user
      const allUsers = firebaseDb.ref("toneygram/users");
      allUsers.once("value", (allUsers) => {
        let allUsersVar = allUsers.val();
        // Actual User followings
        const actualUserInfo = firebaseDb.ref(
          "toneygram/users/" + firebaseAuth.currentUser.uid
        );
        actualUserInfo.once("value", (userInfoActual) => {
          let actualUserInfo = userInfoActual.val();
          // If doesnt has any following
          if (!actualUserInfo.following) {
            Object.values(allUsersVar).forEach((User) => {
              if (User.userInformation.id !== firebaseAuth.currentUser.uid) {
                this.suggetionsUsers.push(User);
              }
            });
          }
          // If the user follows any user
          else {
            for (const user in allUsersVar) {
              if (
                !(user in actualUserInfo.following) &&
                user !== firebaseAuth.currentUser.uid
              ) {
                this.suggetionsUsers.push(allUsersVar[user]);
              }
            }
          }
        });
      });
    }, 1000);
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .cardBase {
    width: 100%;
  }
  .mobileBase {
    display: block;
  }
  .desktopBase {
    display: none;
  }
  .desktopBaseNew {
    display: none;
  }
}
//Tablet
@media (min-width: 480px) {
  .cardBase {
    width: 100%;
  }
  .mobileBase {
    display: block;
  }
  .desktopBase {
    display: none;
  }
  .desktopBaseNew {
    display: none;
  }
}
//Desktop
@media (min-width: 768px) {
  .cardBase {
    width: 40rem;
  }
  .homeBase {
    align-items: start;
    padding: 2rem;
  }
  .mobileBase {
    display: none;
  }
  .desktopBase {
    display: flex;
  }
  .desktopBaseNew {
    display: none;
  }
}
//Desktop New One
@media (min-width: 980px) {
  .cardBase {
    width: 40rem;
  }
  .homeBase {
    align-items: start;
    padding: 2rem;
  }
  .mobileBase {
    display: none;
  }
  .desktopBase {
    display: none;
  }
  .desktopBaseNew {
    display: flex;
  }
}

.myCardBase {
  width: 16rem;
}

.imageMyCard {
  width: 100%;
  height: 100%;
}

.imgBase {
  width: 4rem;
  height: 4rem;
}
</style>
