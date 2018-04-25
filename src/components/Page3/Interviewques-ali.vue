<template>
	<div>
		<h1>阿里前端面试总结</h1>
		
		<hr>
		<div class="section">
			<h3 class="bg-danger">
			1、有一个长度未知的数组a，如果它的长度为0就把数字1添加到数组里面，否则按照先进先出的队列规则让第一个元素出队。
		</h3>
		<p class="bg-analysis">分析：这道题主要是考核了数组的队列方法和栈方法。我们可以使用三目运算符（： ？）来减少字数。代码如下：</p>
			<codemirror 
	          :value="code1" 
	          >
		  </codemirror>	
		</div>
		 <div class="section">
		 	 <h3 class="bg-danger">
			2.下面代码会输出什么：
		</h3>
		<p class="bg-analysis">分析：这道题考了与函数有关的的两个非常重要的概念：自执行函数和闭包。</p>
		  <codemirror 
	          :value="code2" 
	          >
		  </codemirror>
		 </div> 
		 <div class="section">
		 	<h3 class="bg-danger">
		 		3.请把&lt;ul&gt;&lt;li&gt;第1行&lt;/li&gt;&lt;li	&gt;第2行&lt;/li	&gt;...&lt;/ul&gt;（ul之间有10个li元素）插入body里面，注意：需要考虑到性能问题。
		 	</h3>
		 	<p class="bg-analysis">分析：这题主要考察了dom操作。插入节点操作的可以使用insertBefore和appendChild方法，随便用一个都行。但是，题目要求要考虑性能问题，这才是关键，因为，JavaScript操作dom的开销是很大的！提高性能就要减少dom操作。因此，我当时使用了下面的方法，只操作一次dom就够的了：</p>
		 	<codemirror 
	          :value="code3" 
	          >
		  </codemirror>
		 </div>
		<div class="section">
			<h3 class="bg-danger">
				4.不使用loop循环，创建一个长度为100的数组，并且每个元素的值等于它的下标。
			</h3>
			<p class="bg-analysis">
				分析：当时看到题目要求不使用loop循环时，“聪明过头”的我马上就想到了使用间歇性定时器setInterval，代码如下：
			</p>
			<codemirror 
	          :value="code4" 
	          >
		  </codemirror>
		  <p class="bg-analysis">
		  	另一种做法： 先创建一个新数组，然后通过join方法把它转化为字符串，然后再通过split方法把字符串转化为数组，这时候，它就拥有100个值为空的元素了，然后再通过map函数改变这些元素值即可。
		  </p>
		  <codemirror 
	          :value="code5" 
	          >
		  </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				5.实现对数组进行乱序
			</h3>
			<p class="bg-analysis">
				分析： 使用sort对数组进行排序，因为是乱序，还需要用到Math.random()产生随机数，用来打乱排序规律！代码如下：
			</p>
			 <codemirror 
	          :value="code6" 
	          >
		  </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				6.有一个长度为100的数组，或者随机生成一个1-100的数组，请以优雅的方式求出该数组的前10个元素之和
			</h3>
			<p>以随机生成一个1-100的数组为例</p>
			<p class="bg-analysis">
				分析：其实，对于数组求和有很多种方法。但是，这题有两个限制条件：优雅的方式、前10个元素。对于“前10个元素”这个限制条件可以使用Array.prototype.slice()方法来截取，对于"优雅的方式"，我的理解是应该尽可能使用数组自带的方法，最好可以使用高阶函数！所以我觉得应该是Array.prototype.reduce()方法。代码如下：
			</p>
			 <codemirror 
	          :value="code7" 
	          >
		  </codemirror>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				7.JavaScript实现继承的常用方法有哪些？你推荐的是哪一种？
			</h3>
			<h5>
				<span class="info">1、原型链继承</span>
				<span class="info">2、构造继承</span>
				<span class="info">3、实例继承</span>
				<span class="info">4、拷贝继承</span>
				<span class="info">5、组合继承</span>
				<span class="info">6、寄生组合继承</span>
			</h5>
			<h2 class="bg-analysis">既然要实现继承，那么首先我们得有一个父类，代码如下：</h2>
			<p class="bg-success">值得推荐的是组合方式。ES5的Object.create()就是使用了该方式实现继承的！</p>
			<h3>
				<span class="info">1、原型链继承</span>
			</h3>
			<p class="bg-analysis">
				核心： 将父类的实例作为子类的原型
			</p>
 			<codemirror 
	          :value="code8" 
	          >
		  </codemirror>
		  <h4>
		  	<span class="special">
		  		特点：
		  	</span>
		  </h4>
		  <ul class="special">
		  	<li>非常纯粹的继承关系，实例是子类的实例，也是父类的实例</li>
		  	<li>父类新增原型方法/原型属性，子类都能访问到</li>
		  	<li>简单，易于实现</li>
		  </ul>
		  <h4>
		  	<span class="deficiency">
		  		不足：
		  	</span>
		  </h4>
		  <ul class="deficiency">
		  	<li>要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
