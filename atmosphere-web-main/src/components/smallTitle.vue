<template>
    <div class="smallTitle">
        <span class="myspan">{{ title }}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        props:{
            title:{
                type:String,
                default:()=>{
                    return ''
                }
            }
        }
    }
</script>

<style scoped>
.smallTitle{
    position: relative;
    /* position:absolute; */
    background-color: #7a7676;
    height: 25px;
    border-radius: 3px 3px 0px 0px;
}
.myspan{
    text-align: left;
    margin-left: 10px;
    margin-right: 10px;
    color: white;
    font-weight: bold;
}
</style>