<template>
  <router-view class="baseAll bg-grey-2" />
</template>
<script>
import { firebaseAuth } from "./boot/firebase";

export default {
  name: "App",
  mounted() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
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
