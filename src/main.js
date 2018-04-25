// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import moment from 'vue-moment'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/monokai.css'
Vue.config.productionTip = false

Vue.use(moment)
Vue.use(VueCodemirror ,{
        options: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'monokai',
        readOnly: true,
        lineNumbers: true,
        line: true,    
        height:'auto'
      }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
