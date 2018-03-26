import StoreModel from './storeModel'

const defaultEndpoints = [
  'posts',
  'pages',
  'types',
  'comments',
  'taxonomies',
  'tags',
  'categories',
  'statuses',
  'users',
  'media',
  'settings'
]

const defaultFetch = [
  'posts',
  'pages',
  'categories',
  'tags',
  'users'
]

export const wpModules = (endpoints) =>
  endpoints.reduce((acc, store) => ({...acc, [store]: StoreModel(store)}), {})

export const wpStore = (endpoints, autoFetch) => ({
  namespaced: true,

  actions: {
    fetchAll({ dispatch }) {
      const fetchList = autoFetch || endpoints || defaultFetch
      const promises = fetchList.map(endpoint => dispatch(`${endpoint}/fetch`))
      return Promise.all(promises)
    }
  },

  modules: {
    ...wpModules(endpoints || defaultEndpoints)
  }
})

export default wpStore()
