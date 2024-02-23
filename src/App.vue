<!-- 
  In router.js, we define routes that tell the router which component to render 
  based on the URL. App.vue doesn't directly call {Component}.vue; instead, 
  Vue Router handles this by rendering {Component}.vue inside the <router-view/> 
  in App.vue when the URL matches the route pattern.
 -->

<template>
  <div id="app">
    <router-view/> 
  </div>
</template>
