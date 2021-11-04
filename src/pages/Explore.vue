<template>
  <q-page
    class="container flex flex-center paddingOut"
    style="max-width: 940px; margin: auto"
  >
    <q-img
      class="col cursor-pointer"
      v-for="(post, index) in postsExplore"
      :key="index"
      :ratio="1"
      :src="post.imagesUploaded[0]"
      @click="goToUser(post.userInfo.userId)"
    />
  </q-page>
</template>
<script>
import { firebaseDb } from "src/boot/firebase";
export default {
  data() {
    return {
      postsExplore: [],
      postsFollowingStatus: false,
    };
  },
  methods: {
    goToUser(idUser) {
      this.$router.push({
        name: "User",
        params: {
          userId: idUser,
        },
      });
    },
  },
  mounted() {
    // Loop through the no following users
    const postsRef = firebaseDb.ref("toneygram/posts");
    postsRef
      .once("value", (allUsers) => {
        // First we loop on the all users section
        let allUsersVar = allUsers.val();
        let allUsersVarArray = Object.values(allUsersVar);
        let arrayUsers = [];

        // We loop 5 times the object, so we ended passing 5 users to the arrayUsers
        do {
          for (let index = 0; index <= allUsersVarArray.length; index++) {
            let user =
              allUsersVarArray[
                Math.floor(Math.random() * allUsersVarArray.length)
              ];
            arrayUsers.push(user);
            arrayUsers.length = allUsersVarArray.length;
          }
          arrayUsers = arrayUsers.filter(function (item, pos) {
            return arrayUsers.indexOf(item) == pos;
          });
        } while (arrayUsers.length < allUsersVarArray.length);
        // We loop every user that is in the array in order to get 1 post of each one of them
        let randomNumber = Math.floor(Math.random() * arrayUsers.length);
        arrayUsers.forEach((User) => {
          // For every user we must have one post
          if (Object.values(User).length > 1) {
            this.postsExplore.push(
              Object.values(User)[
                Math.floor(Math.random() * Object.values(User).length)
              ]
            );
          } else {
            this.postsExplore.push(Object.values(User)[0]);
          }
        });
      })
      .then(() => {
        this.postsFollowingStatus = true;
      })
      .catch(() => {
        this.postsFollowingStatus = false;
      });
  },
};
</script>
<style lang="scss">
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.2rem;
}

//iPhone
@media (max-width: 480px) {
  .paddingOut {
    padding: 0;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.2rem;
  }
}
//Tablet
@media (min-width: 480px) {
  .paddingOut {
    padding: 0;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.8rem;
  }
}
//Desktop
@media (min-width: 768px) {
  .paddingOut {
    padding: 2rem 0;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.8rem;
  }
}
</style>
