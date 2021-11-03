import { firebaseAuth, firebaseDb } from "src/boot/firebase";

const state = {
    currentUserId: '',
    currentUserPhoto: '',
    currentUserInfoData: {},
    footerValue: 'home'
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
    },
    footer(state, value){
        state.footerValue = value
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
    },
    changeFooter({commit}, value){
        const footerRef = firebaseDb.ref('toneygram/users/' + firebaseAuth.currentUser.uid)
        footerRef.once('value', allData => {
            let allDataVar = allData.val()
            if (!allDataVar.footer) {
                footerRef.child('/footer').set(value)
            } else {
                footerRef.child('/footer').set(value)
            }
        })
        commit('footer', value)


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