</li>
			<li>
				无法实现多继承
			</li>
			<li>
				来自原型对象的引用属性是所有实例共享的
			</li>
			<li>
				创建子类实例时，无法向父类构造函数传参
			</li>
		  </ul>
		  <h3>
				<span class="info">2、构造继承</span>
			</h3>
			<p class="bg-analysis">
				核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
			</p>
			<codemirror 
	          :value="code9" 
	          >
		  </codemirror>
		  <h4>
		  	<span class="special">
		  		特点：
		  	</span>
		  </h4>
		<ul class="special">
			<li>解决了1中，子类实例共享父类引用属性的问题</li>
			<li>创建子类实例时，可以向父类传递参数</li>
			<li>可以实现多继承（call多个父类对象）</li>
		</ul>
		 <h4>
		  	<span class="deficiency">
		  		不足：
		  	</span>
		  </h4>
		   <ul class="deficiency">
		   	<li>实例并不是父类的实例，只是子类的实例</li>
		   	<li>只能继承父类的实例属性和方法，不能继承原型属性/方法</li>
		   	<li>无法实现函数复用，每个子类都有父类实例函数的副本，影响性能</li>
		   </ul>
		    <h3>
				<span class="info">3、实例继承</span>
			</h3>
			<p class="bg-analysis">
				核心：为父类实例添加新特性，作为子类实例返回
			</p>
			<codemirror 
	          :value="code10" 
	          >
		  </codemirror>
		   <h4>
		  	<span class="special">
		  		特点：
		  	</span>
		  </h4>
		  <ul class="special">
		  	<li>不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果</li>
		  </ul>
		  <h4>
		  	<span class="deficiency">
		  		不足：
		  	</span>
		  </h4>
		  <ul class="deficiency">
		  	<li>实例是父类的实例，不是子类的实例</li>
		  	<li>不支持多继承</li>
		  </ul>
		  <h3>
				<span class="info">4、拷贝继承</span>
			</h3>
			<codemirror 
	          :value="code11" 
	          >
		  </codemirror>
		   <h4>
		  	<span class="special">
		  		特点：
		  	</span>
		  </h4>
		  	<ul class="special">
		  		<li>支持多继承</li>
		  	</ul>
		  <h4>
		  	<span class="deficiency">
		  		不足：
		  	</span>
		  </h4>
		  <ul class="deficiency">
		  	<li>效率较低，内存占用高（因为要拷贝父类的属性）</li>
		  	<li>无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）</li>
		  </ul>
		  <h3>
				<span class="info">5、组合继承</span>
			</h3>
			<p class="bg-analysis">
				核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
			</p>
			<codemirror 
	          :value="code12" 
	          >
		  </codemirror>
		  <h4>
		  	<span class="special">
		  		特点：
		  	</span>
		  </h4>
		  <ul class="special">
		  	<li>弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法</li>
		  	<li>既是子类的实例，也是父类的实例</li>
		  	<li>不存在引用属性共享问题</li>
		  	<li>可传参</li>
		  	<li>函数可复用</li>
		  </ul>
		  <h4>
		  	<span class="deficiency">
		  		不足：
		  	</span>
		  </h4>
		  <ul class="deficiency">
		  	<li>调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）</li>
		  </ul>
		  <h3>
				<span class="info">6、寄生组合继承</span>
			</h3>
			<p class="bg-analysis">
				核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
			</p>
			<codemirror 
	          :value="code13" 
	          >
		  </codemirror>
		   <h4>
		  	<span class="special">
		  		特点：
		  	</span>
		  </h4>
		  <ul class="special">
		  	<li>堪称完美</li>
		  </ul>
		  <h4>
		  	<span class="deficiency">
		  		不足：
		  	</span>
		  </h4>
		  <ul class="deficiency">
		  	<li>实现较为复杂</li>
		  </ul>
		</div>
		<div class="section">
			<h3 class="bg-danger">
				8.在项目开发完成之后，根据雅虎性能优化规则，需要对html，JS，CSS，图片需要做出怎样的处理？是否可以借助构建工具实现自动化？
			</h3>
			
			<p class="bg-analysis">
				提示：从减少http请求、减少带宽、提高加载速度等方面进行答题即可。
			</p>
			<ul class="special">
				<li :class="{'active': isActive}" @click="showHide($event)"><p>1. 尽可能的减少 HTTP 的请求数 [content]</p><div>
					http请求是要开销的，想办法减少请求数自然可以提高网页速度。常用的方法，合并css，js(将一个页面中的css和js文件分别合并)以及 Image maps和css sprites等。当然或许将css，js文件拆分多个是因为css结构，共用等方面的考虑。阿里巴巴中文站当时的做法是开发时依然分开开发，然后在后台 对js，css进行合并，这样对于浏览器来说依然是一个请求，但是开发时仍然能还原成多个，方便管理和重复引用。yahoo甚至建议将首页的css和js 直接写在页面文件里面，而不是外部引用。因为首页的访问量太大了，这么做也可以减少两个请求数。而事实上国内的很多门户都是这么做的。

