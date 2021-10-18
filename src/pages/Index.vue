<template>
  <div class="flex flex-center homeBase q-gutter-xl">
    <!-- Card -->
    <div class="cardBase shadow-2">
      <!-- Header -->
      <div>
        <q-banner rounded class="bg-grey-3">
          <template v-slot:avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </template>

          <span class="text-weight-bold">hans___chris</span>
        </q-banner>
      </div>
      <!-- Image/Caroussel -->
      <q-carousel animated v-model="slide" arrows navigation infinite>
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
      <!-- Like and Comment-->
      <div class="q-my-sm">
        <q-btn dense round flat icon="favorite_border" />
        <q-btn dense round flat icon="far fa-comment" />
      </div>
      <!-- Likes -->
      <div class="q-mb-sm q-mx-sm text-weight-bold">21 likes</div>
      <!-- Description -->
      <div class="q-mb-sm q-mx-sm">
        <span class="text-weight-bold">hans___chris</span> Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Et pariatur saepe voluptatibus
        assumenda! Aspernatur enim id libero consequuntur necessitatibus, aut
        unde accusantium doloremque, ipsum dicta voluptatibus minus? Quasi,
        itaque corporis.
      </div>
      <!-- Comments -->
      <div></div>
      <!-- Date -->
      <div class="q-mx-sm q-mb-sm text-grey text-overline">12/02/2021</div>
    </div>
    <!-- New Side Desktop -->
    <div>
      <!-- My Card -->
      <div class="row flex bg-red myCardBase">
        <!-- Img -->
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <!-- Name -->
        <div>
          <!-- Username -->
          <div>hans___chris</div>
          <!-- Name -->
          <div>Hans Chris</div>
        </div>
      </div>
      <!-- Suggested users -->
      <div>
        <!-- User -->
        <div class="row">
          <!-- Img -->
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <!-- Username -->
          <div>hans___chris</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      slide: 1,
    };
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .cardBase {
    width: 100%;
  }
}
//Tablet
@media (min-width: 480px) {
  .cardBase {
    width: 100%;
  }
}
//Desktop
@media (min-width: 768px) {
  .cardBase {
    width: 40rem;
  }
}
//Desktop New One
@media (min-width: 980px) {
  .cardBase {
    width: 40rem;
  }
}

.homeBase {
  align-items: start;
  padding: 2rem;
}

.myCardBase {
  width: 16rem;
}
</style>
