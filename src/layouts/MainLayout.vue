<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-white">
      <q-toolbar
        style="max-width: 970px; margin: auto"
        class="row justify-between"
      >
        <!-- Title -->
        <div class="text-h5 text-black">toneygram</div>
        <!-- Buttons layer -->
        <div class="buttonsLayerBase q-gutter-sm">
          <!-- DM Messages -->
          <q-btn round dense flat color="grey" icon="mail_outline" />
          <!-- Likes Button -->
          <q-btn
            class="buttonFooter"
            round
            dense
            flat
            color="grey"
            icon="favorite_border"
          />
          <!-- Search button -->
          <q-btn-dropdown
            dense
            class="buttonFooter"
            flat
            rounded
            dropdown-icon="search"
            color="grey"
            no-icon-animation
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-input outlined dense v-model="text" label="Search" />
              </div>
            </div>
          </q-btn-dropdown>
          <!-- Profile button -->
          <q-btn-dropdown
            rounded
            class="buttonFooter"
            dense
            flat
            color="grey"
            no-icon-animation
            dropdown-icon="face"
          >
            <q-list>
              <!-- Profile -->
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>
              <!-- Settings -->
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Settings</q-item-label>
                </q-item-section>
              </q-item>
              <!-- Log out -->
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Log out</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white baseFooter">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="cyan-8"
        active-bg-color="cyan-2"
        class="bg-white full-width text-grey-5 shadow-2"
      >
        <q-tab alert="red" name="home" icon="apartment" />
        <q-tab alert="red" name="search" icon="search" />

        <q-tab alert="red" name="likes" icon="favorite_border" />
        <q-tab alert="red" name="user" icon="face" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  data() {
    return {
      tab: "mails",
    };
  },
};
</script>
<style lang="scss">
.buttonsLayerBase {
}
//iPhone
@media (max-width: 480px) {
  .buttonFooter {
    display: none;
  }
  .baseFooter {
    display: flex;
  }
}

//Tablet
@media (min-width: 480px) {
  .baseFooter {
    display: none;
  }
}

//Desktop
@media (min-width: 768px) {
  .baseFooter {
    display: none;
  }
}
</style>
