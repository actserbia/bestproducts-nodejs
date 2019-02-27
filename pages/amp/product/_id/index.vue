<template>
  <div class="container">


    <h1>{{article.title}}</h1>
    <h5 v-html="article.additional_fields.intro"></h5>

    <div class="b-teaser" v-for="( element, index) in article.elements" :key="index">
      <div v-if="index > 1" class='more-than-one'>
        <img v-if="element.type==='image'"
        :data-src="getImgSrc(article)[1]"
         data-sizes="auto"
        :data-srcset="getImgSrc(article)" alt="" class="b-teaser__img lazyload">

        

        <div v-html="element.data.text" v-if="element.type==='text'" class="b-teaser__text" ></div>

        <Teaser :isLazy="true" :index="index" v-if="element.type==='node'" :article="element.element_item" />
      </div>
      <div v-else class='one'>
        <img v-if="element.type==='image'" :srcset="getImgSrc(article)" sizes="(max-width:640px) 640w, (max-width: 1600px) 1600w," alt=""  :src="getImgSrc(article)[1]" class="b-teaser__img">
        

        <div v-html="element.data.text" v-if="element.type==='text'" class="b-teaser__text" ></div>

        <Teaser :index="index" :isLazy="false" v-if="element.type==='node'" :article="element.element_item" />
      </div>

    </div>




  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';
import Teaser from '@/components/teaser-inarticle.vue'
import ThumborUrlBuilder from 'thumbor-url-builder';

const thumbor = new ThumborUrlBuilder('cny/7t+#@qQ.:MPQ', 'https://thumbor.diwanee-serbia.com');


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
  methods: {
    getImgSrc: function (article) {
      let imgElement = article.elements.filter(obj => {
        return obj.type === "image"
      })[0];
      // console.log(document.documentElement.clientHeigh);
      if (!!imgElement) {
        // console.log(this.$data.window.wid);
        // return `<img src="${imgElement.data.file.url}" alt="" class="">`;
        var images = [];
        images[0] = thumbor.setImagePath(imgElement.data.file.url).resize(338, 169).smartCrop(true).buildUrl() + " 640w";
        images[1] = imgElement.data.file.thumbor_url + " 1600w";

        return images

      }
      else {
        return [`https://placehold.it/338x169 640w`, `https://placehold.it/980x490  1600w`]
      }
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
  mounted(){
    window.lazySizesConfig = window.lazySizesConfig || {};
    lazySizesConfig.preloadAfterLoad = true;
    require("lazysizes");
  }

  // beforeMounted() {
  //   // window.x = this.article.elements[1].data.text
  //   // console.log(this.article.elements[1].data.text);
  //   Vue.use(VueLazyload, {
  //     lazyComponent: true
  //   });
  // }

}
</script>
