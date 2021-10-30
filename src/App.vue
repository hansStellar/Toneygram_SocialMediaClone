<template>
  <router-view class="baseAll" />
</template>
<script>
import { mapActions } from "vuex";
import { firebaseAuth, firebaseDb } from "./boot/firebase";

export default {
  name: "App",
  computed: {
    ...mapActions("settingsUser", ["getUserId"]),
  },
  methods: {
    ...mapActions("settingsUser", ["sendUserInformation"]),
  },
  mounted() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserId;
        const userInformation = firebaseDb.ref(
          "toneygram/users/" + user.uid + "/userInformation"
        );
        userInformation.on("value", (allData) => {
          let allInfoUser = allData.val();
          this.sendUserInformation(allInfoUser);
        });
      } else {
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
