<script setup></script>

<template>
  <main>
    <Header />
    <Posts />
    <Pagination />
    <Footer />
  </main>
</template>

<script>
import Header from './components/Header.vue';
import Posts from './components/Posts.vue';
import Pagination from './components/Pagination.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Posts,
    Pagination,
    Footer
  },
  mounted () {
    this.$store.dispatch("fetchPosts");
    this.$store.dispatch("fetchUsers");
  },
  computed: {
    numberOfPosts() {
        return this.$store.getters.getNumberOfPosts
    },
  }
}
</script>

<style lang="scss">
@import"./scss/";

main {
  width: 100%;
  max-width: 768px;
  margin: auto;
}
</style>
