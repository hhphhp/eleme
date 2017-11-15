<template>
    <div class="filter">
        <div class="rating-type-filter">
            <span class='all' @click = 'commitFilter({ratingType:0})' :class='{active: ratingType=== 0}'>全部 <i>{{AllRatingsNumber}}</i></span>
            <span class="recommend" @click = 'commitFilter({ratingType:1})' :class='{active: ratingType=== 1}'>推荐<i>{{recommendNumber}}</i></span>
            <span class="blog" @click = 'commitFilter({ratingType:-1})' :class='{active: ratingType=== -1}'>吐槽<i>{{blogNumber}}</i></span>
        </div>
         <div class="rating-text-filter">
            <i class='iconfont icon-check' @click='commitFilter({contentType:!contentType})' :class='{"active":contentType}'></i>
            只看有内容的评价
        </div>
    </div>
   
</template>
<script>
export default {
    name: "filter",
    props:{
        ratings:{
            type:Array,
            default:null
        }
    },
    data () {
        return {
            contentType:false,
            ratingType:0
        };
    },
    computed:{
        AllRatingsNumber(){
            if(!this.ratings) return;
            return this.ratings.length;
        },
        recommendNumber(){
            if(!this.ratings) return;
            return this.ratings.filter((rating)=> rating.rateType > 0).length;
        },
        blogNumber(){
            if(!this.ratings) return;
            return this.ratings.filter((rating)=> rating.rateType < 0).length;
        }
    },
    methods:{
        commitFilter(option){
            Object.assign(this.$data,option);
            this.$emit('filter',this.$data);
        }
    }
}
</script>
<style lang="scss" scoped>
.filter{
    border-bottom:1px solid rgba(7,17,27,.1);
    padding: 0 .18rem;
    .rating-type-filter{
        padding:.12rem 0 .18rem;
        border-bottom:1px solid rgba(7,17,27,.1);
        span{
            display:inline-block;
            padding:.06rem .12rem;
            border-radius:.01rem;
            ~span{
                margin-left:.08rem;
            }
            &.all,&.recommend{
                background:rgba(0,160,220,.2);
                color:rgb(77,85,93);
                &.active{
                    background:rgb(0,160,220);
                    color:#fff;
                }
            }
            &.blog{
                background:rgba(77,85,93,.2);
                &.active{
                    background:rgb(77,85,93);
                    color:#fff;
                }
            }
        }
    }
    .rating-text-filter{
        display:table-cell;
        width:1%;
        vertical-align:middle;
        padding:.12rem 0 .12rem;
        font-size:.12rem;
        color:rgb(147,153,159);
        line-height:.24rem;
        .iconfont{
            font-size:.24rem;
            vertical-align: middle;
            margin-right:.04rem;
        }
        .active{
            color:rgb(0,200,80);
        }
    }
}
</style>