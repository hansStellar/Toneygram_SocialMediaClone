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

        <!-- Search -->
        <div class="relative-position searchBaseLayout">
          <q-input
            @focus="focusInput"
            @blur="focusOutput"
            outlined
            v-model="textSearch"
            dense
            color="black"
            label-color="black"
            bg-color="grey-2"
            label="Search"
            class=""
          />
          <q-list
            class="baseSearch shadow-2"
            v-show="showSearch"
            style="overflow: auto"
          >
            <q-item
              class="q-mb-sm itemUser"
              clickable
              v-ripple
              v-for="(user, index) in usersFound"
              :key="index"
              @click="sendToUserPageSearch(user.userInformation.id)"
            >
              <q-item-section avatar>
                <q-img
                  :ratio="1"
                  :src="user.userInformation.img"
                  height="36px"
                  width="36px"
                  style="border-radius: 100%; border: solid 1px black"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-black text-weight-bold">{{
                  user.userInformation.name
                }}</q-item-label>
                <q-item-label caption lines="1">
                  {{ user.userInformation.fullname }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white baseFooter">
      <q-tabs
        v-model="tab"
        align="justify"
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

        <q-tab
          name="search"
          icon="search"
          @click="footer('search', 'Search')"
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
      showSearch: false,
      textSearch: "",
      usersFound: [],
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
    sendToUserPageSearch(idUser) {
      this.$router.push({
        name: "User",
        params: { userId: idUser },
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
    focusInput() {
      this.showSearch = true;
    },
    focusOutput() {
      setTimeout(() => {
        this.showSearch = false;
      }, 100);
    },
  },
  watch: {
    textSearch(val) {
      this.usersFound = [];
      const allUsers = firebaseDb
        .ref("toneygram/users")
        .once("value", (allUsers) => {
          let users = allUsers.val();
          Object.values(users).forEach((User) => {
            let name = User.userInformation.name;
            if (name.includes(val)) {
              this.usersFound.push(User);
              this.usersFound = this.usersFound.filter((user) => {
                return user.userInformation.name === user.userInformation.name;
              });
            }
          });
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
  .searchBaseLayout {
    display: none;
  }
}

//Tablet
@media (min-width: 480px) {
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
  .searchBaseLayout {
    display: none;
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
  .baseSearch {
    width: 20rem;
    max-width: 20rem;
    background: white;
    height: 20rem;
    max-height: 20rem;
    position: absolute;
    bottom: -21rem;
    right: -4rem;
    border-radius: 1rem;
  }
  .itemUser:hover {
    background: rgb(238, 238, 238);
  }
  .searchBaseLayout {
    display: flex;
  }
}
</style>
