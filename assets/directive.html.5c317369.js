import{_ as a,c as t}from"./app.5429d6a3.js";const n={},s=t(`<h1 id="v-translate" tabindex="-1"><a class="header-anchor" href="#v-translate" aria-hidden="true">#</a> <code>v-translate</code></h1><h2 id="basic-usage" tabindex="-1"><a class="header-anchor" href="#basic-usage" aria-hidden="true">#</a> Basic usage</h2><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-translate</span><span class="token punctuation">&gt;</span></span>Hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h3><p>Variables for message interpolation must be passed as value to the <code>v-translate</code> directive directly.</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-translate</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ name: <span class="token punctuation">&#39;</span>Jessica<span class="token punctuation">&#39;</span> }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Hello %{ name }!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="pluralization" tabindex="-1"><a class="header-anchor" href="#pluralization" aria-hidden="true">#</a> Pluralization</h3><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> 
 <span class="token attr-name">v-translate</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ amount: 2 }<span class="token punctuation">&quot;</span></span>
 <span class="token attr-name">:translate-n</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span>
 <span class="token attr-name">translate-plural</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>%{ amount } cars<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>
  %{ amount } car
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h2><table><thead><tr><th>Prop</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>v-translate</td><td><strong>Required</strong>. You can optionally provide an object with parameters for message interpolation</td><td>object</td><td>null</td></tr><tr><td>translate-n</td><td>Determines what plural form to apply to the message</td><td>number</td><td>null</td></tr><tr><td>translate-plural</td><td>Pluralized message</td><td>string</td><td>null</td></tr><tr><td>translate-context</td><td>Gettext translation context</td><td>string</td><td>null</td></tr><tr><td>translate-comment</td><td>Comment for the message id</td><td>string</td><td>null</td></tr><tr><td>render-html</td><td>Will disable HTML escaping and render it directly</td><td>boolean</td><td>false</td></tr></tbody></table>`,10);function e(p,l){return s}var o=a(n,[["render",e]]);export{o as default};