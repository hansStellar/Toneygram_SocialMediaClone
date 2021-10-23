<template>
  <router-view class="baseAll bg-grey-2" />
</template>
<script>
import { mapActions } from "vuex";
import { firebaseAuth } from "./boot/firebase";

export default {
  name: "App",
  computed: {
    ...mapActions("settingsUser", ["getUserId"]),
  },
  mounted() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserId;
      } else {
        this.$router.push("/auth");
      }
    });
  },
};
</script>
<style lang="scss">
.baseAll {
}
</style>
