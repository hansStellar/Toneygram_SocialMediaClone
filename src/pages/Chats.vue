<template>
  <q-page class="flex">
    <!-- Desktop -->
    <container class="row desktopVersion full-width">
      <!-- Control Area -->
      <section class="col-3 bg-white" style="border-right: 1px solid lightgray">
        <!-- Header Actual User -->
        <q-banner inline-actions rounded class="bg-white text-white">
          <q-img
            v-if="active"
            :ratio="1"
            width="42px"
            height="42px"
            :src="currentUserInfoData.userInformation.img"
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
              dense
              icon="settings"
              @click="settingsDialog = !settingsDialog"
              color="black"
              round
            />
            <q-btn
              flat
              dense
              icon="logout"
              color="red-7"
              round
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
          class="bg-grey-1"
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
      <section class="col-9">
        <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders">
          <q-header elevated>
            <!-- Header Actual User -->
            <q-banner
              inline-actions
              rounded
              class="bg-white text-black q-py-none q-pl-none q-pr-md no-border-radius"
            >
              <q-item class="q-my-none">
                <q-item-section avatar>
                  <q-img
                    v-if="active"
                    :ratio="1"
                    width="42px"
                    height="42px"
                    :src="currentUserChat.img"
                    style="border-radius: 100%; border: solid 1px black"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label v-if="active">{{
                    currentUserChat.name
                  }}</q-item-label>
                  <q-item-label v-if="active" caption lines="1">{{
                    currentUserChat.fullname
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <template v-slot:action>
                <q-btn-dropdown
                  color="black"
                  no-icon-animation
                  dense
                  flat
                  rounded
                  dropdown-icon="more_vert"
                >
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      @click="removeChat(currentUserChat.id)"
                      class="bg-red-1"
                    >
                      <q-item-section>
                        <q-item-label class="text-red">Erase Chat</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-banner>
          </q-header>

          <q-footer elevated>
            <q-toolbar class="q-px-none">
              <q-banner
                dense
                inline-actions
                class="text-white bg-white full-width"
              >
                <q-input
                  rounded
                  @keyup.enter.prevent="sendMessage"
                  outlined
                  dense
                  color="black"
                  v-model="text"
                  label="Type a message"
                />
                <template v-slot:action>
                  <q-btn
                    flat
                    :color="this.text.length > 0 ? 'black' : 'grey-4'"
                    :disable="this.text.length <= 0"
                    icon="send"
                    round
                    @click.prevent="sendMessage"
                  />
                </template>
              </q-banner>
            </q-toolbar>
          </q-footer>
          <!-- Chat page -->
          <q-page-container>
            <q-page
              class="q-pa-md bg-grey-3"
              v-if="active"
              ref="checkMessagePrivate"
              id="chatPage"
            >
              <q-chat-message
                v-for="(baseMessage, index) in getBaseMessages"
                :key="index"
                :stamp="baseMessage.showDate"
                :sent="
                  baseMessage.from ===
                  this.currentUserInfoData.userInformation.id
                "
                size="2"
                text-color="white"
                :bg-color="
                  baseMessage.from ===
                  this.currentUserInfoData.userInformation.id
                    ? 'positive'
                    : 'green-10'
                "
              >
                <div
                  v-for="(message, index) in baseMessage.messages"
                  :key="index"
                >
                  {{ message }}
                </div>
              </q-chat-message>
            </q-page>
          </q-page-container>
        </q-layout>
      </section>
    </container>
    <!-- Mobile & Tablet -->
    <section class="row mobileVersion full-width">
      <!-- Header -->
      <q-header class="bg-white">
        <q-toolbar class="row justify-between">
          <!-- Go Back -->
          <q-btn
            round
            dense
            flat
            color="black"
            class="buttonGoBack"
            icon="arrow_back_ios_new"
            v-if="this.$route.name !== 'Home'"
            @click="this.$router.go(-1)"
          />

          <!-- Name User -->
          <div v-if="allSet">
            <div
              class="text-h5 text-black cursor-pointer titleMobile"
              v-if="
                getChatGetter.transmitter.name ===
                getCurrentUserInfoData.userInformation.name
              "
            >
              {{ getChatGetter.receiver.name }}
            </div>
            <div
              class="text-h5 text-black cursor-pointer titleMobile"
              v-if="
                this.getChatGetter.receiver.name ===
                getCurrentUserInfoData.userInformation.name
              "
            >
              {{ getChatGetter.transmitter.name }}
            </div>
          </div>

          <!-- Explore -->
          <q-btn
            dense
            round
            flat
            color="black"
            icon="explore"
            @click="footer('explore', 'Explore')"
          />
        </q-toolbar>
      </q-header>

      <!-- Messages -->
      <div v-if="allSet" class="full-width column q-py-md">
        <div
          v-for="(message, idx) in getChatGetter.messages"
          :key="idx"
          class="row q-px-md q-pb-sm"
        >
          <!-- Sender -->
          <div
            :class="
              message.byUser !== getCurrentUserInfoData.userInformation.name
                ? 'justify-start full-width text-left row items-center'
                : 'justify-end full-width text-right row items-center'
            "
          >
            <!-- Right Side / Message -->
            <div class="q-mx-sm bg-blue-5 q-pa-sm rounded-borders">
              {{ message.message }}
            </div>
            <!-- Left Side / Img -->
            <q-img
              :ratio="1"
              width="32px"
              height="32px"
              :src="
                message.byUser === getCurrentUserInfoData.userInformation.name
                  ? getChatGetter.transmitter.img
                  : getChatGetter.receiver.img
              "
              style="border-radius: 100%; border: solid 1px black"
            />
          </div>
        </div>
      </div>

      <!-- Textarea -->
      <q-footer>
        <q-toolbar class="q-px-none">
          <q-banner dense inline-actions class="text-white bg-white full-width">
            <q-input
              dense
              color="black"
              v-model="text"
              label="Type a message"
              autogrow
            />

            <template v-slot:action>
              <q-btn
                flat
                :color="this.text.length > 0 ? 'black' : 'grey-4'"
                :disable="this.text.length <= 0"
                icon="send"
                round
                @click.prevent="
                  sendMessage({
                    message: text,
                    chatBase: getChatGetter,
                    sentBy: getCurrentUserInfoData.userInformation.name,
                  })
                "
              />
            </template>
          </q-banner>
        </q-toolbar>
      </q-footer>
    </section>
  </q-page>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  methods: {},
  data() {
    return {
      allSet: false,
      text: "",
    };
  },
  async mounted() {
    if (Object.values(this.getChatGetter).length === 0) {
      let chatId = this.$route.params.chatId;
      let chat = firebaseDb.ref("toneygram/chats/" + chatId);
      await chat.once("value", (allData) => {
        this.getChatAction(allData.val());
      });
    }
    this.allSet = true;
  },
  methods: {
    removeChat(id) {
      const chatRef = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid + "/chats/" + id
      );
      chatRef.remove().then(() => {
        this.$router.push({ name: "Main", params: "" });
      });
    },
    ...mapActions("chatState", ["getChatAction", "sendMessage"]),
  },
  computed: {
    ...mapGetters("settingsUser", ["getCurrentUserInfoData"]),
    ...mapGetters("chatState", ["getChatsGetter", "getChatGetter"]),
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
