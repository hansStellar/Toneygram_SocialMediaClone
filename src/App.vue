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
      "setUserOnPageReadySettingsActions",
    ]),
    ...mapActions("actionsOnWeb", [
      "showPostsAction",
      "getPostsFromExploreAction",
    ]),
  },
  computed: {},
  mounted() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          LocalStorage.set("loggedIn", true);

          // All User Data
          const userInformation = await firebaseDb
            .ref("toneygram/users/" + user.uid)
            .once("value", async (allData) => {
              let allInfoUser = allData.val();
              this.sendUserInformation(allInfoUser);
            });

          // User Index
          const userInformationIndex = await firebaseDb
            .ref("toneygram/users/" + user.uid + "/userInformation")
            .once("value", (allData) => {
              let allInfoUser = allData.val();
              this.sendUserInformationForIndex(allInfoUser);
            });

          // Action get posts
          await this.showPostsAction(user.uid);

          // Get Posts from explore
          await this.getPostsFromExploreAction();
          await this.setUserOnPageReadySettingsActions();
        } catch (error) {}
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
</style>
