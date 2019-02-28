<template>
  <div>

    <header>
      <div class="container">
        <ul class="nav">
           <li v-if="!ampRoute" class="nav__item"><nuxt-link to="/beauty">Beauty</nuxt-link></li>
           <li v-else class="nav__item"><nuxt-link to="/amp/beauty">Beauty</nuxt-link></li>
           <li v-if="!ampRoute" class="nav__item"><nuxt-link  to="/tech">Tech</nuxt-link></li>
           <li v-else class="nav__item"><nuxt-link  to="/amp/tech">Tech</nuxt-link></li>
        </ul>
        <svg class='search-ico' xmlns="http://www.w3.org/2000/svg" id="search" viewBox="0 0 11.855 11.855">
            <path id="Path_21" d="M11.565 10.164L8.989 7.588c-.014-.014-.03-.023-.044-.036a4.876 4.876 0 1 0-1.393 1.393c.013.014.022.03.036.044l2.575 2.575a.991.991 0 0 0 1.4-1.4zM4.874 8.058a3.184 3.184 0 1 1 3.184-3.184 3.184 3.184 0 0 1-3.184 3.184z" class="cls-1" data-name="Path 21"/>
        </svg>
        <ul class="nav nav--right">
          <li class="nav__item"><a href='#'>category</a></li>
        </ul>
      </div>
    </header>

    <nuxt />


    <footer>
      <div class="container">
        <img v-if="!ampRoute" class='footer__logo' src="/src/images/logo-social.png" alt="">
        <amp-img class='footer__logo' v-if="ampRoute" src="/src/images/logo-social.png" alt="" width="144" height="86" layout="responsive"/>
      </div>
    </footer>

  </div>
</template>
<script>
	export default {
		computed: {
			ampRoute() {
        return this.$route.path.startsWith('/amp')
      }
		}
	}
</script>
<style scoped>
  .cls-1{
    fill:#fff;
    fill-rule:evenodd
  }
</style>
