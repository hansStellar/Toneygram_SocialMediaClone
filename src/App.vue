<template>
  <router-view class="baseAll" />
</template>
<script>
import { mapActions } from "vuex";
import { firebaseAuth, firebaseDb } from "./boot/firebase";
import { LocalStorage } from "quasar";
export default {
  name: "App",

  methods: {
    ...mapActions("settingsUser", [
      "sendUserInformation",
      "sendUserInformationForIndex",
    ]),
  },
  mounted() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        LocalStorage.set("loggedIn", true);

        const userInformation = firebaseDb.ref("toneygram/users/" + user.uid);
        userInformation.on("value", (allData) => {
          let allInfoUser = allData.val();
          this.sendUserInformation(allInfoUser);
        });
        const userInformationIndex = firebaseDb.ref(
          "toneygram/users/" + user.uid + "/userInformation"
        );
        userInformationIndex.on("value", (allData) => {
          let allInfoUser = allData.val();
          this.sendUserInformationForIndex(allInfoUser);
        });
      } else {
        LocalStorage.set("loggedIn", false);
        this.$router.push("/auth");
      }
    });
  },
};
</script>
<style lang="scss">
.baseAll {
  font-family: "Raleway";
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #020202;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
