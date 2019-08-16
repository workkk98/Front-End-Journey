<template>
    <div class="container">
        <div class="title">
            请输入您购买的商品<input type="text" v-model="productName">
            <button v-on:click="increment()">确认</button>
        </div>
        <div class="middle">
            <button v-on:click="sum()">立即下单</button>
            <button>5s后下单</button>
        </div>
        <div class="bottom">最后的价格是<span>{{price}}</span></div>
    </div>
</template>

<script>
export default {
    name:'shopping-grid',
    data() {
        return {
            productName:'',
            price:""
        }
    },
    methods:{
        increment() {
            this.$store.commit('shop/incrementProduct',{productName:this.productName,productPrice:+this.productName.length})
        },
        sum() {
           this.price = this.$store.getters['shop/sumPrice']
        }
    }
}
</script>

<style scoped>
    .container {
        display: grid;
        grid-template-rows: repeat(5,5em);
        grid-template-columns: repeat(7,4em);
    }
    .title {
        grid-column: 2/6;
        grid-row: 1;
    }
    .middle {
        grid-column: 2/6;
        grid-row: 2 ;
    }
    .bottom {
        grid-column: 4/6;
        grid-row: 3 ;
    }
</style>
