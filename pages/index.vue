<template>
  <section class="container">
    <div v-for="(article, index) in articles">


      <nuxt-link :to="{name: 'product-id', params: {id: article.id}}" :key="article.id"  :data-art-id='article.id'>
        <lazy-component v-if='index>1' @show="handler">
           <Teaser :article="article" />
        </lazy-component>
        <Teaser v-else :article="article" />
      </nuxt-link>




    </div>
  </section>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';

import Teaser from '@/components/teaser.vue'
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1,
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
});


export default {


    components: {
      Teaser
    },
    methods: {
      handler (component) {
          console.log(`${component}is showing`);
      }
    },
    head(){
      return {
        title: "Best Products",
        meta: [
          {name: "description", content: "best products ever"},
          //{property: "og:image", content: "TO BE CHANGED"},
        ]
      }
    },

    asyncData (context) {
      let _this = this;
      let query = 'node?query=' + encodeURIComponent(`{
        nodes(node_type: "Review") {
          id
          title
          additional_fields {
            ... on TypeReview {
              intro
            }
          }
          tags {
            id
            name
          }
          elements(type: "image") {
            type
            data
          }
        }
      }`);
    return     axios.get(process.env.apiServer + query)
        .then(function(response){
          return {articles: response.data.data.nodes}
        })
        .catch(function (error) {
          context.error({statusCode:500, error:"out of api server"});
          return {articles:false};
        })
  },
  mounted () {
    //console.log(this.articles)

  }

}

</script>

<style>

</style>
