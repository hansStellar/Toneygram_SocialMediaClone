<template>
  <router-view class="baseAll" />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { firebaseAuth, firebaseDb } from "./boot/firebase";
import { LocalStorage } from "quasar";
export default {
  name: "App",

  methods: {
    ...mapActions("settingsUser", [
      "sendUserInformation",
      "sendUserInformationForIndex",
      "setUserOnPageReadySettingsActions",
      "setActualFollowingToCurrentUserAction",
    ]),
    ...mapActions("actionsOnWeb", [
      "showPostsAction",
      "getPostsFromExploreAction",
      "getSuggetedsUsersAction",
    ]),
    ...mapActions("chatState", ["getChatsAction"]),
  },
  computed: {
    ...mapGetters("settingsUser", ["getCurrentUserIndex", "getItsNewUser"]),
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          LocalStorage.set("loggedIn", true);

          if (this.getItsNewUser === false) {
            // All User Data

            const userInformation = await firebaseDb
              .ref("toneygram/users/" + user.uid)
              .once("value", async (allData) => {
                let allInfoUser = allData.val();
                this.setActualFollowingToCurrentUserAction(allInfoUser);
                this.sendUserInformation(allInfoUser);
              });

            // User Index
            const userInformationIndex = await firebaseDb
              .ref("toneygram/users/" + user.uid + "/userInformation")
              .once("value", async (allData) => {
                let allInfoUser = allData.val();

                this.sendUserInformationForIndex(allInfoUser);
              });

            // Action get posts
            await this.showPostsAction(user.uid);

            // Get Posts from explore
            await this.getPostsFromExploreAction();

            // Set State
            await this.setUserOnPageReadySettingsActions();

            // Suggested Users
            await this.getSuggetedsUsersAction(user.uid);

            // Chats
            await this.getChatsAction(user.displayName);
          }
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
