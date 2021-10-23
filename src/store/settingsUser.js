import { firebaseAuth } from "src/boot/firebase";

const state = {
    currentUserId: ''
}

const mutations = {
    setUserId(state, userId){
        state.currentUserId = userId
    }
}

const actions = {
    getUserId({commit}){
        let userId = firebaseAuth.currentUser.uid
        commit('setUserId', userId)
    }
}

const getters = {
    getUserId: (state) => {
        return state.currentUserId
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}