而css sprites是指只用将页面上的背景图合并成一张，然后通过css的background-position属性定义不过的值来取他的背景。淘宝和阿里巴巴中文站目前都是这样做的。有兴趣的可以看下淘宝和阿里巴巴的背景图。

http://www.csssprites.com/ 这是个工具网站，它可以自动将你上传的图片合并并给出对应的background-position坐标。并将结果以png和gif的格式输出。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>2. 使用 CDN（Content Delivery Network） [server]</p><div>
					说实话，对于CDN这一块自己并不是很了解，简单地讲，通过在现有的Internet中增加一层新的网络架构，将网站的内容发布到最接近用户的 cache服务器内，通过DNS负载均衡的技术，判断用户来源就近访问cache服务器取得所需的内容，杭州的用户访问近杭州服务器上的内容，北京的访问 近北京服务器上的内容。这样可以有效减少数据在网络上传输的时间，提高速度。更详细地内容大家可以参考百度百科上对于CDN的解释。Yahoo!把静态内 容分布到CDN减少了用户影响时间20%或更多。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>3. 添加 Expires 头(或者 Cache-control ) [server]</p><div>
					现在越来越多的图片，脚本，css，flash被嵌入到页面中，当我们访问他们的时候势必会做许多次的http请求。其实我们可以通过设置 Expires header 来缓存这些文件。Expire其实就是通过header报文来指定特定类型的文件在览器中的缓存时间。大多数的图片，flash在发布后都是不需要经常修 改的，做了缓存以后这样浏览器以后就不需要再从服务器下载这些文件而是而直接从缓存中读取，这样再次访问页面的速度会大大加快。一个典型的HTTP 1.1协议返回的头信息：

HTTP/1.1 200 OK

Date: Fri, 30 Oct 1998 13:19:41 GMT

Server: Apache/1.3.3 (Unix)

Cache-Control: max-age=3600, must-revalidate

Expires: Fri, 30 Oct 1998 14:19:41 GMT

Last-Modified: Mon, 29 Jun 1998 02:28:12 GMT

ETag: “3e86-410-3596fbbc”

Content-Length: 1040

Content-Type: text/html

其中通过服务器端脚本设置Cache-Control和Expires可以完成。

如，在php中设置30天后过期：

以下为引用的内容：


也可以通过配置服务器本身完成，这些偶就不是很清楚了，呵呵。想了解跟多的朋友可以参考http://www.web-caching.com/

