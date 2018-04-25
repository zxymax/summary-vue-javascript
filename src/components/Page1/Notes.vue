<template>
	<div class="section">
		<p class="info">
				<strong>要谨慎一点：</strong>
				如果在元素属性中不加上“：”，Vue认为是向这个属性赋上字符串而不是Vue组件上定义的属性引用！
		</p>
		<button @click="changeBtnBgColor" :class="{'active':btnColor}">{{btnText}}</button>	<div class="section">
			<p class="info">
				<strong>webpack</strong>是一个模块打包的工具，它的作用是把互相依赖的模块处理成静态资源。
			</p>
			<p class="info"><strong>webpack</strong>的目标</p>
			<ul>
				<li>把依赖树按需分割；</li>
				<li>把初始加载时间控制在较低的水平；</li>
				<li>每个静态资源都应该成为一个模块；</li>
				<li>能把第三方库集成到项目里成为一个模块；</li>
				<li>能定制模块打包器的每个部分；</li>
				<li>能适用于大型项目。</li>
			</ul>
			<p class="info"><strong>webpack</strong>的特点</p>
			<p class="block-span">
				<span>代码分割</span>
				<span>加载器</span>
				<span>只能解析</span>
				<span>插件系统</span>
			</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				btnColor: true,
				btnText: 'Remove BgColor',
				timeCreated: Date.now()
			}
		},
		methods: {
			changeBtnBgColor() {
				this.btnColor = !this.btnColor
				this.btnText = this.btnColor ? 'Remove Background' : 'Add Background'
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.section
 	border 1px solid #000
 	margin 5px 0
 	padding 10px
 	p.info
 		background-color #999
 		color #fff
 	.active
 		background-color #f3f
	ul
		line-height 1
		li 
			background-color #f3f
			margin 2px 0
	p.block-span
		display flex
		span
			display block
			padding 3px 10px
			background-color #e3b
			color #fff
			margin 10px
</style>