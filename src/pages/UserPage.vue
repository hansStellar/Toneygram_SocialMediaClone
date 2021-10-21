<template>
  <div class="items-center userPageBase">
    <!-- My Card -->
    <div class="row flex myCardBaseUser items-center justify-between q-pa-md">
      <!-- Img -->
      <q-avatar class="imgBaseUser shadow-5">
        <img :src="userInfomation.img" class="imageMyCard" />
      </q-avatar>
      <!-- Info Upper -->
      <div class="column">
        <!-- Username -->
        <div class="userNameUpperBase items-center">
          <div class="text-weight-thin text-h4 q-mb-sm usernameDesktop">
            {{ userInfomation.name }}
          </div>
          <q-btn
            class="full-width showButtonMobile"
            dense
            label="Edit Profile"
          />
          <q-btn
            class="full-width showButtonDesktop"
            dense
            color="grey-5"
            flat
            icon="settings"
            style="max-height: 2rem"
          />
        </div>
        <!-- Followers, following and posts -->
        <div class="row justify-between q-py-md text-center followers">
          <!-- Post -->
          <div class="row">
            <div class="text-weight-medium q-mr-sm">5</div>
            <div class="text-black text-weight-light">posts</div>
          </div>
          <!-- Following -->
          <div class="row">
            <div class="text-weight-medium q-mr-sm">34</div>
            <div class="text-black text-weight-light">following</div>
          </div>
          <!-- Followers -->
          <div class="row">
            <div class="text-weight-medium q-mr-sm">1023</div>
            <div class="text-black text-weight-light">followers</div>
          </div>
        </div>
        <!-- Resume -->
        <div class="resumeBaseUpper">
          <!-- Name -->
          <div class="text-weight-medium">{{ userInfomation.fullname }}</div>
          <!-- Description -->
          <div v-if="userInfomation.description">
            {{ userInfomation.description }}
          </div>
          <!-- Pagina web -->
          <div v-if="userInfomation.url">{{ userInfomation.url }}</div>
        </div>
      </div>
    </div>
    <!-- Resume -->
    <div class="q-pa-md resumeBase">
      <!-- Name -->
      <div class="text-weight-medium">{{ userInfomation.fullname }}</div>
      <!-- Description -->
      <div v-if="userInfomation.description">
        {{ userInfomation.description }}
      </div>
      <!-- Pagina web -->
      <div v-if="userInfomation.url">{{ userInfomation.url }}</div>
    </div>
    <!-- Post, following and followers -->
    <div class="followersPostBase">
      <q-separator color="grey-4" size="1px" />
      <div class="row justify-between q-px-lg q-py-sm text-center">
        <!-- Post -->
        <div>
          <div class="text-weight-medium">5</div>
          <div class="text-grey">posts</div>
        </div>
        <!-- Following -->
        <div>
          <div class="text-weight-medium">34</div>
          <div class="text-grey">following</div>
        </div>
        <!-- Followers -->
        <div>
          <div class="text-weight-medium">1023</div>
          <div class="text-grey">followers</div>
        </div>
      </div>
      <q-separator color="grey-4" size="1px" />
    </div>
    <!-- Bar Desktop -->
    <q-separator size="1px" color="grey-4" class="q-mt-lg barOnlyDesktop" />
    <!-- Images -->
    <div class="postsBase">
      <img
        v-for="(posts, index) in posts"
        :key="index"
        :src="posts.images[0]"
        class="imgFromPost"
        @click="goToPost(index)"
      />
    </div>
    <!-- Add File -->
    <input
      type="file"
      @change="addFile($event)"
      multiple="multiple"
      :disabled="descriptionPost.length <= 0"
    />
    <input type="text" v-model="descriptionPost" />
  </div>
</template>
<script>
import { uid } from "quasar";
import { firebaseAuth, firebaseDb, firebaseStorage } from "src/boot/firebase";
export default {
  data() {
    return {
      userInfomation: {},
      posts: [],
      descriptionPost: "",
    };
  },
  methods: {
    addFile(event) {
      const uniqueId = uid();
      let images = [];
      Object.values(event.target.files).forEach((file) => {
        let randomId = uid();
        const imagesStirageRef = firebaseStorage
          .ref(firebaseAuth.currentUser.uid + "/posts/" + randomId)
          .put(file)
          .then((data) => {
            firebaseStorage
              .ref(firebaseAuth.currentUser.uid + "/posts/" + randomId)
              .getDownloadURL()
              .then((url) => {
                images.push(url);
                const userPosts = firebaseDb
                  .ref()
                  .child(
                    "toneygram/users/" +
                      firebaseAuth.currentUser.uid +
                      "/posts/" +
                      uniqueId
                  );
                let dateOfPost =
                  new Date().getDate() +
                  "/" +
                  (new Date().getMonth() + 1) +
                  "/" +
                  new Date().getFullYear();

                userPosts.set({
                  images,
                  userInfo: {
                    userName: firebaseAuth.currentUser.displayName,
                    userId: firebaseAuth.currentUser.uid,
                    userImg: firebaseAuth.currentUser.photoURL,
                  },
                  description: this.descriptionPost,
                  dateOfPost: dateOfPost,
                });
              });
          });
      });
    },
    goToPost(indexPost) {
      this.$router.push({
        name: "Post",
        params: { userId: firebaseAuth.currentUser.uid, postId: indexPost },
      });
    },
  },

  beforeCreate() {
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
      this.posts = userInformation.posts;
    });
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
  .imgBaseUser {
    height: 77px;
    width: 77px;
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
  .resumeBaseUpper {
    display: none;
  }
  .barOnlyDesktop {
    display: none;
  }
  .postsBase {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .imgFromPost {
    width: 33%;
    cursor: pointer;
  }
}
//Tablet
@media (min-width: 480px) {
  .barOnlyDesktop {
    display: none;
  }
  .imgBaseUser {
    height: 150px;
    width: 150px;
    margin-right: 4rem;
  }
  .myCardBaseUser {
    justify-content: start;
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
}
//Desktop
@media (min-width: 768px) {
  .barOnlyDesktop {
    display: block;
  }
  .myCardBaseUser {
    justify-content: start;
    padding-left: 5.5rem;
  }
  .imgBaseUser {
    height: 150px;
    width: 150px;
    margin-right: 7rem;
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
    font-size: 0.8rem;
  }
}
</style>
