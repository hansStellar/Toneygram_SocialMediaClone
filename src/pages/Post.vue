<template>
  <!-- iPhone & Tablet -->
  <div class="shadow-1 phoneBasePost">
    <!-- Model -->
    <div>
      <!-- Header -->
      <div @click="goToUser(userInfoPost.userId)">
        <q-banner rounded class="bg-white items-center q-py-md">
          <template v-slot:avatar>
            <q-avatar
              class="shadow-2 imgUserTop cursor-pointer"
              v-if="userInfoPost.userImg"
            >
              <img :src="userInfoPost.userImg" />
            </q-avatar>
            <q-skeleton type="circle" size="2rem" v-else />
          </template>

          <span
            v-if="userInfoPost.userName"
            class="text-weight-medium cursor-pointer"
            >{{ userInfoPost.userName }}</span
          >
          <q-skeleton width="150px" v-else />
        </q-banner>
      </div>
      <q-separator color="grey-5" />
      <!-- Image/Caroussel -->
      <div class="baseCarousel">
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          class="baseCarousel"
          v-if="images.length"
        >
          <q-carousel-slide
            style="background-position-y: top"
            v-for="(image, index) in images"
            :key="index"
            :name="index"
            :img-src="image"
          />
        </q-carousel>
        <q-skeleton width="100%" height="100%" v-else />
      </div>
      <!-- Skeleton -->
      <q-separator color="grey-5" />
      <!-- Like and Comment-->
      <div class="q-my-sm">
        <q-btn
          dense
          round
          flat
          @click="likePost()"
          v-if="!likeUsers.includes(actualUserId)"
          icon="favorite_border"
        />
        <q-btn
          dense
          round
          flat
          @click="unlikePost()"
          v-else
          icon="favorite"
          color="red"
        />
        <q-btn dense round flat icon="far fa-comment" />
      </div>
      <!-- Likes -->
      <div class="q-mb-sm q-mx-sm text-weight-bold">
        {{ likeUsers.length }} likes
      </div>
      <!-- Description -->
      <div class="q-mb-sm q-mx-sm" v-if="descriptionPost">
        <span
          class="text-weight-bold cursor-pointer"
          @click="goToUser(userInfoPost.userId)"
          >{{ userInfoPost.userName }}</span
        >
        {{ descriptionPost }}
      </div>
      <q-skeleton class="q-ma-md" width="200px" v-else />
      <q-separator color="grey-4" size="1px" class="q-mb-sm" />
      <!-- Comments -->
      <div v-if="comments.length" style="height: 5rem; overflow: auto">
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="row items-center q-gutter-md q-px-sm"
        >
          <!-- img -->
          <q-avatar class="userCommentImg">
            <img :src="comment.imgUser" />
          </q-avatar>
          <!-- Username -->
          <div class="">
            <span
              class="text-weight-bold cursor-pointer"
              @click="goToUser(comment.idUser)"
              >{{ comment.userName }}</span
            >&nbsp;
            <span>{{ comment.message }}</span>
          </div>
        </div>
      </div>
      <!-- Create Comment -->
      <div class="bg-grey-2 full-width q-px-sm">
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
              @click="sendText"
              :disable="textMessage.length <= 0"
            />
          </template>
        </q-input>
      </div>
      <!-- Date -->
      <div class="q-mx-sm q-mb-sm text-grey text-overline">
        {{ dateOfPost }}
      </div>
    </div>
  </div>
  <!-- Desktop -->
  <div style="">
    <!-- Model -->
    <div
      class="desktopBasePost row flex justify-center"
      style="
        max-width: 970px;
        margin: auto;
        height: 90vh;
        align-content: center;
      "
    >
      <!-- Image/Caroussel -->
      <div class="col-7">
        <!-- Img -->
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          class="baseCarousel"
          v-if="images.length"
        >
          <q-carousel-slide
            style="background-position-y: top"
            v-for="(image, index) in images"
            :key="index"
            :name="index"
            :img-src="image"
          />
        </q-carousel>
        <!-- Skeleton -->
        <q-skeleton width="100%" height="100%" v-else />
      </div>
      <!-- Right Side -->
      <div class="col-4 shadow-2 bg-white">
        <!-- Header -->
        <div @click="goToUser(userInfoPost.userId)">
          <q-banner rounded class="bg-white items-center q-py-md">
            <template v-slot:avatar>
              <q-avatar
                class="shadow-2 imgUserTop cursor-pointer"
                v-if="userInfoPost.userImg"
              >
                <img :src="userInfoPost.userImg" />
              </q-avatar>
              <q-skeleton type="circle" size="2rem" v-else />
            </template>

            <span
              v-if="userInfoPost.userName"
              class="text-weight-medium cursor-pointer"
              >{{ userInfoPost.userName }}</span
            >
            <q-skeleton width="150px" v-else />
          </q-banner>
        </div>
        <q-separator color="grey-4" />
        <!-- Description -->
        <div class="q-px-sm q-pt-sm bg-white" v-if="descriptionPost">
          <span
            class="text-weight-bold cursor-pointer"
            @click="goToUser(userInfoPost.userId)"
            >{{ userInfoPost.userName }}</span
          >
          {{ descriptionPost }}
        </div>
        <q-skeleton class="q-ma-md" width="200px" v-else />
        <!-- Comments -->
        <div class="bg-white" style="height: 18.58rem; overflow: auto">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="row items-center q-px-sm"
          >
            <!-- Username -->
            <div class="">
              <span
                class="text-weight-bold cursor-pointer"
                @click="goToUser(comment.idUser)"
                >{{ comment.userName }}</span
              >&nbsp;
              <span>{{ comment.message }}</span>
            </div>
          </div>
        </div>
        <q-separator color="grey-4" />
        <!-- Like and Comment-->
        <div class="bg-white q-py-sm">
          <q-btn
            dense
            round
            flat
            @click="likePost()"
            v-if="!likeUsers.includes(actualUserId)"
            icon="favorite_border"
          />
          <q-btn
            dense
            round
            flat
            @click="unlikePost()"
            v-else
            icon="favorite"
            color="red"
          />
          <q-btn dense round flat icon="far fa-comment" />
        </div>
        <!-- Likes -->
        <div class="q-pb-sm q-px-sm bg-white text-weight-bold">
          {{ likeUsers.length }} likes
        </div>
        <!-- Date -->
        <div class="q-px-sm text-grey bg-white items-bottom text-overline">
          {{ dateOfPost }}
        </div>
        <q-separator color="grey-4" class="" />
        <!-- Create Comment -->
        <div class="bg-white full-width q-px-sm">
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
                @click="sendText"
                :disable="textMessage.length <= 0"
              />
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uid } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
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
      //
      slide: 0,
      textMessage: "",
    };
  },
  methods: {
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
    unlikePost() {
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
      postRef.remove();
      let nuevoArray = [];
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
      let randomId = uid();
      const messagesRef = firebaseDb.ref(
        "toneygram/users/" +
          userId +
          "/posts/" +
          postId +
          "/messages/" +
          randomId
      );
      messagesRef.set({
        userName: firebaseAuth.currentUser.displayName,
        imgUser: firebaseAuth.currentUser.photoURL,
        idUser: firebaseAuth.currentUser.uid,
        message: this.textMessage,
        date: new Date().getTime(),
      });

      // Read Firebase Database
      const messagesActRef = firebaseDb.ref(
        "toneygram/users/" + userId + "/posts/" + postId + "/messages"
      );
      messagesActRef.once("child_added", (comments) => {
        this.comments.push(comments.val());
      });

      this.textMessage = "";
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
  mounted() {
    setTimeout(() => {
      let actualUserId = firebaseAuth.currentUser.uid;
      this.actualUserId = actualUserId;
      // images: [],
      // likeUsers: [],
      // comments: [],
      // userInfoPost: {},
      // descriptionPost: "",
      // dateOfPost: "",
      // actualUserId: "",
    });
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .phoneBasePost {
    display: block;
  }
  .desktopBasePost {
    display: none;
  }
  .userCommentImg {
    display: none;
  }
  .imgUserTop {
    width: 2rem;
    height: 2rem;
  }
  .baseCarousel {
    height: 20rem;
  }
  .inputForm {
    width: 85%;
  }
  .btnForm {
    width: 15%;
  }
  .desktopShowPost {
    display: none;
  }
}
//Tablet
@media (min-width: 480px) {
  .phoneBasePost {
    display: flex;
    flex-direction: column;
  }
  .desktopBasePost {
    display: none;
  }
  .userCommentImg {
    display: none;
  }
  .imgUserTop {
    width: 2rem;
    height: 2rem;
  }
  .baseCarousel {
    height: 25rem;
  }
  .inputForm {
    width: 91%;
  }
  .btnForm {
    width: 9%;
  }
  .desktopShowPost {
    display: none;
  }
}
//Desktop
@media (min-width: 768px) {
  .phoneBasePost {
    display: none;
  }
  .desktopBasePost {
    display: flex;
  }
  .userCommentImg {
    display: none;
  }
  .imgUserTop {
    width: 2rem;
    height: 2rem;
  }
  .baseCarousel {
    height: 35rem;
  }
  .inputForm {
    width: 95%;
  }
  .btnForm {
    width: 4%;
  }
  .desktopShowPost {
    display: block;
  }
}
</style>
