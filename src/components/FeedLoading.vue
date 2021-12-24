<script>
import {ContentLoader} from 'vue-content-loader';

export default {
  components: {ContentLoader},
};
</script>

<template>
  <content-loader
    :width="576"
    :height="160"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="10" y="73" rx="3" ry="3" width="280" height="27" />
    <rect x="448" y="7" rx="3" ry="3" width="100" height="19" />
    <rect x="16" y="189" rx="3" ry="3" width="178" height="6" />
    <circle cx="27" cy="33" r="20" />
    <rect x="61" y="35" rx="0" ry="0" width="119" height="13" />
    <rect x="61" y="22" rx="0" ry="0" width="80" height="9" />
    <rect x="10" y="111" rx="0" ry="0" width="373" height="12" />
    <rect x="13" y="143" rx="0" ry="0" width="76" height="14" />
    <rect x="99" y="137" rx="0" ry="0" width="73" height="21" />
  </content-loader>
</template>
ReactReact NativeVueAng
