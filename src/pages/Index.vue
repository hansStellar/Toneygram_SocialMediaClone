<template>
  <!-- Desktop New One -->
  <q-page
    class="flex row justify-between q-pt-md baseFeed"
    style="max-width: 940px; margin: auto"
  >
    <!-- No Activity -->
    <section
      class="col-12 col-sm-8 items-center relative-position"
      v-if="getStatusForPostsOnIndex && showPostsGetter.length === 0"
    >
      <div class="absolute-top-center text-center">
        <h4 class="col">No activity :(</h4>
        <p class="text-light-blue-5">Go to explore section ...</p>
      </div>
    </section>
    <!-- Left Side -->
    <section class="col-sm-8 LeftSideBase" v-if="showPostsGetter.length > 0">
      <!-- Base -->
      <q-card
        class="no-shadow no-border-radius col column CardLeft"
        style=""
        v-for="(post, index) in showPostsGetter"
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
                @click="
                  goToUser({
                    userId: post.userInfo.userId,
                    userIdLoggedIn: getCurrentUserIndex.id,
                  })
                "
                :ratio="1"
                :src="post.userInfo.userImg"
                width="32px"
                height="32px"
                v-if="getStatusForPostsOnIndex"
              />
              <q-skeleton type="circle" size="32px" v-else />
            </q-item-section>

            <q-item-section>
              <q-item-label
                @click="
                  goToUser({
                    userId: post.userInfo.userId,
                    userIdLoggedIn: getCurrentUserIndex.id,
                  })
                "
                class="cursor-pointer text-weight-bold"
                v-if="getStatusForPostsOnIndex"
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
          v-model="post.scrollIndex"
          v-if="getStatusForPostsOnIndex"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="grey"
          navigation
          padding
          class="no-padding full-width full-height"
        >
          <q-carousel-slide
            v-for="(image, index) in post.imagesUploaded"
            :key="index"
            style="
              padding: 0;
              margin: 0;
              width: 100%;
              height: 420px;
              max-height: 420px;
            "
            class=""
            :name="index"
          >
            <q-img
              fit="contain"
              class="shadow-1"
              :src="image"
              style="
                padding: 0;
                margin: 0;
                width: 100%;
                height: 420px;
                max-height: 420px;
              "
            />
          </q-carousel-slide>
        </q-carousel>
        <!-- Skeleton -->
        <q-img
          style="height: 420px; max-height: 420px"
          class="no-border-radius"
          v-else
        >
          <q-skeleton class="no-border-radius" height="100%" width="100%" />
        </q-img>
        <q-separator color="grey-3" size="1px" />
        <!-- Like and comment -->
        <q-card-actions class="q-pb-none q-px-none full-width" align="left">
          <q-btn
            dense
            round
            flat
            v-if="post.likes && getCurrentUserIndex.id in post.likes"
            @click="
              this.unlikePost({
                idPost: post.idPost,
                userId: post.userInfo.userId,
              })
            "
            icon="favorite"
            color="red"
          />
          <q-btn
            dense
            round
            flat
            icon="favorite_border"
            v-else
            @click="
              this.likePost({
                idPost: post.idPost,
                userId: post.userInfo.userId,
              })
            "
          />
          <q-btn dense round flat icon="far fa-comment" />
        </q-card-actions>
        <!-- Likes -->
        <q-card-actions
          v-if="getStatusForPostsOnIndex"
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
              @click="
                goToUser({
                  userId: post.userInfo.userId,
                  userIdLoggedIn: getCurrentUserIndex.id,
                })
              "
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
              @click="
                goToUser({
                  userId: comment.idUser,
                  userIdLoggedIn: getCurrentUserIndex.id,
                })
              "
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
            autocomplete="off"
            borderless
          >
            <template v-slot:append>
              <q-btn
                label="POST"
                dense
                flat
                color="primary"
                @click="
                  this.sendText({
                    userId: post.userInfo.userId,
                    idPost: post.idPost,
                    message: this.textMessage,
                  })
                "
                :disable="textMessage.length <= 0"
              />
            </template>
          </q-input>
        </div>
      </q-card>
    </section>
    <!-- Skeleton -->
    <section
      class="col-sm-8 LeftSideBase"
      v-if="!getStatusForPostsOnIndex && showPostsGetter.length === 0"
    >
      <q-card
        class="no-shadow no-border-radius col column CardLeft"
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
      v-if="getStatusForPostsOnIndex"
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
                :src="getCurrentUserIndex.img"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: getCurrentUserIndex.id,
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
                      userId: getCurrentUserIndex.id,
                    },
                  })
                "
                class="cursor-pointer text-weight-medium"
                >{{ getCurrentUserIndex.name }}</q-item-label
              >
              <q-item-label class="text-weight-regular" caption lines="1">{{
                getCurrentUserIndex.fullname
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
        <q-list v-if="getStatusForPostsOnIndex">
          <q-item-label header class="q-pb-sm"
            >Suggestions for you</q-item-label
          >
          <q-item
            v-for="(user, index) in getSuggetedsUsers"
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
                v-if="user.userInformation.id in getFollowingFromCurrentUser"
                @click="this.unFollowUser(user.userInformation.id)"
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
                @click="this.followUser(user.userInformation.id)"
                color="light-blue-7"
              >
                Follow
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Footer -->
        <div class="text-grey-5 text-weight-light text-overline q-pl-md">
          © 2022 Toneygram
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      skeletonTimes: [1, 2, 3],
      textMessage: "",
    };
  },
  methods: {
    ...mapActions("actionsOnWeb", [
      "setNewLikesToPostAction",
      "logOff",
      "setNewMessagesToPostAction",
      "changeTheImageOfAnyPostAction",
      "likePost",
      "unlikePost",
      "sendText",
      "goToUser",
    ]),
    ...mapActions("settingsUser", [
      "addFollowingToCurrentUserAction",
      "followUser",
      "unFollowUser",
    ]),
  },
  computed: {
    ...mapGetters("settingsUser", [
      "getCurrentUserIndex",
      "getFollowingFromCurrentUser",
    ]),
    ...mapGetters("actionsOnWeb", [
      "showPostsGetter",
      "getStatusForPostsOnIndex",
      "getSuggetedsUsers",
    ]),
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
  .CardLeft {
    margin-bottom: 0rem;
    margin-top: 0rem;
    border-bottom: solid 1px grey;
  }
  .LeftSideBase {
    width: 100%;
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
  .CardLeft {
    margin-bottom: 2rem;
    margin-top: 2rem;
    border: solid 1px lightgrey;
  }
  .LeftSideBase {
    width: 66.6667%;
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
  .CardLeft {
    margin-bottom: 2rem;
    margin-top: 0rem;
    border-bottom: solid 1px lightgrey;
  }
  .LeftSideBase {
    width: 66.6667%;
  }
}
</style>
