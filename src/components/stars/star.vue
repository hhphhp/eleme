<template>
    <div class="star">
        <span v-for='item in starClasses' :key='item.id' :class='[item,starType]'></span>
        <slot></slot>
    </div>
</template>
<script>
const MAX_SCORE = 5;
const  HALF = 'half';
const ON = 'on';
const OFF = 'off';
export default {
  name: "star",
  props:{
      score:{
          type:Number,
          require:true
      },
      size:{
          type:Number,
          require:true
      }
  },
  computed:{
      starType(){
          return 'star' + this.size;
      },
      starClasses(){
          let arr = [];
          let integer = this.score<<0;
          let float = (this.score - integer)*10<<0;
          for(let i=0; i<integer;i++){
            //   arr.splice(i,0,ON);
            arr.push(ON)
          }
          if(float>=5){
            //   arr.splice(integer-1,0,HALF);
            arr.push(HALF)
          }
          for(let i=arr.length; i<MAX_SCORE;i++){
            //   arr.splice(i,0,OFF);
            arr.push(OFF)
          }
          return arr;
      }
  }
}
</script>
<style lang="scss" scoped>
    @mixin bg-img($url) {
        background: url($url + '@2x.png') no-repeat center/cover;
        @at-root & {
            @media (min-device-pixel-ratio: 3) {
                background-image: url($url + '@3x.png') no-repeat center/cover;
            }
        }
    }
    .star{
        text-align:center;
        span{
            display:inline-block;
            &.star24{
                width:.10rem;
                height:.10rem;
                margin-right:.02rem;
                &:last-child{
                    margin-right:0;
                }
                &.on{
                    @include bg-img('star24_on');
                }
                &.off{
                    @include bg-img('star24_off');
                }
                &.half{
                    @include bg-img('star24_half');
                }
            }
            &.star36{
                width:.15rem;
                height:.15rem;
                margin-right:.06rem;
                &:last-child{
                    margin-right:0;
                }
                &.on{
                    @include bg-img('star24_on');
                }
                &.off{
                    @include bg-img('star24_off');
                }
                &.half{
                    @include bg-img('star24_half');
                }
            }
            &.star48{
                width:.20rem;
                height:.20rem;
                margin-right:.22rem;
                &:last-child{
                    margin-right:0;
                }
                &.on{
                    @include bg-img('star24_on');
                }
                &.off{
                    @include bg-img('star24_off');
                }
                &.half{
                    @include bg-img('star24_half');
                }
            }
        }
    }
</style>