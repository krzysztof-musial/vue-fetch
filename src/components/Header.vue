<template>
    <header>
        <div class="logo">
            <div class="logo__dot"></div>
            <div class="logo__dot"></div>
            <div class="logo__dot"></div>
        </div>
        <p class="title">Newsfeed</p>
        <p class="subtitle">We have found {{ numberOfPosts }} news for you to read.</p>
    </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    numberOfPosts() {
        return this.$store.getters.getNumberOfPosts
    },
  }
}
</script>

<style lang="scss">
@import"../scss/";

header {
    margin-bottom: 2.5rem;
    padding-left: 0;
    @media screen and (min-width: 500px) {
        padding-left: 2.5rem;
    }
}
.logo {
    display: flex;
    &__dot {
        width: .5rem;
        height: .5rem;
        border-radius: 100%;
        background: $color-accent;
        margin-right: .25rem;
        &:nth-child(1) {
            margin-top: .25rem;
        }
        &:nth-last-child(1) {
            margin-top: .10rem;
        }
    }
}
.title {
    font-family: 'Merriweather', sans-serif;
    font-weight: 900;
    font-size: 2.3rem;
}
.subtitle {
    font-family: 'Poppins', serif;
    font-size: .8rem;
}
</style>