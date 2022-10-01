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
            v-model="textSearch"
            label="Search"
            dense
            outlined
            @focus="focusInput"
            @blur="focusOutput"
            @keyup="searchUser"
            color="black"
            label-color="black"
            class="p-2 no-border"
            style="padding: 1rem; border: solid 1px"
          >
            <template v-slot:append v-if="!this.loading">
              <q-icon
                v-if="textSearch !== ''"
                name="close"
                @click="clearSearch"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>

            <template v-slot:append v-else>
              <q-icon
                v-if="textSearch !== ''"
                name="close"
                @click="textSearch = ''"
                class="cursor-pointer"
              />
              <q-spinner-ios color="grey" size="1em" />
            </template>
          </q-input>

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
              @click="
                goToUser({
                  userId: user.userInformation.id,
                  userIdLoggedIn: getCurrentUserIndex.id,
                })
              "
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
          <!-- DM Messages -->
          <q-btn
            round
            dense
            flat
            color="black"
            icon="mail_outline"
            @click="sendUserToDM"
          />
          <!-- Log Out -->
          <q-btn
            color="black"
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
            :src="getCurrentUserIndex.img"
            @click="
              goToUser({
                userId: getCurrentUserIndex.id,
                userIdLoggedIn: getCurrentUserIndex.id,
              })
            "
            class="q-ml-md cursor-pointer profileUpperButton"
            style="border-radius: 100%; border: solid 1px lightgray"
          />

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
            :src="getCurrentUserIndex.img"
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
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      tab: "home",
      userPicture: "",
      showSearch: false,
      textSearch: "",
      usersFound: [],
      usersFoundOther: [],
      timeout: 0,
      loading: false,
    };
  },
  methods: {
    footer(footerName, routeName) {
      this.$router.push({ name: routeName });
    },
    ...mapActions("actionsOnWeb", ["logOff", "goToUser"]),
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
        name: "Main",
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
    searchUser: function () {
      // clear timeout variable
      this.loading = true;
      clearTimeout(this.timeout);
      this.usersFound = [];
      var self = this;
      this.timeout = setTimeout(function () {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        const allUsers = firebaseDb
          .ref("toneygram/users")
          .once("value", async (allUsers) => {
            const users = await allUsers.val();
            Object.values(users).forEach((User) => {
              console.log(User);

              const name = User.userInformation.name;
              if (name.includes(self.textSearch)) {
                return self.usersFound.push(User);
              }
            });
            self.loading = false;
          });
      }, 1000);
    },
    clearSearch: function () {
      clearTimeout(this.timeout);
      self.loading = false;
      this.usersFound = [];
      this.textSearch = "";
    },
  },
  computed: {
    ...mapGetters("settingsUser", ["getCurrentUserIndex"]),
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .buttonFooter {
    display: none;
  }
  .baseFooter {
    display: flex;
  }
  .profileUpperButton {
    display: none;
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
    display: none;
  }
  .notShowDesktop {
  }
  .searchBaseLayout {
    display: none;
  }
}

//Desktop
@media (min-width: 768px) {
  .buttonsLayerBase {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  .baseFooter {
    display: none;
  }
  .profileUpperButton {
    display: flex;
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
    right: -3rem;
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
