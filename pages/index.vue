<template>
  <section class="container">
    <div v-for="article in articles">


      <nuxt-link :to="{name: 'product-id', params: {id: article.id}}" :data-art-id='article.id'>

        <Teaser :article="article" />

      </nuxt-link>




    </div>
  </section>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';

import Teaser from '../components/teaser.vue'

export default {


    components: {
      Teaser
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
          console.log(error);
        })
  },
  mounted () {

  }

}

</script>

<style>

</style>
