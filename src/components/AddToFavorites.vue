<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites';

export default {
  name: 'McvAddToFavorites',

  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },

  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      });

      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic--;
      } else {
        this.favoritesCountOptimistic++;
      }

      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>
