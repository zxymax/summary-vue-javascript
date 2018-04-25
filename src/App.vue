<template>
  <div id="app">
    <div class="time">
      <strong>{{timeCreated | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</strong>
    </div>
    <ul>
      <li>
        <router-link :to="{name: 'Home'}">
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Status'}">
          <span>Page-1</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'VuexCodeSplit'}">
          <span>Page-2</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'InterviewquesALi'}">
          <span>Page-3</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'AboutThis'}">
          <span>Page-4</span>
        </router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['timeCreated'])
  }
}
</script>

<style scoped>
  
  .time{
    text-align: right;
  }
  ul{
    display: flex;
    list-style: none;
  }
  li{
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    margin: 5px;
  }
</style>
