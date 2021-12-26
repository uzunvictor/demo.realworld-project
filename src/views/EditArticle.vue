<template>
  <div>
    <div v-if="isLoading">Loading the article</div>
    <mcv-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/editArticle';

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
  },

  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.slug,
    });
    // setTimeout(() => {
    //   console.log(this.initialValues);
    // }, 3000);
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErrors,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),

    initialValues() {
      if (!this.article) {
        return null;
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },

    slug() {
      return this.$route.params.slug;
    },
  },

  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.updateArticle, {articleInput, slug: this.slug})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}});
        });
      console.log('onSubmit', articleInput);
    },
  },
};
</script>
