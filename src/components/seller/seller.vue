<template>
    <div class="seller" ref='seller' v-if='seller'>
      <div class="wrap">
        <div class="overview">
          <div class="top">
            <p class='name'>{{seller.name}}</p>
            <v-star :score='seller.score' :size='36'>
              <span class='sellcount'>({{seller.sellCount}})</span>
              <span class='ratingCount'>月售{{seller.ratingCount}}单</span>  
            </v-star>
            <div class="collect">
              <i class='love icon-favorite'></i>
              <span class='txt'>已收藏</span>
            </div>
          </div>
          <div class="bottom">
            <div>
              <p>起送价</p>
              <p>{{seller.minPrice}}<i>元</i></p>
            </div>
            <div>
              <p>商家配送</p>
              <p>{{seller.deliveryPrice}}<i>元</i></p>
            </div>
            <div>
              <p>平均配送时间</p>
              <p>{{seller.deliveryTime}}<i>分钟</i></p>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="notice">
            <p class='title'>公告与活动</p>
            <p class='bulletin'>{{seller.bulletin}}</p>
            <ul class="supports">
              <li v-for='item in seller.supports' :key='item.id'>
                <i :class='classMap[item.type]'></i>
                {{item.description}}
              </li>
            </ul>
        </div>
        <div class="line"></div>
        <div class="scenery">
          <h4 class="title">
            商家实景
          </h4>
          <div class="slider" ref='slider'>
            <ul class="slider-wrapper" ref='sliderWrapper'>
              <li class="slider-item" v-for='pic in seller.pics' :key='pic.id'>
                <img :src="pic" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div class="line"></div>
        <div class="seller-info">
          <div class="title">商家信息</div>
          <ul class="info-list">
            <li v-for='item in seller.infos' :key='item.id'>
              {{item}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import vStar from '../stars/star'
export default {
  name: "seller",
  props:{
    seller:{
      type:Object
    }
  },
  components:{
    vStar
  },
  watch:{
    seller(){
      this.$nextTick(()=>{
        this.initScroll();
        this.initPic();
      })
    }
  },
  created(){
    this.classMap = ['decrease','discount','guarantee','invoice','special'];
    this.$nextTick(()=>{
      this.initScroll();
      this.initPic();
    })
  },
  methods:{
    initScroll(){
      if(!this.$refs.seller) return;
      !this.scroller && (this.scroller = new BScroll(this.$refs.seller,{click:true}));
      this.scroller && this.scroller.refresh();
    },
    initPic(){
      if(!this.$refs.slider) return;
      let $el = this.$refs.sliderWrapper;
      let [w,m,s] = [$el.children[0].offsetWidth,6,$el.children.length];
      $el.style.width = ((w+m)*s - m)/100 + "rem";
      !this.sliderScroll && (this.sliderScroll = new BScroll(this.$refs.slider,{click:true,scrollX:true}));
      this.sliderScroll && this.sliderScroll.refresh();
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

  %tt{
    font-size:.14rem;
    color:rgb(7,17,27);
    line-height: .14rem;
    margin-top:.18rem;
  }
  %pd18{
    padding: 0 .18rem;
  }
  %line{
    height:.16rem;
    width:100%;
    background:#f3f5f7;
    border-top:1px solid rgba(7,17,27,.1);
    border-bottom:1px solid rgba(7,17,27,.1);
  }
  .seller{
    height:100%;
    overflow:hidden;
    .wrap{
      .overview{
        padding:0 .18rem;
        .top{
          position:relative;
          padding:.18rem 0;
          .name{
            @extend %tt;
            margin-top:0;
          }
          .star{
            margin:.08rem 0 .18rem;
            text-align:left;
            .sellcount,.ratingCount{
              font-size: .10rem;
              color:rgb(77,85,93);
              line-height: .18rem;
              vertical-align: top;
            }
            .sellcount{
              margin: 0 .08rem 0 .12rem;
            }
          }
          .collect{
            position: absolute;
            top:.18rem;
            right:0;
            text-align:center;
            .love{
              display:block;
              font-size:.24rem;
              line-height:.24rem;
            }
            &.active .love{
              color:rgb(240,20,20);
            }
            .txt{
              font-size:.10rem;
              color:rgb(77,85,93);
              line-height:.10rem;
            }
          }
        }
        .bottom{
          display: flex;
          flex-flow:row nowrap;
          padding:.18rem 0;
          text-align:center;
          border-top:1px solid rgba(7,17,27,.1);
          div{
            flex:auto;
            border-right:1px solid rgba(7,17,27,.1);
            &:last-child{
              border-right:none;
            }
            p:first-child{
              font-size: .10rem;
              color:rgb(147,153,159);
              line-height: .10rem;
            }
            p:last-child{
              font-size: .24rem;
              color:rgb(7,17,27);
              line-height: .24rem;
              font-weight:200;
              margin-top:.04rem;
            }
          }
        }
      }
      .line{
        @extend %line;
      }
      .notice{
        padding:0 .18rem;
        .title{
          @extend %tt;
        }
        .bulletin{
          margin:.08rem .12rem .16rem;
          font-size: .12rem;
          font-weight: 200;
          color:rgb(240,20,20);
          line-height:.24rem;
        }
        .supports{
          font-size: .12rem;
          font-weight: 200;
          color:rgb(7,17,27);
          line-height: .16rem;
          li{
            padding:.16rem .12rem;
            border-top:1px solid rgba(7,17,27,.1);
            >i{
              display: inline-block;
              width:.12rem;
              height:.12rem;
              vertical-align: top;
              margin-right:.06rem;
              &.decrease{
                @include bg-img('decrease_1');
              }
              &.discount{
                @include bg-img('discount_1');
              }
              &.guarantee{
                @include bg-img('guarantee_1');
              }
              &.invoice{
                @include bg-img('invoice_1');
              }
              &.special{
                @include bg-img('special_1');
              }
            }
          }
        }
      }
      .scenery{
        padding:0 0 .18rem .18rem;
        .title{
          @extend %tt;
        }
        .slider{
          width:100%;
          height: 0.9rem;
          margin-top:.12rem;
          overflow: hidden;
          .slider-wrapper{
            overflow: hidden;
            .slider-item{
              width:1.2rem;
              height:0.9rem;
              float:left;
              margin-right:.06rem;
              &:last-child{
                margin-right:0;
              }
              img{
                width:100%;
                height:100%;
              }
            }
          }
        }
      }
      .seller-info{
        padding:0 .18rem;
        .title{
          @extend %tt;
        }
        .info-list{
          margin-top:.12rem;
          li{
            padding:.16rem .12rem;
            font-size:.12rem;
            font-weight:200;
            line-height:.16rem;
            color:rgb(7,17,27);
            border-top:1px solid rgba(7,17,27,.1);
          }
        }
      }
    }
  }
</style>