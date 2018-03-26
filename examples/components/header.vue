<template>
    <header class="page-header">
        <div class="header-container">
            <router-link :to="{name: 'index'}"><img src="../assets/img/banner.png" width="100"></router-link>
            <div>
                <router-link :to="{name: 'guid'}">组件</router-link>
                <router-link :to="{name: 'article'}">文章</router-link>
            </div>
        </div>
    </header>
</template>

<style lang="less">
.page-header {
    background-color: #fff;
    box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
    opacity: 0.98;
    position: relative !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    transition: all .3s;
    z-index: 100;
    .header-container{
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 80px;
        justify-content: space-between;
    }
}
</style>
