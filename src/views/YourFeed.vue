<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler />
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvBanner from '@/components/Banner';
import McvFeed from '@/components/Feed';
import McvPopularTags from '@/components/PopularTags';
import McvFeedToggler from '@/components/FeedToggler.vue';

export default {
  name: 'McvYourFeed',
  components: {
    McvFeed,
    McvBanner,
    McvPopularTags,
    McvFeedToggler
  },
  data() {
    return {
      apiUrl: '/articles/feed',
    };
  },
};
</script>
