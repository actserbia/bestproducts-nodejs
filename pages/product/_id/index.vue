<template>
  <div class="container">


    <h1>{{article.title}}</h1>
    <h5 v-html="article.additional_fields.intro"></h5>

    <div class="b-teaser" v-for="( element, index) in article.elements">
      <div v-if="index > 1" class='more-than-one'>
        <img v-if="element.type==='image'" v-lazy="element.data.file.url" alt="" class="b-teaser__img">

        <div v-html="element.data.text" v-if="element.type==='text'" class="b-teaser__text" ></div>

        <Teaser :isLazy="true" v-if="element.type==='node'" :article="element.element_item" />
      </div>
      <div v-else class='one'>
        <img v-if="element.type==='image'" :src="element.data.file.url" alt="" class="b-teaser__img">

        <div v-html="element.data.text" v-if="element.type==='text'" class="b-teaser__text" ></div>

        <Teaser :isLazy="false" v-if="element.type==='node'" :article="element.element_item" />
      </div>

    </div>




  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';
import Teaser from '@/components/teaser-inarticle.vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {

});

export default {

  components: {
    Teaser
  },


  head(){
    return {
      title: this.article.additional_fields.meta_title,
      meta: [
        {name: "description", content: this.article.additional_fields.meta_description},
        //{property: "og:image", content: "TO BE CHANGED"},
      ]
    }
  },

  asyncData (context) {

    // SEO NICE URLs (extract ID from tend of string)
    const param  = context.route.params.id + "";
    const regexed = param.match(/([0-9]+)$/g)[0];
    if (!regexed) {
      context.error({statusCode:404});
      return;
    }
    // FETCHING



    let query = 'node?query=' + encodeURIComponent(`{
      nodes(id: ${regexed}) {
        id
        title
        additional_fields {
          ... on TypeReview {
            meta_title
            meta_description
            intro
          }
        }
        tags {
          id
          name
        }
        elements {
          type
          data
          element_item {
            ... on Nodes {
              id
              title
              additional_fields {
                ... on TypeProduct {
                  external_url
                }
              }
              elements {
                type
                data
              }
            }
          }
        }
      }
    }`);

    return axios.request({
      method: 'GET',
      url: process.env.apiServer + query,
    })
    .then(function(response){
      return {article: response.data.data.nodes[0]};
    })
    .catch(function (error) {
      if(error.response.status===404){
        context.error({statusCode:404});
      }
      else {
        context.error({statusCode:500});
      }
    });
  },

  // beforeMounted() {
  //   // window.x = this.article.elements[1].data.text
  //   // console.log(this.article.elements[1].data.text);
  //   Vue.use(VueLazyload, {
  //     lazyComponent: true
  //   });
  // }

}
</script>
