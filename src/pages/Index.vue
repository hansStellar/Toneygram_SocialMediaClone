<template>
  <div class="flex flex-center homeBase q-gutter-xl">
    <!-- Cards -->
    <div>
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
    </div>
    <!-- New Side Desktop -->
    <div style="width: 16rem">
      <div class="q-pt-sm fixed">
        <!-- My Card -->
        <div class="row flex myCardBase items-center justify-between q-mb-lg">
          <div class="row items-center">
            <!-- Img -->
            <q-avatar class="imgBase shadow-5">
              <img
                src="https://cdn.quasar.dev/img/avatar.png"
                class="imageMyCard"
              />
            </q-avatar>
            <!-- Name -->
            <div class="q-pl-md">
              <!-- Username -->
              <div class="text-weight-bold">hans___chris</div>
              <!-- Name -->
              <div class="text-grey">Hans Chris</div>
            </div>
          </div>
          <!-- Log out button -->
          <q-btn icon="logout" color="cyan-2" round flat dense />
        </div>
        <!-- Suggested users -->
        <p class="text-grey text-weight-medium">Suggestions for you</p>
        <div class="row justify-between q-mb-lg">
          <!-- User -->
          <div class="row items-center">
            <!-- Img -->
            <q-avatar class="shadow-2">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <!-- Username -->
            <div class="q-pl-md text-weight-medium">hans___chris</div>
          </div>
          <!-- Follow button -->
          <q-btn icon="far fa-plus-square" dense flat rounded color="cyan-2" />
        </div>
        <!-- Footer -->
        <div class="text-grey-5 text-weight-light text-overline">
          © 2021 Toneygram
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
  .homeBase {
    align-items: start;
    padding: 2rem;
  }
}
//Desktop New One
@media (min-width: 980px) {
  .cardBase {
    width: 40rem;
  }
  .homeBase {
    align-items: start;
    padding: 2rem;
  }
}

.myCardBase {
  width: 16rem;
}

.imageMyCard {
  width: 100%;
  height: 100%;
}

.imgBase {
  width: 4rem;
  height: 4rem;
}
</style>
