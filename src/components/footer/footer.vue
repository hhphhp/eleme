<template>
    <footer>
        <div class="lt" :class='{active:isEmpty}'>
            <span class="out" @click='cartSlideToggle' ref='out'>
                <i class='in icon-shopping_cart'></i> 
            </span>
            <span class='mark' v-show='isEmpty'>{{totalCount}}</span>
            <span class='cost'>￥{{totalCost}}</span>
        </div>
        <div class="ct">
            另需配送费￥{{deliveryPrice}}元
        </div>
        <div class="rt" :class='{active:totalCost>=20}'>
            {{showMessage}}
        </div>
    </footer>
</template>
<script>

import {mapState,mapMutations,mapGetters} from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: "footer",
  props:['deliveryPrice','minPrice'],
  computed:{
    ...mapGetters(['totalCount','totalCost','isEmpty']),
    showMessage(){
      if(this.totalCost === 0){
        return '￥'+ this.minPrice +'元起送';
      }else if(this.totalCost < this.minPrice){
        return `还差 ￥${this.minPrice-this.totalCost}元`;
      }else{
        return '去结算';
      }
    }
  },
  methods:{
      ...mapMutations(['cartSlideToggle','getTarget']),
  },
  mounted(){
    this.$nextTick(()=>{
        this.getTarget(this.$refs.out);
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/icon.css';
$fz24:.24rem;
$fz12:.12rem;
%disable{
    background:rgba(255,255,255,.2);
}
%active{
    background:rgb(0,160,220);
}
%mark{
    background:rgb(240,20,20);
}
%circle{
    width: .44rem;
    height: .44rem;
    border-radius:50%;
}
%center{
    display:flex;
    justify-content: center;
    align-items:center;
}
@mixin footer_font($fz:.16rem,$lh:.24rem,$fw:700,$color:rgba(255,255,255,.4)){
    font-size:$fz;
    line-height:$lh;
    font-weight: $fw;
    color:$color;
}
footer{
    position: relative;
    display:flex;
    flex:0 0 .48rem;
    z-index:99;
    background:rgba(20,29,39,1);
    .lt{
        position:relative;
        padding:.12rem 0;
        flex:0 0 1.08rem;
        .out{
            position:absolute;
            left: 0.12rem;
            bottom:.02rem;
            @extend %circle;
            padding:.06rem;
            background:#141d27;
            .in{
                @extend %center;
                @extend %circle;
                @extend %disable;
                @include footer_font($fz24,$fz24);
            }
        }
        .mark{
            position:absolute;
            top:-0.1rem;
            left:.44rem;
            width:.24rem;
            text-align:center;
            border-radius:.08rem;
            @extend %mark;
            @include footer_font(0.09rem,.16rem,700,rgb(255,255,255));
        }
        .cost{
            display:block;
            margin-left:.68rem;
            padding:0 .12rem;
            @include footer_font;
            border-right:1px solid rgba(255,255,255,.1);
        }
        &.active{
            .in{
                @extend %active;
                color:#fff;
            }
            .cost{
                color:#fff;
            }
        }
    }
    .ct{
        flex:auto;
        @include footer_font(.12rem,.12rem,200);
        padding:.18rem .12rem;
    }
    .rt{
        flex:0 0 1.05rem;
        @include footer_font;
        @extend %disable;
        padding:.12rem;
        text-align:center;
        &.active{
            @extend %active;
            color:#fff;
        }
    }
}
</style>