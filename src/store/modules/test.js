export const testTypesMutation = {
  changeFirst: '[test] changeFirst',
  changeSecond: '[test] changeSecond',
  changeThird: '[test] changeThird',
  getSum: '[test] getSum',
};

const state = {
  first: 0,
  second: 0,
  third: 0,
  sum: 0,
};

const mutations = {
  [testTypesMutation.changeFirst](state) {
    state.first++;
  },

  [testTypesMutation.changeSecond](state, payload) {
    state.second = payload;
  },

  [testTypesMutation.changeThird](state) {
    state.third = state.first + state.second;
  },

  [testTypesMutation.getSum](state) {
    let elems = Object.values(state);
    state.sum = elems.reduce((a, b) => a + b);
  },
};

const actions = {
  getSumOfElements(context) {
    console.log(context)
    context.commit(testTypesMutation.getSum);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(context.state.sum);
      }, 3000);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
