import{_ as c,o as l,c as i,d as n,b as a,w as u,a as t,e as s,r as p}from"./app.d54a206d.js";const d={},r=t(`<h1 id="\u5168\u5C40\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u5C5E\u6027" aria-hidden="true">#</a> \u5168\u5C40\u5C5E\u6027</h1><p>\u5728 <code>&lt;template&gt;</code> \u6A21\u677F\u4E2D\u53EF\u4EE5\u4F7F\u7528\u7FFB\u8BD1\u51FD\u6570\uFF0C\u5F53\u7136\u5728 scripts \u4EE3\u7801\u4E2D\u4E5F\u53EF\u4EE5\u3002</p><h2 id="\u7FFB\u8BD1\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u7FFB\u8BD1\u51FD\u6570" aria-hidden="true">#</a> \u7FFB\u8BD1\u51FD\u6570</h2><h3 id="gettext" tabindex="-1"><a class="header-anchor" href="#gettext" aria-hidden="true">#</a> <code>$gettext</code></h3><p>\u666E\u901A\u7FFB\u8BD1\u51FD\u6570</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $gettext(&quot;My message&quot;) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> $gettext <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGettext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">$gettext</span><span class="token punctuation">(</span><span class="token string">&quot;My message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u53C2\u6570\u63D2\u503C" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u63D2\u503C" aria-hidden="true">#</a> \u53C2\u6570\u63D2\u503C</h4><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $gettext(&quot;My message for %{ name }&quot;, { name: &quot;Rudi&quot; }) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pgettext" tabindex="-1"><a class="header-anchor" href="#pgettext" aria-hidden="true">#</a> <code>$pgettext</code></h3><p>\u4E0A\u4E0B\u6587\u7FFB\u8BD1\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E0A\u4E0B\u6587\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u5F85\u7FFB\u8BD1\u5185\u5BB9\u3002</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $pgettext(&quot;my_context&quot;, &quot;My message&quot;) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> $pgettext <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGettext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">$pgettext</span><span class="token punctuation">(</span><span class="token string">&quot;my_context&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;My message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u53C2\u6570\u63D2\u503C-1" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u63D2\u503C-1" aria-hidden="true">#</a> \u53C2\u6570\u63D2\u503C</h4><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $pgettext(&quot;my_context&quot;, &quot;My message for %{ name }&quot;, { name: &quot;Rudi&quot; }) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ngettext" tabindex="-1"><a class="header-anchor" href="#ngettext" aria-hidden="true">#</a> <code>$ngettext</code></h3><p>\u7528\u4E8E\u652F\u6301\u590D\u6570\u7FFB\u8BD1\u3002</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $ngettext(&quot;apple&quot;, &quot;apples&quot;, 5) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> $ngettext <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGettext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">$ngettext</span><span class="token punctuation">(</span><span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;apples&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u53C2\u6570\u63D2\u503C-2" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u63D2\u503C-2" aria-hidden="true">#</a> \u53C2\u6570\u63D2\u503C</h4><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $ngettext(&quot;apple for %{ name }&quot;, &quot;apples for %{ name }&quot;, 5, { name: &quot;Rudi&quot; }) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npgettext" tabindex="-1"><a class="header-anchor" href="#npgettext" aria-hidden="true">#</a> <code>$npgettext</code></h3><p>\u5E26\u4E0A\u4E0B\u6587\u7684\u590D\u6570\u7FFB\u8BD1\u3002</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $npgettext(&quot;my_context&quot;, &quot;apple&quot;, &quot;apples&quot;, 5) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> $npgettext <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGettext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">$npgettext</span><span class="token punctuation">(</span><span class="token string">&quot;my_context&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;apples&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u53C2\u6570\u63D2\u503C-3" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u63D2\u503C-3" aria-hidden="true">#</a> \u53C2\u6570\u63D2\u503C</h4><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $npgettext(&quot;my_context&quot;, &quot;apple for %{ name }&quot;, &quot;apples for %{ name }&quot;, 5, { name: &quot;Rudi&quot; }) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="language" tabindex="-1"><a class="header-anchor" href="#language" aria-hidden="true">#</a> <code>$language</code></h3><p>\u8FD9\u4E2A\u5C5E\u6027\u662F\u63D2\u4EF6\u5B9E\u4F8B\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8FD9\u4E2A\u5C5E\u6027\u8BBF\u95EE\u63D2\u4EF6\u5B9E\u4F8B\u7684\u5C5E\u6027/\u65B9\u6CD5\u3002\u6BD4\u5982\u53EF\u4EE5\u62FF\u5230\u5F53\u524D\u8BED\u8A00\uFF1A</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $language.current }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> gettext <span class="token operator">=</span> <span class="token function">useGettext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gettext<span class="token punctuation">.</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gettextinterpolate" tabindex="-1"><a class="header-anchor" href="#gettextinterpolate" aria-hidden="true">#</a> <code>$gettextInterpolate</code></h3><div style="margin-top:1rem;" class="warning"> \u8FD9\u4E2A\u5E2E\u52A9\u51FD\u6570\u5DF2\u7ECF\u4E0D\u9700\u8981\u4F7F\u7528\u4E86\uFF0C\u56E0\u4E3A\u4E0A\u9762\u7684\u7FFB\u8BD1\u51FD\u6570\u5DF2\u7ECF\u652F\u6301\u4E86\u53C2\u6570\u63D2\u503C\u3002 </div><p>\u8FD9\u662F\u4E00\u4E2A\u7528\u4E8E\u652F\u6301\u53C2\u6570\u63D2\u503C(\u683C\u5F0F\u5316\u53C2\u6570)\u7684\u5E2E\u52A9\u51FD\u6570\u3002</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  {{ $gettextInterpolate($pgettext(&quot;My message for %{ name }&quot;), { name: &quot;Rudi&quot; }) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> interpolate <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGettext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">interpolate</span><span class="token punctuation">(</span><span class="token function">$gettext</span><span class="token punctuation">(</span><span class="token string">&quot;My message for %{ name }&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&quot;Rudi&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u81EA\u5B9A\u4E49\u7FFB\u8BD1\u51FD\u6570\u540D\u79F0" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u7FFB\u8BD1\u51FD\u6570\u540D\u79F0" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u7FFB\u8BD1\u51FD\u6570\u540D\u79F0</h3>`,37),k=s("\u4F60\u53EF\u4EE5\u5728 "),v=n("code",null,"createGettext",-1),g=s(" \u65F6\u901A\u8FC7 "),m=n("code",null,"globalProperties",-1),h=s(" \u9009\u9879\u81EA\u5B9A\u4E49\u7FFB\u8BD1\u51FD\u6570\u7684\u540D\u79F0\uFF0C\u53C2\u89C1 "),b=s("\u63D2\u4EF6\u914D\u7F6E"),x=s("\u3002"),_=t(`<p>\u4F8B\u5982\uFF0C\u8981\u4F7F\u7528 WordPress \u7684\u7FFB\u8BD1\u540D\u79F0\u98CE\u683C\uFF0C\u53EF\u4EE5\u4F5C\u5982\u4E0B\u914D\u7F6E\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createGettext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue3-gettext&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> gettext <span class="token operator">=</span> <span class="token function">createGettext</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span>
  globalProperties<span class="token operator">:</span> <span class="token punctuation">{</span>
    gettext<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;$gettext&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;__&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// \u8FD9\u6837\u652F\u6301\u540C\u65F6\u4F7F\u7528 $gettext, __ \u4E24\u79CD\u65B9\u5F0F</span>
    ngettext<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;$ngettext&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;_n&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    pgettext<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;$pgettext&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;_x&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    npgettext<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;$npgettext&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;_nx&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="html-\u8F6C\u4E49" tabindex="-1"><a class="header-anchor" href="#html-\u8F6C\u4E49" aria-hidden="true">#</a> Html \u8F6C\u4E49</h2>`,3),q=s("\u9ED8\u8BA4\u5730\uFF0C\u6240\u6709\u7684\u7FFB\u8BD1\u51FD\u6570\u90FD\u4F1A\u8FDB\u884C html \u8F6C\u4E49\uFF0C\u4E0D\u8FC7\u4E5F\u53EF\u4EE5\u901A\u8FC7\u6700\u540E\u4E00\u4E2A\u53C2\u6570 "),f=n("code",null,"disableHtmlEscaping",-1),y=s(" \u6765\u63A7\u5236\u662F\u5426\u8F6C\u4E49\u3002 \u5982\u679C\u786E\u5B9E\u9700\u8981\u5305\u542B html \u6807\u7B7E\uFF0C\u4F60\u9700\u8981\u6307\u5B9A\u8BE5\u53C2\u6570\u4E3A true \u4EE5\u907F\u514D\u8F6C\u4E49\uFF0C\u5E76\u4E14\u5C06\u7ED3\u679C\u901A\u8FC7 "),$={href:"https://cn.vuejs.org/api/built-in-directives.html#v-html",target:"_blank",rel:"noopener noreferrer"},w=n("code",null,"v-html",-1),G=s(" \u6765\u663E\u793A:"),M=t(`<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-html</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$gettext(<span class="token punctuation">&#39;</span>My %{name}<span class="token punctuation">&#39;</span>, { name: <span class="token punctuation">&#39;</span>&lt;b&gt;Rudi&lt;/b&gt;<span class="token punctuation">&#39;</span> }, true)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),R=s("\u8BF7\u8C28\u614E\u4F7F\u7528 "),E={href:"https://cn.vuejs.org/api/built-in-directives.html#v-html",target:"_blank",rel:"noopener noreferrer"},I=n("code",null,"v-html",-1),L=s("\u3002\u4E0D\u8981\u5C06\u7528\u6237\u8F93\u5165\u7684\u5185\u5BB9\u7528\u4E8E v-html\uFF0C\u5426\u5219\u53EF\u80FD\u5F15\u8D77 XSS \u653B\u51FB\u3002");function N(V,B){const o=p("RouterLink"),e=p("ExternalLinkIcon");return l(),i("div",null,[r,n("p",null,[k,v,g,m,h,a(o,{to:"/zh/configuration.html"},{default:u(()=>[b]),_:1}),x]),_,n("p",null,[q,f,y,n("a",$,[w,a(e)]),G]),M,n("p",null,[R,n("a",E,[I,a(e)]),L])])}var S=c(d,[["render",N],["__file","functions.html.vue"]]);export{S as default};
