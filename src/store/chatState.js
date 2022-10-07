import { firebaseAuth, firebaseDb } from "src/boot/firebase";

const state = {
    chats: []
};

const mutations = {};

const actions = {
  getChatsAction() {
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
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
