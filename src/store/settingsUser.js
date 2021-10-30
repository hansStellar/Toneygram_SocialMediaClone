import { firebaseAuth } from "src/boot/firebase";

const state = {
    currentUserId: '',
    currentUserPhoto: '',
    currentUserInfoData: {}
}

const mutations = {
    setUserId(state, userId){
        state.currentUserId = userId
    },
    setPhoto(state, userPhoto){
        state.currentUserPhoto = userPhoto
    },
    getDataUserInfo(state, data){
        state.currentUserInfoData = data
    }
}

const actions = {
    getUserId({commit}){
        let userId = firebaseAuth.currentUser.uid
        commit('setUserId', userId)
        let userPhoto = firebaseAuth.currentUser.photoURL
        commit('setPhoto', userPhoto)
    },
    sendUserInformation({commit}, data){
        commit('getDataUserInfo', data)
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