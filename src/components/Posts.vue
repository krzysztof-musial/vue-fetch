<template>
    <div class="filters">
        <div class="filters__input">
            <label for="search">Search</label>
            <input id="search" type="text" v-model="filter" placeholder="Search...">
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
            filter: '',
        }
    },
    computed: {
        posts() {
            const postsFiltered = this.$store.getters.getPosts.filter(post => post.title.toLowerCase().includes(this.filter.toLowerCase()) || post.body.includes(this.filter.toLowerCase()))
            this.$store.commit("setNumberOfPosts", postsFiltered.length)
            this.$store.commit("setNumberOfPages")
            const postsPaginated = postsFiltered.slice(this.$store.getters.getFirstPostIndex, this.$store.getters.getLastPostIndex)
            return postsPaginated
        }
    },
    watch: {
        // Whenever user filter posts return pagination to the first page.
        filter: function (newFilter, oldFilter) {
            this.$store.commit("setCurrentPage", 1)
        }
    }
}
</script>

<style lang="scss">
@import"../scss/";

.filters {
    margin-bottom: 2.5rem;
    padding-left: 0;
    @media screen and (min-width: 500px) {
        padding-left: 2.5rem;
    }
    &__input {
        label {
            font-size: .9rem;
            font-weight: 500;
            color: $color-gray-dark;
        }
        input {
            font-size: 1rem;
            margin-top: .5rem;
            width: calc(100% - 1rem);
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