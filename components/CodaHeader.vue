<template>
    <header>
        <a href="/" title="Master Coda"><img src="~/assets/master-coda.webp" alt="Master Coda"></a>
        <h1><strong>Master Coda</strong><span id="long-text"> - the light side of the code</span></h1>
        <div id="subtitle">Nepravidelný blog o programování</div>
        <div id="menu-bar">
            <div class="menu"><a href="/">JAVA</a></div>
            <div class="menu"><a href="/">WEB</a></div>
            <div class="menu"><a href="/">DEBUGGING</a></div>
            <div class="menu"><a href="/">OSTATNÍ</a></div>
            <div class="menu"><a href="/">HUMOR</a></div>
        </div>
        <div id="menu-collapsed">
            <div class="menu"><a href="/">ARTICLES</a></div>
        </div>
    </header>
</template>

<style scoped>
    header {
        height: 140px;
        border-bottom: 2px var(--color-mark) solid;
        margin-bottom: 0.5rem;
    }

    img {
        width: 120px;
        height: auto;
        float: left;
        margin-right: 1rem;
    }

    #long-text {
        font-weight: 100;
        font-size: 0.9rem;
    }

    h1 {
        margin-left: 5px;
    }

    #subtitle {
        color: var(--color-mark);
        font-family: 'Courier New', monospace;
        padding-bottom: 10px;
    }

    div.menu {
        width: 111px;
        display: inline-block;
        margin-right: 5px;
        margin-top: 5px;
        padding: 3px;
        border: 1px var(--color-mark) solid;
        border-radius: 5px;
        background-color: #c8c8af;
        text-align: center;
    }
    div.menu:hover {
        background-color: var(--color-mark-v2);
        cursor: pointer;
    }

    a:link, a:visited, a:active {
        color: black;
        text-decoration: none;
    }

    @media only screen and (max-width: 865px) {
        #long-text {
            display: none;
        }
        h1 {
            margin-bottom: 10px;
        }
    }

    @media only screen and (max-width: 525px) {
        #menu-bar {
            display: none;
        }
    }
    @media only screen and (min-width: 525px) {
        #menu-collapsed {
            display: none;
        }
    }@media only screen and (max-width: 280px) {
        #menu-collapsed {
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