据我了解，目前阿里巴巴中文站的Expires过期时间是30天。不过期间也有过问题，特别是对于脚本过期时间的设置还是应该仔细考虑下，不然相应 的脚本功能更新后客户端可能要过很长一段时间才能“感知”到这样的变化。以前做[suggest项目] 的时候就遇到过这个问题。所以，哪些应该缓存，哪些不该缓存还是应该仔细斟酌一番。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>4. Gzip 组件 [server]</p><div>
					Gzip的思想就是把文件先在服务器端进行压缩，然后再传输。这样可以显著减少文件传输的大小。传输完毕后浏览器会 重新对压缩过的内容进行解压缩，并执行。目前的浏览器都能“良好”地支持 gzip。不仅浏览器可以识别，而且各大“爬虫”也同样可以识别，各位seoer可以放下心了。而且gzip的压缩比例非常大，一般压缩率为85%，就是 说服务器端100K的页面可以压缩到25K左右再发送到客户端。具体的Gzip压缩原理大家可以参考csdn上的《gzip压缩算法》 这篇文章。雅虎特别强调， 所有的文本内容都应该被gzip压缩: html (php), js, css, xml, txt… 这一点我们网站做得不错，是一个A。以前我们的首页也并不是A，因为首页上还有很多广告代码投放的js，这些广告代码拥有者的网站的js没有经过gzip 压缩，也会拖累我们网站。
以上三点大多属于服务器端的内容，本人也是粗浅地了解而已。说得不对的地方有待各位指正。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>5. 将 CSS 样式放在页面的上方 [css]</p><div>
					将css放在页面最上面，这是为什么?因为 ie，firefox等浏览器在css全部传输完全之前不会去渲染任何的东西。理由诚如小马哥说得那样很简单。css，全称Cascading Style Sheets (层叠样式表单)。层叠即意味这后面的css可以覆盖前面的css，级别高的css可以覆盖级别低的css。在[css之!important] 这篇文章的最下面曾简单地提到过这层级关系，这里我们只需要知道css可以被覆盖的。既然前面的可以被覆盖，浏览器在他完全加载完毕之后再去渲染无疑也是 合情合理的很多浏览器下，如IE，把样式表放在页面的底部的问题在于它禁止了网页内容的顺序显示。浏览器阻止显示以免重画页面元素，那用户只能看到空白页 了。Firefox不会阻止显示，但这意味着当样式表下载后，有些页面元素可能需要重画，这导致闪烁问题。所以我们应该尽快让css加载完毕

顺着这层意思，如果我们再细究的话，其实还有可以优化的地方。比如本站上面包含的两个css文件，<pre><linkrel=“stylesheet” rev=“stylesheet”href=“http://www.space007.com/themes/google/style/google.css” type=“text/css” media=“screen”/> 和<link rel=“stylesheet” rev=“stylesheet” href=“http://www.space007.com/css/print.css”type=“text/css” media=“print” />。<</pre> 从media就可以看出第一个css是针对浏览器的，第二个css文件是针对打印样式的。从用户的行为习惯上来将，要打印页面的动作一定是发生在页面页面 显示出来之后的。所以比较好的方法应该是在页面加载完毕之后再动态地为这张页面加上针对打印设备的css，这样又可以提高一点速度。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>6. 将脚本移动到底部（包括内联的） [javascript]</p><div>
					将脚本放在页面最下面的目的有那么两点： 1、 因为防止script脚本的执行阻塞页面的下载。在页面loading的过程中，当浏览器读到js执行语句的时候一定会把它全部解释完毕后在会接下来读下 面的内容。不信你可以写一个js死循环看看页面下面的东西还会不会出来。(setTimeout 和 setInterval的执行有点类似于多线程，在相应的响应时间之前也会继续下面的内容渲染。)浏览器这么做的逻辑是因为js随时可能执 行 location.href或是其他可能完全中断此页面过程的函数，即如此，当然得等他执行完毕之后再加载咯。所以放在页面最后，可以有效减少页面可 视元素的加载时间。 2、脚本引起的第二个问题是它阻塞并行下载数量。HTTP/1.1规范建议浏览器每个主机的并行下载数不超过2个(IE只能为2个，其他浏览器如ff等都 是默认设置为2个，不过新出的ie8可以达6个)。因此如果您把图像文件分布到多台机器的话，您可以达到超过2个的并行下载。但是当脚本文件下载时，浏览 器不会启动其他的并行下载。

