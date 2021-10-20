<template>
  <div class="cardBase shadow-2 q-mb-xl">
    <!-- Header -->
    <div>
      <q-banner rounded class="bg-white">
        <template v-slot:avatar>
          <q-avatar class="shadow-2">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </template>

        <span class="text-weight-bold">hans___chris</span>
      </q-banner>
    </div>
    <q-separator color="grey-5" />
    <!-- Image/Caroussel -->
    <q-carousel animated v-model="slide" arrows navigation infinite>
      <q-carousel-slide
        v-for="(image, index) in images"
        :key="index"
        :name="index"
        :img-src="image"
      />
    </q-carousel>
    <q-separator color="grey-5" />
    <!-- Like and Comment-->
    <div class="q-my-sm">
      <q-btn dense round flat icon="favorite_border" />
      <q-btn dense round flat icon="far fa-comment" />
    </div>
    <!-- Likes -->
    <div class="q-mb-sm q-mx-sm text-weight-bold">21 likes</div>
    <!-- Description -->
    <div class="q-mb-sm q-mx-sm">
      <span class="text-weight-bold">hans___chris</span> Lorem ipsum dolor sit,
      amet consectetur adipisicing elit. Et pariatur saepe voluptatibus
      assumenda! Aspernatur enim id libero consequuntur necessitatibus, aut unde
      accusantium doloremque, ipsum dicta voluptatibus minus? Quasi, itaque
      corporis.
    </div>
    <!-- Comments -->
    <div></div>
    <!-- Date -->
    <div class="q-mx-sm q-mb-sm text-grey text-overline">12/02/2021</div>
  </div>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
export default {
  data() {
    return {
      images: [],
      slide: 0,
    };
  },
  beforeCreate() {
    let userId = this.$route.params.userId;
    let postId = this.$route.params.postId;
    const postRef = firebaseDb.ref(
      "toneygram/users/" + userId + "/posts/" + postId
    );
    postRef.once("value", (post) => {
      post.val().forEach((img) => {
        this.images.push(img);
      });
    });
  },
};
</script>
<style lang="scss"></style>
