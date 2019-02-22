<template>

  <div>

    <a :href='article.additional_fields.external_url' class="b-product">
      <img v-if='isLazy' :data-src="getImgSrc(article)[1]" data-sizes="auto" :data-srcset="getImgSrc(article)" class="b-product__img lazyload" />
      <img v-else :srcset="getImgSrc(article)" sizes="(max-width: 720px) 720px, (max-width: 1600px) 1600px" alt=""  :src="getImgSrc(article)[0]" class="b-product__img" />
      <div class="b-product__content">
        <div class='mark'>{{index}} of 10</div>
        <h3>{{article.title}}</h3>
        <h4>$80.99</h4>
        <span href='/'><div class="b-product__button">Shop Now</div></span>
        <div v-html="article.elements[1].data.text" class="b-product__text"></div>
        <p class="b-product__link">More: <span> 13 shades of gray</span></p>
      </div>
    </a>

  </div>

</template>

<script>
import Vue from 'vue'
import ThumborUrlBuilder from 'thumbor-url-builder';
const thumbor = new ThumborUrlBuilder('cny/7t+#@qQ.:MPQ', 'https://thumbor.diwanee-serbia.com');
export default {

  props: [
    "article",
    "isLazy",
    "index"
  ],
  mounted(){
    window.lazySizesConfig = window.lazySizesConfig || {};
    lazySizesConfig.preloadAfterLoad = true;
    require("lazysizes");
  },
  methods: {
    handler (component) {
        console.log(`${component} is showing`);
    },
    getImgSrc: function(article) {
      let imgElement = article.elements.filter(obj => {
        return obj.type === "image"
      })[0];
      // console.log(document.documentElement.clientHeigh);
      if (!!imgElement) {
        // console.log(this.$data.window.wid);
        // return `<img src="${imgElement.data.file.url}" alt="" class="">`;
        var images = [];
        // images[0] = this.thumborURL.setImagePath(imgElement.data.file.url).resize(640, 640).smartCrop(true).buildUrl() + " 720w";
        images[1] = thumbor.setImagePath(imgElement.data.file.url).resize(480, 480).smartCrop(true).buildUrl() + " 1600w";

        return images

      }
      else {
        return [`https://placehold.it/338x169 720w`, `https://placehold.it/980x490  1600w`]
      }
    }
  }

}

</script>
