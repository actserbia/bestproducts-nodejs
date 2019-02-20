<template>
  <section class="container">
    <div v-for="(article, index) in articles">


      <nuxt-link :to="{name: 'product-id', params: {id: article.id}}" :data-art-id='article.id'>
        <Teaser :index="index" :article="article" />
      </nuxt-link>




    </div>
  </section>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';
import Teaser from '@/components/teaser.vue'

export default {


    components: {
      Teaser
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
      // console.log(context.params.category );
      let query = 'tag?query=' + encodeURIComponent(`{
        tags(name: "${context.params.tag}") {
      	id
      	name
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
      }
     }`);
    return     axios.get(process.env.apiServer + query)
        .then(function(response){
          return {articles: response.data.data.tags[0].nodes}
        })
        .catch(function (error) {
          context.error({statusCode:404, error:"not found"});
          return {articles:false};
        })
  },
  mounted () {
    console.log(this.articles);
    // window.x = this.articles;
  }

}

</script>

<style>

</style>
