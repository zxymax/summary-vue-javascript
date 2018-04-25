<template>
	<div>
		<h1>JavaScript This 的六道坎</h1>
		<h2>this说白了就是找大佬，找拥有当前上下文（context）的对象（context object）。</h2>
		
		<h3 class="bg-analysis">
			大佬可以分为六层，层数越高权力越大，this只会认最大的。
		</h3>
		<div class="section">
			<h3 class="bg-danger">
				第一层：世界尽头
			</h3>
			<p class="bg-analysis">
			权力最小的大佬是作为备胎的存在，在普通情况下就是全局，浏览器里就是window；在use strict的情况下就是undefined。
			</p>
			<codemirror 
	          :value="code1" 
	          >
		  </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				第二层：点石成金
			</h3>
			<p class="bg-success">
				第二层大佬说白了就是找这个函数前面的点.。
			</p>
			<p class="bg-analysis">
			如果用到this的那个函数是属于某个 context object 的，那么这个 context object 绑定到this。
			</p>
			<p>
				比如下面的例子，boss是returnThis的 context object ，或者说returnThis属于boss。
			</p>
			<codemirror 
	          :value="code2" 
	          >
		  </codemirror>
		  <p>
				再往下看
			</p>
			<codemirror 
	          :value="code3" 
	          >
		  </codemirror>
		  <p class="bg-analysis">
		  在boss2.returnThis里，使用this的函数是boss1.returnThis，所以this绑定到boss1；
在boss3.returnThis里，使用this的函数是returnThis，所以this绑定到备胎。</p>
			<h4 class="bg-danger">
				要想把this绑定到boss2怎么做呢？
			</h4>
			<codemirror 
	          :value="code4" 
	          >
	      </codemirror>
	      <p class="bg-analysis">没错，只要让使用this的函数是属于boss2就行。</p>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				第三层：指腹为婚
			</h3>
			<p class="bg-analysis">第三层大佬是Object.prototype.call和Object.prototype.apply，它们可以通过参数指定this。（注意this是不可以直接赋值的哦，this = 2会报ReferenceError。）</p>
			<codemirror 
	          :value="code5" 
	          >
	      </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				第四层：海誓山盟
			</h3>
			<p class="bg-analysis">
				第四层大佬是Object.prototype.bind，他不但通过一个新函数来提供永久的绑定，还会覆盖第三层大佬的命令。
			</p>
			<codemirror 
	          :value="code6" 
	          >
	      </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				第五层：内有乾坤
			</h3>
			<p class="bg-analysis">
				一个比较容易忽略的会绑定this的地方就是new。当我们new一个函数时，就会自动把this绑定在新对象上，然后再调用这个函数。它会覆盖bind的绑定。
			</p>
			<codemirror 
	          :value="code7" 
	          >
	      </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				第六层：军令如山
			</h3>
			<p class="bg-analysis">
				最后一个法力无边的大佬就是 ES2015 的箭头函数。箭头函数里的this不再妖艳，被永远封印到当前词法作用域之中，称作 Lexical this ，在代码运行前就可以确定。没有其他大佬可以覆盖。
			</p>
			<p class="bg-success">
				这样的好处就是方便让回调函数的this使用当前的作用域，不怕引起混淆。
			</p>
			<p>
所以对于箭头函数，只要看它在哪里创建的就行。
	</p>
