<template>
    <transition name='slide'>
        <div class="selected-food" v-show='showFlag' ref='selectedFoodSroll'>
            <div class="selected-food-wrapper" >
                <div class="food-img">
                    <img :src="food.image" :alt="food.name">
                </div>
                <div class="arrow-left" @click='hide'>
                    <i class='icon-arrow_left'></i>
                </div>
                <div class="food-info">
                    <h4 class='food-name'>{{food.name}}</h4>
                    <div class="food-sell-info">
                        <span>月售{{food.sellCount}}份</span>
                        <span class='rating'>好评率{{food.rating}}</span>
                    </div>
                    <div class="food-price">
                        <span class="price"><i class='unit'>￥</i>{{food.price}}</i></span>
                        <span class="old-price" v-show='!!food.oldPrice'><i class='unit'>￥</i>{{food.oldPrice}}</span>
                        <span class="food-handle">
                            <span class='add-to-cart' v-show='!isSelected' @click='addFood(food)'>加入购物车</span>
                            <cart-control v-show='isSelected' :food='food'></cart-control>
                        </span>
                    </div>
                </div>
                <div class="food-desc">
                    <h4 class='title'>商品介绍</h4>
                    <div class="text">
                        {{food.info}}
                    </div>
                </div>
                <div class="food-ratings">
                    <h4 class="title">商品评价</h4>
                    <v-filter :ratings='food.ratings' @filter='ratingFilter'></v-filter>
                    <ul class="rating-list">
                        <li class="rating-list-item"  v-for='(rating,index) in RatingTypeFilter' :key='rating.id'>
                            <div class="tt">
                                <span class='time'>{{rating.rateTime | timeFormat}}</span>
                                <span class='user'>
                                    {{rating.username}}
                                    <img :src="rating.avatar" alt="" class='user-icon'>
                                </span>
                            </div>
                            <div class="rating-text">
                                <i :class='rating.rateType?"icon-thumb_down":"icon-thumb_up"'></i>{{rating.text}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'
import vFilter from '../filter/filter'
import {mapState,mapMutations} from 'vuex'
export default {
    name: "selectedFood",
    props:{
        food:{
            type:Object,
            default:null
        },
        showFlag:false
    },
    data(){
        return {
            contentType:false,
            ratingType:0
        }
    },
    components:{
        cartControl,
        vFilter
    },
    computed:{
        ...mapState(['selectFoodList']),
        RatingTypeFilter(){
            const ratings = this.food.ratings;
            if(!ratings) return
            if(this.contentType){
                if(this.ratingType<0){
                    return ratings.filter((rating)=>!rating.text &&  rating.rateType < 0); 
                }else{
                    return ratings.filter((rating)=>!rating.text &&  rating.rateType > 0); 
                }
            }else{
                if(this.ratingType<0){
                    return ratings.filter((rating)=> rating.rateType < 0); 
                }else if(this.ratingType === 0){
                     return ratings;
                } else{
                    return ratings.filter((rating)=> rating.rateType > 0);
                }
            }
        },
        isSelected(){
            return new Map(this.selectFoodList).has(this.food);
        }
    },
    filters:{
        timeFormat(time){
            let date = new Date()
            date.setTime(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
    },
    updated(){
        this.initScroll();
    },
    methods:{
        ...mapMutations(['addFood']),
        initScroll(){
            if(!this.selectedFoodSroll){
                this.$nextTick(()=>{
                    this.selectedFoodSroll = new BScroll(this.$refs.selectedFoodSroll,{click:true});
                })
            }else{
                this.selectedFoodSroll.refresh();
            }
        },
        hide(){
            this.$emit('hide');
        },
        ratingFilter(option){
            Object.assign(this.$data,option);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/icon.css';
    %font{
        font-size:.14rem;
        font-weight:700;
        color:rgb(7,17,27);
        line-height:.14rem;
    }
    .selected-food{
        position: fixed;
        left: 0;
        top: 0;
        width:100%;
        height:calc(100% - 0.48rem);
        background:#fff;
        transform:translateX(0);
        overflow:hidden;
        &.slide-enter-active,&.slide-leave-active{
            transition:.5s;
        }
        &.slide-enter,&.slide-leave-active{
            transform:translateX(100%);
        }
        .selected-food-wrapper{
            padding-bottom:.48rem;
            .food-img{
                position: relative;
                width:100%;
                overflow:hidden;
                &:after{
                    content:"";
                    display:block;
                    margin-top:100%;
                }
                img{
                    position: absolute;
                    left: 0;
                    top:0;
                    width:100%;
                    height:100%;
                }
            }
            .arrow-left{
                position:absolute;
                left:0;
                top:0;
                padding:.1rem .15rem;
                font-size:.24rem;
                color:#fff;
            }
            .food-info{
                padding:.18rem;
                .food-name{
                    @extend %font;
                }
                .food-sell-info{
                    margin-top:.08rem;
                    font-size:.10rem;
                    color:(147,153,159);
                    line-height:.10rem;
                    .rating{
                        margin-left:.12rem;
                    }
                }
                .food-price{
                    margin-top:.18rem;
                    overflow:hidden;
                    .price{
                        font-size:.14rem;
                        font-weight:700;
                        color:rgb(240,20,20);
                        line-height:.24rem;
                        .unit{
                            font-size:.10rem;
                            font-weight:normal;
                        }
                    }
                    .old-price{
                        font-size:.10rem;
                        font-weight:700;
                        color:(147,153,159);
                        line-height:.24rem;
                        .unit{
                            font-weight:normal;
                        }
                    }
                    .food-handle{
                        float:right;
                        .add-to-cart{
                            display:block;
                            border-radius:.12rem;
                            padding:.06rem .12rem;
                            background:rgb(0,160,220);
                            color:#fff;
                        }
                    }
                }
            }
            .food-desc{
                padding:.18rem;
                .title{
                    @extend %font;
                    padding-bottom:.06rem;
                }
                .text{
                    font-size:.12rem;
                    font-weight:200;
                    color:rgb(77,85,93);
                    line-height:.24rem;
                    margin:0 .08rem;
                }
                &:before{
                    content:'';
                    display: block;
                    width:100%;
                    height: 0.16rem;
                    margin:.18rem 0 .18rem -0.18rem;
                    padding:0 .18rem;
                    background: #f3f5f7;
                    border-top:1px solid rgba(7,17,27,.1);     
                    border-bottom:1px solid rgba(7,17,27,.1);     
                }
            }
            .food-ratings{
                &:before{
                    content:'';
                    display: block;
                    width:100%;
                    height: 0.16rem;
                    margin:.18rem 0 .18rem -0.18rem;
                    padding:0 .18rem;
                    background: #f3f5f7;
                    border-top:1px solid rgba(7,17,27,.1);     
                    border-bottom:1px solid rgba(7,17,27,.1);     
                }
                .title{
                    @extend %font;
                    padding:0 0 .06rem .18rem;
                }
                .rating-list{
                    padding:0 .18rem;
                    .rating-list-item{
                        padding:.16rem 0;
                        .tt{
                            font-size:.10rem;
                            color:rgb(147,153,159);
                            line-height:.12rem;
                            overflow: hidden;
                            .user{
                                float: right;
                                .user-icon{
                                    width:.12rem;
                                    height: 0.12rem;
                                    margin-left:.06rem;
                                    vertical-align: middle;
                                }
                            }
                        }
                        .rating-text{
                            margin-top:.06rem;
                            font-size:.12rem;
                            color:rgb(7,17,27);
                            line-height:.16rem;
                            i{
                                margin-right:.04rem;
                                vertical-align:top;
                                line-height:.24rem;
                                &.icon-thumb_down{
                                    color:rgb(147,153,159);
                                }
                                &.icon-thumb_up{
                                    color:rgb(0,160,220);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>