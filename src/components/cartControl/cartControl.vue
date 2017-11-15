<template>
    <div class="addon">
        <transition name='fade'>
            <div class='count' v-show='!!count'>
                <i class='minus' @click.stop='deleteFood(food)'>-</i>
                <span class='text'>{{count}}</span>
            </div>
        </transition>
        <i class='plus' @click.stop='add($event)'>+</i>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: "addon",
    props:['food'],
    methods:{
        ...mapMutations([
            'addFood',
            'deleteFood',
            'drop'
        ]),
        add(e){
            this.addFood(this.food);
            this.drop(e.target);
        }
    },
    computed:{
        ...mapState(['selectFoodList']),
        count(){
            return new Map(this.selectFoodList).get(this.food);
        }
    }
}
</script>
<style lang="scss" scoped>
    .addon{
        position:relative;
        height: 0.24rem;
        line-height:.24rem;
        float:right;
        text-align:center;
        .count{
            flex:none;
            width:.72rem;
            overflow:hidden;
            &.fade-enter-active,&.fade-leave-active{
                transition:.3s;
                .minus{
                    transition:.3s;
                }
            }
            &.fade-enter,&.fade-leave-active{
                width:.24rem;
                .minus{
                    transform:rotateZ(180deg);
                    opacity:0;
                }
            }
            .minus{
                position:absolute;
                left:0;
                width:.24rem;
                border-radius:50%;
                font-size:.24rem;
                color:rgb(0,160,220);
                background: #fff;
                box-shadow:inset 0 0 0 .03rem rgb(0,160,220);
                transition:.5s;
            }
            .text{
                display: inline-block;
                width:.24rem;
                padding:0 .24rem;
                font-size:.10rem;
                color:rgb(147,153,159);
            }
        }
        .plus{
            position: absolute;
            right:0;
            top:0;
            width:.24rem;
            border-radius:50%;
            font-size:.24rem;
            color:#fff;
            background: rgb(0,160,220);
            float:right;
        }
    }
</style>