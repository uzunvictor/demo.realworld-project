<template>
  <div>
    <div v-if="isLoading">
      <feed-loading v-for="index in feedData" :key="index.title" />
      <!-- must realizating logic for loader before getting feed data -->
    </div>
    <mcv-error-message v-if="error" :message="error" />

    <div v-if="feedData">
      <!-- <p>{{feedData}}</p> -->
      <div
        class="article-preview"
        v-for="(article, index) in feedData.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
            ><img :src="article.author.image" /> </router-link
          >&nbsp;
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
              >{{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <mcv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <mcv-pagination
        :total="feedData.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import McvTagList from '@/components/TagList';
import McvErrorMessage from '@/components/ErrorMessage';
import FeedLoading from '@/components/FeedLoading';
import {limit} from '@/helpers/variables';
import {actionTypes, getterTypes} from '@/store/modules/feed';
import {mapGetters} from 'vuex';
import McvPagination from '@/components/Pagination';
import {stringify, parseUrl} from 'query-string';
import McvAddToFavorites from '@/components/AddToFavorites';

export default {
  name: 'McvFeed',
  data() {
    return {
      skeletons: 3,
    };
  },

  components: {
    McvPagination,
    FeedLoading,
    McvErrorMessage,
    McvTagList,
    McvAddToFavorites,
  },

  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      feedData: getterTypes.getFeed,
      isLoading: getterTypes.isLoading,
      error: getterTypes.error,
    }),

    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    limit() {
      return limit;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },

  watch: {
    currentPage() {
      this.fetchFeed();
    },

    apiUrl() {
      this.fetchFeed();
    },
  },

  mounted() {
    this.fetchFeed();
  },

  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    },
  },
};
</script>
