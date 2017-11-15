<template>
    <div class="shopping-cart">
        <transition name='fade'>
            <div class="cart-mask" v-show='carShowFlag && isEmpty' @click='cartSlideToggle'></div>
        </transition>
        <transition name='slide'>
            <div class="wrapper" v-show='carShowFlag && isEmpty'>
                <div class="cart-header">
                    <span class='tt'>购物车</span>
                    <span class='clear' @click='clearCartGoodsList'>清空</span>
                </div>
                <div class="cart-content" ref='cartContent'>
                    <ul class="goods-list">
                        <li v-for='(item,index) in selectFoodList' :key='index' class='goods-list-item'>
                            <span class='food-name'>{{item[0].name}}</span>
                            <cart-control :food='item[0]'></cart-control>
                            <span class='cost'><i class='unit'>￥</i>{{everyFoodCost[index]}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import cartControl from '../cartControl/cartControl'
    import BScroll from 'better-scroll'
    import {mapState,mapGetters,mapMutations} from 'vuex'
    export default{
        name:'shoppingCart',
        components:{
            cartControl
        },
        computed:{
            ...mapState(['selectFoodList','carShowFlag']),
            ...mapGetters(['everyFoodCount','everyFoodCost','totalCount','totalCost','isEmpty']),
        },
        updated(){
            this.$nextTick(()=>{
                if(!this.goodListScroll){
                    this.goodListScroll = new BScroll(this.$refs.cartContent,{click:true})
                }else{
                    this.goodListScroll.refresh();
                }
            });
        },
        methods:{
            ...mapMutations(['cartSlideToggle','clearCartGoodsList'])
        }
    }
</script>
<style lang='scss' scoped>
    .shopping-cart{
        position:absolute;
        left: 0;
        bottom:.48rem;
        width:100%;
        z-index:98;
        .cart-mask{
            position: fixed;
            top:0;
            width:100%;
            height:100%;
            background:rgba(7,17,27,.6);
            z-index:90;
            &.fade-enter-active,&.fade-leave-active{
                transition:.5s;
            }
            &.fade-enter,&.fade-leave-active{
                opacity:0;
            }
        }
        .wrapper{
            position: absolute;
            bottom:0;
            width:100%;
            background:#fff;
            z-index:90;
            .cart-header{
                height: 0.4rem;
                line-height:.4rem;
                padding:0 .18rem;
                background:#f3f5f7;
                border-bottom:.01rem solid rgba(7,17,27,.1);
                font-weight:200;
                overflow:hidden;
                .tt{
                    font-size: .14rem;
                    color:rgb(7,17,27);
                    float:left;
                }
                .clear{
                    font-size: .12rem;
                    color:rgb(0,160,220);
                    float:right;
                }
            }
            .cart-content{
                max-height:2.41rem;
                overflow:hidden;
                .goods-list{
                    padding:0 .18rem;
                    .goods-list-item{
                        height:.24rem;
                        line-height:.24rem;
                        padding:.12rem 0;
                        border-bottom:.01rem solid rgba(7,17,27,.1);
                        overflow:hidden;    
                        .good-name{
                            font-size:.14rem;
                            color:rgb(7,17,27);
                        }
                        .cost{
                            color:rgb(240,20,20);
                            font-size:.14rem;
                            font-weight:700;
                            float:right;
                            margin-right:.12rem;
                            .unit{
                                font-size:.10rem;   
                                font-weight:normal;
                                font-style:normal;
                            }
                        }
                    }
                }
            }
            &.slide-enter-active,&.slide-leave-active{
                transition:.5s;
            }
            &.slide-enter,&.slide-leave-to{
               transform:translateY(100%);
            }
        }
    }
</style>

