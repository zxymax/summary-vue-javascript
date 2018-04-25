<template>
	<div>
		<div class="container">
		<h1>Vuex学习心得</h1>
		<div class="content">
			<h2><strong>Vuex概念：</strong> Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</h2>
			
			<h2><strong>什么是状态管理模式？：</strong></h2>
		
				<ul>
					<li>state,驱动应用的数据源</li>
					<li>view,以声明方式将state映射到视图</li>
					<li>actions,响应式在view上的用户输入导致的状态变化</li>
				</ul>
				<p>以下是一个表示 “单向数据流“理念的极简示意图</p>
				<div class="image">
					<img width="300" height="210" src="https://vuex.vuejs.org/zh-cn/images/flow.png" alt="">
				</div>
			<h2>
				<span class="warning">注意： 但是，当我们的应用遇到多个组件共享状态时,单项数据流的简洁性很容易破坏：</span>
				<ul>
					<li>问题1:多个视图依赖于同一状态。</li>
					<li>问题2:来自不同视图的行为需要变更同一状态。</li>
				</ul>
				<p class="bg-success">
					因此我们需要把组件的共享状态抽取出来，以一个全局单例模式管理，在这种模式下，我们组件树构成了一个巨大的”视图“，不管在树的哪个位置，任何组件都能获取状态或者触发行为！
				</p>
				<p><i>通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。</i></p>
			</h2>
			<div class="image">
				<img width="671" height="527" src="https://vuex.vuejs.org/zh-cn/images/vuex.png" alt="">
			</div>
			<h2><strong>什么情况下我应该使用 Vuex？</strong></h2>
			<p>
				如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 global event bus 就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。
			</p>
		</div>
		<div class="content">
			<h2><strong>安装Vuex</strong></h2>
			<h3>
				<span class="code">
					npm install vuex --save
				</span>
				<span class="code">
					yarn add vuex
				</span>
			</h3>
			<p class="bg-success">
				在store/index.js文件中引用vuex文件 并且使用use使用vuex
			</p>
			<h3>
				<span class="code">import Vue from 'vue'</span>
				<span class="code">import Vuex from 'vuex'</span>
				<span class="code">Vue.use(Vuex)</span>
			</h3>

			<h2><strong>Vuex核心概念</strong></h2>
			<h5>
				<span class="info">State</span>
				<span class="info">Getter</span>
				<span class="info">Mutation</span>
				<span class="info">Action</span>
				<span class="info">Module</span>
			</h5>
			<div class="section">
				
			
			<h2>
				<strong>State</strong>单一状态树，即Vuex中的基本数据。用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。
			</h2>
			<p class="bg-success">
				我们可以通过Vue的computed获得Vuex的state，如下：
			</p>
			<div class="code">
				<pre>
					const store = new Vuex.Store({
					    state: {
					        count:0
					    }
					})
					const app = new Vue({
					    //..
					    store,
					    computed: {
					        count: function(){
					            return this.$store.state.count
					        }
					    },
					    //..
					})
				</pre>
				
			</div>
			<p>
					<span class="warning">每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。</span>
				</p>
				<h2><strong>mapState辅助函数</strong></h2>
				<p class="bg-success">
					当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键。
				</p>
				<div class="code">
					<pre>
						// 在单独构建的版本中辅助函数为 Vuex.mapState
						import { mapState } from 'vuex'

						export default {
						  // ...
						  computed: mapState({
						    // 箭头函数可使代码更简练
						    count: state => state.count,

						    // 传字符串参数 'count' 等同于 `state => state.count`
						    countAlias: 'count',

						    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
						    countPlusLocalState (state) {
						      return state.count + this.localCount
						    }
						  })
						}
					</pre>
				</div>
				<p class="bg-success">
					当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
				</p>
				<div class="code">
					<pre>
						computed: mapState([
						  // 映射 this.count 为 store.state.count
						  'count'
						])
					</pre>
				</div>
				<h2><strong>对象扩展运算符</strong></h2>
				<p class="bg-success">
					mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是自从有了对象展开运算符，我们可以极大地简化写法：
				</p>
				<div class="code">
					<pre>
						computed: {
						  localComputed () //本地计算属性
						  //使用对象展开运算符将此对象混入到外部对象中
						  ...mapState({
						    //..
						  })
						}
					</pre>
				</div>
			</div>
			<div class="section">
				<h2><strong>Getters</strong>即从store的state中派生出的状态。</h2>
				<p class="bg-success">
					getters接收state作为其第一个参数，接受其他 getters 作为第二个参数，如不需要，第二个参数可以省略如下例子：
				</p>
				<div class="code">
					<pre>
						const store = new Vuex.Store({
						    state: {
						        count:0
						    }，
						    getters: {
						        // 单个参数
						        countDouble: function(state){
						            return state.count * 2
						        },
						        // 两个参数
						        countDoubleAndDouble: function(state, getters) {
						            return getters.countDouble * 2
						        }
						    }
						})
					</pre>
				</div>
				<p class="bg-success">
					与state一样，我们也可以通过Vue的Computed获得Vuex的getters。
				</p>
				<div class="code">
					<pre>
						const app = new Vue({
						    //..
						    store,
						    computed: {
						        count: function(){
						            return this.$store.state.count
						        },
						        countDouble: function(){
						            return this.$store.getters.countDouble
						        },
						        countDoubleAndDouble: function(){
						            return this.$store.getters.countDoubleAndDouble
						        }
						    },
						    //..
						})
					</pre>
				</div>
				<h2>
					<strong>mapGetters 辅助函数</strong>
				</h2>
				<p class="bg-success">
					mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性，与state类似
				</p>
				<div class="code">
					<pre>
						import { mapGetters } from 'vuex'
						export default {
						  // ...
						  computed: {
						  // 使用对象展开运算符将 getters 混入 computed 对象中
						    ...mapGetters([
						      'countDouble',
						      'CountDoubleAndDouble',
						      //..
						    ])
						  }
						}
					</pre>
				</div>
				<p class="bg-success">
					如果你想将一个 getter 属性另取一个名字，使用对象形式：
				</p>
				<div class="code">
					<pre>
						mapGetters({
						  // 映射 this.double 为 store.getters.countDouble
						  double: 'countDouble'
						})
					</pre>
				</div>
			</div>
			<div class="section">
				<h2><strong>Mutations</strong>提交mutation是更改Vuex中的store中的状态的唯一方法。</h2>
				<p><span class="warning">mutation必须是同步的，如果要异步需要使用action。
				</span></p>
				<p class="bg-success">
					更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数,提交载荷作为第二个参数。（提交荷载在大多数情况下应该是一个对象）,提交荷载也可以省略的。
				</p>
				<div class="code">
					<pre>
						const store = new Vuex.Store({
						  state: {
						    count: 1
						  },
						  mutations: {
						    //无提交荷载
						    increment(state) {
						        state.count++
						    }
						    //提交荷载
						    increment(state, obj) {
						      state.count += obj.n
						    }
						  }
						})
					</pre>
				</div>
				<p><span class="warning">
					你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
				</span></p>
				<div class="code">
					<pre>
						//无提交荷载
						store.commit('increment')
						//提交荷载
						store.commit('increment', {
						    n: 100
						})
					</pre>
				</div>
				<p><span class="warning">
					在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
				</span></p>
				<div class="code">
					<pre>
						// ...
						store.commit({
						  type: 'increment',
						  n: 10
						})
					</pre>
				</div>
				<p><span class="warning">
					当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
				</span></p>
				<div class="code">
					<pre>
						mutations: {
						  increment (state, payload) {
						    state.count += payload.amount
						  }
						}
					</pre>
				</div>
				<p class="bg-success">
					<b>使用常量替代 Mutation 事件类型</b>

				</p>
				<p class="bg-success">
					使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
				</p>
				<div class="code">
					<pre>
						// mutation-types.js
						export const SOME_MUTATION = 'SOME_MUTATION'
						// store.js
						import Vuex from 'vuex'
						import { SOME_MUTATION } from './mutation-types'

						const store = new Vuex.Store({
						  state: { ... },
						  mutations: {
						    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
						    [SOME_MUTATION] (state) {
						      // mutate state
						    }
						  }
						})
					</pre>
				</div>
				<h2><strong>在组件中提交 Mutation</strong></h2>
				<p class="bg-success">
					你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
				</p>
				<div class="code">
					<pre>
						import { mapMutations } from 'vuex'

						export default {
						  // ...
						  methods: {
						    ...mapMutations([
						      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

						      // `mapMutations` 也支持载荷：
						      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
						    ]),
						    ...mapMutations({
						      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
						    })
						  }
						}
					</pre>
				</div>
			</div>
			<div class="section">
				<h2><strong>Action</strong>Action 类似于 mutation，不同在于：</h2>
				<ul>
					<li><span class="warning">Action 提交的是 mutation，而不是直接变更状态。</span></li>
					<li><span class="warning">Action 可以包含任意异步操作。</span></li>
				</ul>
				<h3>
					让我们来注册一个简单的 action：
				</h3>
				<div class="code">
					<pre>
						const store = new Vuex.Store({
						  state: {
						    count: 0
						  },
						  mutations: {
						    increment (state) {
						      state.count++
						    }
						  },
						  actions: {
						    increment (context) {
						      context.commit('increment')
						    }
						  }
						})
					</pre>
				</div>
				<p class="bg-success">
					Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。
				</p>
				<h2>分发actions</h2>
				<p class="bg-success">
					Action 通过 store.dispatch 方法触发：
				</p>
				<div class="code">
					<pre>
						store.dispatch('increment')
					</pre>
				</div>
				<h2>
					<strong>其他与mutations类似的地方</strong>
				</h2>
				<p><span class="warning">
					Actions 支持同样的载荷方式和对象方式进行分发：
				</span></p>
				<div class="code">
					<pre>
						// 以载荷形式分发
						store.dispatch('increment', {
						  n: 10
						})

						// 以对象形式分发
						store.dispatch({
						  type: 'increment',
						  n: 10
						})
					</pre>
				</div>
				<p class="bg-success">
					来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 mutation：
				</p>
				<div class="code">
					<pre>
						actions: {
						  checkout ({ commit, state }, products) {
						    // 把当前购物车的物品备份起来
						    const savedCartItems = [...state.cart.added]
						    // 发出结账请求，然后乐观地清空购物车
						    commit(types.CHECKOUT_REQUEST)
						    // 购物 API 接受一个成功回调和一个失败回调
						    shop.buyProducts(
						      products,
						      // 成功操作
						      () => commit(types.CHECKOUT_SUCCESS),
						      // 失败操作
						      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
						    )
						  }
						}
					</pre>
				</div>
				<p><span class="warning">
					注意我们正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）。
				</span></p>
				<h2><strong>在组件中分发 Action</strong></h2>
				<p class="bg-success">
					你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
				</p>
				<div class="code">
					<pre>
						import { mapActions } from 'vuex'

						export default {
						  // ...
						  methods: {
						    ...mapActions([
						      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

						      // `mapActions` 也支持载荷：
						      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
						    ]),
						    ...mapActions({
						      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
						    })
						  }
						}
					</pre>
				</div>
				<h2><strong>
					组合 Action
				</strong></h2>
				<p class="bg-success">
					Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？
				</p>
				<p class="bg-success">
					首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：
				</p>
				<div class="code">
					<pre>
						actions: {
						  actionA ({ commit }) {
						    return new Promise((resolve, reject) => {
						      setTimeout(() => {
						        commit('someMutation')
						        resolve()
						      }, 1000)
						    })
						  }
						}
					</pre>
				</div>
				<h2><strong>现在你可以：</strong></h2>
				<div class="code">
					<pre>
						store.dispatch('actionA').then(() => {
						  // ...
						})
					</pre>
				</div>
				<h2><strong>
					在另外一个 action 中也可以：
				</strong></h2>
				<div class="code">
					<pre>
						actions: {
						  // ...
						  actionB ({ dispatch, commit }) {
						    return dispatch('actionA').then(() => {
						      commit('someOtherMutation')
						    })
						  }
						}

					</pre>
				</div>
				<p class="bg-success">
					最后，如果我们利用 async / await，我们可以如下组合 action：
				</p>
				<div class="code">
					<pre>
						// 假设 getData() 和 getOtherData() 返回的是 Promise

						actions: {
						  async actionA ({ commit }) {
						    commit('gotData', await getData())
						  },
						  async actionB ({ dispatch, commit }) {
						    await dispatch('actionA') // 等待 actionA 完成
						    commit('gotOtherData', await getOtherData())
						  }
						}
					</pre>
				</div>
				<h2><span class="warning">
					一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
				</span></h2>
			</div>

			<div class="section">
				<h2><strong>
					Module
				</strong></h2>
				<p>
					由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
				</p>
				<p class="bg-success">
					为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
				</p>
				<div class="code">
					<pre>
						const moduleA = {
						  state: { ... },
						  mutations: { ... },
						  actions: { ... },
						  getters: { ... }
						}

						const moduleB = {
						  state: { ... },
						  mutations: { ... },
						  actions: { ... }
						}

						const store = new Vuex.Store({
						  modules: {
						    a: moduleA,
						    b: moduleB
						  }
						})

						store.state.a // -> moduleA 的状态
						store.state.b // -> moduleB 的状态
					</pre>
				</div>
				<h2>
					<strong>模块的局部状态</strong>
				</h2>
				<p class="bg-success">
					对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
				</p>
				<div class="code">
					<pre>
						const moduleA = {
						  state: { count: 0 },
						  mutations: {
						    increment (state) {
						      // 这里的 `state` 对象是模块的局部状态
						      state.count++
						    }
						  },

						  getters: {
						    doubleCount (state) {
						      return state.count * 2
						    }
						  }
						}
					</pre>
				</div>
				<p class="bg-success">
					同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
				</p>
				<div class="code">
					<pre>
						const moduleA = {
						  // ...
						  actions: {
						    incrementIfOddOnRootSum ({ state, commit, rootState }) {
						      if ((state.count + rootState.count) % 2 === 1) {
						        commit('increment')
						      }
						    }
						  }
						}
					</pre>
				</div>
				<p class="bg-success">
					对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
				</p>
				<div class="code">
					<pre>
						const moduleA = {
						  // ...
						  getters: {
						    sumWithRootCount (state, getters, rootState) {
						      return state.count + rootState.count
						    }
						  }
						}
					</pre>
				</div>
			</div>


		</div>
		<div class="content">
			<h2><strong>项目结构</strong></h2>
			<p class="bg-success">
				Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
			</p>
			<ul>
				<li>应用层级的状态应该集中到单个 store 对象中。</li>
				<li>提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。</li>
				<li>异步逻辑都应该封装到 action 里面。</li>
			</ul>
			<p><span class="warning">
				只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。
			</span></p>
			<p>对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：</p>
			<div class="code">
				<pre>
					├── index.html
					├── main.js
					├── api
					│   └── ... # 抽取出API请求
					├── components
					│   ├── App.vue
					│   └── ...
					└── store
					    ├── index.js          # 我们组装模块并导出 store 的地方
					    ├── actions.js        # 根级别的 action
					    ├── mutations.js      # 根级别的 mutation
					    └── modules
					        ├── cart.js       # 购物车模块
					        └── products.js   # 产品模块
				</pre>
			</div>
		</div>
	</div>
	<div class="container">
		<h1>路由懒加载</h1>
		<div class="content">
			<p class="bg-success">
				当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
			</p>
			<p><span class="warning">
				结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。
			</span></p>

			<p class="bg-success">
				首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：
			</p>
			<div class="code">
				<pre>
					const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
				</pre>
			</div>
			<p class="bg-success">
				第二，在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)：
			</p>
			<div class="code">
				<pre>
					import('./Foo.vue') // 返回 Promise
				</pre>
			</div>
			<p><span class="warning">
				注意：如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。
			</span></p>
			<p>
				结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。
			</p>
			<div class="code">
				<pre>
					const Foo = () => import('./Foo.vue')
				</pre>
			</div>
			<p>
				在路由配置中什么都不需要改变，只需要像往常一样使用 Foo：
			</p>
			<div class="code">
				<pre>
					const router = new VueRouter({
					  routes: [
					    { path: '/foo', component: Foo }
					  ]
					})
				</pre>
			</div>
			<h2><strong>把组件按组分块</strong></h2>
			<p class="bg-success">
				有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
			</p>
			<div class="code">
				<pre>
					const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
					const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
					const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
				</pre>
			</div>
			<p><span class="warning">
				Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
			</span></p>
		</div>
	</div>
	<div class="container">
		<div class="content">
			<div id="createul">
				
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style scoped>
	<style>
		body{
			color: #999;
		}
		.container{
			border: 1px solid #f0f;
			padding: 10px;
			margin: 10px;
		}
		h1{
			font-weight: bold;
			text-decoration: underline;
		}
		.content{
			border: 1px solid #ef0;
			padding: 10px;
			margin: 10px;
		}
		.section{
			margin: 15px;
			padding: 10px;
			border: 2px solid #fbb390;
		}

		h2 strong{
			background-color: #888;
			color: #fff;
			font-size: 16px;
			padding: 5px;
		}
		.image{
			padding: 10px;
			border: 1px solid #e9f;
		}
		 span.warning{
			background-color: #e90;
			color: #fff;
		}
		p.bg-success{
			background-color: #dff0d8;
			color: #333;
		}
		
		div.code{
			padding: 10px;
		}
		ul{
			line-height: 1.5;
		}
	</style>
</style>