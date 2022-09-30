<template>
  <q-page class="q-pa-md flex flex-center mobileScript">
    <!-- Base Desktop -->
    <q-card
      class="row no-shadow no-border-radius col desktopVersion"
      style="border: solid 1px lightgray; max-width: 850px; max-height: 480px"
    >
      <!-- Img -->
      <div class="no-padding col-8" style="align-self: center">
        <q-carousel
          v-model="slide"
          transition-prev="jump-right"
          transition-next="jump-left"
          swipeable
          animated
          control-color="black"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          navigation-icon="radio_button_unchecked"
          navigation
          arrows
          class="no-padding full-height full-width"
          v-if="getPostOnShowReady"
        >
          <q-carousel-slide
            v-for="(image, index) in getPostOnShow.imagesUploaded"
            :key="index"
            :name="index"
            style="padding: 0; margin: 0; width: 100%; height: 480px"
            class=""
          >
            <q-img
              class="no-shadow"
              fit="contain"
              :src="image"
              style="
                padding: 0;
                margin: 0;
                width: 100%;
                max-height: 480px;
                height: 480px;
              "
            />
          </q-carousel-slide>
        </q-carousel>
        <q-img
          :ratio="4 / 3"
          class="no-border-radius"
          v-else
          style="height: 480px"
        >
          <q-skeleton class="no-border-radius" height="100%" width="100%" />
        </q-img>
      </div>

      <!-- Info Section -->
      <q-card-section
        class="col-4 no-padding"
        style="
          border-left: solid 1px lightgray;
          border-bottom: solid 1px lightgray;
        "
      >
        <!-- Banner name and avatar -->
        <q-item>
          <q-item-section avatar>
            <q-img
              class="cursor-pointer"
              style="border-radius: 100%"
              @click="goToUser(getPostOnShow.userInfo.userId)"
              :ratio="1"
              :src="getPostOnShow.userInfo.userImg"
              width="32px"
              height="32px"
              v-if="getPostOnShowReady"
            />
            <q-skeleton type="circle" size="32px" v-else />
          </q-item-section>

          <q-item-section>
            <q-item-label
              @click="goToUser(getPostOnShow.userInfo.userId)"
              class="cursor-pointer text-weight-bold"
              v-if="getPostOnShowReady"
              >{{ getPostOnShow.userInfo.userName }}</q-item-label
            >
            <q-skeleton width="150px" v-else />
            <q-item-label caption> Subhead </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="grey-3" size="1px" />

        <!-- Comments and Description -->
        <q-responsive :ratio="1">
          <div style="overflow: auto">
            <!-- Description Post -->
            <div
              v-if="getPostOnShowReady"
              class="q-my-sm q-px-md row items-center"
            >
              <q-img
                @click="goToUser(getPostOnShow.userInfo.userId)"
                :src="getPostOnShow.userInfo.userImg"
                :ratio="1"
                width="32px"
                height="32px"
                class="cursor-pointer"
                style="border-radius: 100%; border: 1px solid grey"
              />
              <span
                @click="goToUser(getPostOnShow.userInfo.userId)"
                class="cursor-pointer q-ml-md q-mr-sm text-weight-bold"
                >{{ getPostOnShow.userInfo.userName }}</span
              ><span>{{ getPostOnShow.description }}</span>
            </div>
            <q-skeleton class="q-ma-md" width="190px" v-else />
            <!-- Comments desktop -->
            <div v-if="getPostOnShowReady" class="q-px-md bg-white" style="">
              <div
                v-for="(comment, index) in getPostOnShow.messages"
                :key="index"
                class="row items-center q-py-sm"
              >
                <!-- img -->
                <q-img
                  :src="comment.imgUser"
                  :ratio="1"
                  width="32px"
                  height="32px"
                  class="cursor-pointer"
                  style="border-radius: 100%; border: 1px solid grey"
                  @click="goToUser(comment.idUser)"
                />

                <span
                  @click="goToUser(comment.idUser)"
                  class="cursor-pointer q-ml-md q-mr-sm text-weight-medium text-weight-bold"
                  >{{ comment.userName }}</span
                >
                <span class="ellipsis">{{ comment.message }}</span>
              </div>
            </div>
            <q-skeleton class="q-ma-md" width="210px" v-else />
          </div>
        </q-responsive>
        <q-separator color="grey-3" size="1px" />
        <!-- Like, likes, date -->
        <div class="col lldInfo" v-if="getPostOnShowReady">
          <!-- Like and Comment -->
          <div class="bg-white lcInfo">
            <q-btn
              dense
              round
              flat
              v-if="getCurrentUserIndex.id in getPostOnShow.likes"
              @click="
                this.unlikePost({
                  idPost: getPostOnShow.idPost,
                  userId: getPostOnShow.userInfo.userId,
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
                  idPost: getPostOnShow.idPost,
                  userId: getPostOnShow.userInfo.userId,
                })
              "
            />
            <q-btn dense round flat icon="far fa-comment" />
          </div>
          <!-- Likes -->
          <div v-if="getPostOnShowReady" class="q-mx-sm text-weight-bold">
            <div v-if="getPostOnShow.likes">
              {{ Object.values(getPostOnShow.likes).length }} likes
            </div>
            <div v-else>0 likes</div>
          </div>
          <q-skeleton width="200px" class="q-ma-md" v-else />
          <!-- Date -->
          <div
            v-if="getPostOnShowReady"
            class="q-mx-sm text-grey text-overline"
          >
            {{ getPostOnShow.fullD }}
          </div>
        </div>
        <q-skeleton width="150px" class="q-mx-md q-mb-md" v-else />
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
                    message: textMessage,
                    idPost: getPostOnShow.idPost,
                    userId: getPostOnShow.userInfo.userId,
                  }),
                    (this.textMessage = '')
                "
                :disable="textMessage.length <= 0"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>
    <!-- Base Mobile -->
    <q-card
      class="no-shadow no-border-radius col column mobileVersion"
      style="border: solid 1px lightgray; max-width: 550px"
    >
      <!-- Header -->
      <q-card-section class="no-padding">
        <!-- Banner name and avatar -->
        <q-item>
          <q-item-section avatar>
            <q-img
              class="cursor-pointer"
              style="border-radius: 100%"
              @click="goToUser(getPostOnShow.userInfo.userId)"
              :ratio="1"
              :src="getPostOnShow.userInfo.userImg"
              width="32px"
              height="32px"
              v-if="getPostOnShowReady"
            />
            <q-skeleton type="circle" size="32px" v-else />
          </q-item-section>

          <q-item-section>
            <q-item-label
              @click="goToUser(getPostOnShow.userInfo.userId)"
              class="cursor-pointer text-weight-bold"
              v-if="getPostOnShowReady"
              >{{ getPostOnShow.userInfo.userName }}</q-item-label
            >
            <q-skeleton width="150px" v-else />
            <q-item-label caption> Subhead </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator color="grey-3" size="1px" />
      <!-- Img -->
      <q-carousel
        v-if="getPostOnShowReady"
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="black"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        arrows
        class="no-padding full-width full-height"
      >
        <q-carousel-slide
          v-for="(image, index) in getPostOnShow.imagesUploaded"
          :key="index"
          :name="index"
          style="padding: 0; margin: 0; width: 100%; height: 448px"
          class=""
        >
          <q-img
            fit="contain"
            class="no-shadow"
            :src="image"
            style="padding: 0; margin: 0; width: 100%; height: 448px"
          />
        </q-carousel-slide>
      </q-carousel>
      <q-img
        :ratio="4 / 3"
        class="no-border-radius"
        v-else
        style="padding: 0; margin: 0; width: 100%; height: 448px"
      >
        <q-skeleton class="no-border-radius" height="100%" width="100%" />
      </q-img>
      <q-separator color="grey-3" size="1px" />
      <!-- Like -->
      <q-card-actions
        class="q-pb-none full-width"
        v-if="getPostOnShowReady"
        align="left"
      >
        <q-btn
          dense
          round
          flat
          v-if="getCurrentUserIndex.id in getPostOnShow.likes"
          @click="
            this.unlikePost({
              idPost: getPostOnShow.idPost,
              userId: getPostOnShow.userInfo.userId,
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
              idPost: getPostOnShow.idPost,
              userId: getPostOnShow.userInfo.userId,
            })
          "
        />
        <q-btn dense round flat icon="far fa-comment" />
      </q-card-actions>
      <!-- Likes -->
      <q-card-actions
        v-if="getPostOnShowReady"
        class="q-py-none q-px-md text-weight-bold full-width"
        align="left"
      >
        <div v-if="getPostOnShow.likes">
          {{ Object.values(getPostOnShow.likes).length }} likes
        </div>
        <div v-else>0 likes</div>
      </q-card-actions>
      <!-- Description -->
      <q-list class="q-py-none q-pl-sm full-width" v-if="getPostOnShowReady">
        <q-card-actions class="q-py-none">
          <span
            class="cursor-pointer text-weight-bold"
            @click="goToUser(getPostOnShow.userInfo.userId)"
          >
            {{ getPostOnShow.userInfo.userName }} &nbsp;
          </span>
          <span> {{ getPostOnShow.description }} </span>
        </q-card-actions>
      </q-list>
      <q-separator color="grey-3" size="1px" />
      <!-- Comments -->
      <q-list
        v-if="getPostOnShowReady"
        style="max-height: 120px; overflow: overlay"
        class="q-py-none q-pl-sm full-width"
      >
        <q-card-actions
          class="q-py-none"
          v-for="(comment, index) in getPostOnShow.messages"
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
      <div class="bg-white full-width q-px-sm ccInfo" v-if="getPostOnShowReady">
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
                  message: textMessage,
                  idPost: getPostOnShow.idPost,
                  userId: getPostOnShow.userInfo.userId,
                }),
                  (this.textMessage = '')
              "
              :disable="textMessage.length <= 0"
            />
          </template>
        </q-input>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      slide: 0,
      textMessage: "",
    };
  },
  methods: {
    ...mapActions("actionsOnWeb", [
      "setNewLikesToPostAction",
      "setNewMessagesToPostAction",
      "changeTheImageOfAnyPostAction",
      "likePost",
      "unlikePost",
      "sendText",
      "removeThePostOnShowAction",
      "goToUser",
      "getPostOnShowAction",
    ]),
  },
  computed: {
    ...mapGetters("settingsUser", ["getCurrentUserIndex"]),
    ...mapGetters("actionsOnWeb", ["getPostOnShow", "getPostOnShowReady"]),
  },
  unmounted() {
    if (this.getPostOnShow != null) {
      this.removeThePostOnShowAction();
    }
  },
  async mounted() {
    if (Object.keys(this.getPostOnShow).length === 0) {
      let payload = {
        indexPost: this.$route.params.postId,
        userId: this.$route.params.userId,
      };
      await this.getPostOnShowAction(payload);
    }
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .mobileVersion {
    display: flex;
    width: 100%;
  }
  .mobileScript {
    padding: 0;
  }
  .desktopVersion {
    display: none;
  }
}
//Tablet
@media (min-width: 480px) {
  .mobileVersion {
    display: flex;
  }
  .desktopVersion {
    display: none;
  }
}

//Desktop
@media (min-width: 768px) {
  .mobileVersion {
    display: none;
  }
  .desktopVersion {
    display: flex;
  }
}
</style>
