<template>
    <ul class="pagination" v-if="numberOfPosts > 0">
        <li v-if="currentPage > 2">
            <button class="pagination__button" @click="setCurrentPage(1)">1</button>
        </li>
        <li v-if="currentPage > 2">...</li>
        <li v-if="currentPage > 1">
            <button class="pagination__button" @click="setCurrentPage(currentPage - 1)">{{ currentPage - 1 }}</button>
        </li>
        <li>
            <button class="pagination__button active">{{ currentPage }}</button>
        </li>
        <li v-if="currentPage < numberOfPages">
            <button class="pagination__button" @click="setCurrentPage(currentPage + 1)">{{ currentPage + 1 }}</button>
        </li>
        <li v-if="currentPage < numberOfPages - 1">...</li>
        <li v-if="currentPage < numberOfPages - 1">
            <button class="pagination__button" @click="setCurrentPage(numberOfPages)">{{ numberOfPages }}</button>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Pagination",
    computed: {
        numberOfPosts() {
            return this.$store.getters.getNumberOfPosts
        },
        numberOfPages() {
            return this.$store.getters.getNumberOfPages
        },
        currentPage() {
            return this.$store.getters.getCurrentPage
        },
    },
    methods: {
        setCurrentPage(page) {
            if (page > 0 && page <= this.numberOfPages)
                this.$store.commit("setCurrentPage", page)
        }
    }
}
</script>

<style lang="scss">
@import"../scss/";

.pagination {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    li {
        margin-right: .5rem;
        &:nth-last-child(1) {
            margin-right: 0;
        }
    }
    &__button {
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid white;
        border-radius: .4rem;
        background: none;
        cursor: pointer;
        transition: .5s;
        &:hover {
            border: 1px solid $color-gray-light;
        }
        &.active {
            background: $color-accent;
            color: white;
            border: 1px solid $color-accent;
            &:hover {
                border: 1px solid $color-accent;
            }
        }
    }
}
</style>