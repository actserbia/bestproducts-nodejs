const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff0000' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/example.scss'
  ],
  manifest: {
    name: 'Best Products',
    short_name: 'BestProducts',
    description: "Fastest web app on the market.",
    lang: 'en-US'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vue-lazyload'],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // requestInterceptor:
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  env: {
    apiServer: process.env.API_SERVER || 'https://bestproducts.diwanee-serbia.com/graphql/',
    apiKey: process.env.API_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmVzdHByb2R1Y3RzLmRpd2FuZWUtc2VyYmlhLmNvbS9hZG1pbi90b2tlbnMiLCJpYXQiOjE1NDk2MjIyNDcsImV4cCI6MjE0OTYyMjI0NywibmJmIjoxNTQ5NjIyMjQ3LCJqdGkiOiJMM0J1TzVTUGxBaWNHTnFhIiwic3ViIjoxMSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.cKh_JiQGpPggJ647dNngGgD6YMxzwaji1UxSsBLwHd8'
  }

}
