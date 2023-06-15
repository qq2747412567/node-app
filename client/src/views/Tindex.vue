<template>
    <div class="Tindex">
        <HeadNav> </HeadNav>
        <div class="Tsuggestion">
        <router-view> </router-view>
        </div>
        <TLeftMenu> </TLeftMenu>
    </div>
</template>


<script>
    import HeadNav from "@/components/HeadNav";
    import TLeftMenu from "@/components/TLeftMenu";
    export default {
        name:"Tindex",
        components:{
            HeadNav,
            TLeftMenu
        }
    };
</script>

<style>
    .Tindex{
        width: 100%;
        height: 100%;
        overflow: hidden;}
    .Tsuggestion {
        position: relative;
        top: 0;
        left: 180px;
        width: calc(100% - 180px);
        height: calc(100% - 71px);
        overflow: auto;
    }
</style>