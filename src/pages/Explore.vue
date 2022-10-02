<template>
  <q-page
    class="container flex flex-center paddingOut"
    style="max-width: 940px; margin: auto"
  >
    <q-img
      class="cursor-pointer imgExplore shadow-1 bg-white"
      v-for="(post, index) in getPostsInExplore"
      :key="index"
      style=""
      fit="cover"
      :src="post.imagesUploaded[0]"
      @click="goToPost(post.userInfo.userId, post.idPost)"
    />
  </q-page>
</template>
<script>
import { firebaseDb } from "src/boot/firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    goToPost(userId, postId) {
      this.$router.push({
        name: "Post",
        params: {
          userId,
          postId,
        },
      });
    },
  },
  computed: {
    ...mapGetters("actionsOnWeb", ["getPostsInExplore"]),
  },
  mounted() {},
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
    gap: 0.3rem;
  }
  .imgExplore {
    max-height: 150px;
    min-height: 150px;
    height: 150px;
    width: 100%;
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
  .imgExplore {
    max-height: 270px;
    height: 270px;
    width: 100%;
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
  .imgExplore {
    max-height: 270px;
    height: 270px;
    width: 100%;
  }
}
</style>