<p class="bg-analysis">
如果对 V8 实现的词法作用域感兴趣可以看看这里。
</p>
	<codemirror 
	          :value="code8" 
	          >
	      </codemirror>
	      <p class="bg-analysis">
	      	下面这种奇葩的使用方式就需要注意：
	      </p>
			<codemirror 
	          :value="code9" 
	          >
	      </codemirror>
	       <p class="bg-analysis"> 如果你不知道最后为什么会是 boss2，继续理解“对于箭头函数，只要看它在哪里创建”这句话。</p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			code1: `function showThis() {
						console.log(this)
					}
					function showStrictThis() {
						'use strict'
						console.log(this)
					}
					showThis()  // window
					showStrictThis() // undefined`,
			code2: `
				let boss = {
					name: 'boss',
					returnThis() {
						return this
					}
			 	}
				 console.log(boss.returnThis() === boss) // true
			`,
			code3: `
				let boss1 = {
				  name: 'boss1',
				  returnThis () {
				    return this
				  }
				}
				let boss2 = {
					name: 'boss2',
					returnThis() {
						return boss1.returnThis()
					}
				}
				let boss3 = {
					name: 'boss3',
					returnThis() {
						let returnThis = boss1.returnThis
						return returnThis()
					}
				}
				boss1.returnThis() // boss1
				boss2.returnThis() // boss1
				boss3.returnThis() // window
			`,
			code4: `
				let boss1 = {
					name: 'boss1',
					returnThis() {
						console.log(this)
					}
				}
				let boss2 = {
					name: 'boss2',
					returnThis: boss1.returnThis
				}
				boss2.returnThis() // boss2
			`,
			code5: `
				function returnThis() {
					return this
				}
				let boss1 = {
					name: 'boss1'
				}
				returnThis() // window
				returnThis.call(boss1) // boss1
				returnThis.apply(boss1) // boss1
			`,
			code6: `
				function returnThis() {
					return this
				}
				let boss1 = {
					name: 'boss1'
				}
				let boss1ReturnThis = returnThis.bind(boss1)
				boss1ReturnThis() // boss1

				let boss2 = {
					name: 'boss2'
				}
				boss1ReturnThis.call(boss2) // boss1
			`,
			code7: `
				function showThis() {
					return this
				}
				showThis() // window
				new showThis() // showThis
				let boss1 = {
					name: 'boss1'
				}
				showThis.call(boss1) // boss1
				new showThis().call(boss1) // 报错TypeError
				let boss1ShowThis = showThis.bind(boss1)
				boss1ShowThis() // boss1
				new boss1ShowThis() // boss1ShowThis
			`,
			code8: `
				function callback(cb) {
					cb()
				}
				callback(()=>{ console.log(this) })  // window
				let boss1 = {
					name: 'boss1',
					callback: callback,
					callback2(){
						(()=>{
							console.log(this)
						})
					}
				}
				boss1.callback(()=>{ console.log(this) }) // window
				boss1.callback2(()=>{ console.log(this) }) // boss1

			`,
			code9: `
				let returnThis = () => this
				returnThis() // window
				new returnThis() //TypeError

				let boss1 = {
					name: 'boss1',
					returnThis() {
						let func = () => this
						return func()
					}
				}
				returnThis.call(boss1) // window

				let boss1ReturnThis = returnThis.bind(boss1)
					boss1ReturnThis() // window
					boss1.returnThis() // boss1

				let boss2 = {
					name: 'boss2',
					returnThis: boss1.returnThis
				}
				boss2.returnThis() // boss2

			`
		}
	},
	methods: {
		func1() {
			function showThis() {
				console.log(this)
			}
			function showStrictThis() {
				'use strict'
				console.log(this)
			}
			showThis()
			showStrictThis()
		},
		func2() {
			let boss = {
				name: 'boss',
				returnThis() {
					return this
				}
			 }
			 console.log(boss.returnThis() === boss) // true
		},
		func3() {
			let boss1 = {
			  name: 'boss1',
			  returnThis () {
			    return this
			  }
			}
			let boss2 = {
				name: 'boss2',
				returnThis() {
					return boss1.returnThis()
				}
			}
			let boss3 = {
				name: 'boss3',
				returnThis() {
					let returnThis = boss1.returnThis
					return returnThis()
				}
			}
			boss1.returnThis()	
			boss2.returnThis()
			boss3.returnThis()
		},
		func4() {
			let boss1 = {
				name: 'boss1',
				returnThis() {
					console.log(this)
				}
			}
			let boss2 = {
				name: 'boss2',
				returnThis: boss1.returnThis
			}
			boss2.returnThis()
		},
		func5() {
			function returnThis() {
				return this
			}
			let boss1 = {
				name: 'boss1'
			}
			returnThis()
			returnThis.call(boss1)
			returnThis.apply(boss1)
		},
		func6() {
			function returnThis() {
				return this
			}
			let boss1 = {
				name: 'boss1'
			}
			let boss1ReturnThis = returnThis.bind(boss1)
			boss1ReturnThis()

			let boss2 = {
				name: 'boss2'
			}
			 boss1ReturnThis.call(boss2)
		},
		func7() {
			function showThis() {
				return this
			}
			showThis()
			new showThis()
			let boss1 = {
				name: 'boss1'
			}
			showThis.call(boss1) 
			new showThis().call(boss1)
			let boss1ShowThis = showThis.bind(boss1)
			boss1ShowThis()
			new boss1ShowThis()
		},
		func8() {
			function callback(cb) {
				cb()
			}
			callback(()=>{ console.log(this) })
			let boss1 = {
				name: 'boss1',
				callback: callback,
				callback2(){
					(()=>{
						console.log(this)
					})
				}
			}
			boss1.callback(()=>{ console.log(this) })
			boss1.callback2(()=>{ console.log(this) })

		},
		func9() {
			let returnThis = () => this
			returnThis()
			new returnThis()

			let boss1 = {
				name: 'boss1',
				returnThis() {
					let func = () => this
					return func()
				}
			}
			returnThis.call(boss1)

			let boss1ReturnThis = returnThis.bind(boss1)
			boss1ReturnThis()
			boss1.returnThis()
			let boss2 = {
				name: 'boss2',
				returnThis: boss1.returnThis
			}
			boss2.returnThis()


		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../../static/stylus/base.styl'
 </style>
