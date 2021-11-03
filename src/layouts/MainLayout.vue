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

          <!-- Explore -->
          <q-btn
            dense
            round
            flat
            color="black"
            class="profileUpperButton"
            icon="explore"
            @click="footer('explore', 'Explore')"
          />
          <!-- Log Out -->
          <q-btn
            color="red"
            round
            dense
            flat
            icon="logout"
            class="notShowDesktop"
            @click="logOff"
          />
          <!-- User -->
          <q-img
            height="26px"
            width="26px"
            :ratio="1"
            :src="userPicture"
            @click="sendToUserPage"
            class="q-ml-md cursor-pointer profileUpperButton"
            style="border-radius: 100%; border: solid 1px lightgray"
          />
          <!-- DM Messages -->
          <!-- <q-btn
            round
            dense
            flat
            color="black"
            icon="mail_outline"
            @click="sendUserToDM"
          /> -->

          <!-- Likes Button -->
          <!-- <q-btn-dropdown
            rounded
            class="buttonFooter"
            color="black"
            dense
            flat
            no-icon-animation
            dropdown-icon="favorite_border"
          >
            <div class="q-pa-sm"></div>
          </q-btn-dropdown> -->

          <!-- Search button -->
          <!-- <q-btn
            dense
            class="buttonFooter"
            icon="search"
            flat
            round
            color="black"
            @click="sendUserToSearch"
          /> -->
          <!-- Profile button -->
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white baseFooter">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-bg-color="light-blue-2"
        class="bg-white full-width text-black shadow-2"
      >
        <q-tab name="home" icon="home" @click="footer('home', 'Home')" />
        <!-- <q-tab name="search" icon="search" @click="sendUserToSearch" /> -->

        <!-- <q-tab
          alert="red"
          name="likes"
          icon="favorite_border"
          @click="sendUserToLikes"
        /> -->
        <q-tab
          name="explore"
          icon="explore"
          @click="footer('explore', 'Explore')"
        />

        <q-tab name="user" @click="sendToUserPage('user')">
          <q-img
            height="26px"
            width="26px"
            :src="userPicture"
            @click="sendToUserPage('user')"
            class="cursor-pointer"
            style="border-radius: 100%; border: solid 1px lightgray"
          />
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      tab: "home",
      userPicture: "",
    };
  },
  methods: {
    footer(footerName, routeName) {
      this.$router.push({ name: routeName });
    },
    logOff() {
      firebaseAuth.signOut().then(() => {
        this.$router.push({ name: "Auth" }).then(() => {
          Notify.create({
            message: "You have logged off",
            color: "light-blue-5",
          });
        });
      });
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
  mounted() {
    setTimeout(() => {
      this.userPicture = firebaseAuth.currentUser.photoURL;
    }, 1000);
  },
};
</script>
<style lang="scss">
.baseLayout {
}
//iPhone
@media (max-width: 480px) {
  .buttonFooter {
    display: none;
  }
  .baseFooter {
    display: flex;
  }
  .profileUpperButton {
    position: absolute;
    top: 9284309238rem;
  }
  .notShowDesktop {
  }
}

//Tablet
@media (min-width: 480px) {
  .baseFooter {
    display: none;
  }
  .profileUpperButton {
  }

  .notShowDesktop {
  }
}

//Desktop
@media (min-width: 768px) {
  .baseFooter {
    display: none;
  }
  .profileUpperButton {
  }
  .notShowDesktop {
    position: absolute;
    right: 10000rem;
  }
}
</style>
