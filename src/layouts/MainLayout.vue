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
          <q-btn round dense flat color="grey" icon="far fa-paper-plane" />
          <!-- Likes Button -->
          <q-btn round dense flat color="grey" icon="far fa-heart" />
          <!-- Search button -->
          <q-btn-dropdown
            dense
            flat
            rounded
            dropdown-icon="fas fa-search"
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
            dense
            flat
            color="grey"
            no-icon-animation
            dropdown-icon="far fa-user"
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
  </q-layout>
</template>
<style lang="scss">
.buttonsLayerBase {
}
//iPhone
@media (max-width: 480px) {
}

//Tablet
@media (min-width: 480px) {
}

//Desktop
@media (min-width: 768px) {
}
</style>
