import { uid } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";

const state = {
  chats: [],
  chat: {},
};

const mutations = {
  getChats(state, chats) {
    state.chats = chats;
  },
  getChat(state, chat) {
    state.chat = chat;
  },
};

const actions = {
  async getChatsAction({ commit }, userName) {
    // Variables
    let chatsArray = [];

    // Ref and get the chats
    let chatsRef = firebaseDb.ref("toneygram/chats");
    chatsRef.once("value", async (allChats) => {
      let chats = allChats.val();
      Object.values(chats).forEach((chat) => {
        if (
          chat.receiver.name === userName ||
          chat.transmitter.name === userName
        ) {
          return chatsArray.push(chat);
        }
      });
      commit("getChats", chatsArray);
    });
  },
  async sendUserToChat({}, chat) {
    if (firebaseAuth.currentUser.displayName === chat.receiver.name) {
      return this.$router.push({
        name: "Chat",
        params: {
          chatId: chat.chatId,
        },
      });
      // .then(() => {
      //   this.changeUserChat(conctact);
      // });
    }

    if (firebaseAuth.currentUser.displayName === chat.transmitter.name) {
      return this.$router.push({
        name: "Chat",
        params: {
          chatId: chat.chatId,
        },
      });
      // .then(() => {
      //   this.changeUserChat(conctact);
      // });
    }
  },
  async getChatAction({ commit }, chat) {
    commit("getChat", chat);
  },
  async sendMessage({ commit }, message) {
    // Variables
    let arrayMessages = [];

    // Ref & Push all messages to the array
    const baseChatRef = firebaseDb.ref(
      "toneygram/chats/" + message.chatBase.chatId
    );
    await baseChatRef.once("value", async (baseChat) => {
      // If has messages
      if (baseChat.val().messages) {
        console.log("se ejectuo el 1");
        const messagesRef = firebaseDb.ref(
          "toneygram/chats/" + message.chatBase.chatId + "/messages"
        );
        await messagesRef.once("value", (allMessagesArray) => {
          Object.values(allMessagesArray.val()).forEach((m) => {
            arrayMessages.push(m);
          });
        });
        arrayMessages.push({
          byUser: message.sentBy,
          checked: false,
          message: message.message,
        });
        messagesRef.set(arrayMessages);
      }
      // If doesnt has messages
      if (!baseChat.val().messages) {
        const messagesRef = firebaseDb.ref(
          "toneygram/chats/" + message.chatBase.chatId + "/messages"
        );
        arrayMessages.push({
          byUser: message.sentBy,
          checked: false,
          message: message.message,
        });
        messagesRef.set(arrayMessages);
      }
    });
  },
};

const getters = {
  getChatsGetter(state) {
    return state.chats;
  },
  getChatGetter(state) {
    return state.chat;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
