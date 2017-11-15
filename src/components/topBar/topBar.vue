<template>
  <div v-if='seller' class='wrapper'>
    <div class="bg-mask">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="header-content">
      <div class="seller-info" >
        <div class="avatar">
          <img :src="seller.avatar" alt="" width='64' height='64'>
        </div>
        <div class="disc">
          <div class="name"><i class='brand'></i>{{seller.name}}</div>
          <div class="delivery">
            {{seller.description}} / {{seller.deliveryTime}}分钟送达
          </div>
          <div class="supports">
            <i class='iconimg decrease'></i>
            {{seller.supports[0].description}}
            <div class="more" @click='headerModalShow'>
              {{seller.supports.length}}个<i class='iconfont icon-arrow-right'></i>
            </div>
          </div>
        </div>
      </div>
      <div class="bulletin"  @click='headerModalShow'>
        <i class='icon-notice'></i>
        <p class='text'>{{seller.bulletin}}</p>
        <i class='iconfont icon-arrow-right'></i>
      </div>
      <div class="tab border-1px">
          <router-link to='/goods' class="tab-item" tag='div'><a>商品</a></router-link>
          <router-link to='/ratings' class="tab-item" tag='div'><a>评价</a></router-link>
          <router-link to='/seller' class="tab-item" tag='div'><a>商家</a></router-link>
      </div>
    </div>
    <transition name='fade'>
      <div class="header-modal" v-show='headerModalToggle'>
        <div class="header-modal-wrapper">
          <div class="seller-detail">
            <h4 class="seller-name">{{seller.name}}</h4>
            <v-star :score='seller.score' :size='48' class='star'></v-star>
            <div class="seller-supports">
              <div class="title">
                <span class="line"></span>
                <span class='text'>优惠信息</span>
                <span class="line"></span>
              </div>
              <ul class="content">
                <li v-for='item in seller.supports' :key='item.id'>
                  <i :class='classMap[item.type]'></i>
                  {{item.description}}
                </li>
              </ul>
            </div>
            <div class="seller-notice">
              <div class="title">
                <span class="line"></span>
                <span class='text'>商家公告</span>
                <span class="line"></span>
              </div>
              <div class="content">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
        </div>
        <div class="header-modal-footer" @click='headerModalHide'>
          <i class='close icon-close'></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import vStar from '../stars/star'
