<template>
    <div class="filters">
        <div class="filters__input">
            <label for="search">Search</label>
            <input id="search" type="text" v-model="search" placeholder="Search...">
        </div>
        <div class="filters__input">
            <label for="author">Author</label>
            <select id="author" v-model="author">
                <option :value="0"></option>
                <option v-for="user in users" :key="user.id" v-bind:value="user.id">{{ user.name }}</option>
            </select>
        </div>
    </div>
    <ul class="posts">
        <li v-for="(post, index) in posts" :key="post.id">
            <Post :post="post" :index="index" />
        </li>
        <li v-if="posts.length === 0" class="nothing">Nothing to find here.</li>
    </ul>
</template>

<script>
import Post from './Post.vue';

export default {
    name: "Posts",
    components: {
        Post,
    },
    data() {
        return {
            search: '',
            author: 0
        }
    },
    computed: {
        posts() {
            let postsFiltered = this.$store.getters.getPosts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()) || post.body.includes(this.search.toLowerCase()))
            if (this.author) {
                postsFiltered = postsFiltered.filter(post => post.userId === this.author)
            }
            this.$store.commit("setNumberOfPosts", postsFiltered.length)
            this.$store.commit("setNumberOfPages")
            const postsPaginated = postsFiltered.slice(this.$store.getters.getFirstPostIndex, this.$store.getters.getLastPostIndex)
            return postsPaginated
        },
        users() {
            return this.$store.getters.getUsers
        }
    },
    watch: {
        // Whenever user filter posts return pagination to the first page.
        filter: function (newFilter, oldFilter) {
            this.$store.commit("setCurrentPage", 1)
        },
        author: function (newAuthor, oldAuthor) {
            this.$store.commit("setCurrentPage", 1)
        }
    }
}
</script>

<style lang="scss">
@import"../scss/";

.filters {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    @media screen and (min-width: 500px) {
        padding-left: 2.5rem;
        flex-direction: row;
    }
    &__input {
        width: 100%;
        margin-bottom: 1rem;
        @media screen and (min-width: 500px) {
            margin-bottom: 0;
            margin-right: 1rem;
        }
        &:nth-last-child(1) {
            margin: 0;
        }
        label {
            font-size: .9rem;
            font-weight: 500;
            color: $color-gray-dark;
        }
        input, select {
            min-height: 2.5rem;
            font-size: 1rem;
            margin-top: .5rem;
            width: 100%;
            height: 2rem;
            border-radius: .5rem;
            padding: .2rem .5rem;
            border: 1px solid $color-gray-light;
        }
    }
}
.posts {
  list-style: none;
  margin-bottom: 2.5rem;
  li {
      margin-bottom: 1.5rem;
  }
}
.nothing {
    padding-left: 2.5rem;
}
</style>