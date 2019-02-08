<template>
  <section class="container">
    <div v-for="article in articles">
      <Teaser :article="article" />
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
    return     axios.get(process.env.apiServer + 'node?query=%7B%0A%20%20nodes(node_type%3A%20"Review")%20%7B%0A%20%20%20%20id%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20additional_fields%20%7B%0A%20%20%20%20%20%20%20%20...%20on%20TypeReview%20%7B%0A%20%20%20%20%20%20%20%20%20%20intro%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20tags%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20elements(type%3A%20"image")%20%7B%0A%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20data%0A%20%20%20%20%20%20%7D%20%20%20%20%0A%20%20%7D%0A%7D%0A')
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
