_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[44],{"0oBi":function(e,t,a){"use strict";var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.isDarkMode=function(){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return!0;return!1},t.useDarkMode=function(){var e=d.default.useState(!1),t=(0,r.default)(e,2),a=t[0],n=t[1];return(0,c.default)((function(){var e=window.matchMedia("(prefers-color-scheme: dark)"),t=function(){n(window.matchMedia("(prefers-color-scheme: dark)").matches)};return t(),e.addListener(t),function(){e.removeListener(t)}}),[]),a};var r=n(a("nxTg")),d=n(a("mXGw")),c=n(a("YO29"))},"1udM":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/generated/gem",function(){return a("iHTC")}])},"63Ad":function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},"6f/q":function(e,t,a){"use strict";var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("RiSW")),d=n(a("mXGw")),c=n(a("9fEB")),o=a("GDok"),l=a("nZpd"),s=a("AFBu"),u=a("0oBi"),i=function(e){var t=e.children,a=(0,r.default)(e,["children"]),n=d.default.useState(!1);d.default.useEffect((function(){if("undefined"!==typeof document)return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)};function e(e){"/"===e.key&&(document.getElementById("search").focus(),e.preventDefault())}}),[]);var i=(0,u.useDarkMode)();return d.default.createElement(l.MobileMenuContext.Provider,{value:a.menuState||n},d.default.createElement(c.default,null,d.default.createElement("link",{rel:"shortcut icon",media:"(prefers-color-scheme:dark)",href:(0,s.formatPath)(i?"favicon-dark.png":"favicon.png")})),d.default.createElement("div",{id:"ignite",className:"min-h-screen flex flex-col dark:bg-gray-1000"},d.default.createElement(o.NavBar,{sections:["docs","blog"],hasHomePage:!0}),t))};t.default=i},AFBu:function(e,t,a){"use strict";var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.formatPath=function(e){return r.default.join("/auto","/".concat(e.replace(/\.mdx$/,"")))},t.postFixHTML=function(e){return e};var r=n(a("R8iU"))},C3pV:function(e,t,a){"use strict";(function(e){var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.Sidebar=t.SidebarActiveItem=void 0;var r=n(a("OvAC")),d=n(a("RiSW")),c=n(a("nxTg")),o=n(a("mXGw")),l=n(a("5dyF")),s=n(a("9fEB")),u=n(a("R8iU")),i=n(a("PDtE")),m=a("/FXl"),p=a("bBV7"),f=a("nZpd"),b=a("AFBu");function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(Object(a),!0).forEach((function(t){(0,r.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var h=o.default.createContext({pathname:"",sidebarFileLocation:""});t.SidebarActiveItem=h;var O=function(e){var t=e.href,a=e.children,n=o.default.useContext(h),r=(0,m.useMDXComponents)().SidebarLink,d=u.default.join(n.sidebarFileLocation,t),c=t;return n.sidebarFileLocation&&((c=d).endsWith("/index")&&(c=c.replace("/index","")),c.endsWith("/")&&(c=c.slice(0,-1))),o.default.createElement(l.default,{passHref:!0,href:(0,b.postFixHTML)(c)},o.default.createElement(r,{isActive:n.pathname.replace("/index","")===(0,b.formatPath)(c)},a))};t.Sidebar=function(t){var n=t.links,r=t.folder,l=o.default.useContext(f.MobileMenuContext),x=(0,c.default)(l,1)[0],j="/".concat(r),v=function(e){try{return a("f+ue")("./pages"+e+"/_sidebar.mdx").default}catch(t){try{return a("NDOZ")("./pages"+e+"/_sidebar.js").default}catch(t){}}}(j),N=function(t){var a=(0,p.useRouter)(),n="phase-production-build"!==e.env.NEXT_PHASE&&a.pathname.includes("/auto")?u.default.relative("/auto",a.pathname):u.default.relative("/",a.pathname),r=t.find((function(e){return e.__resourcePath.replace(".mdx","")===n}));return r||(r=t.find((function(e){var t=e.__resourcePath.replace(".mdx","");return t.endsWith("index")&&a.pathname.includes(t.replace("/index",""))}))),{title:r.title||"auto",pathname:(0,b.formatPath)(r.__resourcePath)}}(n),k=(0,m.useMDXComponents)(),E=k.SidebarItemWrapper,w=(k.SidebarLink,k.SidebarTitle),y=k.SidebarDivider,_=k.SidebarList,M=k.Sidebar,P=(0,d.default)(k,["SidebarItemWrapper","SidebarLink","SidebarTitle","SidebarDivider","SidebarList","Sidebar"]);return o.default.createElement(h.Provider,{value:g({},N,{sidebarFileLocation:v?j:""})},o.default.createElement(m.MDXProvider,{components:g({},P,{li:E,ul:_,a:O,p:w,hr:y})},o.default.createElement(s.default,null,o.default.createElement("title",null,N.title.replace(/\\`/g,"`"))),o.default.createElement(M,{className:(0,i.default)(!x&&"hidden","lg:block")},v?o.default.createElement(v,null):o.default.createElement(_,null,n.map((function(e){return o.default.createElement(E,{key:e.__resourcePath},o.default.createElement(O,{href:e.__resourcePath},e.title))}))))))}}).call(this,a("5IsQ"))},GDok:function(e,t,a){"use strict";var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.NavBar=void 0;var r=n(a("nxTg")),d=n(a("8VmE")),c=n(a("RiSW")),o=n(a("mXGw")),l=n(a("5dyF")),s=a("V5Fo"),u=a("/FXl"),i=n(a("PDtE")),m=a("nZpd"),p=a("AFBu"),f=function(e){var t=e.className,a=(0,c.default)(e,["className"]);return o.default.createElement("svg",(0,d.default)({className:(0,i.default)("fill-current w-5 h-5",t),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},a),o.default.createElement("path",{d:"M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"}))},b=function(){var e=(0,u.useMDXComponents)().SearchInput;return o.default.createElement("div",{className:"relative h-full flex items-center w-full lg:w-auto lg:flex-1 lg:mr-4 px-4"},o.default.createElement(e,null))};t.NavBar=function(e){var t=e.sections,a=e.hasHomePage,n=o.default.useContext(m.MobileMenuContext),d=(0,r.default)(n,2),c=d[0],i=d[1],x=(0,u.useMDXComponents)(),g=x.Logo,h=x.NavBarWrapper,O=x.NavBar,j=x.NavBarItem,v=x.MobileMenuButton;return o.default.createElement(o.default.Fragment,null,o.default.createElement(h,null,o.default.createElement(O,null,a?o.default.createElement(l.default,{passHref:!0,href:"/"},o.default.createElement(g,null)):o.default.createElement(g,null),o.default.createElement("div",{className:"w-full h-full flex items-center lg:flex flex-1 lg:max-w-screen-md lg:mx-auto"},o.default.createElement(b,null),o.default.createElement(v,{open:c,setOpen:i,className:"lg:hidden"}),o.default.createElement("div",{className:"hidden lg:flex h-full"},t.map((function(e){return o.default.createElement(l.default,{passHref:!0,key:e,href:(0,p.postFixHTML)("/".concat(e))},o.default.createElement(j,null,(0,s.titleCase)(e)))})),o.default.createElement(j,{href:"https://github.com/intuit/auto",target:"_blank","aria-label":"Open on GitHub"},o.default.createElement(f,null)))))),c&&o.default.createElement("div",{className:"lg:hidden"},t.map((function(e){return o.default.createElement(l.default,{passHref:!0,key:e,href:(0,p.postFixHTML)("/".concat(e))},o.default.createElement(j,null,(0,s.titleCase)(e)))})),o.default.createElement(j,{href:"https://github.com/intuit/auto",target:"_blank"},o.default.createElement(f,{className:"mr-2"}),"Open on GitHub")))}},iHTC:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return u})),a.d(t,"default",(function(){return p}));var n=a("Fcif"),r=a("dV/x"),d=a("mXGw"),c=a.n(d),o=a("/FXl"),l=a("pu0P"),s=a.n(l),u=(c.a.createElement,{title:"Gem Plugin",layout:"docs",date:null,author:"",email:"",__resourcePath:"docs/generated/gem.mdx",__scans:{}}),i={frontMatter:u},m=s.a;function p(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.mdx)(m,Object(n.a)({},i,a,{components:t,mdxType:"MDXLayout"}),Object(o.mdx)("p",null,"A plugin that automates publishing ruby gems."),Object(o.mdx)("h2",{id:"prerequisites"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#prerequisites"}),"Prerequisites")),Object(o.mdx)("p",null,"To publish to your gem you will need you your environment authenticated.\nYou can either create a ",Object(o.mdx)("inlineCode",{parentName:"p"},"~/.gem/credentials")," yourself or provide ",Object(o.mdx)("inlineCode",{parentName:"p"},"RUBYGEMS_API_KEY")," as an environment variable."),Object(o.mdx)("p",null,"This plugin also looks in your ",Object(o.mdx)("inlineCode",{parentName:"p"},".gemspec")," and ",Object(o.mdx)("inlineCode",{parentName:"p"},"lib/**/version.rb")," for a version.\n",Object(o.mdx)("inlineCode",{parentName:"p"},"auto")," will use this value and keep it up to date."),Object(o.mdx)("h2",{id:"installation"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#installation"}),"Installation")),Object(o.mdx)("p",null,"This plugin is not included with the ",Object(o.mdx)("inlineCode",{parentName:"p"},"auto")," CLI installed via NPM. To install:"),Object(o.mdx)("pre",{className:"language-bash"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"npm")," i --save-dev @auto-it/gem\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"# or"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"yarn")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"add")," -D @auto-it/gem\n")),Object(o.mdx)("blockquote",null,Object(o.mdx)("p",{parentName:"blockquote"},'WARNING: You can only use one "package manager" at a time!\nMixing them will lead to undesired results.')),Object(o.mdx)("h2",{id:"usage"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#usage"}),"Usage")),Object(o.mdx)("pre",{className:"language-json"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"plugins"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"gem"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(o.mdx)("h2",{id:"options"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#options"}),"Options")),Object(o.mdx)("h3",{id:"release-command"},Object(o.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#release-command"}),"Release Command")),Object(o.mdx)("p",null,"When ",Object(o.mdx)("inlineCode",{parentName:"p"},"auto")," publishes you gem it does it by running a command.\nThe default for this is ",Object(o.mdx)("inlineCode",{parentName:"p"},"bundle exec rake release"),"."),Object(o.mdx)("p",null,"The following is an example of using ",Object(o.mdx)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/svenfuchs/gem-release"}),"gem-release")," to publish the gem."),Object(o.mdx)("blockquote",null,Object(o.mdx)("p",{parentName:"blockquote"},"Make sure to tag and push in this command!")),Object(o.mdx)("p",null,Object(o.mdx)("strong",{parentName:"p"},".autorc:")),Object(o.mdx)("pre",{className:"language-json"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"plugins"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),"\n    ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),"\n      ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"gem"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n      ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n        ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"releaseCommand"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"gem release --tag --push"'),"\n      ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n    ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")))}p.isMDXComponent=!0},nZpd:function(e,t,a){"use strict";var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.MobileMenuContext=void 0;var r=n(a("mXGw")).default.createContext([!1,function(){}]);t.MobileMenuContext=r},pu0P:function(e,t,a){"use strict";var n=a("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("nxTg")),d=n(a("mXGw")),c=n(a("R8iU")),o=a("/FXl"),l=n(a("PDtE")),s=a("C3pV"),u=n(a("6f/q")),i=n(a("x3GE")),m=/([^`]*)`([^`]*)`(.*)/m;var p=function(e){var t=e.children,a=e.frontMatter,n=d.default.useState(!1),p=(0,r.default)(n,2),f=p[0],b=p[1],x=(0,o.useMDXComponents)(),g=a.__resourcePath.split("/")[0],h=(0,i.default)(),O=["index.mdx","blog/both-worlds.mdx","blog/npm-canary-scope.mdx","blog/pr-in-progress.mdx","blog/using-shipit.mdx","blog/v8.mdx","blog/why.mdx","docs/_sidebar.mdx","docs/index.mdx","docs/build-platforms/circleci.mdx","docs/build-platforms/github-actions.mdx","docs/build-platforms/jenkins.mdx","docs/build-platforms/travis.mdx","docs/configuration/autorc.mdx","docs/configuration/non-npm.mdx","docs/configuration/plugins.mdx","docs/configuration/troubleshooting.mdx","docs/generated/all-contributors.mdx","docs/generated/brew.mdx","docs/generated/canary.mdx","docs/generated/changelog.mdx","docs/generated/chrome.mdx","docs/generated/cocoapods.mdx","docs/generated/comment.mdx","docs/generated/conventional-commits.mdx","docs/generated/crates.mdx","docs/generated/create-labels.mdx","docs/generated/docker.mdx","docs/generated/exec.mdx","docs/generated/first-time-contributor.mdx","docs/generated/gem.mdx","docs/generated/gh-pages.mdx","docs/generated/git-tag.mdx","docs/generated/gradle.mdx","docs/generated/info.mdx","docs/generated/init.mdx","docs/generated/jira.mdx","docs/generated/label.mdx","docs/generated/latest.mdx","docs/generated/maven.mdx","docs/generated/next.mdx","docs/generated/npm.mdx","docs/generated/omit-commits.mdx","docs/generated/omit-release-notes.mdx","docs/generated/pr-body-labels.mdx","docs/generated/pr-body.mdx","docs/generated/pr-check.mdx","docs/generated/pr-status.mdx","docs/generated/release.mdx","docs/generated/released.mdx","docs/generated/s3.mdx","docs/generated/shipit.mdx","docs/generated/slack.mdx","docs/generated/twitter.mdx","docs/generated/upload-assets.mdx","docs/generated/version.mdx","docs/plugins/changelog-hooks.mdx","docs/plugins/configuration-hooks.mdx","docs/plugins/hook-api-docs.mdx","docs/plugins/init-hooks.mdx","docs/plugins/log-parse-hooks.mdx","docs/plugins/release-lifecycle-hooks.mdx","docs/plugins/writing-plugins.mdx","docs/plugins/writing-publishing-plugins.mdx","docs/welcome/getting-started.mdx","docs/welcome/quick-merge.mdx"].map((function(e){return c.default.relative("./",e)})).filter((function(e){return e.startsWith(g)})).map((function(e){return h.find((function(t){return t.__resourcePath===e}))}));return d.default.createElement(u.default,{menuState:[f,b]},d.default.createElement("div",{className:"flex flex-1 w-full max-w-screen-sm lg:max-w-screen-xl mx-auto"},d.default.createElement(s.Sidebar,{links:O,folder:g}),d.default.createElement("main",{className:(0,l.default)("DocSearch-content","pt-8 pb-32 px-4 lg:mx-auto max-w-full md:max-w-screen-sm lg:max-w-screen-md","flex-1","lg:block",f&&"hidden")},d.default.createElement(x.h1,null,function(e,t){if(t){for(var a=[],n=t.replace(/\\`/g,"`");m.test(n);){var c=n.match(m),o=(0,r.default)(c,4),l=o[1],s=o[2],u=o[3];a.push(l),a.push(d.default.createElement(e.inlineCode,null,s)),n=u}return a.push(n),d.default.createElement("div",null,a)}}(x,a.title)),t)))};t.default=p},x3GE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("jmz1");t.default=function(){try{return n.keys().map(n)}catch(e){return[]}}}},[["1udM",0,1,2,3,4]]]);