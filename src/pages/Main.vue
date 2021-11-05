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
    <section class="row mobileVersion full-width">
      <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders">
        <!-- Header Actual User -->
        <q-header elevated>
          <q-banner
            inline-actions
            rounded
            class="
              bg-white
              text-black
              q-py-none q-pl-none q-pr-md
              no-border-radius
            "
          >
            <q-item class="q-my-none">
              <q-item-section avatar>
                <q-img
                  v-if="activeFloor"
                  :ratio="1"
                  width="42px"
                  height="42px"
                  :src="currentUserInfoData.userInformation.img"
                  style="border-radius: 100%; border: solid 1px black"
                />
              </q-item-section>
            </q-item>
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
                color="black"
                dense
                flat
                round
                @click="settingsDialog = !settingsDialog"
                icon="settings"
              />
              <q-btn
                color="red-8"
                dense
                flat
                round
                @click="logOut"
                icon="logout"
              />
            </template>
          </q-banner>
        </q-header>
        <!-- Footer -->
        <q-footer elevated>
          <!-- Tabs -->
          <q-tabs
            v-model="tab"
            dense
            inline-label
            switch-indicator
            class="text-black full-width bg-white"
            active-color="black"
            indicator-color="black"
            align="justify"
          >
            <q-tab name="contacts" label="Contacts" no-caps />
            <q-tab name="chats" label="Chats" no-caps />
          </q-tabs>
        </q-footer>

        <q-page-container>
          <q-page class="q-pa-none bg-grey-2" v-if="activeFloor"
            ><q-tab-panels
              v-model="tab"
              animated
              class="bg-grey-2"
              style="max-height: 100%; min-height: 100%; overflow: overlay"
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
          </q-page>
        </q-page-container>
      </q-layout>
    </section>
    <!-- Dialogs -->
    <SettingsDialog v-model="settingsDialog" v-on:modalChange="actionModal" />
    <UsernameDialog v-model="username" />
    <FullnameDialog v-model="fullname" />
    <WebsiteDialog v-model="website" />
    <BioDialog v-model="bio" />
    <Picture v-model="picture" />
  </q-page>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { mapActions, mapGetters, mapState } from "vuex";
