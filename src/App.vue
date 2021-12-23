<template>
  <div>
    <mcv-navbar></mcv-navbar>
    <router-view />
  </div>
</template>

<script>
import McvNavbar from '@/components/Navbar';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'App',
  components: {
    McvNavbar,
  },

  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
