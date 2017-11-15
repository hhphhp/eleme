<template>
  <div class="goods" >
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul class="menu">
        <li v-for='(item,index) in goods' :key='index' :class='{"active":currentIndex===index}' @click='selectMenu(index)'>
          <span class='item'><i :class='classMap[item.type]' v-if='item.type>0'></i></i>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodWrapper'>
        <div class="foods-types-hook">
          <div class="foods-type-item" v-for='(item,index) in goods' :key='index' ref='foodType'>
            <h2 class='foods-type-name'>{{item.name}}</h2>
            <ul>
              <li v-for='(food,index) in item.foods' :key='food.id' class='food-item' @click='showDetail(food)'>
                <div class="food-img">
                  <img :src="food.icon" alt="">
                </div>
                <div class="food-info">
                  <h4 class='food-name'>{{food.name}}</h4>
                  <p class='food-description' v-if='food.description'>{{food.description}}</p>
                  <p class='food-sellCount'>月售{{food.sellCount}}份<span class='food-rating'>好评率{{food.rating}}%</span></p>
                  <p class='food-price'>
                    <i class='unit'>￥</i>
                    {{food.price}} 
                    <span class='oldPrice' v-if='food.oldPrice'>
                      <i class='unit'>￥</i>{{food.oldPrice}}
                    </span>
                    <cart-control :food = 'food'></cart-control>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <selected-food :food='selectedFood' :showFlag = 'showFlag' @hide='hide'></selected-food>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'
import {mapState,mapMutations,mapGetters} from 'vuex'
import selectedFood from '../selectedFood/selectedFood'
export default {
  name: "goods",
  data () {
    return {
      goods:[],
      selectedFood:{},
      showFlag:false,
      listHeight:[],
      scrollY:0
    };
  },
  computed:{
    currentIndex(){
      let arr = this.listHeight;
      for(let i=0,len=arr.length;i<len;i++){
        if(i===len || (arr[i]<=this.scrollY && arr[i+1]>this.scrollY)){
          return i;
        }
      }
      return 0;
    }
  },
  components:{
    cartControl,
    selectedFood
  },
  created(){
    this.classMap = ['decrease','discount','guarantee','invoice','special'];
    this.$axios({
      url:'/api/goods',
      method:'get',
      respenseType:'json'
    }).then(res=>{
      this.goods = res.data.data;
      this.$nextTick(()=>{
        this.scrollInit();
        this.calcListHeight();
      })
    })
  },
  methods:{
    scrollInit(){
      this.mScroll = new BScroll(this.$refs.menuWrapper,{click:true});
      this.fScroll = new BScroll(this.$refs.foodWrapper,{click:true,probeType:3});
      this.fScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(pos.y<<0);
      })
    },
    // 选择左侧菜单
    selectMenu(index){
      this.mScroll.stop();
      const list = this.fScroll.scroller.children;
      this.currentMenu = index;
      this.fScroll.scrollToElement(list[index],300,0,1);
    },
    showDetail(food){
        this.selectedFood = food;
        this.showFlag = true;
    },
    hide(){
      this.showFlag = false;
    },
    calcListHeight(){
      let h = 0;
      this.listHeight.push(h);
      this.$refs.foodType.forEach((item)=>{
        h+=item.offsetHeight;
        this.listHeight.push(h);
      },0);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/sass/header.scss';
  .goods{
    display:flex;
    height:100%;
    box-sizing:border-box;
    .menu-wrapper{
      flex:0 0 .8rem;
      height:inherit;
      background:#f3f5f7;
      overflow:hidden;
      .menu{
        >li{
          display:table;
          width:100%;
          height: 0.54rem;
          font-weight: 200;
          .item{
            display:table-cell;
            vertical-align: middle;
            padding:0 .12rem;
            font-size:.12rem;
            line-height:.14rem;
            font-weight: inherit;
            @include border-1px(rgba(7,17,27,.1),.54rem);
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
          &.active{
            background:#fff;
            font-weight:700;
            .item:after{
              display:none;
            }
          }
        }
      }
    }
    .foods-wrapper{
      flex:1;
      height:100%;
      overflow:hidden;
      .foods-type-item{
        .foods-type-name{
          height:.26rem;
          line-height: .26rem;
          border-left:.01rem solid #d9dde1;
          padding-left:.13rem;
          background:#f3f5f7;
        }
        .food-item{
          padding:.18rem;
          .food-img{
            position: relative;
            width:.57rem;
            margin-right:.10rem;
            float:left;
            overflow:hidden;//需要触发BFC消除margin折叠的问题
            img{
              position:absolute;
              top:0;
              width:100%;
            }
            &:after{
              content:'';
              display: block;
              margin-top:100%;
            }
          }
          .food-info{
            padding-top:.02rem;
            .food-name{
              font-size: .14rem;
              color:rgb(7,17,27);
              line-height:.14rem;
            }
            .food-description{
              margin-top:.08rem;
              line-height:.10rem;
              font-size: .10rem;
              color:rgb(147,153,159);
              overflow: hidden;
              white-space:nowrap;
              text-overflow:ellipsis;
            }
            .food-sellCount{
              @extend .food-description;
              .food-rating{
                margin-left:.12rem;
              }
            }
            .food-price{
              font-size:.14rem;
              color:$red;
              font-weight:700;
              line-height:.24rem;
              .unit{
                @extend .food-price;
                font-size:.10rem;
                font-weight: normal;
                font-style:normal;
              }
              .oldPrice{
                font-size:.10rem;
                color:rgb(147,153,159);
                font-weight:700;
                line-height:.24rem;
                .unit{
                  @extend .oldPrice;
                  
                  font-weight: normal;
                }
              }
            }
          }
          .food-detail{
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            // background:silver;
          }
        }
      }
    }
    .fade-enter-active,.fade-leave-active{
      transition:1s;
    }
    .fade-enter,.fade-leave-active{
      opacity:0;
    }
    
  }
</style>