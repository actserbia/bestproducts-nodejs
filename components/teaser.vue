<template>
  <article>
    <!--pre>{{article}}</pre-->
    <div class="b-category">
      <div class="b-category__content">
        <div class='b-category__heading'>

          <div v-if="article.tags[0]" class="b-category__tag">{{article.tags[0].name}}</div>
          <div v-else class="b-category__tag empty "></div>
          <div class='date'>Feb 7,  2019</div>
        </div>
        <h2>{{article.title}}</h2>
        <p>{{article.additional_fields.intro}}</p>
        <p class='author'>Bill Fergus</p>
      </div>
      <!-- <img v-if='index > 1' :data-src="getImgSrc(article)[0]" data-sizes="auto" :data-srcset="getImgSrc(article)" @show="handler" alt="" class="b-category__img lazyload" style="border: 3px solid red"> -->
      <!-- <img v-else :srcset="getImgSrc(article)" sizes="(max-width: 720px) 720w, (max-width: 1900px) 1900w," alt=""  :src="getImgSrc(article)[0]" class="b-category__img" style="border: 3px solid green"> -->

      <img v-if='index > 1 && !ampRoute' :data-src="getImgSrc(article)[0]" data-sizes="auto" :data-srcset="getImgSrc(article)" @show="handler" alt="" class="b-category__img lazyload">
      <img v-if='index <= 1 && !ampRoute' :srcset="getImgSrc(article)" sizes="(max-width: 720px) 720w, (max-width: 1900px) 1900w," alt=""  :src="getImgSrc(article)[0]" class="b-category__img">
      
      <amp-img v-if='index > 1 && ampRoute' width="400" height="200" layout="responsive" :data-src="getImgSrc(article)[0]" :src="getImgSrc(article, true)[0]" :data-srcset="getImgSrc(article)" @show="handler" alt="" class="b-category__img lazyload"/>
      <amp-img v-if="index <= 1 && ampRoute" :srcset="getImgSrc(article)" alt="" width="400" height="200" layout="responsive" :src="getImgSrc(article)[0]" class="b-category__img"/>

    </div>
  </article>

</template>

<script>
import Vue from 'vue'
import ThumborUrlBuilder from 'thumbor-url-builder';
const thumbor = new ThumborUrlBuilder('cny/7t+#@qQ.:MPQ', 'https://thumbor.diwanee-serbia.com')

export default {

  props: [
    "article",
    "index"
  ],
  // data(){
  //   return {
  //     thumborURL:new ThumborUrlBuilder('cny/7t+#@qQ.:MPQ', 'https://thumbor.diwanee-serbia.com'),
  //   }
  // },
  mounted(){
    window.lazySizesConfig = window.lazySizesConfig || {};
    lazySizesConfig.preloadAfterLoad = true;
    require("lazysizes");
  },
  computed: {
    ampRoute() {
      return this.$route.path.startsWith('/amp')
    },
  },
  methods: {
    handler (component) {
        console.log(`${component} is showing`);
    },
    getImgSrc: function (article, amp) {
      let imgElement = article.elements.filter(obj => {
        return obj.type === "image"
      })[0];
      var _amp = amp || false;
      // console.log(document.documentElement.clientHeigh);
      if (!!imgElement) {
        // console.log(this.$data.window.wid);
        // return `<img src="${imgElement.data.file.url}" alt="" class="">`;
        var images = [];
        if (_amp){
          // console.log("AMP IS TRUE");
          images[0] = thumbor.setImagePath(imgElement.data.file.url).resize(338, 169).smartCrop(true).buildUrl();
        } else {
          images[0] = thumbor.setImagePath(imgElement.data.file.url).resize(338, 169).smartCrop(true).buildUrl() + " 720w";
          images[1] = thumbor.setImagePath(imgElement.data.file.url).resize(590, 295).smartCrop(true).buildUrl()  + " 1900w";
        }


        return images

      }
      else {
        return [`https://placehold.it/338x169 720w`, `https://placehold.it/980x490  1600w`]
      }
    }
  }

}

</script>
<style lang="scss">
  .b-category__tag.empty {
    border:none;
    padding:0;
    margin:0;
  }
</style>
