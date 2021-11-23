<template>
    <header>
        <a href="/" title="Master Coda"><img src="~/assets/master-coda.webp" alt="Master Coda"></a>
        <h1><strong>Master Coda</strong><span id="long-text"> - the light side of the code</span></h1>
    </header>
</template>

<style scoped>
    header {
        height: 140px;
        border-bottom: 2px var(--color-mark) solid;
        margin-bottom: 0.5em;
    }

    img {
        width: 120px;
        height: auto;
        float: left;
        margin-right: 1em;
    }

    #long-text {
        font-weight: 100;
        font-size: 0.9em;
    }

    @media only screen and (max-width: 865px) {
        #long-text {
            display: none;
        }
    }
    
    @media only screen and (max-width: 260px) {
        header {
            height: 50px;
        }
        img {
            display: none;
        }
    }
    @media only screen and (max-width: 214px) {
        header {
            height: 80px;
        }
    }
</style>