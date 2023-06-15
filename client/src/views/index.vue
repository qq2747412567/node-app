<template>
    <div class="index">
        <HeadNav> </HeadNav>
        <div class="dealaration">
            <router-view> </router-view>
        </div>
        <LeftMenu> </LeftMenu>
    </div>
</template>


<script>
    import HeadNav from "@/components/HeadNav";
    import LeftMenu from "@/components/LeftMenu";
    export default {
        name:"index",
        components:{
            HeadNav,
            LeftMenu
        }
    };
</script>

<style>
    .index{
    width: 100%;
    height: 100%;
    overflow: hidden;}

    .dealaration {
        position: relative;
        top: 0;
        left: 180px;
        width: calc(100% - 180px);
        height: calc(100% - 71px);
        overflow: auto;
    }

</style>