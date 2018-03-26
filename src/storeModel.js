import { composeQuery, byOrder } from './helpers'

export default endpoint => ({
  namespaced: true,

  state: {
    list: [],
    loading: false
  },

  getters: {
    indexed ({ list }) {
      const indexBy = prop => (acc, item) => ({ ...acc, [item[prop]]: item })
      return list.reduce(indexBy('id'), {})
    },
    findBy ({ list }) {
      return (prop, value) => list.find(item => item[prop] === value)
    },
    orderBy ({ list }) {
      return (...rules) => [...list].sort(byOrder(...rules))
    }
  },

  mutations: {
    APPEND_LIST (state, posts) {
      state.list = [
        ...state.list,
        ...posts
      ]
    },
    SET_LOADING (state, loading = true) {
      state.loading = loading
    }
  },

  actions: {
    async fetch ({ commit, getters }, query = {}) {
      commit('SET_LOADING')
      try {
        const queries = Object.entries(query)
        const response = await queries.reduce(composeQuery, this.$wp[endpoint]())
        const { indexed } = getters
        if (Array.isArray(response)) {
          const posts = response.filter(({ id }) => !indexed[id])
          commit('APPEND_LIST', posts)
          commit('SET_LOADING', false)
          return
        }
        if (indexed[response.id]) return
        commit('APPEND_LIST', [ response ])
      } catch (e) {
        console.error(`Error fetching ${endpoint}`)
      }
      commit('SET_LOADING', false)
    }
  }

})
