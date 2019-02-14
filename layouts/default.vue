<template>
  <div>

    <header>
      <div class="container">
        <ul class="nav">
           <li class="nav__item"><nuxt-link to="/Beauty">Beauty</nuxt-link></li>
           <li class="nav__item"><nuxt-link  to="/Tech">Tech</nuxt-link></li>
        </ul>
        <svg class='search-ico' xmlns="http://www.w3.org/2000/svg" id="search" viewBox="0 0 11.855 11.855">
            <defs>
                <style>
                    .cls-1{fill:#fff;fill-rule:evenodd}
                </style>
            </defs>
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
        <img class='footer__logo' src="/src/images/logo-social.png" alt="">
      </div>
    </footer>

  </div>
</template>

<style>

</style>
