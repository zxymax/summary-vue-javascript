import Vue from 'vue'
import Router from 'vue-router'

const Home = ()=> import(/* webpackChunkName: "Home" */ '@/components/Home.vue')
const Status = ()=> import(/* webpackChunkName: "Status" */ '@/components/Page1/Status.vue') 
const VuexCodeSplit = ()=> import(/* webpackChunkName: "VuexCodeSplit" */ '@/components/Page2/VuexCodeSplit.vue')

const InterviewquesALi = ()=> import(/* webpackChunkName: "InterviewquesALi" */ '@/components/Page3/Interviewques-ali.vue')

const AboutThis = ()=> import(/* webpackChunkName: "AboutThis" */ '@/components/Page4/AboutThis.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/status',
    	name: 'Status',
    	component: Status
    },
    {
    	path: '/vuexcodesplit',
    	name: 'VuexCodeSplit',
    	component: VuexCodeSplit
    },
    {
    	path: '/interviewques-ali',
    	name: 'InterviewquesALi',
    	component: InterviewquesALi
    },
    {
      path: '/aboutthis',
      name: 'AboutThis',
      component: AboutThis
    }
  ]
})
