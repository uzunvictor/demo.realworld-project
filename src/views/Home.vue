<template>
  <div class="home">
    Home page
    <button @click="firstTestMutation">First</button>
    <button @click="secondTestMutation">Second</button>
    <button @click="thirdTestMutation">Third</button>
    <h1>first: {{ firstTestElement }}</h1>
    <h1>second: {{ secondTestElement }}</h1>
    <h1>third: {{ thirdTestElement }}</h1>
    <br />
    <h3>third: {{ sumOfTestElements }}</h3>
    <button @click="gettingSum">Third</button>
    <h3>The result from action: {{ sumFromAction }}</h3>
  </div>
</template>

<script>
import {testTypesMutation} from '@/store/modules/test';
export default {
  data() {
    return {
      sumFromAction: 0,
    };
  },

  name: 'Home',

  computed: {
    firstTestElement() {
      return this.$store.state.test.first;
    },
    secondTestElement() {
      return this.$store.state.test.second;
    },
    thirdTestElement() {
      return this.$store.state.test.third;
    },
    sumOfTestElements() {
      return this.$store.state.test.sum;
    },
  },

  methods: {
    firstTestMutation() {
      this.$store.commit(testTypesMutation.changeFirst);
    },
    secondTestMutation() {
      this.$store.commit(testTypesMutation.changeSecond, this.firstTestElement);
    },
    thirdTestMutation() {
      this.$store.commit('[test] changeThird');
    },
    gettingSum() {
      this.$store.dispatch('getSumOfElements').then((result) => {
        this.sumFromAction = result;
        setTimeout(() => {
          this.$router.push({name: 'register'});
        }, 2000);
      });
    },
  },
};
</script>
