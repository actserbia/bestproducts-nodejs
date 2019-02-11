<template>

  <div>

    <a :href='article.additional_fields.external_url' class="b-product">
      <img :src='article.elements[0].data.file.url' class="b-product__img" />
      <div class="b-product__content">
        <mark>1 of 10</mark>
        <h3>{{article.title}}</h3>
        <h4>$80.99</h4>
        <span href='/'><div class="b-product__button">Shop Now</div></span>
        <p v-html="article.elements[1].data.text" class="b-product__text"></p>
        <p class="b-product__link">More: <span> 13 shades of gray</span></p>
      </div>
    </a>

  </div>

</template>

<script>


export default {

  props: [
    "article"
  ],

  methods: {
    getImgSrc: function (article) {
      let imgElement = article.elements.filter(obj => {
        return obj.type === "image"
      })[0];
      if (!!imgElement) {
        return(imgElement.data.file.url)
      }
      else {
        return "http://placehold.it/980x490"
      }
    }
  }

}

</script>
