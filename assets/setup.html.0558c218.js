import{_ as i,o,c as r,d as e,b as s,e as t,a,r as l}from"./app.953975e4.js";const c={},d=e("h1",{id:"setup",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#setup","aria-hidden":"true"},"#"),t(" Setup")],-1),u=e("h2",{id:"prerequisites",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#prerequisites","aria-hidden":"true"},"#"),t(" Prerequisites")],-1),p=t("Vue 3 Gettext provides scripts to automatically extract translation messages into gettext "),h={href:"https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html",target:"_blank",rel:"noopener noreferrer"},g=t("PO files"),_=t(" and, after translation, merge those into a JSON file that can be used in your application. You must install the GNU gettext utilities for those scripts to work:"),m=a(`<p><strong>Ubuntu/Linux:</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gettext
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>macOS:</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>brew <span class="token function">install</span> gettext
brew <span class="token function">link</span> --force gettext
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Windows:</strong></p>`,5),v=t("On Windows, you have multiple options. You can run the scripts and install gettext under WSL2 like you would with regular Ubuntu (recommended) or install gettext via mingw64 or cygwin. You may also find precompiled binaries "),b={href:"https://mlocati.github.io/articles/gettext-iconv-windows.html",target:"_blank",rel:"noopener noreferrer"},f=t("here"),x=t("."),k=a(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><p>Install Vue 3 Gettext using <code>npm</code> or <code>yarn</code>:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> i vue3-gettext@next
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3);function w(y,N){const n=l("ExternalLinkIcon");return o(),r("div",null,[d,u,e("p",null,[p,e("a",h,[g,s(n)]),_]),m,e("p",null,[v,e("a",b,[f,s(n)]),x]),k])}var O=i(c,[["render",w],["__file","setup.html.vue"]]);export{O as default};