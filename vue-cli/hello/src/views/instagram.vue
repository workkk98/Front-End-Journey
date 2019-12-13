<template>
    <div class="container">
        
        <button @click="incrementAlbum">click</button>
        <Album
            v-for="album in albumList"
            v-bind:key="album.index"
        ></Album>
    </div>
</template>

<script>
import Album from '../components/album'
export default {
    name:'instagram',
    data() {
        return {
            albumList:[
                {
                    index:1
                },
                {
                    index:2
                },
            ]
        }
    },
    components:{
        Album
    },
    methods:{
        incrementAlbum() {
            let index = this.albumList.length;
            this.albumList.push({index:++index});
        }
    },
    beforeRouteEnter(to,from,next) {
        console.log('异步或同步加载组件完成后 beforeRouteEnter')
        next((vm) => {
            console.log("执行回调")
        })
    }
}
</script>

<style scoped>
    div.container {
        margin: 0 auto;
        height: 100vh;
        width: 50vw;
        background-color: rgba(255, 255, 255, 0.7)
    }
</style>