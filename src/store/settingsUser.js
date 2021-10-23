import { firebaseAuth } from "src/boot/firebase";

const state = {
    currentUserId: '',
    currentUserPhoto: '',
}

const mutations = {
    setUserId(state, userId){
        state.currentUserId = userId
    },
    setPhoto(state, userPhoto){
        state.currentUserPhoto = userPhoto
    }
}

const actions = {
    getUserId({commit}){
        let userId = firebaseAuth.currentUser.uid
        commit('setUserId', userId)
        let userPhoto = firebaseAuth.currentUser.photoURL
        commit('setPhoto', userPhoto)
    }
}

const getters = {
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}