当然对各个网站来说，把脚本都放到页面底部加载的可行性还是值得商榷的。就比如阿里巴巴中文站的页面。很多地方有内联的js，页面的显示严重依赖于此，我承认这和无侵入脚本的理念相差甚远，但是很多“历史遗留问题”却不是那么容易解决的。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>7. 避免使用 CSS 中的 Expressions [css]</p><div>
					11
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>8. 将 JavaScript 和 CSS 独立成外部文件 [javascript] [css]</p><div>
					不仅从性能优化上会这么做，用代码易于维护的角度看也应该这么做。把css和js写在页面内容可以减少2次请求，但也增 大了页面的大小。如果已经对css和js做了缓存，那也就没有2次多余的http请求了。当然，我在前面中也说过，有些特殊的页面开发人员还是会选择内联 的css和js文件。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>9. 减少 DNS 查询 [content]</p><div>
					在 Internet上域名与IP地址之间是一一对应的，域名(kuqin.com)很好记，但计算机不认识，计算机之间的“相认”还要转成ip地址。在网络 上每台计算机都对应有一个独立的ip地址。在域名和ip地址之间的转换工作称为域名解析，也称DNS查询。一次DNS的解析过程会消耗20-120毫秒的 时间,在dns查询结束之前，浏览器不会下载该域名下的任何东西。所以减少dns查询的时间可以加快页面的加载速度。yahoo的建议一个页面所包含的域 名数尽量控制在2-4个。这就需要对页面整体有一个很好的规划。目前我们这点做的不好，很多打点的广告投放系统拖累了我们。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>10. 压缩 JavaScript 和 CSS (包括内联的) [javascript] [css]</p><div>
					压缩js和css的左右很显然，减少页面字节数。容量小页面加载速度自然也就快。而且压缩除了减少体积以外还可以起到一定的保护左右。这点我们做得 不错。常用的压缩工具有JsMin、YUI compressor等。另外像http://dean.edwards.name/packer/还给我们提供了一个非常方便的在线压缩工具。你可以在 jQuery的网页看到压缩过的js文件和没有压缩过的js文件的容量差别：
当然，压缩带来的一个弊端就是代码的可读性没了。相信很多做前端的朋友都遇到过这个问题：看Google的效果很酷，可是去看他的源代码却是一大堆 挤在一起的字符，连函数名都是替换过的，汗死!自己的代码也这样岂不是对维护非常不方便。所有阿里巴巴中文站目前采用的做法是在js和css发布的时候在 服务器端进行压缩。这样在我们很方便地维护自己的代码。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>11. 避免重定向 [server]</p><div>
					不久前在ieblog上看到过《Internet Explorer and Connection Limits》 这篇文章，比如 当你输入http://www.kuqin.com/ 的时候服务器会自动产生一个301服务器转向 http://www.kuqin.com/ ，你看浏览器的地址栏就能看出来。这种重定向自然也是需要消耗时间的。当然这只是一个例子，发生重定向的原因还有很多，但是不变的是每增加一次重定向就会 增加一次web请求，所以因该尽量减少。
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>12. 移除重复的脚本 [javascript]</p><div>
					11
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>13. 配置实体标签（ETags） [css]</p><div>
					11
				</div></li>
				<li :class="{'active': isActive}" @click="showHide($event)"><p>14. 使 AJAX 缓存</p><div>
					ajax还要去缓存?做ajax请求的时候往往还要增加一个时间戳去避免他缓存。It’s important to remember that “asynchronous” does not imply “instantaneous”.(记住“异步”不是“瞬间”这一点很重要)。记住，即使AJAX是动态产生的而且只对一个用户起作用，他们依然可以被缓 存。
