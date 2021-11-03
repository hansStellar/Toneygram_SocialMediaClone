<template>
  <q-page class="q-pa-sm">
    <!-- Search -->
    <div class="searchBase">
      <q-input
        outlined
        v-model="textSearch"
        dense
        color="black"
        label-color="black"
        bg-color="grey-2"
        label="Search"
        class=""
      />
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
    };
  },
  methods: {
    sendToUserPageSearch(idUser) {
      this.$router.push({
        name: "User",
        params: { userId: idUser },
      });
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
};
</script>
<style lang="scss"></style>