import { Loading, uid } from "quasar";
import SettingsDialog from "components/ModalsSettings/SettingsDialog.vue";
import UsernameDialog from "components/ModalsSettings/Username.vue";
import FullnameDialog from "components/ModalsSettings/Fullname.vue";
import WebsiteDialog from "components/ModalsSettings/Website.vue";
import BioDialog from "components/ModalsSettings/Bio.vue";
import Picture from "components/ModalsSettings/Picture.vue";
export default {
  data() {
    return {
      tab: "contacts",
      activeFloor: false,
      text: "",
      settingsDialog: false,
      username: false,
      fullname: false,
      website: false,
      bio: false,
      picture: false,
      loading: true,
      myInfo: {},
    };
  },
  components: {
    SettingsDialog,
    UsernameDialog,
    FullnameDialog,
    WebsiteDialog,
    BioDialog,
    Picture,
  },
  mounted() {
    setTimeout(() => {
      this.activeFloor = true;
    }, 2000);
  },
  methods: {
    actionModal(option) {
      if (option === "username") this.username = !this.username;
      else if (option === "fullname") this.fullname = !this.fullname;
      else if (option === "website") this.website = !this.website;
      else if (option === "bio") this.bio = !this.bio;
      else if (option === "picture") this.picture = !this.picture;
      this.settingsDialog = false;
    },
    ...mapActions("settingsUser", ["changeUserChat"]),
    logOut() {
      firebaseAuth.signOut().then(() => {
        this.$router.push({ name: "Auth" });
      });
    },
    goToToney() {
      window.location.replace("https://toneygram.netlify.app");
    },
    sendMessage() {
      let messageObject = {
        showDate:
          new Date().getHours() +
          ":" +
          (new Date().getMinutes() < 10 ? "0" : "") +
          new Date().getMinutes(),
        date:
          new Date().getHours() +
          "-" +
          (new Date().getMinutes() < 10 ? "0" : "") +
          new Date().getMinutes() +
          "-" +
          (new Date().getSeconds() < 10 ? "0" : "") +
          new Date().getSeconds() +
          "-" +
          new Date().getDate() +
          "-" +
          new Date().getMonth() +
          "-" +
          new Date().getFullYear() +
          "-" +
          firebaseAuth.currentUser.uid,
        messageRead: false,
        from: firebaseAuth.currentUser.uid,
        messages: {
          [new Date().getTime()]: this.text,
        },
      };
      // Send message to current user database
      let currentUserBaseRef = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid
      );
      currentUserBaseRef.once("value", (base) => {
        let secondUserBaseRef = firebaseDb.ref(
          "toneygram/users/" +
            firebaseAuth.currentUser.uid +
            "/chats/" +
            this.currentUserChat.id +
            "/"
        );
        let baseVar = base.val();
        secondUserBaseRef.once("value", (secondBase) => {
          let secondBaseVar = secondBase.val();
          if (!baseVar.chats) {
            const newRoute = firebaseDb.ref(
              "toneygram/users/" +
                firebaseAuth.currentUser.uid +
                "/chats/" +
                this.currentUserChat.id +
                "/" +
                messageObject.date
            );
            newRoute.set(messageObject);
          } else if (baseVar.chats) {
            let thirdUserBaseRef = firebaseDb.ref(
              "toneygram/users/" + firebaseAuth.currentUser.uid + "/chats/"
            );
            thirdUserBaseRef.once("value", (thirdBase) => {
              let thirdBaseVar = thirdBase.val();
              if (!thirdBaseVar[this.currentUserChat.id]) {
                const newBaseRef = firebaseDb.ref(
                  "toneygram/users/" +
                    firebaseAuth.currentUser.uid +
                    "/chats/" +
                    this.currentUserChat.id +
                    "/" +
                    messageObject.date
                );
                newBaseRef.set(messageObject);
              } else if (thirdBaseVar[this.currentUserChat.id]) {
                if (!secondBaseVar[messageObject.date]) {
                  const newRoute = firebaseDb.ref(
                    "toneygram/users/" +
                      firebaseAuth.currentUser.uid +
                      "/chats/" +
                      this.currentUserChat.id +
                      "/" +
                      messageObject.date
                  );
                  newRoute.set(messageObject);
                } else if (secondBaseVar[messageObject.date]) {
                  const newRoute = firebaseDb.ref(
                    "toneygram/users/" +
                      firebaseAuth.currentUser.uid +
                      "/chats/" +
                      this.currentUserChat.id +
                      "/" +
                      messageObject.date +
                      "/messages/" +
                      new Date().getTime()
                  );
                  newRoute.set(this.text);
                }
              }
            });
          }
        });
      });

      // Send message to other user database
      let otherUserBaseRef = firebaseDb.ref(
        "toneygram/users/" + this.currentUserChat.id
      );
      otherUserBaseRef.once("value", (base) => {
        let secondUserBaseRef = firebaseDb.ref(
          "toneygram/users/" +
            this.currentUserChat.id +
            "/chats/" +
            firebaseAuth.currentUser.uid +
            "/"
        );
        let baseVar = base.val();
        secondUserBaseRef.once("value", (secondBase) => {
          let secondBaseVar = secondBase.val();
          if (!baseVar.chats) {
            const newRoute = firebaseDb.ref(
              "toneygram/users/" +
                this.currentUserChat.id +
                "/chats/" +
                firebaseAuth.currentUser.uid +
                "/" +
                messageObject.date
            );
            newRoute.set(messageObject);
          } else if (baseVar.chats) {
            let thirdUserBaseRef = firebaseDb.ref(
              "toneygram/users/" + this.currentUserChat.id + "/chats/"
            );
            thirdUserBaseRef.once("value", (thirdBase) => {
              let thirdBaseVar = thirdBase.val();
              if (!thirdBaseVar[firebaseAuth.currentUser.uid]) {
                const newBaseRef = firebaseDb.ref(
                  "toneygram/users/" +
                    this.currentUserChat.id +
                    "/chats/" +
                    firebaseAuth.currentUser.uid +
                    "/" +
                    messageObject.date
                );
                newBaseRef.set(messageObject);
              } else if (thirdBaseVar[firebaseAuth.currentUser.uid]) {
                if (!secondBaseVar[messageObject.date]) {
                  const newRoute = firebaseDb.ref(
                    "toneygram/users/" +
                      this.currentUserChat.id +
                      "/chats/" +
                      firebaseAuth.currentUser.uid +
                      "/" +
                      messageObject.date
                  );
                  newRoute.set(messageObject);
                } else if (secondBaseVar[messageObject.date]) {
                  const newRoute = firebaseDb.ref(
                    "toneygram/users/" +
                      this.currentUserChat.id +
                      "/chats/" +
                      firebaseAuth.currentUser.uid +
                      "/" +
                      messageObject.date +
                      "/messages/" +
                      new Date().getTime()
                  );
                  newRoute.set(this.text);
                }
              }
            });
          }
        });
      });
      this.text = "";
    },
    sendUserToChat(conctact) {
      this.$router
        .push({
          name: "Chat",
          params: {
            userId: conctact.id,
          },
        })
        .then(() => {
          this.changeUserChat(conctact);
        });
    },
  },
  computed: {
    ...mapState("settingsUser", ["currentUserInfoData", "currentUserChat"]),
    getContacts() {
      let allContacts = this.currentUserInfoData.following;
      return allContacts;
    },
    getChats() {
      let allChats = this.currentUserInfoData.chats;
      let chats = {};
      for (const user in allChats) {
        const userRef = firebaseDb.ref(
          "toneygram/users/" + user + "/userInformation"
        );
        userRef.on("value", (allDataFromUser) => {
          let alldata = allDataFromUser.val();
          chats[alldata.id] = alldata;
        });
      }

      return chats;
    },
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