目前能做到的就是关于css方面的，拼图，压缩减少冗余，合理书写分类.
				</div></li>
			</ul>
		</div>
		<div class="section">
			<h3 class="bg-danger">9.当项目的某个模块发生问题了，你是怎么定位错误的？你常用的调试工具是什么？</h3>
		</div>

		<div class="section">
			<h3 class="bg-danger">
				11.请写个正则表达式匹配所有二级域名是9game.cn和其目录下的网址，比如：
			</h3>
			<p class="bg-analysis">
				http://abc.9game.cn/sname/view/
			</p>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      isActive: false,
      code1: `a.length === 0 ? a.push(1) : a.shift();`,
      code2: `var test = (function(a) {    
				this.a = a;    
				return function(b) {        
				return this.a + b;
				    }
				} (function(a, b) {    
				return a;
				}(1, 2))); 

				console.log(test(4)); `,
	   code3: `var lis = "",
					ul = document.createElement("ul");
					//把li以字符串形式生成
					for(var i = 1; i <= 10; i++) {
					    lis += "<li>第" + i + "行</li>";
					}// 最后通过innerHTML插入ul里面
					ul.innerHTML = lis;
					//这里才操作dom，把ul插入到body
					document.body.appendChild(ul); `,
		code4: `var arr = [],
		  			i = 0;
		  		var interval = setInterval(()=>{
		  			i < 100 ? arr.push(i++) : clearInterval(interval);
		  		}, 0);`,
		code5: `
			var arr = Array(100).join(',').split(',').map((item, index)=>index)
			console.log(arr)
			`,
		code6: `
			var arr = [1,4,2,100,99,5,6,7,120,28,88],
				flag = 1;
			arr.sort((a, b)=>{
				flag = (Math.random() > 0.5) ? 1 : -1;
				return (a - b) * flag;
			})
			console.log(arr)
		`,
		code7: `
			let sum = 0;
	  		sum = Array(100).join(',').split(',').map((item, index)=>{
	  			index++;
	  			return index;
	  		}).reduce((prev, cur)=>prev+cur)
		`,
		code8: `
			function Animal(name) {
  			// 属性
  			this.name = name || 'Animal'

  			//实例方法
  			this.sleep = () => this.name + 'is sleeping now'
	  		}

	  		Animal.prototype.eat = food => this.name + 'is eating ' + food + ' now!'

	  		function Cat() {
	  		}
	  		Cat.prototype = new Animal()
	  		Cat.prototype.name = 'cat'

	  		let cat = new Cat()
	  		console.log(cat.name) // cat
	  		console.log(cat.eat('fish')) // is eating fish now!
	  		cat.sleep()  // catis sleeping now
	  		console.log(cat instanceof Animal); //true 
			console.log(cat instanceof Cat); //true
		`,
		code9: `
			function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' sleeping now'
	  		}

	  		function Cat(name) {
	  			Animal.call(this)
	  			this.name = name || 'Bom'
	  		}
	  		let cat = new Cat()
	  		console.log(cat) // cat
	  		cat.sleep()	// Bom is sleeping now
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true
		`,
		code10: `
			function Animal(name) {
  			this.name = name || 'Animal'
  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
	  			let ins = new Animal()
	  				ins.name = name || 'Gom'
	  				return ins
	  		}

	  		let cat = new Cat()
	  		console.log(cat.name)	// Gom
	  		console.log(cat.sleep()); // Gom is sleeping now
			console.log(cat instanceof Animal); // true
			console.log(cat instanceof Cat); // false
		`,
		code11: `
			function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
	  			let cat = new Animal()
	  			for(let c in cat){
	  				Cat.prototype[c] = cat[c]
	  			}
	  			Cat.prototype.name = name || 'Fom'
	  		}
	  		let cat = new Cat()
	  		console.log(cat.name) // Fom
	  		console.log(cat.sleep())
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true`,
		code12: `
			function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
	  			Animal.call(this)
	  			this.name = name || 'Hom'
	  		}
	  		Cat.prototype = new Animal
	  		let cat = new Cat()
	  		console.log(cat.name) // Hom
	  		console.log(cat.sleep()) // Hom is sleeping now
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true`,
		code13: `
			function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
				Animal.call(this)
	  			this.name = name || 'Pom'
	  		}
	  		(()=>{
	  			function Super() {}
	  			Super.prototype = Animal.prototype
	  			 Cat.prototype = new Super()	
	  		})()
	  		let cat = new Cat()
	  		console.log(cat.name) // Pom
	  		console.log(cat.sleep()) // Pom is sleeping now
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true
			`
      
    }
  },
  methods: {
  		showHide(e) {
  			 this.isActive = !this.isActive
  			 // e.currentTarget.querySelector("div").style.display = "block"
  			 this.isActive ? e.currentTarget.querySelector("div").style.display = "none" : e.currentTarget.querySelector("div").style.display = "block"

  		},
	  	func() {
	  		var arr = [],
	  			i = 0;
	  		var interval = setInterval(()=>{
	  			i < 100 ? arr.push(i++) : clearInterval(interval);
	  		}, 0);
	  		return arr;
	  	},
	  	func2() {
	  		let sum = 0;
	  		sum = Array(100).join(',').split(',').map((item, index)=>{
	  			index++;
	  			return index;
	  		}).reduce((prev, cur)=>prev+cur)
	  	},
	  	func3() {
	  		function Animal(name) {
	  			// 属性
	  			this.name = name || 'Animal'

	  			//实例方法
	  			this.sleep = () => this.name + 'is sleeping now'
	  		}

	  		Animal.prototype.eat = food => this.name + 'is eating ' + food + ' now!'

	  		function Cat() {
	  		}
	  		Cat.prototype = new Animal()
	  		Cat.prototype.name = 'cat'

	  		let cat = new Cat()
	  		console.log(cat.name) // cat
	  		console.log(cat.eat('fish')) // is eating fish now!
	  		cat.sleep()  // catis sleeping now
	  		console.log(cat instanceof Animal); //true 
			console.log(cat instanceof Cat); //true
	  	},
	  	func4() {
	  		function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' sleeping now'
	  		}

	  		function Cat(name) {
	  			Animal.call(this)
	  			this.name = name || 'Bom'
	  		}
	  		let cat = new Cat()
	  		console.log(cat) // Bom
	  		cat.sleep()	// Bom is sleeping now
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true
	  	},
	  	func5() {
	  		function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
	  			let ins = new Animal()
	  				ins.name = name || 'Gom'
	  				return ins
	  		}

	  		let cat = new Cat()
	  		console.log(cat.name)	// Gom
	  		console.log(cat.sleep()); // Gom is sleeping now
			console.log(cat instanceof Animal); // true
			console.log(cat instanceof Cat); // false
	  	},
	  	func6() {
	  		function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
	  			let cat = new Animal()
	  			for(let c in cat){
	  				Cat.prototype[c] = cat[c]
	  			}
	  			Cat.prototype.name = name || 'Fom'
	  		}
	  		let cat = new Cat()
	  		console.log(cat.name) // Fom
	  		console.log(cat.sleep())
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true
	  	},
	  	func7() {
	  		function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
	  			Animal.call(this)
	  			this.name = name || 'Hom'
	  		}
	  		Cat.prototype = new Animal
	  		let cat = new Cat()
	  		console.log(cat.name) // Hom
	  		console.log(cat.sleep()) // Hom is sleeping now
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true

	  	},
	  	func8() {
	  		function Animal(name) {
	  			this.name = name || 'Animal'
	  			this.sleep = () => this.name + ' is sleeping now'
	  		}
	  		function Cat(name) {
				Animal.call(this)
	  			this.name = name || 'Pom'
	  		}
	  		(()=>{
	  			function Super() {}
	  			Super.prototype = Animal.prototype
	  			 Cat.prototype = new Super()	
	  		})()
	  		let cat = new Cat()
	  		console.log(cat.name) // Pom
	  		console.log(cat.sleep()) // Pom is sleeping now
	  		console.log(cat instanceof Animal); // false
			console.log(cat instanceof Cat); // true

	  	}
  }
}
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../../static/stylus/base.styl'
	
    div
    	word-break break-all
    	word-wrap break-wrd
    ul
    	&.special
	    	li:hover
	    		background-color #FF695E
	    		color #fff    	
	    &.deficiency	
	    	li:hover
	    		background-color #1B1C1D
	    		color #fff    
    	li
    		div
    			display none;
    	li.active
	    		div
	    			display: block


</style>