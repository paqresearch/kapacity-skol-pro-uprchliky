(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[441],{7284:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/embed/zs",function(){return n(6707)}])},5416:function(e,t,n){"use strict";n.d(t,{QW:function(){return l},Rr:function(){return c},pl:function(){return o},zw:function(){return i}});var r=n(7294);function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(l){i=!0,a=l}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var o=function(e){var t=s(r.useState(null),2),n=t[0],a=t[1];return r.useEffect((function(){fetch(e+"/orp.topo.json").then((function(e){e.ok&&e.json().then((function(e){a(e)}))}))}),[]),n},i=function(e){var t=s(r.useState(null),2),n=t[0],a=t[1];return r.useEffect((function(){fetch(e+"/kraje.topo.json").then((function(e){e.ok&&e.json().then((function(e){a(e)}))}))}),[]),n},l=function(e){var t=s(r.useState(null),2),n=t[0],a=t[1];return r.useEffect((function(){fetch(e+"/praha-obvody.topo.json").then((function(e){e.ok&&e.json().then((function(e){a(e)}))}))}),[]),n},c=function(e){var t=s(r.useState(null),2),n=t[0],a=t[1];return r.useEffect((function(){fetch(e+"/capacities.json").then((function(e){e.ok&&e.json().then((function(e){a(e)}))}))}),[]),n}},7793:function(e,t,n){"use strict";n.d(t,{Z:function(){return v}});var r=n(5893),a=n(7294),s=n(3935),o=n(6065),i=n(6370),l=n(6486),c=n(4519),u=n(4604),d=n.n(u);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(l){i=!0,a=l}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e){var t=e.fillByOrpId,n=e.krajeData,s=e.orpData,o=e.prahaObvodyData,i=e.renderTooltipContent,c=e.selectedOrpId,u=e.setSelectedOrpId,p=a.useRef(null),v=a.useRef(null),f=h(a.useState(null),2),j=f[0],b=f[1],y=h(a.useState(null),2),k=y[0],x=y[1],g=a.useCallback((function(){if(p.current){var e=p.current.getBoundingClientRect();b(e.width),x(.583*e.width)}}),[b,x]),z=a.useCallback((0,l.debounce)(g,200),[g]);a.useEffect((function(){return window.addEventListener("resize",z),g(),function(){window.removeEventListener("resize",z)}}),[z]),a.useEffect((function(){s&&n&&o&&m({svgDomEl:v.current,containerDomEl:p.current,width:j,height:k,orpData:s,krajeData:n,prahaObvodyData:o,fillByOrpId:t,selectedOrpId:c,setSelectedOrpId:u,renderTooltipContent:i})}),[j,k,s,n,o,t,c,u,i]);var _=a.useCallback((function(e){v.current&&v.current===e.target&&u(null)}),[u,v]);return(0,r.jsx)("div",{ref:p,className:d().container,onClick:_,children:(0,r.jsx)("svg",{ref:v,width:j,height:k})})}var m=function(e){var t=e.svgDomEl,n=e.containerDomEl,r=e.width,a=e.height,s=e.orpData,l=e.krajeData,c=e.prahaObvodyData,u=e.fillByOrpId,d=e.selectedOrpId,p=e.setSelectedOrpId,h=e.renderTooltipContent,v=i.Z(s,s.objects.tracts),m=i.Z(l,l.objects.tracts),y=i.Z(c,c.objects.tracts),k=o.Ys(t);k.selectAll("*").remove(),o.Ys(n).selectAll(".map-tooltip").remove();var x=o.mw4().fitSize([r,a],v),g=o.l49().projection(x);k.selectAll(".orp").data(v.features.filter((function(e){return"19"!==e.id}))).enter().append("path").attr("d",g).attr("class",(function(e){return"orp orp-".concat(e.id)})).attr("fill",(function(e){return u[e.id]})).attr("opacity",(function(e){return d&&e.id!==d?.3:1})).attr("stroke","#000000").attr("stroke-width",(function(e){return e.id===d?2:.5})).on("click",(function(e,t){d!==t.id?p(t.id):p(null)})).on("mouseover",(function(e,t){null!==d&&t.id!==d&&e.currentTarget.setAttribute("opacity",1),b({containerDomEl:n}),j({referenceDomEl:e.currentTarget,containerDomEl:n,feature:t,renderTooltipContent:h})})).on("mouseout",(function(e,t){null!==d&&t.id!==d&&e.currentTarget.setAttribute("opacity",.3),b({containerDomEl:n}),d&&j({referenceDomEl:k.select(".orp.orp-".concat(d)).node()||k.select(".praha-obvod.praha-obvod-".concat(d)).node(),containerDomEl:n,feature:v.features.find((function(e){return e.id===d}))||y.features.find((function(e){return f(e)===d})),renderTooltipContent:h})})),k.selectAll(".kraj").data(m.features).enter().append("path").attr("d",g).attr("class",(function(e){return"kraj kraj-".concat(e.id)})).attr("fill","transparent").attr("opacity",(function(){return d?.15:1})).attr("stroke","#000000").attr("stroke-width",r>600?1.5:1.3).attr("pointer-events","none");var z=o.mw4().fitExtent([[.75*r,.02*a],[r,.26*a]],y),_=o.l49().projection(z);k.selectAll(".praha-obvod").data(y.features).enter().append("path").attr("d",_).attr("class",(function(e){return"praha-obvod praha-obvod-".concat(f(e))})).attr("fill",(function(e){return u[f(e)]})).attr("opacity",(function(e){return d&&f(e)!==d?.3:1})).attr("stroke","#000000").attr("stroke-width",(function(e){return f(e)===d?2:.5})).on("click",(function(e,t){d!==f(t)?p(f(t)):p(null)})).on("mouseover",(function(e,t){null!==d&&f(t)!==d&&e.currentTarget.setAttribute("opacity",1),b({containerDomEl:n}),j({referenceDomEl:e.currentTarget,containerDomEl:n,feature:t,renderTooltipContent:h})})).on("mouseout",(function(e,t){null!==d&&f(t)!==d&&e.currentTarget.setAttribute("opacity",.3),b({containerDomEl:n}),d&&j({referenceDomEl:k.select(".orp.orp-".concat(d)).node()||k.select(".praha-obvod.praha-obvod-".concat(d)).node(),containerDomEl:n,feature:v.features.find((function(e){return e.id===d}))||y.features.find((function(e){return f(e)===d})),renderTooltipContent:h})})),d&&(k.select(".orp.orp-".concat(d)).raise(),k.select(".praha-obvod.praha-obvod-".concat(d)).raise(),j({referenceDomEl:k.select(".orp.orp-".concat(d)).node()||k.select(".praha-obvod.praha-obvod-".concat(d)).node(),containerDomEl:n,feature:v.features.find((function(e){return e.id===d}))||y.features.find((function(e){return f(e)===d})),renderTooltipContent:h}))},f=function(e){return parseInt("99"+String(e.properties.KOD),10)},j=function(e){var t=e.referenceDomEl,n=e.containerDomEl,r=e.feature,a=e.renderTooltipContent,o=r.id?r.id:f(r),i=document.createElement("div");i.classList.add("map-tooltip"),i.classList.add("map-tooltip-orp-".concat(o)),i.innerHTML='\n    <div class="tooltip-arrow" data-popper-arrow></div>\n    <div class="tooltip-content"></div>\n    ',n.append(i),s.render(a(o,r),i.querySelector(".tooltip-content")),(0,c.fi)(t,i,{placement:"right",modifiers:[{name:"offset",options:{offset:[0,10]}},{name:"flip",options:{fallbackPlacements:["left"],boundary:n}}]})},b=function(e){var t=e.containerDomEl;o.Ys(t).selectAll(".map-tooltip").each((function(){this.remove()}))}},7918:function(e,t,n){"use strict";n.d(t,{D:function(){return s}});var r=n(7294),a=n(6486);var s=function(e){var t=r.useRef(null),n=r.useCallback((function(){if(t.current){var n=t.current.getBoundingClientRect().height;window.parent&&window.parent.postMessage({"paq-embed-height":(r={},a=e,s=n,a in r?Object.defineProperty(r,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[a]=s,r)},"*")}var r,a,s}),[e]),s=r.useCallback((0,a.debounce)((function(){n(),setTimeout((function(){return n()}),300),setTimeout((function(){return n()}),1e3),setTimeout((function(){return n()}),5e3)}),50),[n]);return r.useEffect((function(){return s(),window.addEventListener("resize",s),function(){window.removeEventListener("resize",s)}}),[s]),{containerRef:t,postHeightMessage:n}}},6707:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return b},default:function(){return y}});var r=n(5893),a=n(7294),s=n(9008),o=n(1163),i=n(6065),l=n(6486),c=n(7793),u=n(7918),d=n(5416),p=n(8666),h=n.n(p);function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){m(e,t,n[t])}))}return e}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(l){i=!0,a=l}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var b=!0;function y(e){var t=e.baseUrl,n=(0,o.useRouter)(),i=(0,d.pl)(t),l=(0,d.zw)(t),c=(0,d.QW)(t),p=(0,d.Rr)(t),v=(0,u.D)("paqresearch_kapacity-skol-pro-uprchliky_zs"),m=v.containerRef,f=v.postHeightMessage,b=j(a.useState(n.query.tab?n.query.tab:"zs_previs"),2),y=b[0],x=b[1],g=j(a.useState(null),2),z=g[0],_=g[1];if(a.useEffect((function(){x(n.query.tab?n.query.tab:"zs_previs")}),[n.query.tab]),a.useEffect((function(){f()}),[y]),!i||!l||!p)return null;var N=k.find((function(e){return e.key===y}));return(0,r.jsxs)("div",{className:h().container,style:{padding:n.query.padding?n.query.padding:void 0},children:[(0,r.jsx)(s.default,{children:(0,r.jsx)("title",{children:"Kapacity Z\u0160 pro ukrajinsk\xe9 uprchl\xedky"})}),(0,r.jsxs)("main",{className:h().container,ref:m,children:[void 0===n.query.tab&&(0,r.jsx)("nav",{className:h().tabsContainer,children:(0,r.jsx)("ul",{children:k.map((function(e){return(0,r.jsx)("li",{className:e.key===y?"active":void 0,children:(0,r.jsxs)("button",{type:"button",onClick:function(){return x(e.key)},children:[e.thumbnail&&(0,r.jsx)("img",{src:"".concat(t,"/").concat(e.thumbnail),alt:""}),e.title]})},e.key)}))})}),N&&N.map?N.map({orpData:i,krajeData:l,prahaObvodyData:c,capacitiesData:p,selectedOrpId:z,setSelectedOrpId:_}):null]})]})}var k=[{key:"zs_previs",title:(0,r.jsx)(r.Fragment,{children:"P\u0159evis/podstav kapacit Z\u0160"}),thumbnail:"thumbnail-zs-previs.svg",map:function(e){return(0,r.jsx)(x,f({},e))}},{key:"zs_previs_1_stupen",title:(0,r.jsx)(r.Fragment,{children:"P\u0159evis/podstav pouze\xa01.\xa0stupn\u011b\xa0Z\u0160"}),thumbnail:"thumbnail-zs-previs-1-stupen.svg",map:function(e){return(0,r.jsx)(g,f({},e))}},{key:"zs_previs_2_stupen",title:(0,r.jsx)(r.Fragment,{children:"P\u0159evis/podstav pouze\xa02.\xa0stupn\u011b\xa0Z\u0160"}),thumbnail:"thumbnail-zs-previs-2-stupen.svg",map:function(e){return(0,r.jsx)(z,f({},e))}},{key:"zs_zapsani_z_nahlasenych",title:(0,r.jsx)(r.Fragment,{children:"Pod\xedl zapsan\xfdch na\xa0Z\u0160\xa0z\xa0nahl\xe1\u0161en\xfdch"}),thumbnail:"thumbnail-zs-zapsani-z-nahlasenych.svg",map:function(e){return(0,r.jsx)(_,f({},e))}},{key:"zs_zapsani",title:(0,r.jsx)(r.Fragment,{children:"Aktu\xe1ln\u011b zapsan\xed\xa0na\xa0Z\u0160"}),thumbnail:"thumbnail-zs-zapsani.svg",map:function(e){return(0,r.jsx)(N,f({},e))}}],x=function(e){var t=e.orpData,n=e.krajeData,s=e.prahaObvodyData,o=e.capacitiesData,u=e.selectedOrpId,d=e.setSelectedOrpId,p=a.useMemo((function(){if(!o)return{};var e=i.ut0().domain([-300,0,300,600,1e5]).range(["#B64164","#EAABAC","#FEF0D9","#A2C2BA","#288893"]);return o.reduce((function(t,n){return f({},t,m({},n.id,e(n.zs_previs)))}),{})}),[o]),v=a.useMemo((function(){return(0,l.keyBy)(o,"id")}),[o]);return(0,r.jsxs)("div",{className:h().mapContainer,children:[(0,r.jsx)("h1",{children:"P\u0159evis/podstav kapacit Z\u0160 pro ukrajinsk\xe9 uprchl\xedky v z\xe1\u0159\xed 2022"}),(0,r.jsx)("p",{className:h().byline,children:"Po\u010d\xedt\xe1me s\xa075\xa0%\xa0efektivitou vyu\u017eit\xed aktu\xe1ln\u011b voln\xfdch a\xa0mo\u017en\xfdch nov\xfdch m\xedst, m\xedsta ve\xa0speci\xe1ln\xedch t\u0159\xedd\xe1ch s\xa0efektivitou vyu\u017eit\xed 10\xa0%. Z\xe1pisy uva\u017eujeme v\u0161ech 7\u201315let\xfdch podle nahl\xe1\u0161en\xfdch pobyt\u016f MV\xa0\u010cR k\xa012.\u20094.\u20092022 s\xa0v\xfdjimkou 1168 d\u011bt\xed bez ur\u010den\xe9ho pobytu."}),(0,r.jsx)("div",{className:h().legend,children:[{label:"podstav 300 a v\xedce m\xedst",color:"#B64164"},{label:"podstav 0\u2013300 m\xedst",color:"#EAABAC"},{label:"p\u0159evis 0\u2013300 m\xedst",color:"#FEF0D9"},{label:"p\u0159evis 300\u2013600 m\xedst",color:"#A2C2BA"},{label:"p\u0159evis 600 m\xedst a v\xedce",color:"#288893"}].map((function(e){return(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"dot",style:{backgroundColor:e.color}}),e.label]},e.color)}))}),(0,r.jsx)("div",{className:h().mapWrapper,children:(0,r.jsx)(c.Z,{orpData:t,krajeData:n,prahaObvodyData:s,selectedOrpId:u,setSelectedOrpId:d,fillByOrpId:p,renderTooltipContent:function(e,t){return(0,r.jsxs)("div",{className:h().tooltipContent,children:[(0,r.jsxs)("div",{className:"tooltip-orp",children:[(0,r.jsx)("div",{className:"tooltip-orp-name",children:t.properties.NAZEV}),(0,r.jsx)("div",{className:"tooltip-region",children:t.properties.VUSC_NAZEV?t.properties.VUSC_NAZEV:"Hlavn\xed m\u011bsto Praha"})]}),(0,r.jsx)("div",{className:"main-value-line",children:(0,r.jsxs)("strong",{children:[v[e].zs_previs>0?"p\u0159evis":"podstav"," ",Math.abs(Math.round(v[e].zs_previs)),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," m\xedst"]})}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_zapsani.toLocaleString("cs-CZ")," ji\u017e zapsan\xfdch ukrajinsk\xfdch \u017e\xe1k\u016f"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_kapacity_duben.toLocaleString("cs-CZ"),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," voln\xfdch m\xedst k 7.\u20094.\u20092022"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_kapacity_zari.toLocaleString("cs-CZ"),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," mo\u017en\xfdch nov\xfdch m\xedst k z\xe1\u0159\xed 2022"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_uprchliku.toLocaleString("cs-CZ")," ","nahl\xe1\u0161en\xfdch 7\u201315let\xfdch uprchl\xedk\u016f k 12.\u20094.\u20092022"]}),9943===parseInt(e,10)&&(0,r.jsx)("div",{className:"note",children:"* Z d\u016fvodu chyby ve zdrojov\xfdch datech byla kapacita k z\xe1\u0159\xed u Prahy 4 upravena na kvalifikovan\xfd odhad. Kapacita k dubnu nebyla upravena, jev\xed se ale b\xfdt v\xfdrazn\u011b vy\u0161\u0161\xed ne\u017e v jin\xfdch obvodech."})]})}})}),(0,r.jsxs)("div",{className:h().footer,children:[(0,r.jsxs)("div",{className:"footer-item",children:["Anal\xfdza a vizualizace:"," ",(0,r.jsx)("a",{href:"https://www.paqresearch.cz/",target:"_blank",rel:"noreferrer",children:"PAQ\xa0Research"})]}),(0,r.jsx)("div",{className:"footer-separator",children:" \xa0\xb7\xa0 "}),(0,r.jsx)("div",{className:"footer-item",children:"Zdroj dat: M\u0160MT, MV, \u010c\xdaZK (CC-BY)"})]})]})},g=function(e){var t=e.orpData,n=e.krajeData,s=e.prahaObvodyData,o=e.capacitiesData,u=e.selectedOrpId,d=e.setSelectedOrpId,p=a.useMemo((function(){if(!o)return{};var e=i.ut0().domain([-300,0,300,600,1e5]).range(["#B64164","#EAABAC","#FEF0D9","#A2C2BA","#288893"]);return o.reduce((function(t,n){return f({},t,m({},n.id,e(n.zs_previs_1_stupen)))}),{})}),[o]),v=a.useMemo((function(){return(0,l.keyBy)(o,"id")}),[o]);return(0,r.jsxs)("div",{className:h().mapContainer,children:[(0,r.jsx)("h1",{children:"P\u0159evis/podstav kapacit na 1.\xa0stupni Z\u0160 pro ukrajinsk\xe9 uprchl\xedky v\xa0z\xe1\u0159\xed\xa02022"}),(0,r.jsx)("p",{className:h().byline,children:"Po\u010d\xedt\xe1me s\xa075\xa0%\xa0efektivitou vyu\u017eit\xed aktu\xe1ln\u011b voln\xfdch a\xa0mo\u017en\xfdch nov\xfdch m\xedst, m\xedsta ve\xa0speci\xe1ln\xedch t\u0159\xedd\xe1ch s\xa0efektivitou vyu\u017eit\xed 10\xa0%. Z\xe1pisy uva\u017eujeme v\u0161ech 7\u201315let\xfdch podle nahl\xe1\u0161en\xfdch pobyt\u016f MV\xa0\u010cR k\xa012.\u20094.\u20092022 s\xa0v\xfdjimkou 1168 d\u011bt\xed bez ur\u010den\xe9ho pobytu."}),(0,r.jsx)("div",{className:h().legend,children:[{label:"podstav 300 a v\xedce m\xedst",color:"#B64164"},{label:"podstav 0\u2013300 m\xedst",color:"#EAABAC"},{label:"p\u0159evis 0\u2013300 m\xedst",color:"#FEF0D9"},{label:"p\u0159evis 300\u2013600 m\xedst",color:"#A2C2BA"},{label:"p\u0159evis 600 m\xedst a v\xedce",color:"#288893"}].map((function(e){return(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"dot",style:{backgroundColor:e.color}}),e.label]},e.color)}))}),(0,r.jsx)("div",{className:h().mapWrapper,children:(0,r.jsx)(c.Z,{orpData:t,krajeData:n,prahaObvodyData:s,selectedOrpId:u,setSelectedOrpId:d,fillByOrpId:p,renderTooltipContent:function(e,t){return(0,r.jsxs)("div",{className:h().tooltipContent,children:[(0,r.jsxs)("div",{className:"tooltip-orp",children:[(0,r.jsx)("div",{className:"tooltip-orp-name",children:t.properties.NAZEV}),(0,r.jsx)("div",{className:"tooltip-region",children:t.properties.VUSC_NAZEV?t.properties.VUSC_NAZEV:"Hlavn\xed m\u011bsto Praha"})]}),(0,r.jsx)("div",{className:"main-value-line",children:(0,r.jsxs)("strong",{children:[v[e].zs_previs_1_stupen>0?"p\u0159evis":"podstav"," ",Math.abs(Math.round(v[e].zs_previs_1_stupen)),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," m\xedst na 1. stupni"]})}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_zapsani.toLocaleString("cs-CZ")," ji\u017e zapsan\xfdch ukrajinsk\xfdch \u017e\xe1k\u016f"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_kapacity_duben.toLocaleString("cs-CZ"),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," voln\xfdch m\xedst k 7.\u20094.\u20092022"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_kapacity_zari.toLocaleString("cs-CZ"),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," mo\u017en\xfdch nov\xfdch m\xedst k z\xe1\u0159\xed 2022"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_uprchliku.toLocaleString("cs-CZ")," ","nahl\xe1\u0161en\xfdch 7\u201315let\xfdch uprchl\xedk\u016f k 12.\u20094.\u20092022"]}),9943===parseInt(e,10)&&(0,r.jsx)("div",{className:"note",children:"* Z d\u016fvodu chyby ve zdrojov\xfdch datech byla kapacita k z\xe1\u0159\xed u Prahy 4 upravena na kvalifikovan\xfd odhad. Kapacita k dubnu nebyla upravena, jev\xed se ale b\xfdt v\xfdrazn\u011b vy\u0161\u0161\xed ne\u017e v jin\xfdch obvodech."})]})}})}),(0,r.jsxs)("div",{className:h().footer,children:[(0,r.jsxs)("div",{className:"footer-item",children:["Anal\xfdza a vizualizace:"," ",(0,r.jsx)("a",{href:"https://www.paqresearch.cz/",target:"_blank",rel:"noreferrer",children:"PAQ\xa0Research"})]}),(0,r.jsx)("div",{className:"footer-separator",children:" \xa0\xb7\xa0 "}),(0,r.jsx)("div",{className:"footer-item",children:"Zdroj dat: M\u0160MT, MV, \u010c\xdaZK (CC-BY)"})]})]})},z=function(e){var t=e.orpData,n=e.krajeData,s=e.prahaObvodyData,o=e.capacitiesData,u=e.selectedOrpId,d=e.setSelectedOrpId,p=a.useMemo((function(){if(!o)return{};var e=i.ut0().domain([-300,0,300,600,1e5]).range(["#B64164","#EAABAC","#FEF0D9","#A2C2BA","#288893"]);return o.reduce((function(t,n){return f({},t,m({},n.id,e(n.zs_previs_2_stupen)))}),{})}),[o]),v=a.useMemo((function(){return(0,l.keyBy)(o,"id")}),[o]);return(0,r.jsxs)("div",{className:h().mapContainer,children:[(0,r.jsx)("h1",{children:"P\u0159evis/podstav kapacit na 2.\xa0stupni Z\u0160 pro ukrajinsk\xe9 uprchl\xedky v\xa0z\xe1\u0159\xed\xa02022"}),(0,r.jsx)("p",{className:h().byline,children:"Po\u010d\xedt\xe1me s\xa075\xa0%\xa0efektivitou vyu\u017eit\xed aktu\xe1ln\u011b voln\xfdch a\xa0mo\u017en\xfdch nov\xfdch m\xedst, m\xedsta ve\xa0speci\xe1ln\xedch t\u0159\xedd\xe1ch s\xa0efektivitou vyu\u017eit\xed 10\xa0%. Z\xe1pisy uva\u017eujeme v\u0161ech 7\u201315let\xfdch podle nahl\xe1\u0161en\xfdch pobyt\u016f MV\xa0\u010cR k\xa012.\u20094.\u20092022 s\xa0v\xfdjimkou 1168 d\u011bt\xed bez ur\u010den\xe9ho pobytu."}),(0,r.jsx)("div",{className:h().legend,children:[{label:"podstav 300 a v\xedce m\xedst",color:"#B64164"},{label:"podstav 0\u2013300 m\xedst",color:"#EAABAC"},{label:"p\u0159evis 0\u2013300 m\xedst",color:"#FEF0D9"},{label:"p\u0159evis 300\u2013600 m\xedst",color:"#A2C2BA"},{label:"p\u0159evis 600 m\xedst a v\xedce",color:"#288893"}].map((function(e){return(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"dot",style:{backgroundColor:e.color}}),e.label]},e.color)}))}),(0,r.jsx)("div",{className:h().mapWrapper,children:(0,r.jsx)(c.Z,{orpData:t,krajeData:n,prahaObvodyData:s,selectedOrpId:u,setSelectedOrpId:d,fillByOrpId:p,renderTooltipContent:function(e,t){return(0,r.jsxs)("div",{className:h().tooltipContent,children:[(0,r.jsxs)("div",{className:"tooltip-orp",children:[(0,r.jsx)("div",{className:"tooltip-orp-name",children:t.properties.NAZEV}),(0,r.jsx)("div",{className:"tooltip-region",children:t.properties.VUSC_NAZEV?t.properties.VUSC_NAZEV:"Hlavn\xed m\u011bsto Praha"})]}),(0,r.jsx)("div",{className:"main-value-line",children:(0,r.jsxs)("strong",{children:[v[e].zs_previs_2_stupen>0?"p\u0159evis":"podstav"," ",Math.abs(Math.round(v[e].zs_previs_2_stupen)),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," m\xedst na 2. stupni"]})}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_zapsani.toLocaleString("cs-CZ")," ji\u017e zapsan\xfdch ukrajinsk\xfdch \u017e\xe1k\u016f"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_kapacity_duben.toLocaleString("cs-CZ"),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," voln\xfdch m\xedst k 7.\u20094.\u20092022"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_kapacity_zari.toLocaleString("cs-CZ"),9943===parseInt(e,10)&&(0,r.jsx)(r.Fragment,{children:"*"})," mo\u017en\xfdch nov\xfdch m\xedst k z\xe1\u0159\xed 2022"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_uprchliku.toLocaleString("cs-CZ")," ","nahl\xe1\u0161en\xfdch 7\u201315let\xfdch uprchl\xedk\u016f k 12.\u20094.\u20092022"]}),9943===parseInt(e,10)&&(0,r.jsx)("div",{className:"note",children:"* Z d\u016fvodu chyby ve zdrojov\xfdch datech byla kapacita k z\xe1\u0159\xed u Prahy 4 upravena na kvalifikovan\xfd odhad. Kapacita k dubnu nebyla upravena, jev\xed se ale b\xfdt v\xfdrazn\u011b vy\u0161\u0161\xed ne\u017e v jin\xfdch obvodech."})]})}})}),(0,r.jsxs)("div",{className:h().footer,children:[(0,r.jsxs)("div",{className:"footer-item",children:["Anal\xfdza a vizualizace:"," ",(0,r.jsx)("a",{href:"https://www.paqresearch.cz/",target:"_blank",rel:"noreferrer",children:"PAQ\xa0Research"})]}),(0,r.jsx)("div",{className:"footer-separator",children:" \xa0\xb7\xa0 "}),(0,r.jsx)("div",{className:"footer-item",children:"Zdroj dat: M\u0160MT, MV, \u010c\xdaZK (CC-BY)"})]})]})},_=function(e){var t=e.orpData,n=e.krajeData,s=e.prahaObvodyData,o=e.capacitiesData,u=e.selectedOrpId,d=e.setSelectedOrpId,p=a.useMemo((function(){if(!o)return{};var e=i.ut0().domain([20,40,60,80,100]).range(["#FEF0D9","#C4D3C9","#79ABB0","#288893","#005B6E"]);return o.reduce((function(t,n){return f({},t,m({},n.id,e(n.zs_zapsani_z_nahlasenych)))}),{})}),[o]),v=a.useMemo((function(){return(0,l.keyBy)(o,"id")}),[o]);return(0,r.jsxs)("div",{className:h().mapContainer,children:[(0,r.jsx)("h1",{children:"Pod\xedl ji\u017e zapsan\xfdch na Z\u0160 z nahl\xe1\u0161en\xfdch 7\u201315let\xfdch ukrajinsk\xfdch uprchl\xedk\u016f"}),(0,r.jsx)("p",{className:h().byline,children:"Uva\u017eujeme 7\u201315let\xe9 podle nahl\xe1\u0161en\xfdch pobyt\u016f MV\xa0\u010cR k\xa012.\u20094.\u20092022 s\xa0v\xfdjimkou 1168 d\u011bt\xed bez ur\u010den\xe9ho pobytu."}),(0,r.jsx)("div",{className:h().legend,children:[{label:"m\xe9n\u011b ne\u017e 20 %",color:"#FEF0D9"},{label:"20\u201340 %",color:"#C4D3C9"},{label:"40\u201360 %",color:"#79ABB0"},{label:"60\u201380 %",color:"#288893"},{label:"80-100 %",color:"#005B6E"}].map((function(e){return(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"dot",style:{backgroundColor:e.color}}),e.label]},e.color)}))}),(0,r.jsx)("div",{className:h().mapWrapper,children:(0,r.jsx)(c.Z,{orpData:t,krajeData:n,prahaObvodyData:s,selectedOrpId:u,setSelectedOrpId:d,fillByOrpId:p,renderTooltipContent:function(e,t){return(0,r.jsxs)("div",{className:h().tooltipContent,children:[(0,r.jsxs)("div",{className:"tooltip-orp",children:[(0,r.jsx)("div",{className:"tooltip-orp-name",children:t.properties.NAZEV}),(0,r.jsx)("div",{className:"tooltip-region",children:t.properties.VUSC_NAZEV?t.properties.VUSC_NAZEV:"Hlavn\xed m\u011bsto Praha"})]}),(0,r.jsx)("div",{className:"main-value-line",children:(0,r.jsxs)("strong",{children:[v[e].zs_zapsani_z_nahlasenych,"\xa0%\xa0zapsan\xfdch z\xa0nahl\xe1\u0161en\xfdch"]})}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_zapsani.toLocaleString("cs-CZ")," ji\u017e zapsan\xfdch ukrajinsk\xfdch \u017e\xe1k\u016f"]}),(0,r.jsxs)("div",{className:"value-line",children:[v[e].zs_uprchliku.toLocaleString("cs-CZ")," ","nahl\xe1\u0161en\xfdch 7\u201315let\xfdch uprchl\xedk\u016f k 12.\u20094.\u20092022"]})]})}})}),(0,r.jsxs)("div",{className:h().footer,children:[(0,r.jsxs)("div",{className:"footer-item",children:["Anal\xfdza a vizualizace:"," ",(0,r.jsx)("a",{href:"https://www.paqresearch.cz/",target:"_blank",rel:"noreferrer",children:"PAQ\xa0Research"})]}),(0,r.jsx)("div",{className:"footer-separator",children:" \xa0\xb7\xa0 "}),(0,r.jsx)("div",{className:"footer-item",children:"Zdroj dat: M\u0160MT, MV, \u010c\xdaZK (CC-BY)"})]})]})},N=function(e){var t=e.orpData,n=e.krajeData,s=e.prahaObvodyData,o=e.capacitiesData,u=e.selectedOrpId,d=e.setSelectedOrpId,p=a.useMemo((function(){if(!o)return{};var e=i.ut0().domain([25,50,100,200,1e5]).range(["#FEF0D9","#C4D3C9","#79ABB0","#288893","#005B6E"]);return o.reduce((function(t,n){return f({},t,m({},n.id,e(n.zs_zapsani)))}),{})}),[o]),v=a.useMemo((function(){return(0,l.keyBy)(o,"id")}),[o]);return(0,r.jsxs)("div",{className:h().mapContainer,children:[(0,r.jsx)("h1",{children:"Ukrajin\u0161t\xed \u017e\xe1ci aktu\xe1ln\u011b zapsan\xed na\xa0Z\u0160"}),(0,r.jsx)("div",{className:h().legend,children:[{label:"m\xe9n\u011b ne\u017e 25",color:"#FEF0D9"},{label:"25\u201350",color:"#C4D3C9"},{label:"50\u2013100",color:"#79ABB0"},{label:"100\u2013200",color:"#288893"},{label:"200 a v\xedce",color:"#005B6E"}].map((function(e){return(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"dot",style:{backgroundColor:e.color}}),e.label]},e.color)}))}),(0,r.jsx)("div",{className:h().mapWrapper,children:(0,r.jsx)(c.Z,{orpData:t,krajeData:n,prahaObvodyData:s,selectedOrpId:u,setSelectedOrpId:d,fillByOrpId:p,renderTooltipContent:function(e,t){return(0,r.jsxs)("div",{className:h().tooltipContent,children:[(0,r.jsxs)("div",{className:"tooltip-orp",children:[(0,r.jsx)("div",{className:"tooltip-orp-name",children:t.properties.NAZEV}),(0,r.jsx)("div",{className:"tooltip-region",children:t.properties.VUSC_NAZEV?t.properties.VUSC_NAZEV:"Hlavn\xed m\u011bsto Praha"})]}),(0,r.jsx)("div",{className:"main-value-line",children:(0,r.jsxs)("strong",{children:[v[e].zs_zapsani,"\xa0zapsan\xfdch ukrajinsk\xfdch \u017e\xe1k\u016f"]})})]})}})}),(0,r.jsxs)("div",{className:h().footer,children:[(0,r.jsxs)("div",{className:"footer-item",children:["Anal\xfdza a vizualizace:"," ",(0,r.jsx)("a",{href:"https://www.paqresearch.cz/",target:"_blank",rel:"noreferrer",children:"PAQ\xa0Research"})]}),(0,r.jsx)("div",{className:"footer-separator",children:" \xa0\xb7\xa0 "}),(0,r.jsx)("div",{className:"footer-item",children:"Zdroj dat: M\u0160MT, MV, \u010c\xdaZK (CC-BY)"})]})]})}},4604:function(e){e.exports={container:"EmbedOrpMap_container__rf9Af"}},8666:function(e){e.exports={container:"MapsInTabsEmbedPage_container__0rMCK",tabsContainer:"MapsInTabsEmbedPage_tabsContainer__6Ohro",mapContainer:"MapsInTabsEmbedPage_mapContainer__aMgwl",byline:"MapsInTabsEmbedPage_byline__6q6b0",legend:"MapsInTabsEmbedPage_legend__rM45t",mapWrapper:"MapsInTabsEmbedPage_mapWrapper__XLTVG",footer:"MapsInTabsEmbedPage_footer__TsoNU",tooltipContent:"MapsInTabsEmbedPage_tooltipContent__6z3GZ"}}},function(e){e.O(0,[662,550,774,888,179],(function(){return t=7284,e(e.s=t);var t}));var t=e.O();_N_E=t}]);