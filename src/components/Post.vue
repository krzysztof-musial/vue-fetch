<template>
    <div class="post">
        <div class="post__button">
            <button @click="deletePost(post.id)">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.0157 5.7705L5.2367 3.9925L7.0147 2.2145C7.3567 1.8735 7.3567 1.3185 7.0147 0.977501C6.6727 0.633501 6.1197 0.634501 5.7777 0.976501L3.9987 2.7545L2.2197 0.974501C1.8777 0.632501 1.3237 0.634501 0.981702 0.974501C0.640702 1.3165 0.640702 1.8715 0.981702 2.2125L2.7617 3.9925L0.985702 5.7675C0.643702 6.1095 0.643702 6.6645 0.985702 7.0045C1.1567 7.1765 1.3797 7.2615 1.6037 7.2615C1.8287 7.2615 2.0517 7.1765 2.2227 7.0055L3.9987 5.2295L5.7787 7.0085C5.9497 7.1795 6.1727 7.2645 6.3967 7.2645C6.6207 7.2645 6.8447 7.1785 7.0157 7.0085C7.3577 6.6665 7.3577 6.1125 7.0157 5.7705" fill="white"/>
                </svg>
            </button>
        </div>
        <div class="post__content">
            <p class="post__content__title">{{ post.title }}</p>
            <p class="post__content__name">by {{ user?.name }}</p>
            <p class="post__content__body">{{ !showFullPostBody ? post.body.substring(0,100) + '...' : post.body }}</p>
            <button class="post__content__button" @click="showFullPostBody = !showFullPostBody">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.99989 3.99995L1 3.99995" stroke="#F43F5E" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.77336 0.786982L8.99999 3.99974L5.77336 7.21303" stroke="#F43F5E" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ !showFullPostBody ? 'Show more' : 'Show less' }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Post",
    props: {
        post: Object,
        index: Number,
        showFullPostBody: false
    },
    computed: {
        user() {
            return this.$store.getters.getUser(this.post.userId);
        }
    },
    methods: {
        deletePost(id) {
            this.$store.commit("deletePost", id)
        }
    }
}
</script>

<style lang="scss">
@import "../scss/";

.post {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 500px) {
        flex-direction: row;
    }
    &__button {
        width: 2.5rem;
        flex-shrink: 0;
        padding: 2px 0 1rem;
        button {
            background: $color-gray-light;
            width: 20px;
            height: 20px;
            border: none;
            cursor: pointer;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .5s;
            &:hover {
                background: $color-accent;
            }
        }
    }
    &__content {
        width: 100%;
        &__title {
            font-family: 'Merriweather', sans-serif;
            font-weight: 900;
            text-transform: capitalize;
            margin-bottom: 2px;
        }
        &__name {
            color: $color-gray-dark;
            font-size: .8rem;
        }
        &__body {
            margin: .5rem 0;
        }
        &__button {
            color: $color-accent;
            font-weight: 600;
            font-size: .8rem;
            background: none;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            svg {
                margin-right: .5rem;
            }
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>