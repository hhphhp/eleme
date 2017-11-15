<template>
    <div class="ratings" ref='ratingScroll'>
      <div class="ratings-content">
        <div class="rating-overview">
          <div class="overview-left">
            <p class="score" >{{seller.score}}</p>
            <p class='title'>综合评分</p>
            <p class='rank-rate'>高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="overview-right">
            <div class="service-score">
              <span class='tt'>服务态度</span>
              <v-star :score='seller.serviceScore' :size='36'></v-star>
              <span class='score'>{{seller.serviceScore}}</span>
            </div>
            <div class="service-score">
              <span class='tt'>食物得分</span>
              <v-star :score='seller.foodScore' :size='36'></v-star>
              <span class='score'>{{seller.foodScore}}</span>
            </div>
            <div class="delivery-time">
              <span class='tt'>送达时间</span>
              <span class='time'>{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="rating-detail">
          <v-filter :ratings='ratings' class='filter' @filter='ratingFilter'></v-filter>
          <ul class="rating-list">
            <li v-for='rating in RatingTypeFilter' :key='rating.id' class='rating-item'>
                <div class="left">
                  <img :src="rating.avatar" alt="">
                </div>
                <div class="right">
                  <div class='info'>
                    <span class='username'>{{rating.username}}</span>
                    <span class='ratetime'>{{rating.rateTime  | timeFormat}}</span>
                  </div>
                  <v-star :score='seller.score' :size='36'>
                    <span class='deliveryTime'>{{seller.deliveryTime}}分钟送达</span>
                  </v-star>
                  <div class="rating-text">{{rating.text}}</div>
                  <div class="recommend">
                    <i :class='rating.rateType?"icon-thumb_down":"icon-thumb_up"'></i>
                    <span v-for='item in rating.recommend' :key='item.id' class='recommend-item'>
                      {{item}}
                    </span>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import vStar from '../stars/star'
import vFilter from '../filter/filter'
export default {
  name: "ratings",
  props:{
    seller:[Object],
  },
  data () {
    return {
      ratings:[Array],
      contentType:false,
      ratingType:0
    };
  },
  computed:{
    RatingTypeFilter(){
        const ratings = this.ratings;
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
    }
  },
  components:{
    vStar,
    vFilter
  },
  created(){
    this.$axios.get('/api/ratings').then(res=>{
      this.ratings = res.data.data;
      this.$nextTick(()=>{
        this.ratingScroll = new BScroll(this.$refs.ratingScroll,{click:true});
      })
    })
  },
  updated(){
    this.ratingScroll && this.ratingScroll.refresh();
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
  methods:{
    ratingFilter(option){
      Object.assign(this.$data,option);
    }
  }
}
</script>
<style lang="scss" scoped>
  %font{
    font-size:.10rem;
    font-weight:200;
    color:rgb(147,153,159);
    line-height:.12rem;
  }
  .ratings{
    height:inherit;
    overflow:hidden;
    .rating-overview{
      display:flex;
      flex-flow:row nowrap;
      padding:.18rem 0;
      .overview-left{
        width:1.375rem;
        text-align:center;
        border-right:1px solid rgba(7,17,27,.1);
        .score{
          font-size:.24rem;
          color:rgb(255,153,0);
          line-height:.28rem;
        }
        .title{
          font-size:.12rem;
          color:rgb(7,17,27);
          line-height:.12rem;
          margin-top:.06rem;
        }
        .rank-rate{
          font-size:.10rem;
          color:rgb(7,17,27);
          line-height:.10rem;
          margin-top:.08rem;
          margin-bottom:.06rem;
        }
      }
      .overview-right{
        width:2.37rem;
        margin:0 .24rem;
        .service-score{
          display: flex;
          flex-flow:row nowrap;
          margin-bottom:.08rem;
          .tt{
            font-size:.12rem;
            color:rgb(7,17,27);
            line-height:.18rem;
            margin-right:.12rem;
          }
          .score{
            font-size:.12rem;
            color:rgb(255,153,0);
            line-height:.18rem;
            margin-left:.12rem;
          }
        }
        .delivery-time{
          @extend .service-score;
          .time{
            font-size:.12rem;
            color:rgb(147,153,159);
            line-height:.18rem;
          }
        }
      }
    }
    .rating-detail{
      &:before{
        content: '';
        display: block;
        width: 100%;
        height: 0.16rem;
        margin: 0 0 .18rem -0.18rem;
        padding: 0 .18rem;
        background: #f3f5f7;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
      .filter{
        margin-top:-0.12rem;
      }
      .rating-list{
        padding:0 .18rem;
        .rating-item{
          padding:.16rem 0;
          .left{
            position:relative;
            width:.28rem;
            height: 0.28rem;
            border-radius:50%;
            overflow:hidden;
            float: left;
            margin-right:.12rem;
            &:after{
              content:'';
              display:block;
              margin-top:100%;
            }
            img{
              position:absolute;
              left:0;
              top:0;
              width:100%;
            }
          }
          .right{
            margin-left:.4rem;
            .info{
              margin-bottom:.04rem;
              overflow:hidden;
              .username{
                float:left;
                @extend %font;
                color:rgb(7,17,27);
              }
              .ratetime{
                float: right;
                @extend %font;
              }
            }
            .star{
              text-align:left;
              margin: 0 .06rem .06rem 0;
            }
            .deliveryTime{
              @extend %font;
            }
            .rating-text{
              font-size:.12rem;
              color:rgb(7,17,27);
              line-height:.18rem;
              margin-bottom:.08rem;
            }
            .recommend{
              display: flex;
              flex-flow:row nowrap;
              i{
                margin-right:.08rem;
                vertical-align:top;
                font-size:.12rem;
                line-height:.16rem;
                &.icon-thumb_down{
                    color:rgb(147,153,159);
                }
                &.icon-thumb_up{
                    color:rgb(0,160,220);
                }
              }
              &-item{
                padding:0 .06rem;
                font-size:.09rem;
                color:rgb(147,153,159);
                line-height:.16rem;
                border-radius:.02rem;
                border:1px solid rgba(7,17,27,.1);
                background: #fff;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                margin-right:.08rem;
                &:last-child{
                  margin-right:0;
                }
              }
            }

          }
        }
      }
    }
  }
</style>