export default {
  name: "header",
  props:{
    seller:{
      type:Object
    }
  },
  data () {
    return {
      headerModalToggle:false,
    };
  },
  components:{
    vStar
  },
  methods:{
    headerModalShow(){
      !this.headerModalToggle && (this.headerModalToggle = true);
    },
    headerModalHide(){
      this.headerModalToggle && (this.headerModalToggle = false);
    }
  },
  created(){
    this.classMap = ['decrease','discount','guarantee','invoice','special'];
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/sass/header.scss';
@import '../../common/icon.css';
  .wrapper{
    .bg-mask{
      position:absolute;
      left: 0;
      right: 0;
      width:100%;
      height:1.34rem;
      z-index: -1;
      filter:blur(10px);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .header-content{
      position: relative;
      color:#fff;
      overflow:hidden;
      &.blur{
        filter:blur(10px);
      }
      .seller-info{
        padding:.24rem .12rem .18rem .24rem;
        background:rgba(0,0,0,.3);
        .avatar{
          float: left;
          font-size: 0;
          margin-right:.16rem;
          border-radius:.02rem;
          overflow:hidden;
          img{
            width: 0.64rem;
            height: 0.64rem;
          }
        }
        .disc{
          .name{
            font-size:.16rem;
            font-weight:700;
            line-height:.18rem;
            vertical-align: top;
            .brand{
              display:inline-block;
              width:.30rem;
              height:.18rem;
              @include bg-img('./brand');
              vertical-align: top;
              margin-top:.02rem;
              margin-right:.06rem;
            }
          }
          .delivery{
            font-size: .12rem;
            font-weight: 200;
            line-height: .12rem;
            margin-top:.08rem;
          }
          .supports{
            position: relative;
            font-size: .10rem;
            font-weight: 200;
            line-height: .12rem;
            margin-top:.10rem;
            vertical-align: top;
            .iconimg{
              display: inline-block;
              width: 0.12rem;
              height: 0.12rem;
              vertical-align:top;
              margin-bottom:.02rem;
              margin-right:.04rem;
              &.decrease{
                @include bg-img('./decrease_1');
              }
              &.discount{
                @include bg-img('./discount_1');
              }
              &.discount{
                @include bg-img('./invoice_1');
              }
              &.discount{
                @include bg-img('./special_1');
              }
            }
            .more{
              position: absolute;
              right: 0.12rem;
              top:0;
              bottom: 0;
              margin: auto;
              display: flex;
              justify-content: center;
              align-items:center;
              height:.24rem;
              padding:0 .08rem;
              font-size: .10rem;
              color:#fff;
              font-weight: 200;
              border-radius:.12rem;
              background:rgba(0,0,0,.2);
              .iconfont{
                margin-left:.02rem;
              }
            }
          }
        }
      }
      .bulletin{
        display: flex;
        flex-flow:row nowrap;
        align-items:center;
        height:.28rem;
        line-height: .28rem;
        padding:0 .12rem;
        font-size: .10rem;
        background:rgba(7,17,27,.4);
        .icon-notice{
          flex-shrink: 0;
          width:.22rem;
          height:.12rem;
          margin-right:.04rem;
          margin-top:-0.01rem;
          @include bg-img('./bulletin');
        }
        .text{
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
        .iconfont{
          flex-shrink: 0;
          margin-left:.04rem;
        }
      }
      .tab{
        display: flex;
        flex-flow:row nowrap;
        align-items:center;
        text-align:center;
        background:#fff;
        @include border-1px(rgba(7,17,27,0.1));
        .tab-item{
          flex:auto;
          height:.4rem;
          line-height:.4rem;
          a{
            font-size:.14rem;
            color:rgb(77,85,93);
            line-height:.14rem;
          }
          &.active{
            a{
              @include color(color,$red);
            }
          }
        }
      }
    }
    .header-modal{
      position: absolute;
      left: 0;
      top:0;
      padding:.64rem .36rem 0 .36rem;
      box-sizing: border-box;
      width:100%;
      height: 100vh;
      background:rgba(7,17,27,0.8);
      color:#fff;
      z-index: 100;
      &.fade-enter-active,&.fade-leave-active{
        transition:.5s;
      }
      &.fade-enter,&.fade-leave-active{
        transform:scale(0,0);
      }
      .header-modal-wrapper{
        min-height: 100%;
        height:auto;
        .seller-detail{
          padding-bottom:.64rem;
          .star{
            margin:.16rem 0 .28rem;
          }
          .seller-name{
            font-size:.16rem;
            font-weight: 700;
            line-height: .16rem;
            text-align:center;
          }
          .seller-supports{
            .title{
              display:flex;
              flex-flow:row nowrap;
              align-items:center;
              .line{
                display: block;
                flex:1 1 auto;
                width:1.12rem;
                height:0;
                @include border-1px(rgba(255,255,255,0.2));
              }
              .text{
                flex:0 0 auto;
                display: block;
                padding:0 .12rem;
                font-size:.14rem;
                font-weight: 700;
                line-height: .14rem;
              }
            }
            .content{
              padding:.24rem .12rem .28rem .12rem;
              font-size: .12rem;
              font-weight: 200;
              color:#fff;
              line-height: .12rem;
              li{
                margin-bottom:.12rem;
                &:last-child{
                  margin-bottom: 0;
                }
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
          .seller-notice{
            .title{
              display:flex;
              flex-flow:row nowrap;
              align-items:center;
              .line{
                display: block;
                flex:1 1 auto;
                width:1.12rem;
                height:0;
                @include border-1px(rgba(255,255,255,0.2));
              }
              .text{
                flex:0 0 auto;
                display: block;
                padding:0 .12rem;
                font-size:.14rem;
                font-weight: 700;
                line-height: .14rem;
              }
            }
            .content{
              padding:.24rem .12rem 0;
              font-size:.12rem;
              font-weight: 200;
              line-height: .24rem;
            }
          }
        }
      }
      .header-modal-footer{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:-0.64rem;
        .close{
          font-size:.32rem;
          color:rgba(255,255,255,0.5);
        }
      }
    }
  }
</style>
