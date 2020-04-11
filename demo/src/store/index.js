import Vue from 'vue'
import Vuex from 'vuex'

import Search from './modules/Search.js'
import LoginInit from './modules/LoginInit.js'
import PlayDetail from './modules/PlayDetail.js'
import Find from './modules/Find.js'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        root:'我是root的数据'
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        Search,
        LoginInit,
        PlayDetail,
        Find
    }
})
