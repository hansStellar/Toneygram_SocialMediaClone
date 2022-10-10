<template>
  <q-page class="flex">
    <!-- Desktop -->
    <container class="row desktopVersion full-width">
      <!-- Control Area -->
      <section class="col-3 bg-white" style="border-right: 1px solid lightgray">
        <!-- Header Actual User -->
        <q-banner inline-actions rounded class="bg-white text-white">
          <q-img
            v-if="activeFloor"
            :ratio="1"
            width="42px"
            height="42px"
            :src="getCurrentUserInfoData.userInformation.img"
            style="border-radius: 100%; border: solid 1px black"
          />

          <template v-slot:action>
            <q-btn
              dense
              flat
              round
              icon="home"
              @click="this.$router.push({ name: 'Home' })"
              color="black"
              no-caps
            />
            <q-btn
              flat
              icon="settings"
              @click="settingsDialog = !settingsDialog"
              color="black"
              round
            />
            <q-btn
              flat
              icon="logout"
              color="red-7"
              round
              class="q-ml-sm"
              @click="logOut"
            />
          </template>
        </q-banner>
        <!-- Search -->
        <q-input
          rounded
          class="q-pa-sm"
          dense
          color="black"
          outlined
          v-model="searchText"
          label="Search"
        />
        <!-- Tabs -->
        <q-tabs
          v-model="tab"
          dense
          inline-label
          class="text-grey"
          active-color="black"
          indicator-color="black"
          align="justify"
        >
          <q-tab name="contacts" label="Contacts" no-caps />
          <q-tab name="chats" label="Chats" no-caps />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
          class="bg-grey-2"
          style="max-height: 80vh; min-height: 80vh; overflow: overlay"
        >
          <!-- Contacts -->
          <q-tab-panel name="contacts" class="no-padding">
            <q-list style="">
              <q-item
                v-for="(contact, index) in getContacts"
                :key="index"
                class="q-my-none"
                clickable
                v-ripple
                @click="sendUserToChat(contact)"
              >
                <q-item-section avatar>
                  <q-img
                    :ratio="1"
                    width="42px"
                    height="42px"
                    :src="contact.img"
                    style="border-radius: 100%; border: solid 1px black"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.name }}</q-item-label>
                  <q-item-label caption lines="1">{{
                    contact.fullname
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <!-- Chats -->
          <q-tab-panel name="chats" class="no-padding">
            <q-list style="">
              <q-item
                v-for="(chat, index) in getChats"
                :key="index"
                class="q-my-none"
                clickable
                v-ripple
                @click="sendUserToChat(chat)"
              >
                <q-item-section avatar>
                  <q-img
                    :ratio="1"
                    width="42px"
                    height="42px"
                    :src="chat.img"
                    style="border-radius: 100%; border: solid 1px black"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ chat.name }}</q-item-label>
                  <q-item-label caption lines="1">{{
                    chat.fullname
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </section>
      <!-- Chat Area -->
      <q-page class="col-9 bg-grey-2 flex-center flex">Toneygram</q-page>
    </container>
    <!-- Mobile & Tablet -->
    <section class="row mobileVersion full-width bg-white q-pt-sm">
      <!-- Base -->
      <q-page class="full-width">
        <!-- Chats -->
        <q-list>
          <q-item
            v-for="(chat, index) in getChatsGetter"
            :key="index"
            class="q-my-none"
            clickable
            v-ripple
            @click="sendUserToChat(chat)"
          >
            <q-item-section avatar>
              <q-img
                v-if="
                  getCurrentUserInfoData.userInformation.name ===
                  chat.transmitter.name
                "
                :ratio="1"
                width="42px"
                height="42px"
                :src="chat.receiver.img"
                style="border-radius: 100%; border: solid 1px black"
              />
              <q-img
                v-if="
                  getCurrentUserInfoData.userInformation.name ===
                  chat.receiver.name
                "
                :ratio="1"
                width="42px"
                height="42px"
                :src="chat.transmitter.img"
                style="border-radius: 100%; border: solid 1px black"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label
                v-if="
                  getCurrentUserInfoData.userInformation.name ===
                  chat.transmitter.name
                "
                >{{ chat.receiver.name }}</q-item-label
              >
              <q-item-label
                v-if="
                  getCurrentUserInfoData.userInformation.name ===
                  chat.receiver.name
                "
                >{{ chat.transmitter.name }}</q-item-label
              >
              <q-item-label caption lines="1">{{
                chat.messagesMissing.lastMessageValue
              }}</q-item-label>
            </q-item-section>

            <q-item-section
              avatar
              v-if="
                chat.messagesMissing.transmitter ===
                getCurrentUserInfoData.userInformation.name
              "
            >
              {{ chat.messagesMissing.quantityOfMessages }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </section>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { Loading, uid } from "quasar";

export default {
  data() {
    return {
      myInfo: {},
    };
  },
  methods: {
    ...mapActions("settingsUser", ["changeUserChat"]),
    ...mapActions("chatState", ["sendUserToChat"]),
  },
  computed: {
    ...mapGetters("settingsUser", ["getCurrentUserInfoData"]),
    ...mapGetters("chatState", ["getChatsGetter"]),
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .desktopVersion {
    display: none;
  }
  .mobileVersion {
    display: flex;
  }
}
//Tablet
@media (min-width: 480px) {
  .desktopVersion {
    display: none;
  }
  .mobileVersion {
    display: flex;
  }
}
//Desktop
@media (min-width: 768px) {
  .desktopVersion {
    display: flex;
  }
  .mobileVersion {
    display: none;
  }
}
</style>
