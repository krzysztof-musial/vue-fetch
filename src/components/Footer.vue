<template>
    <footer>
        <p>Zadanie rekrutacyjne, <a href="https://github.com/krzysztofpiotrmusial/vue-fetch">GitHub</a>.</p>
    </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss">
@import"../scss/";

footer {
    margin-top: 2.5rem;
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: .8rem;
    color: $color-gray-dark;
}
</style>