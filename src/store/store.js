import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    selectFoodList: [],
    carShowFlag: false,
    target: null,
}
const mutations = {
    // 添加商品
    addFood(state, param) {
        let map = new Map(state.selectFoodList);
        let count = map.get(param);
        !!count ? map.set(param, ++count) : map.set(param, 1);
        state.selectFoodList = [...map];
    },
    //删除商品
    deleteFood(state, param) {
        let map = new Map(state.selectFoodList);
        let count = map.get(param) - 1;
        if (count > 0) {
            map.set(param, count);
        } else {
            map.delete(param);
        }
        state.selectFoodList = [...map];

        //购物车为空时，设置购物车为影藏状态，防止下次添加时购物车直接显示；
        !state.selectFoodList.length && (state.carShowFlag = false);
    },
    //清空购物车
    clearCartGoodsList(state) {
        state.selectFoodList = [];
    },
    cartSlideToggle(state) {
        if (state.selectFoodList.length === 0) return;
        state.carShowFlag = !state.carShowFlag;
    },
    getTarget(state, target) {
        state.target = target;
    },
    drop(state, eventTarget) {
        const a = 0.005; //抛物线运动曲率
        const w = 24; //小球的大小
        const duration = 500; //动画持续时间
        //目标元素的坐标
        const t = state.target.getBoundingClientRect();
        const endX = (t.left + (t.width - w) / 2);
        const endY = (t.top + (t.height - w) / 2);
        //y = a*x*x + b*x +c (c=0) //抛物线方程
        const start = new Date();
        const [startX, startY] = getPOS(eventTarget);

        const b = ((endY - startY) - a * Math.pow(startX - endX, 2)) / (startX - endX);
        const ball = createBall(startX, startY);
        let [x, y] = [0, 0];
        move();

        function getPOS(obj) {
            const rect = obj.getBoundingClientRect();
            return [rect.left, rect.top];
        }
        //创建运动小球
        function createBall(x, y) {
            const ball = document.createElement('div');
            ball.style.cssText = `position:fixed;left:${x};top:${y};width:${w}px;height:${w}px;
                                border-radius:50%;background:red;z-index:999`
            document.body.appendChild(ball);
            return ball;
        }
        //移动小球
        function move() {
            const now = new Date();
            ball.style.left = startX - x + 'px';
            ball.style.top = startY + y + 'px';
            update(now);
            ball.timerId = requestAnimationFrame(move);
            if (now - start > duration) {
                cancelAnimationFrame(ball.timerId);
                document.body.removeChild(ball);
            }
        }
        //更新位置
        function update(now) {
            x = Math.abs(startX - endX) * (now - start) / duration << 0;
            y = a * Math.pow(x, 2) + b * x << 0;
        }
    }
}
const getters = {
        //计算购物车中每个商品的购买数量
        everyFoodCount(state) {
            return [...new Map(state.selectFoodList).values()];
        },
        //计算购物车中每个商品的消费金额
        everyFoodCost(state) {
            return state.selectFoodList.map(item => {
                return item[0].price * item[1];
            })
        },
        //计算购物车中所有商品的总数量
        totalCount(state) {
            return [...new Map(state.selectFoodList).values()].reduce((p, n) => p + n, 0);
        },
        //计算购物车中所有商品的总消费金额
        totalCost(state) {
            const sum = state.selectFoodList.reduce((p, n) => {
                return p + n[0].price * n[1];
            }, 0)
            return sum;
        },
        isEmpty(state) {
            if (state.selectFoodList.length > 0) {
                return true;
            } else {
                state.carShowFlag = false;
                return false;
            }
        },
        stateOpt(state) {

            console.log(b)
            return {
                endX,
                endY,
                b
            }
        }
    }
    /* eslint-disable no-new */
export default new Vuex.Store({
    state,
    mutations,
    getters
});