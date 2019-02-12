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
      <img :src="getImgSrc(article)" alt="" class="b-category__img">
    </div>
  </article>

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
