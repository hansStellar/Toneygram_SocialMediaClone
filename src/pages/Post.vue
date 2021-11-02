<template>
  <q-page class="q-pa-md flex flex-center mobileScript">
    <!-- Base Desktop -->
    <q-card
      class="row no-shadow no-border-radius col desktopVersion"
      style="border: solid 1px lightgray; max-width: 850px"
    >
      <!-- Img -->
      <div class="no-padding col-8">
        <q-carousel
          v-model="slide"
          transition-prev="jump-right"
          transition-next="jump-left"
          swipeable
          animated
          control-color="white"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          navigation-icon="radio_button_unchecked"
          navigation
          arrows
          class="no-padding full-height full-width"
          v-if="Object.values(userInfoPost).length"
        >
          <q-carousel-slide
            v-for="(image, index) in images"
            :key="index"
            :name="index"
            style="padding: 0; margin: 0; width: 100%; height: 100%"
            class=""
          >
            <q-img
              :ratio="4 / 3"
              class="no-shadow"
              :src="image"
              style="padding: 0; margin: 0; width: 100%; height: 100%"
            />
          </q-carousel-slide>
        </q-carousel>
        <q-img :ratio="4 / 3" class="no-border-radius" v-else>
          <q-skeleton class="no-border-radius" height="100%" width="100%" />
        </q-img>
      </div>

      <!-- Info Section -->
      <q-card-section class="col-4 no-padding">
        <!-- Banner name and avatar -->
        <q-item>
          <q-item-section avatar>
            <q-img
              class="cursor-pointer"
              style="border-radius: 100%"
              @click="goToUser(userInfoPost.userId)"
              :ratio="1"
              :src="userInfoPost.userImg"
              width="32px"
              height="32px"
              v-if="Object.values(userInfoPost).length"
            />
            <q-skeleton type="circle" size="32px" v-else />
          </q-item-section>

          <q-item-section>
            <q-item-label
              @click="goToUser(userInfoPost.userId)"
              class="cursor-pointer text-weight-bold"
              v-if="Object.values(userInfoPost).length"
              >{{ userInfoPost.userName }}</q-item-label
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
              v-if="Object.values(userInfoPost).length"
              class="q-my-sm q-px-md row items-center"
            >
              <q-img
                @click="goToUser(userInfoPost.userId)"
                :src="userInfoPost.userImg"
                :ratio="1"
                width="32px"
                height="32px"
                class="cursor-pointer"
                style="border-radius: 100%"
              />
              <span
                @click="goToUser(userInfoPost.userId)"
                class="cursor-pointer q-ml-md q-mr-sm text-weight-bold"
                >{{ userInfoPost.userName }}</span
              ><span>{{ descriptionPost }}</span>
            </div>
            <q-skeleton class="q-ma-md" width="190px" v-else />
            <!-- Comments desktop -->
            <div
              v-if="Object.values(userInfoPost).length"
              class="q-px-md bg-white"
            >
              <div
                v-for="(comment, index) in comments"
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
                  style="border-radius: 100%"
                  @click="goToUser(comment.idUser)"
                />

                <span
                  @click="goToUser(comment.idUser)"
                  class="
                    cursor-pointer
                    q-ml-md q-mr-sm
                    text-weight-medium text-weight-bold
                  "
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
        <div class="col lldInfo" v-if="Object.values(userInfoPost).length">
          <!-- Like and Comment -->
          <div class="bg-white lcInfo">
            <q-btn
              dense
              round
              flat
              v-if="likeUsers.includes(actualUserId)"
              @click="unlikePost()"
              icon="favorite"
              color="red"
            />
            <q-btn
              dense
              round
              flat
              icon="favorite_border"
              v-else
              @click="likePost()"
            />
            <q-btn dense round flat icon="far fa-comment" />
          </div>
          <!-- Likes -->
          <div
            v-if="Object.values(userInfoPost).length"
            class="q-mx-sm text-weight-bold"
          >
            <div v-if="likeUsers.length">{{ likeUsers.length }} likes</div>
            <div v-else>0 likes</div>
          </div>
          <q-skeleton width="200px" class="q-ma-md" v-else />
          <!-- Date -->
          <div
            v-if="Object.values(userInfoPost).length"
            class="q-mx-sm text-grey text-overline"
          >
            {{ dateOfPost }}
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
                @click="sendText(textMessage)"
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
              @click="goToUser(userInfoPost.userId)"
              :ratio="1"
              :src="userInfoPost.userImg"
              width="32px"
              height="32px"
              v-if="Object.values(userInfoPost).length"
            />
            <q-skeleton type="circle" size="32px" v-else />
          </q-item-section>

          <q-item-section>
            <q-item-label
              @click="goToUser(userInfoPost.userId)"
              class="cursor-pointer text-weight-bold"
              v-if="Object.values(userInfoPost).length"
              >{{ userInfoPost.userName }}</q-item-label
            >
            <q-skeleton width="150px" v-else />
            <q-item-label caption> Subhead </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator color="grey-3" size="1px" />
      <!-- Img -->
      <q-carousel
        v-if="Object.values(userInfoPost).length"
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        arrows
        class="no-padding full-width full-height"
      >
        <q-carousel-slide
          v-for="(image, index) in images"
          :key="index"
          :name="index"
          style="padding: 0; margin: 0; width: 100%; height: 100%"
          class=""
        >
          <q-img
            :ratio="2 / 2"
            class="no-shadow"
            :src="image"
            style="padding: 0; margin: 0; width: 100%; height: 100%"
            v-if="images.length"
          />
        </q-carousel-slide>
      </q-carousel>
      <q-img :ratio="4 / 3" class="no-border-radius" v-else>
        <q-skeleton class="no-border-radius" height="100%" width="100%" />
      </q-img>
      <q-separator color="grey-3" size="1px" />
      <!-- Like and coment -->
      <q-card-actions class="q-pb-none full-width" align="left">
        <q-btn
          dense
          round
          flat
          v-if="likeUsers.includes(actualUserId)"
          @click="unlikePost()"
          icon="favorite"
          color="red"
        />
        <q-btn
          dense
          round
          flat
          icon="favorite_border"
          v-else
          @click="likePost()"
        />
        <q-btn dense round flat icon="far fa-comment" />
      </q-card-actions>
      <q-card-actions
        v-if="Object.values(userInfoPost).length"
        class="q-py-none q-px-md text-weight-bold full-width"
        align="left"
      >
        <div v-if="likeUsers.length">{{ likeUsers.length }} likes</div>
        <div v-else>0 likes</div>
      </q-card-actions>
      <!-- Description -->
      <q-list class="q-py-none q-pl-sm full-width">
        <q-card-actions class="q-py-none">
          <span
            class="cursor-pointer text-weight-bold"
            @click="goToUser(userInfoPost.userId)"
          >
            {{ userInfoPost.userName }} &nbsp;
          </span>
          <span> {{ descriptionPost }} </span>
        </q-card-actions>
      </q-list>
      <q-separator color="grey-3" size="1px" />
      <!-- Comments -->
      <q-list
        style="max-height: 120px; overflow: overlay"
        class="q-py-none q-pl-sm full-width"
      >
        <q-card-actions
          class="q-py-none"
          v-for="(comment, index) in comments"
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
              @click="sendText(textMessage)"
              :disable="textMessage.length <= 0"
            />
          </template>
        </q-input>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import { uid } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      images: [],
      likeUsers: [],
      comments: [],
      userInfoPost: {},
      descriptionPost: "",
      dateOfPost: "",
      actualUserId: "",
      showPost: true,
      slide: 0,
      textMessage: "",
    };
  },
  methods: {
    likePost() {
      let userId = this.$route.params.userId;
      let postId = this.$route.params.postId;
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          userId +
          "/posts/" +
          postId +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.set(firebaseAuth.currentUser.uid);
      // Posts ref Global
      const postsGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          userId +
          "/" +
          postId +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postsGlobalRef.set(firebaseAuth.currentUser.uid);

      // Read from firebase database
      const postLikeActRef = firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + postId + "/likes/")
        .once("child_added", (like) => {
          this.likeUsers.push(like.val());
        });
    },
    unlikePost() {
      let userId = this.$route.params.userId;
      let postId = this.$route.params.postId;
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          userId +
          "/posts/" +
          postId +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.remove();
      // Posts ref Global
      const postGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          userId +
          "/" +
          postId +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postGlobalRef.remove();
      // Read from firebase database
      const postLikeRemoveRef = firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + postId + "/likes")
        .once("value", (likeBase) => {
          if (likeBase.val() === null) {
            return (this.likeUsers = []);
          } else {
            this.likeUsers = Object.values(likeBase.val()).filter((like) => {
              return this.likeUsers !== like;
            });
          }
        });
    },
    sendText() {
      let userId = this.$route.params.userId;
      let postId = this.$route.params.postId;
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
            // Read Firebase Database
            const messagesActRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            messagesActRef.once("child_added", (comments) => {
              this.comments.push(comments.val());
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
                const messagesActRef = firebaseDb.ref(
                  "toneygram/users/" + userId + "/posts/" + postId + "/messages"
                );
                messagesActRef.once("value", (comments) => {
                  this.comments = comments.val();
                });
                this.textMessage = "";
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
              });
          }
        });
    },
    goToUser(id) {
      this.$router.push({
        name: "User",
        params: {
          userId: id,
        },
      });
    },
  },
  created() {
    let userId = this.$route.params.userId;
    let postId = this.$route.params.postId;
    let postRef = firebaseDb.ref(
      "toneygram/users/" + userId + "/posts/" + postId
    );
    postRef.once("value", (post) => {
      const postInfo = post.val();
      // User Info
      if (postInfo.userInfo) {
        this.userInfoPost = postInfo.userInfo;
      }
      //Description
      if (postInfo.description) {
        this.descriptionPost = postInfo.description;
      }
      // Images
      if (postInfo.imagesUploaded) {
        postInfo.imagesUploaded.forEach((img) => {
          this.images.push(img);
        });
      }
      // Likes
      if (postInfo.likes) {
        Object.values(postInfo.likes).forEach((user) => {
          this.likeUsers.push(user);
        });
      }
      // Messages
      if (postInfo.messages) {
        Object.values(postInfo.messages).forEach((comment) => {
          this.comments.push(comment);
        });
        this.comments.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      }
      // Date of Post
      if (postInfo.dateOfPost) {
        this.dateOfPost = postInfo.dateOfPost;
      }
    });
  },
  computed: {
    ...mapState("settingsUser", ["currentUserId"]),
  },
  mounted() {
    this.actualUserId = this.currentUserId;
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
