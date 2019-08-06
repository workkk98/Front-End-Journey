export default {
    format(state) {
        return `count计数:${state.count}`
    },
    //Getter 也可以接受其他 getter 作为第二个参数：
    judge: () => (index) => index?'今天是七夕':'今天是七夕前一天'
}