<template>
  <q-page class="q-pa-sm">
    <!-- Search -->
    <div class="searchBase">
      <q-input
        v-model="textSearch"
        label="Search"
        dense
        outlined
        @keyup="searchUser"
        color="black"
        label-color="black"
        class="no-border"
        style="border: solid 1px"
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
      <q-list class="baseSearch" style="overflow: auto">
        <q-item
          class="q-mb-sm itemUser q-px-sm"
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
  </q-page>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
export default {
  data() {
    return {
      textSearch: "",
      usersFound: [],
      usersFoundOther: [],
      timeout: 0,
      loading: false,
    };
  },
  methods: {
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
              const name = User.userInformation.name;
              if (name.includes(self.textSearch.toLowerCase())) {
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
    sendToUserPageSearch(idUser) {
      this.$router.push({
        name: "User",
        params: { userId: idUser },
      });
    },
  },
};
</script>
<style lang="scss"></style>
