<template>
  <article>
    <!--pre>{{article}}</pre-->
    <div class="b-category">
      <div class="b-category__content">
        <div class='b-category__heading'>
          <div class="b-category__tag">{{article.tags[0].name}}</div>
          <!--div class='date'>Feb 7, 2019</div-->
          <div class='date'>Feb 7,  2019</div>
        </div>
        <h2>{{article.title}}</h2>
        <p>{{article.additional_fields.intro}}</p>
        <p class='author'>Bill Fergus</p>
      </div>

      <img v-if='index > 1' v-lazy="getImgSrc(article)" @show="handler" alt="" class="b-category__img">
      <img v-else :src="getImgSrc(article)" alt="" class="b-category__img">
      <!-- <div class='b-category__img' v-lazy-container="{ selector: 'img' }"  v-html= "getImgSrc(article)"></div> -->
    </div>
  </article>

</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {

});

export default {

  props: [
    "article",
    "index"
  ],
  methods: {
    handler (component) {
        console.log(`${component} is showing`);
    },
    getImgSrc: function (article) {
      let imgElement = article.elements.filter(obj => {
        return obj.type === "image"
      })[0];
      if (!!imgElement) {
        // return `<img src="${imgElement.data.file.url}" alt="" class="">`;
        return imgElement.data.file.url

      }
      else {
        // return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        // 	           viewBox="0 0 980 490" enable-background="new 0 0 980 490" xml:space="preserve">
        //             <rect fill="#D8D8D8" stroke="#fff" stroke-miterlimit="10" width="980" height="490"/>
        //             <text transform="matrix(1 0 0 1 362.5273 266.1328)" fill="#353032" font-family="'MyriadPro-Regular'" font-size="72">980x490</text>
        //             <text transform="matrix(1 0 0 1 835.8613 481.4385)" font-family="'MyriadPro-Regular'" font-size="18">powered by vaske</text>
        //        </svg>
        //     `
        return `https://placehold.it/980x490`
      }
    }
  }

}

</script>
