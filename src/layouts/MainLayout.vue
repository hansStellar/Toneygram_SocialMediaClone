<template>
  <q-layout view="hHh lpR fFf" class="baseLayout">
    <q-header bordered class="bg-white text-white baseHeader">
      <q-toolbar
        style="max-width: 970px; margin: auto"
        class="row justify-between"
      >
        <!-- Title -->
        <div class="text-h5 text-black cursor-pointer" @click="sendUserToHome">
          toneygram
        </div>
        <!-- Buttons layer -->
        <div class="buttonsLayerBase q-gutter-sm">
          <!-- Add Post -->
          <q-btn
            round
            dense
            flat
            color="black"
            icon="add_circle_outline"
            @click="this.$router.push({ name: 'Add' })"
          />
          <!-- DM Messages -->
          <q-btn
            round
            dense
            flat
            color="black"
            icon="mail_outline"
            @click="sendUserToDM"
          />
          <!-- Likes Button -->
          <q-btn
            class="buttonFooter"
            round
            dense
            flat
            color="black"
            icon="favorite_border"
          />
          <!-- Search button -->
          <q-btn
            dense
            class="buttonFooter"
            icon="search"
            flat
            round
            color="black"
            @click="sendUserToSearch"
          />
          <!-- Profile button -->
          <q-avatar
            size="1.5rem"
            class="q-ml-md cursor-pointer"
            @click="sendToUserPage"
          >
            <img :src="userPicture" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white baseFooter">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="cyan-8"
        active-bg-color="cyan-2"
        class="bg-white full-width text-grey-5 shadow-2"
      >
        <q-tab
          alert="red"
          name="home"
          icon="apartment"
          @click="sendUserToHome"
        />
        <q-tab
          alert="red"
          name="search"
          icon="search"
          @click="sendUserToSearch"
        />

        <q-tab
          alert="red"
          name="likes"
          icon="favorite_border"
          @click="sendUserToLikes"
        />
        <q-tab alert="red" name="user" icon="face" @click="sendToUserPage" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
import { firebaseAuth } from "src/boot/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tab: "mails",
      userPicture: "",
    };
  },
  methods: {
    logOut() {
      firebaseAuth.signOut();
    },
    sendToUserPage() {
      this.$router.push({
        name: "User",
        params: { userId: firebaseAuth.currentUser.uid },
      });
    },
    sendUserToHome() {
      this.$router.push({
        name: "Home",
      });
    },
    sendToUserSettings() {
      this.$router.push({
        name: "Settings",
      });
    },
    sendUserToSearch() {
      this.$router.push({
        name: "Search",
      });
    },
    sendUserToDM() {
      this.$router.push({
        name: "DM",
      });
    },
    sendUserToLikes() {
      this.$router.push({
        name: "Likes",
      });
    },
  },
  computed: {
    ...mapState("settingsUser", ["currentUserPhoto"]),
  },
  mounted() {
    setTimeout(() => {
      this.userPicture = firebaseAuth.currentUser.photoURL;
    }, 1000);
  },
};
</script>
<style lang="scss">
.baseLayout {
  font-family: "Roboto";
}
//iPhone
@media (max-width: 480px) {
  .buttonFooter {
    display: none;
  }
  .baseFooter {
    display: flex;
    font-family: "Roboto";
  }
}

//Tablet
@media (min-width: 480px) {
  .baseFooter {
    display: none;
  }
}

//Desktop
@media (min-width: 768px) {
  .baseFooter {
    display: none;
  }
}
</style>
