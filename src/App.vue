<template>
  <div>
    <mcv-navbar></mcv-navbar>
    <router-view />
  </div>
</template>

<script>
import McvNavbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    McvNavbar,
  },
};
</script>
