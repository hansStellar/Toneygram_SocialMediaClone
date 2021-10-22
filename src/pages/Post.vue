<template>
  <div class="cardBase shadow-1">
    <!-- Header -->
    <div @click="goToUser(userInfoPost.userId)">
      <q-banner rounded class="bg-white items-center q-py-md">
        <template v-slot:avatar>
          <q-avatar class="shadow-2 imgUserTop">
            <img :src="userInfoPost.userImg" />
          </q-avatar>
        </template>

        <span class="text-weight-medium">{{ userInfoPost.userName }}</span>
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
      class="baseCarousel"
    >
      <q-carousel-slide
        style="background-position-y: top"
        v-for="(image, index) in images"
        :key="index"
        :name="index"
        :img-src="image"
      />
    </q-carousel>
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
      <q-btn
        dense
        round
        @click="showText = !showText"
        flat
        icon="far fa-comment"
      />
    </div>
    <!-- Likes -->
    <div class="q-mb-sm q-mx-sm text-weight-bold">
      {{ likeUsers.length }} likes
    </div>
    <!-- Description -->
    <div class="q-mb-sm q-mx-sm">
      <span class="text-weight-bold" @click="goToUser(userInfoPost.userId)">{{
        userInfoPost.userName
      }}</span>
      {{ descriptionPost }}
    </div>
    <q-separator color="grey-4" size="1px" class="q-mb-sm" />
    <!-- Comments -->
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
    <!-- Create Comment -->
    <div v-show="showText" class="q-px-sm full-width">
      <q-form class="row justify-between items-center">
        <q-input
          v-model="textMessage"
          dense
          label="Type your message"
          class="inputForm"
          autofocus
          color="positive"
          autocomplete="off"
        />
        <q-btn
          icon="send"
          dense
          flat
          color="positive"
          class="btnForm"
          @click="sendText"
          :disable="textMessage.length <= 0"
        />
      </q-form>
    </div>
    <!-- Date -->
    <div class="q-mx-sm q-mb-sm text-grey text-overline">{{ dateOfPost }}</div>
  </div>
</template>
<script>
import { uid } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
export default {
  data() {
    return {
      images: [],
      slide: 0,
      likeUsers: [],
      showText: false,
      textMessage: "",
      comments: [],
      descriptionPost: "",
      userInfoPost: {},
      dateOfPost: "",
      actualUserId: "",
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
      this.showText = false;
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
    }, 200);
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
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
}
//Tablet
@media (min-width: 480px) {
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
}
//Desktop
@media (min-width: 768px) {
  .cardBase {
    max-width: 940px;
    margin: auto;
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
}
</style>
