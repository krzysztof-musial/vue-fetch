import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        posts: [],
        users: [],
        pagination: {
            numberOfPosts: undefined,
            postsPerPage: 10,
            numberOfPages: undefined,
            currentPage: 1,
        }
      }
    },
    mutations: {
        addPosts(state, posts) {
            state.posts = posts
        },
        addUsers(state, users) {
            state.users = users
        },
        deletePost(state, id) {
            const postIndex = state.posts.findIndex(post => post.id === id)
            state.posts.splice(postIndex, 1)
        },
        // Pagination
        setNumberOfPosts(state, value) {
            state.pagination.numberOfPosts = value
        },
        setNumberOfPages(state) {
            state.pagination.numberOfPages = Math.ceil(state.pagination.numberOfPosts / state.pagination.postsPerPage)
        },
        setCurrentPage(state, value) {
            state.pagination.currentPage = value
        },
    },
    actions: {
        async fetchPosts(state) {
            const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
            state.commit("addPosts", posts)
        },
        async fetchUsers(state) {
            const users = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
            state.commit("addUsers", users)
        }
    },
    getters: {
        getPosts: (state) => {
            return state.posts
        },
        getUsers: (state) => {
            return state.users
        },
        getUser: (state) => (id) => {
            return state.users.find(user => user.id === id)
        },
        // Pagination
        getNumberOfPosts: (state) => {
            return state.pagination.numberOfPosts
        },
        getPostsPerPage: (state) => {
            return state.pagination.postsPerPage
        },
        getNumberOfPages: (state) => {
            return state.pagination.numberOfPages
        },
        getCurrentPage: (state) => {
            return state.pagination.currentPage
        },
        getFirstPostIndex: (state) => {
            return state.pagination.currentPage * state.pagination.postsPerPage - state.pagination.postsPerPage
        },
        getLastPostIndex: (state, getters) => {
            return getters.getFirstPostIndex + state.pagination.postsPerPage
        },
    }
})

export default store