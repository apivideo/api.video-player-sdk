!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=59)}([function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||function(){return this}()||Function("return this")()}).call(this,n(38))},function(t,e,n){var r=n(0),o=n(41),i=n(3),a=n(42),c=n(49),s=n(78),u=o("wks"),f=r.Symbol,p=s?f:f&&f.withoutSetter||a;t.exports=function(t){return i(u,t)||(c&&i(f,t)?u[t]=f[t]:u[t]=p("Symbol."+t)),u[t]}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(6);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){var r=n(9),o=n(10),i=n(15);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(43),o=n(0),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},function(t,e,n){var r=n(0),o=n(20).f,i=n(5),a=n(11),c=n(24),s=n(66),u=n(46);t.exports=function(t,e){var n,f,p,l,h,v=t.target,d=t.global,y=t.stat;if(n=d?r:y?r[v]||c(v,{}):(r[v]||{}).prototype)for(f in e){if(l=e[f],p=t.noTargetGet?(h=o(n,f))&&h.value:n[f],!u(d?f:v+(y?".":"#")+f,t.forced)&&void 0!==p){if(typeof l==typeof p)continue;s(l,p)}(t.sham||p&&p.sham)&&i(l,"sham",!0),a(n,f,l,t)}}},function(t,e,n){var r=n(2);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,e,n){var r=n(9),o=n(40),i=n(4),a=n(39),c=Object.defineProperty;e.f=r?c:function(t,e,n){if(i(t),e=a(e,!0),i(n),o)try{return c(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(0),o=n(5),i=n(3),a=n(24),c=n(25),s=n(17),u=s.get,f=s.enforce,p=String(String).split("String");(t.exports=function(t,e,n,c){var s,u=!!c&&!!c.unsafe,l=!!c&&!!c.enumerable,h=!!c&&!!c.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||o(n,"name",e),(s=f(n)).source||(s.source=p.join("string"==typeof e?e:""))),t!==r?(u?!h&&t[e]&&(l=!0):delete t[e],l?t[e]=n:o(t,e,n)):l?t[e]=n:a(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||c(this)}))},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e){t.exports=!1},function(t,e){t.exports={}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(64),o=n(22);t.exports=function(t){return r(o(t))}},function(t,e,n){var r,o,i,a=n(65),c=n(0),s=n(6),u=n(5),f=n(3),p=n(26),l=n(27),h=n(28),v=c.WeakMap;if(a){var d=p.state||(p.state=new v),y=d.get,g=d.has,m=d.set;r=function(t,e){return e.facade=t,m.call(d,t,e),e},o=function(t){return y.call(d,t)||{}},i=function(t){return g.call(d,t)}}else{var b=l("state");h[b]=!0,r=function(t,e){return e.facade=t,u(t,b,e),e},o=function(t){return f(t,b)?t[b]:{}},i=function(t){return f(t,b)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!s(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e,n){var r=n(4),o=n(77),i=n(45),a=n(50),c=n(79),s=n(80),u=function(t,e){this.stopped=t,this.result=e};t.exports=function(t,e,n){var f,p,l,h,v,d,y,g=n&&n.that,m=!(!n||!n.AS_ENTRIES),b=!(!n||!n.IS_ITERATOR),x=!(!n||!n.INTERRUPTED),w=a(e,g,1+m+x),S=function(t){return f&&s(f),new u(!0,t)},P=function(t){return m?(r(t),x?w(t[0],t[1],S):w(t[0],t[1])):x?w(t,S):w(t)};if(b)f=t;else{if("function"!=typeof(p=c(t)))throw TypeError("Target is not iterable");if(o(p)){for(l=0,h=i(t.length);h>l;l++)if((v=P(t[l]))&&v instanceof u)return v;return new u(!1)}f=p.call(t)}for(d=f.next;!(y=d.call(f)).done;){try{v=P(y.value)}catch(t){throw s(f),t}if("object"==typeof v&&v&&v instanceof u)return v}return new u(!1)}},function(t,e,n){"use strict";var r=n(12),o=function(t){var e,n;this.promise=new t((function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r})),this.resolve=r(e),this.reject=r(n)};t.exports.f=function(t){return new o(t)}},function(t,e,n){var r=n(9),o=n(63),i=n(15),a=n(16),c=n(39),s=n(3),u=n(40),f=Object.getOwnPropertyDescriptor;e.f=r?f:function(t,e){if(t=a(t),e=c(e,!0),u)try{return f(t,e)}catch(t){}if(s(t,e))return i(!o.f.call(t,e),t[e])}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var r=n(0),o=n(6),i=r.document,a=o(i)&&o(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},function(t,e,n){var r=n(0),o=n(5);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},function(t,e,n){var r=n(26),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},function(t,e,n){var r=n(0),o=n(24),i=r["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i},function(t,e,n){var r=n(41),o=n(42),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e){t.exports={}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e,n){var r=n(3),o=n(72),i=n(27),a=n(73),c=i("IE_PROTO"),s=Object.prototype;t.exports=a?Object.getPrototypeOf:function(t){return t=o(t),r(t,c)?t[c]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){var r,o=n(4),i=n(75),a=n(30),c=n(28),s=n(48),u=n(23),f=n(27),p=f("IE_PROTO"),l=function(){},h=function(t){return"<script>"+t+"<\/script>"},v=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;v=r?function(t){t.write(h("")),t.close();var e=t.parentWindow.Object;return t=null,e}(r):((e=u("iframe")).style.display="none",s.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(h("document.F=Object")),t.close(),t.F);for(var n=a.length;n--;)delete v.prototype[a[n]];return v()};c[p]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(l.prototype=o(t),n=new l,l.prototype=null,n[p]=t):n=v(),void 0===e?n:i(n,e)}},function(t,e,n){var r={};r[n(1)("toStringTag")]="z",t.exports="[object z]"===String(r)},function(t,e,n){var r=n(10).f,o=n(3),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(7);t.exports=r("navigator","userAgent")||""},function(t,e,n){var r=n(21),o=n(0);t.exports="process"==r(o.process)},function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var r=n(6);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(9),o=n(2),i=n(23);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(13),o=n(26);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.8.3",mode:r?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e,n){var r=n(0);t.exports=r},function(t,e,n){var r=n(3),o=n(16),i=n(69).indexOf,a=n(28);t.exports=function(t,e){var n,c=o(t),s=0,u=[];for(n in c)!r(a,n)&&r(c,n)&&u.push(n);for(;e.length>s;)r(c,n=e[s++])&&(~i(u,n)||u.push(n));return u}},function(t,e,n){var r=n(29),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(2),o=/#|\.prototype\./,i=function(t,e){var n=c[a(t)];return n==u||n!=s&&("function"==typeof e?r(e):!!e)},a=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=i.data={},s=i.NATIVE="N",u=i.POLYFILL="P";t.exports=i},function(t,e,n){var r=n(4),o=n(74);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,i){return r(n),o(i),e?t.call(n,i):n.__proto__=i,n}}():void 0)},function(t,e,n){var r=n(7);t.exports=r("document","documentElement")},function(t,e,n){var r=n(2);t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},function(t,e,n){var r=n(12);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(33),o=n(21),i=n(1)("toStringTag"),a="Arguments"==o(function(){return arguments}());t.exports=r?o:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:a?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){var r=n(0);t.exports=r.Promise},function(t,e,n){var r=n(4),o=n(12),i=n(1)("species");t.exports=function(t,e){var n,a=r(t).constructor;return void 0===a||null==(n=r(a)[i])?e:o(n)}},function(t,e,n){var r,o,i,a=n(0),c=n(2),s=n(50),u=n(48),f=n(23),p=n(55),l=n(36),h=a.location,v=a.setImmediate,d=a.clearImmediate,y=a.process,g=a.MessageChannel,m=a.Dispatch,b=0,x={},w=function(t){if(x.hasOwnProperty(t)){var e=x[t];delete x[t],e()}},S=function(t){return function(){w(t)}},P=function(t){w(t.data)},j=function(t){a.postMessage(t+"",h.protocol+"//"+h.host)};v&&d||(v=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return x[++b]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},r(b),b},d=function(t){delete x[t]},l?r=function(t){y.nextTick(S(t))}:m&&m.now?r=function(t){m.now(S(t))}:g&&!p?(i=(o=new g).port2,o.port1.onmessage=P,r=s(i.postMessage,i,1)):a.addEventListener&&"function"==typeof postMessage&&!a.importScripts&&h&&"file:"!==h.protocol&&!c(j)?(r=j,a.addEventListener("message",P,!1)):r="onreadystatechange"in f("script")?function(t){u.appendChild(f("script")).onreadystatechange=function(){u.removeChild(this),w(t)}}:function(t){setTimeout(S(t),0)}),t.exports={set:v,clear:d}},function(t,e,n){var r=n(35);t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(r)},function(t,e,n){var r=n(4),o=n(6),i=n(19);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){"use strict";var r=n(8),o=n(97),i=n(31),a=n(47),c=n(34),s=n(5),u=n(11),f=n(1),p=n(13),l=n(14),h=n(58),v=h.IteratorPrototype,d=h.BUGGY_SAFARI_ITERATORS,y=f("iterator"),g=function(){return this};t.exports=function(t,e,n,f,h,m,b){o(n,e,f);var x,w,S,P=function(t){if(t===h&&M)return M;if(!d&&t in E)return E[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},j=e+" Iterator",O=!1,E=t.prototype,_=E[y]||E["@@iterator"]||h&&E[h],M=!d&&_||P(h),k="Array"==e&&E.entries||_;if(k&&(x=i(k.call(new t)),v!==Object.prototype&&x.next&&(p||i(x)===v||(a?a(x,v):"function"!=typeof x[y]&&s(x,y,g)),c(x,j,!0,!0),p&&(l[j]=g))),"values"==h&&_&&"values"!==_.name&&(O=!0,M=function(){return _.call(this)}),p&&!b||E[y]===M||s(E,y,M),l[e]=M,h)if(w={values:P("values"),keys:m?M:P("keys"),entries:P("entries")},b)for(S in w)(d||O||!(S in E))&&u(E,S,w[S]);else r({target:e,proto:!0,forced:d||O},w);return w}},function(t,e,n){"use strict";var r,o,i,a=n(2),c=n(31),s=n(5),u=n(3),f=n(1),p=n(13),l=f("iterator"),h=!1;[].keys&&("next"in(i=[].keys())?(o=c(c(i)))!==Object.prototype&&(r=o):h=!0);var v=null==r||a((function(){var t={};return r[l].call(t)!==t}));v&&(r={}),p&&!v||u(r,l)||s(r,l,(function(){return this})),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:h}},function(t,e,n){n(60),n(102),t.exports=n(103)},function(t,e,n){var r=n(61);t.exports=r},function(t,e,n){n(62),n(81),n(83),n(92),n(93),n(94),n(95),n(98);var r=n(43);t.exports=r.Promise},function(t,e,n){"use strict";var r=n(8),o=n(31),i=n(47),a=n(32),c=n(5),s=n(15),u=n(18),f=function(t,e){var n=this;if(!(n instanceof f))return new f(t,e);i&&(n=i(new Error(void 0),o(n))),void 0!==e&&c(n,"message",String(e));var r=[];return u(t,r.push,{that:r}),c(n,"errors",r),n};f.prototype=a(Error.prototype,{constructor:s(5,f),message:s(5,""),name:s(5,"AggregateError")}),r({global:!0},{AggregateError:f})},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);e.f=i?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},function(t,e,n){var r=n(2),o=n(21),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,e,n){var r=n(0),o=n(25),i=r.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,e,n){var r=n(3),o=n(67),i=n(20),a=n(10);t.exports=function(t,e){for(var n=o(e),c=a.f,s=i.f,u=0;u<n.length;u++){var f=n[u];r(t,f)||c(t,f,s(e,f))}}},function(t,e,n){var r=n(7),o=n(68),i=n(71),a=n(4);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(a(t)),n=i.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(44),o=n(30).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(16),o=n(45),i=n(70),a=function(t){return function(e,n,a){var c,s=r(e),u=o(s.length),f=i(a,u);if(t&&n!=n){for(;u>f;)if((c=s[f++])!=c)return!0}else for(;u>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},function(t,e,n){var r=n(29),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(22);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(2);t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},function(t,e,n){var r=n(6);t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,e,n){var r=n(9),o=n(10),i=n(4),a=n(76);t.exports=r?Object.defineProperties:function(t,e){i(t);for(var n,r=a(e),c=r.length,s=0;c>s;)o.f(t,n=r[s++],e[n]);return t}},function(t,e,n){var r=n(44),o=n(30);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(1),o=n(14),i=r("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||a[i]===t)}},function(t,e,n){var r=n(49);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,e,n){var r=n(51),o=n(14),i=n(1)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,e,n){var r=n(4);t.exports=function(t){var e=t.return;if(void 0!==e)return r(e.call(t)).value}},function(t,e,n){var r=n(33),o=n(11),i=n(82);r||o(Object.prototype,"toString",i,{unsafe:!0})},function(t,e,n){"use strict";var r=n(33),o=n(51);t.exports=r?{}.toString:function(){return"[object "+o(this)+"]"}},function(t,e,n){"use strict";var r,o,i,a,c=n(8),s=n(13),u=n(0),f=n(7),p=n(52),l=n(11),h=n(84),v=n(34),d=n(85),y=n(6),g=n(12),m=n(86),b=n(25),x=n(18),w=n(87),S=n(53),P=n(54).set,j=n(88),O=n(56),E=n(90),_=n(19),M=n(37),k=n(17),T=n(46),L=n(1),I=n(36),R=n(91),A=L("species"),C="Promise",U=k.get,F=k.set,N=k.getterFor(C),D=p,V=u.TypeError,G=u.document,H=u.process,W=f("fetch"),z=_.f,q=z,B=!!(G&&G.createEvent&&u.dispatchEvent),$="function"==typeof PromiseRejectionEvent,Y=T(C,(function(){if(!(b(D)!==String(D))){if(66===R)return!0;if(!I&&!$)return!0}if(s&&!D.prototype.finally)return!0;if(R>=51&&/native code/.test(D))return!1;var t=D.resolve(1),e=function(t){t((function(){}),(function(){}))};return(t.constructor={})[A]=e,!(t.then((function(){}))instanceof e)})),K=Y||!w((function(t){D.all(t).catch((function(){}))})),X=function(t){var e;return!(!y(t)||"function"!=typeof(e=t.then))&&e},J=function(t,e){if(!t.notified){t.notified=!0;var n=t.reactions;j((function(){for(var r=t.value,o=1==t.state,i=0;n.length>i;){var a,c,s,u=n[i++],f=o?u.ok:u.fail,p=u.resolve,l=u.reject,h=u.domain;try{f?(o||(2===t.rejection&&et(t),t.rejection=1),!0===f?a=r:(h&&h.enter(),a=f(r),h&&(h.exit(),s=!0)),a===u.promise?l(V("Promise-chain cycle")):(c=X(a))?c.call(a,p,l):p(a)):l(r)}catch(t){h&&!s&&h.exit(),l(t)}}t.reactions=[],t.notified=!1,e&&!t.rejection&&Z(t)}))}},Q=function(t,e,n){var r,o;B?((r=G.createEvent("Event")).promise=e,r.reason=n,r.initEvent(t,!1,!0),u.dispatchEvent(r)):r={promise:e,reason:n},!$&&(o=u["on"+t])?o(r):"unhandledrejection"===t&&E("Unhandled promise rejection",n)},Z=function(t){P.call(u,(function(){var e,n=t.facade,r=t.value;if(tt(t)&&(e=M((function(){I?H.emit("unhandledRejection",r,n):Q("unhandledrejection",n,r)})),t.rejection=I||tt(t)?2:1,e.error))throw e.value}))},tt=function(t){return 1!==t.rejection&&!t.parent},et=function(t){P.call(u,(function(){var e=t.facade;I?H.emit("rejectionHandled",e):Q("rejectionhandled",e,t.value)}))},nt=function(t,e,n){return function(r){t(e,r,n)}},rt=function(t,e,n){t.done||(t.done=!0,n&&(t=n),t.value=e,t.state=2,J(t,!0))},ot=function(t,e,n){if(!t.done){t.done=!0,n&&(t=n);try{if(t.facade===e)throw V("Promise can't be resolved itself");var r=X(e);r?j((function(){var n={done:!1};try{r.call(e,nt(ot,n,t),nt(rt,n,t))}catch(e){rt(n,e,t)}})):(t.value=e,t.state=1,J(t,!1))}catch(e){rt({done:!1},e,t)}}};Y&&(D=function(t){m(this,D,C),g(t),r.call(this);var e=U(this);try{t(nt(ot,e),nt(rt,e))}catch(t){rt(e,t)}},(r=function(t){F(this,{type:C,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=h(D.prototype,{then:function(t,e){var n=N(this),r=z(S(this,D));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=I?H.domain:void 0,n.parent=!0,n.reactions.push(r),0!=n.state&&J(n,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new r,e=U(t);this.promise=t,this.resolve=nt(ot,e),this.reject=nt(rt,e)},_.f=z=function(t){return t===D||t===i?new o(t):q(t)},s||"function"!=typeof p||(a=p.prototype.then,l(p.prototype,"then",(function(t,e){var n=this;return new D((function(t,e){a.call(n,t,e)})).then(t,e)}),{unsafe:!0}),"function"==typeof W&&c({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return O(D,W.apply(u,arguments))}}))),c({global:!0,wrap:!0,forced:Y},{Promise:D}),v(D,C,!1,!0),d(C),i=f(C),c({target:C,stat:!0,forced:Y},{reject:function(t){var e=z(this);return e.reject.call(void 0,t),e.promise}}),c({target:C,stat:!0,forced:s||Y},{resolve:function(t){return O(s&&this===i?D:this,t)}}),c({target:C,stat:!0,forced:K},{all:function(t){var e=this,n=z(e),r=n.resolve,o=n.reject,i=M((function(){var n=g(e.resolve),i=[],a=0,c=1;x(t,(function(t){var s=a++,u=!1;i.push(void 0),c++,n.call(e,t).then((function(t){u||(u=!0,i[s]=t,--c||r(i))}),o)})),--c||r(i)}));return i.error&&o(i.value),n.promise},race:function(t){var e=this,n=z(e),r=n.reject,o=M((function(){var o=g(e.resolve);x(t,(function(t){o.call(e,t).then(n.resolve,r)}))}));return o.error&&r(o.value),n.promise}})},function(t,e,n){var r=n(11);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},function(t,e,n){"use strict";var r=n(7),o=n(10),i=n(1),a=n(9),c=i("species");t.exports=function(t){var e=r(t),n=o.f;a&&e&&!e[c]&&n(e,c,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},function(t,e,n){var r=n(1)("iterator"),o=!1;try{var i=0,a={next:function(){return{done:!!i++}},return:function(){o=!0}};a[r]=function(){return this},Array.from(a,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i={};i[r]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},function(t,e,n){var r,o,i,a,c,s,u,f,p=n(0),l=n(20).f,h=n(54).set,v=n(55),d=n(89),y=n(36),g=p.MutationObserver||p.WebKitMutationObserver,m=p.document,b=p.process,x=p.Promise,w=l(p,"queueMicrotask"),S=w&&w.value;S||(r=function(){var t,e;for(y&&(t=b.domain)&&t.exit();o;){e=o.fn,o=o.next;try{e()}catch(t){throw o?a():i=void 0,t}}i=void 0,t&&t.enter()},v||y||d||!g||!m?x&&x.resolve?(u=x.resolve(void 0),f=u.then,a=function(){f.call(u,r)}):a=y?function(){b.nextTick(r)}:function(){h.call(p,r)}:(c=!0,s=m.createTextNode(""),new g(r).observe(s,{characterData:!0}),a=function(){s.data=c=!c})),t.exports=S||function(t){var e={fn:t,next:void 0};i&&(i.next=e),o||(o=e,a()),i=e}},function(t,e,n){var r=n(35);t.exports=/web0s(?!.*chrome)/i.test(r)},function(t,e,n){var r=n(0);t.exports=function(t,e){var n=r.console;n&&n.error&&(1===arguments.length?n.error(t):n.error(t,e))}},function(t,e,n){var r,o,i=n(0),a=n(35),c=i.process,s=c&&c.versions,u=s&&s.v8;u?o=(r=u.split("."))[0]+r[1]:a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(o=r[1]),t.exports=o&&+o},function(t,e,n){"use strict";var r=n(8),o=n(12),i=n(19),a=n(37),c=n(18);r({target:"Promise",stat:!0},{allSettled:function(t){var e=this,n=i.f(e),r=n.resolve,s=n.reject,u=a((function(){var n=o(e.resolve),i=[],a=0,s=1;c(t,(function(t){var o=a++,c=!1;i.push(void 0),s++,n.call(e,t).then((function(t){c||(c=!0,i[o]={status:"fulfilled",value:t},--s||r(i))}),(function(t){c||(c=!0,i[o]={status:"rejected",reason:t},--s||r(i))}))})),--s||r(i)}));return u.error&&s(u.value),n.promise}})},function(t,e,n){"use strict";var r=n(8),o=n(12),i=n(7),a=n(19),c=n(37),s=n(18);r({target:"Promise",stat:!0},{any:function(t){var e=this,n=a.f(e),r=n.resolve,u=n.reject,f=c((function(){var n=o(e.resolve),a=[],c=0,f=1,p=!1;s(t,(function(t){var o=c++,s=!1;a.push(void 0),f++,n.call(e,t).then((function(t){s||p||(p=!0,r(t))}),(function(t){s||p||(s=!0,a[o]=t,--f||u(new(i("AggregateError"))(a,"No one promise resolved")))}))})),--f||u(new(i("AggregateError"))(a,"No one promise resolved"))}));return f.error&&u(f.value),n.promise}})},function(t,e,n){"use strict";var r=n(8),o=n(13),i=n(52),a=n(2),c=n(7),s=n(53),u=n(56),f=n(11);r({target:"Promise",proto:!0,real:!0,forced:!!i&&a((function(){i.prototype.finally.call({then:function(){}},(function(){}))}))},{finally:function(t){var e=s(this,c("Promise")),n="function"==typeof t;return this.then(n?function(n){return u(e,t()).then((function(){return n}))}:t,n?function(n){return u(e,t()).then((function(){throw n}))}:t)}}),o||"function"!=typeof i||i.prototype.finally||f(i.prototype,"finally",c("Promise").prototype.finally)},function(t,e,n){"use strict";var r=n(96).charAt,o=n(17),i=n(57),a=o.set,c=o.getterFor("String Iterator");i(String,"String",(function(t){a(this,{type:"String Iterator",string:String(t),index:0})}),(function(){var t,e=c(this),n=e.string,o=e.index;return o>=n.length?{value:void 0,done:!0}:(t=r(n,o),e.index+=t.length,{value:t,done:!1})}))},function(t,e,n){var r=n(29),o=n(22),i=function(t){return function(e,n){var i,a,c=String(o(e)),s=r(n),u=c.length;return s<0||s>=u?t?"":void 0:(i=c.charCodeAt(s))<55296||i>56319||s+1===u||(a=c.charCodeAt(s+1))<56320||a>57343?t?c.charAt(s):i:t?c.slice(s,s+2):a-56320+(i-55296<<10)+65536}};t.exports={codeAt:i(!1),charAt:i(!0)}},function(t,e,n){"use strict";var r=n(58).IteratorPrototype,o=n(32),i=n(15),a=n(34),c=n(14),s=function(){return this};t.exports=function(t,e,n){var u=e+" Iterator";return t.prototype=o(r,{next:i(1,n)}),a(t,u,!1,!0),c[u]=s,t}},function(t,e,n){var r=n(0),o=n(99),i=n(100),a=n(5),c=n(1),s=c("iterator"),u=c("toStringTag"),f=i.values;for(var p in o){var l=r[p],h=l&&l.prototype;if(h){if(h[s]!==f)try{a(h,s,f)}catch(t){h[s]=f}if(h[u]||a(h,u,p),o[p])for(var v in i)if(h[v]!==i[v])try{a(h,v,i[v])}catch(t){h[v]=i[v]}}}},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,e,n){"use strict";var r=n(16),o=n(101),i=n(14),a=n(17),c=n(57),s=a.set,u=a.getterFor("Array Iterator");t.exports=c(Array,"Array",(function(t,e){s(this,{type:"Array Iterator",target:r(t),index:0,kind:e})}),(function(){var t=u(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}}),"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(t,e,n){var r=n(1),o=n(32),i=n(10),a=r("unscopables"),c=Array.prototype;null==c[a]&&i.f(c,a,{configurable:!0,value:o(null)}),t.exports=function(t){c[a][t]=!0}},function(t,e,n){(function(t){!function(t){var e=function(){try{return!!Symbol.iterator}catch(t){return!1}}(),n=function(t){var n={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return e&&(n[Symbol.iterator]=function(){return n}),n},r=function(t){return encodeURIComponent(t).replace(/%20/g,"+")},o=function(t){return decodeURIComponent(String(t).replace(/\+/g," "))};(function(){try{var e=t.URLSearchParams;return"a=1"===new e("?a=1").toString()&&"function"==typeof e.prototype.set&&"function"==typeof e.prototype.entries}catch(t){return!1}})()||function(){var o=function(t){Object.defineProperty(this,"_entries",{writable:!0,value:{}});var e=typeof t;if("undefined"===e);else if("string"===e)""!==t&&this._fromString(t);else if(t instanceof o){var n=this;t.forEach((function(t,e){n.append(e,t)}))}else{if(null===t||"object"!==e)throw new TypeError("Unsupported input's type for URLSearchParams");if("[object Array]"===Object.prototype.toString.call(t))for(var r=0;r<t.length;r++){var i=t[r];if("[object Array]"!==Object.prototype.toString.call(i)&&2===i.length)throw new TypeError("Expected [string, any] as entry at index "+r+" of URLSearchParams's input");this.append(i[0],i[1])}else for(var a in t)t.hasOwnProperty(a)&&this.append(a,t[a])}},i=o.prototype;i.append=function(t,e){t in this._entries?this._entries[t].push(String(e)):this._entries[t]=[String(e)]},i.delete=function(t){delete this._entries[t]},i.get=function(t){return t in this._entries?this._entries[t][0]:null},i.getAll=function(t){return t in this._entries?this._entries[t].slice(0):[]},i.has=function(t){return t in this._entries},i.set=function(t,e){this._entries[t]=[String(e)]},i.forEach=function(t,e){var n;for(var r in this._entries)if(this._entries.hasOwnProperty(r)){n=this._entries[r];for(var o=0;o<n.length;o++)t.call(e,n[o],r,this)}},i.keys=function(){var t=[];return this.forEach((function(e,n){t.push(n)})),n(t)},i.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),n(t)},i.entries=function(){var t=[];return this.forEach((function(e,n){t.push([n,e])})),n(t)},e&&(i[Symbol.iterator]=i.entries),i.toString=function(){var t=[];return this.forEach((function(e,n){t.push(r(n)+"="+r(e))})),t.join("&")},t.URLSearchParams=o}();var i=t.URLSearchParams.prototype;"function"!=typeof i.sort&&(i.sort=function(){var t=this,e=[];this.forEach((function(n,r){e.push([r,n]),t._entries||t.delete(r)})),e.sort((function(t,e){return t[0]<e[0]?-1:t[0]>e[0]?1:0})),t._entries&&(t._entries={});for(var n=0;n<e.length;n++)this.append(e[n][0],e[n][1])}),"function"!=typeof i._fromString&&Object.defineProperty(i,"_fromString",{enumerable:!1,configurable:!1,writable:!1,value:function(t){if(this._entries)this._entries={};else{var e=[];this.forEach((function(t,n){e.push(n)}));for(var n=0;n<e.length;n++)this.delete(e[n])}var r,i=(t=t.replace(/^\?/,"")).split("&");for(n=0;n<i.length;n++)r=i[n].split("="),this.append(o(r[0]),r.length>1?o(r[1]):"")}})}(void 0!==t?t:"undefined"!=typeof window?window:"undefined"!=typeof self?self:this),function(t){if(function(){try{var e=new t.URL("b","http://a");return e.pathname="c d","http://a/c%20d"===e.href&&e.searchParams}catch(t){return!1}}()||function(){var e=t.URL,n=function(e,n){"string"!=typeof e&&(e=String(e)),n&&"string"!=typeof n&&(n=String(n));var r,o=document;if(n&&(void 0===t.location||n!==t.location.href)){n=n.toLowerCase(),(r=(o=document.implementation.createHTMLDocument("")).createElement("base")).href=n,o.head.appendChild(r);try{if(0!==r.href.indexOf(n))throw new Error(r.href)}catch(t){throw new Error("URL unable to set base "+n+" due to "+t)}}var i=o.createElement("a");i.href=e,r&&(o.body.appendChild(i),i.href=i.href);var a=o.createElement("input");if(a.type="url",a.value=e,":"===i.protocol||!/:/.test(i.href)||!a.checkValidity()&&!n)throw new TypeError("Invalid URL");Object.defineProperty(this,"_anchorElement",{value:i});var c=new t.URLSearchParams(this.search),s=!0,u=!0,f=this;["append","delete","set"].forEach((function(t){var e=c[t];c[t]=function(){e.apply(c,arguments),s&&(u=!1,f.search=c.toString(),u=!0)}})),Object.defineProperty(this,"searchParams",{value:c,enumerable:!0});var p=void 0;Object.defineProperty(this,"_updateSearchParams",{enumerable:!1,configurable:!1,writable:!1,value:function(){this.search!==p&&(p=this.search,u&&(s=!1,this.searchParams._fromString(this.search),s=!0))}})},r=n.prototype;["hash","host","hostname","port","protocol"].forEach((function(t){!function(t){Object.defineProperty(r,t,{get:function(){return this._anchorElement[t]},set:function(e){this._anchorElement[t]=e},enumerable:!0})}(t)})),Object.defineProperty(r,"search",{get:function(){return this._anchorElement.search},set:function(t){this._anchorElement.search=t,this._updateSearchParams()},enumerable:!0}),Object.defineProperties(r,{toString:{get:function(){var t=this;return function(){return t.href}}},href:{get:function(){return this._anchorElement.href.replace(/\?$/,"")},set:function(t){this._anchorElement.href=t,this._updateSearchParams()},enumerable:!0},pathname:{get:function(){return this._anchorElement.pathname.replace(/(^\/?)/,"/")},set:function(t){this._anchorElement.pathname=t},enumerable:!0},origin:{get:function(){var t={"http:":80,"https:":443,"ftp:":21}[this._anchorElement.protocol],e=this._anchorElement.port!=t&&""!==this._anchorElement.port;return this._anchorElement.protocol+"//"+this._anchorElement.hostname+(e?":"+this._anchorElement.port:"")},enumerable:!0},password:{get:function(){return""},set:function(t){},enumerable:!0},username:{get:function(){return""},set:function(t){},enumerable:!0}}),n.createObjectURL=function(t){return e.createObjectURL.apply(e,arguments)},n.revokeObjectURL=function(t){return e.revokeObjectURL.apply(e,arguments)},t.URL=n}(),void 0!==t.location&&!("origin"in t.location)){var e=function(){return t.location.protocol+"//"+t.location.hostname+(t.location.port?":"+t.location.port:"")};try{Object.defineProperty(t.location,"origin",{get:e,enumerable:!0})}catch(n){setInterval((function(){t.location.origin=e()}),100)}}}(void 0!==t?t:"undefined"!=typeof window?window:"undefined"!=typeof self?self:this)}).call(this,n(38))},function(t,e,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};e.__esModule=!0,e.PlayerSdk=void 0;var o=function(){function t(e,n){var r=this;this.iframe=null,this.playerReady=!1,this.onceReadyCallbacks=[],this.userEventListeners=[],this.playerOrigin=null,this.postMessageCallbacks={},this.sdkPlayerId=t.nextSdkPlayerId++,this.sdkOrigin=window.location.protocol+"//"+window.location.host;var o=document.querySelector(e);if(null==o)throw new Error("No match found for selector "+e);this.iframe="IFRAME"!==o.tagName?this.createIframe(o):o;var i=n||{};this.iframeUrl=i.iframeUrl||t.DEFAULT_IFRAME_URL,this.iframe.src?this.bindExistingPlayer(this.iframe):this.createNewPlayer(this.iframe,i),this.onceReadyCallbacks=[],this.userEventListeners=[],this.playerReady=!1,this.playerOrigin=new URL(this.iframeUrl).origin,window.addEventListener("message",(function(t){var e;t.origin===r.playerOrigin&&parseInt(null===(e=t.data)||void 0===e?void 0:e.sdkPlayerId,10)===r.sdkPlayerId&&(t.data.callbackId&&r.postMessageCallbacks[t.data.callbackId]?r.postMessageCallbacks[t.data.callbackId](t.data.arg):r.onEvent(t.data))}),!1)}return t.prototype.loadConfig=function(t){this.postMessage({message:"loadConfig",url:this.buildPlayerUrl(t)})},t.prototype.play=function(){this.postMessage({message:"play"})},t.prototype.hideControls=function(){this.postMessage({message:"hideControls"})},t.prototype.showControls=function(){this.postMessage({message:"showControls"})},t.prototype.hideSubtitles=function(){this.postMessage({message:"hideSubtitles"})},t.prototype.showSubtitles=function(){this.postMessage({message:"showSubtitles"})},t.prototype.pause=function(){this.postMessage({message:"pause"})},t.prototype.mute=function(){this.postMessage({message:"mute"})},t.prototype.unmute=function(){this.postMessage({message:"unmute"})},t.prototype.seek=function(t){this.postMessage({message:"seek",seek:t})},t.prototype.setCurrentTime=function(t){this.postMessage({message:"setCurrentTime",currentTime:t})},t.prototype.setVolume=function(t){this.postMessage({message:"setVolume",volume:t})},t.prototype.setLoop=function(t){this.postMessage({message:"setLoop",loop:t})},t.prototype.setPlaybackRate=function(t){this.postMessage({message:"setPlaybackRate",rate:t})},t.prototype.setTheme=function(t){this.postMessage({message:"setTheme",theme:t})},t.prototype.getPaused=function(t){return this.postMessage({message:"getPaused"},t)},t.prototype.getMuted=function(t){return this.postMessage({message:"getMuted"},t)},t.prototype.getDuration=function(t){return this.postMessage({message:"getDuration"},t)},t.prototype.getCurrentTime=function(t){return this.postMessage({message:"getCurrentTime"},t)},t.prototype.getPlaybackRate=function(t){return this.postMessage({message:"getPlaybackRate"},t)},t.prototype.getVolume=function(t){return this.postMessage({message:"getVolume"},t)},t.prototype.getLoop=function(t){return this.postMessage({message:"getLoop"},t)},t.prototype.addEventListener=function(t,e){this.userEventListeners.push({event:t,callback:e})},t.prototype.destroy=function(){var t=this;this.postMessage({message:"destroy"}),setTimeout((function(){var e,n;return null===(n=null===(e=t.iframe)||void 0===e?void 0:e.parentElement)||void 0===n?void 0:n.removeChild(t.iframe)}),0)},t.prototype.createNewPlayer=function(t,e){this.setIframeSrc(t,this.buildPlayerUrl(e))},t.prototype.buildPlayerUrl=function(t){if(!t.id)throw new Error("Missing id in options");var e=this.iframeUrl.replace("${id}",t.id).replace("${type}",t.live?"live":"vod");return this.addParametersInIframeHash(e+"?"+this.urlParametersFromOptions(t),t)},t.prototype.bindExistingPlayer=function(t){this.setIframeSrc(t,this.addParametersInIframeHash(t.src,{}))},t.prototype.addParametersInIframeHash=function(t,e){var n=function(e,n){var r=t.indexOf("#"),o=n?e+":"+n:e;if(-1===r)return t+"#"+o;var i=t.substr(0,r),a=t.substr(r+1);return i+"#"+o+";"+(a=a.replace(new RegExp(e+"(:[^;]+)?;?"),""))};return t=n("sdkPlayerId",""+this.sdkPlayerId),t=n("sdkOrigin",btoa(this.sdkOrigin)),t=n("api"),!0===e.hideControls&&(t=n("hide-controls")),!0===e.loop&&(t=n("loop")),!0===e.hideTitle&&(t=n("hide-title")),!0===e.showSubtitles&&(t=n("show-subtitles")),t},t.prototype.urlParametersFromOptions=function(t){var e=t;return e.ts=(new Date).getTime(),Object.keys(t).map((function(t){if("metadata"===t&&"object"==typeof e[t]){var n=e[t];return Object.keys(n).map((function(t){return"metadata["+t+"]="+n[t]})).join("&")}return t+"="+e[t]})).join("&")},t.prototype.onEvent=function(t){var e=r({},t);switch(delete e.type,delete e.sdkPlayerId,this.userEventListeners.filter((function(e){return e.event===t.type})).forEach((function(t){return t.callback(e)})),t.type){case"sdkSync":this.onReady()}},t.prototype.onReady=function(){this.playerReady||(this.playerReady=!0,this.onceReadyCallbacks.forEach((function(t){t()})))},t.prototype.postMessage=function(t,e){var n=this;return new Promise((function(o,i){var a;if(n.playerOrigin&&(null===(a=n.iframe)||void 0===a?void 0:a.contentWindow)){var c=r(r({},t),{sdkPlayerId:n.sdkPlayerId}),s=n.makeId(16);n.postMessageCallbacks[s]=function(t){o(t),e&&e(t)},c.callbackId=s,n.playerReady&&n.playerOrigin?n.iframe.contentWindow.postMessage(c,n.playerOrigin):n.onceReadyCallbacks.push((function(){var t,e;return n.playerOrigin&&(null===(e=null===(t=n.iframe)||void 0===t?void 0:t.contentWindow)||void 0===e?void 0:e.postMessage(c,n.playerOrigin))}))}else i()}))},t.prototype.makeId=function(t){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=e.length,r="",o=0;o<t;o++)r+=e.charAt(Math.floor(Math.random()*n));return r},t.prototype.createIframe=function(t){var e=document.createElement("iframe");return e.style.height="100%",e.style.width="100%",e.allowFullscreen=!0,t.appendChild(e),e},t.prototype.setIframeSrc=function(t,e){t.src=e},t.DEFAULT_IFRAME_URL="https://embed.api.video/${type}/${id}",t.nextSdkPlayerId=1,t}();e.PlayerSdk=o}])}));