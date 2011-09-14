jQuery.webshims.ready("dom-support",function(e,f,k,s){var g=s.createElement("a");["poster","src"].forEach(function(l){f.defineNodeNamesProperty(l=="src"?["audio","video","source"]:["video"],l,{prop:{get:function(){var f=e.attr(this,l);if(f==null)return"";g.setAttribute("href",f);return g.href},set:function(f){e.attr(this,l,f)}}})});["autoplay","controls"].forEach(function(e){f.defineNodeNamesBooleanProperty(["audio","video"],e)});f.defineNodeNamesProperties(["audio","video"],{HAVE_CURRENT_DATA:{value:2},
HAVE_ENOUGH_DATA:{value:4},HAVE_FUTURE_DATA:{value:3},HAVE_METADATA:{value:1},HAVE_NOTHING:{value:0},NETWORK_EMPTY:{value:0},NETWORK_IDLE:{value:1},NETWORK_LOADING:{value:2},NETWORK_NO_SOURCE:{value:3}},"prop")});
jQuery.webshims.register("mediaelement-swf",function(e,f,k,s,g,l){var m=f.mediaelement,w=k.swfobject,x=Modernizr.audio&&Modernizr.video,t=w.hasFlashPlayerVersion("9.0.115"),q={paused:!0,ended:!1,currentSrc:"",duration:k.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(b){if(b)f.error("buffered index size error");else return 0},end:function(b){if(b)f.error("buffered index size error");else return 0},length:0}},v=Object.keys(q),D={currentTime:0,volume:1,
muted:!1};Object.keys(D);var E=e.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_callMeta:!1,currentTime:0,_ppFlag:g},q,D),A=/^jwplayer-/,n=function(b){if(b=s.getElementById(b.replace(A,"")))return b=f.data(b,"mediaelement"),b.isActive=="flash"?b:null},o=function(b){return(b=f.data(b,"mediaelement"))&&b.isActive=="flash"?b:null},h=function(b,a){a=e.Event(a);a.preventDefault();e.event.trigger(a,g,b)},u,B=f.cfg.basePath+"jwplayer/player.swf",
y=f.cfg.basePath+"swf/jwwebshims.swf";f.extendUNDEFProp(l.jwParams,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});f.extendUNDEFProp(l.jwVars,{screencolor:"ffffffff"});f.extendUNDEFProp(l.jwAttrs,{bgcolor:"#000000"});m.jwEvents={View:{PLAY:function(b){var a=n(b.id);if(a&&!a.stopPlayPause&&(a._ppFlag=!0,a.paused==b.state)){a.paused=!b.state;if(a.ended)a.ended=!1;h(a._elem,b.state?"play":"pause")}}},Model:{BUFFER:function(b){var a=n(b.id);if(a&&a._bufferedEnd!=b.percentage){a.networkState=
b.percentage==100?1:2;if(!a.duration){try{if(a.duration=a.jwapi.getPlaylist()[0].duration,a.duration<=0)a.duration=k.NaN}catch(c){}a.duration&&(h(a._elem,"durationchange"),(a._elemNodeName=="audio"||a._callMeta)&&this.META(e.extend({duration:a.duration},b),a))}if(a.ended)a.ended=!1;if(a.duration){if(b.percentage>1&&a.readyState<3)a.readyState=3,h(a._elem,"canplay");if(a._bufferedEnd&&a._bufferedEnd>b.percentage)a._bufferedStart=a.currentTime||0;a._bufferedEnd=b.percentage;a.buffered.length=1;if(b.percentage==
100)a.networkState=1,a.readyState=4;e.event.trigger("progress",g,a._elem,!0)}}},META:function(b,a){a=a&&a.networkState?a:n(b.id);if("duration"in b){if(a&&!a._metadata){a._metadata=!0;var c=a.duration;a.duration=b.duration;a.videoHeight=b.height||0;a.videoWidth=b.width||0;if(!a.networkState)a.networkState=2;if(a.readyState<1)a.readyState=1;c!==a.duration&&h(a._elem,"durationchange");h(a._elem,"loadedmetadata")}}else a._callMeta=!0},TIME:function(b){var a=n(b.id);if(a&&a.currentTime!==b.position){a.currentTime=
b.position;if(a.readyState<2)a.readyState=2;if(a.ended)a.ended=!1;h(a._elem,"timeupdate")}},STATE:function(b){var a=n(b.id);if(a)switch(b.newstate){case "BUFFERING":if(a.readyState>1)a.readyState=1;if(a.ended)a.ended=!1;h(a._elem,"waiting");break;case "PLAYING":a.paused=!1;a._ppFlag=!0;if(a.readyState<3)a.readyState=3,h(a._elem,"canplay");if(a.ended)a.ended=!1;h(a._elem,"playing");break;case "PAUSED":if(!a.paused&&!a.stopPlayPause)a.paused=!0,a._ppFlag=!0,h(a._elem,"pause");break;case "COMPLETED":if(a.readyState<
4)a.readyState=4;a.ended=!0;h(a._elem,"ended")}}},Controller:{ERROR:function(b){var a=n(b.id);a&&m.setError(a._elem,b.message)},SEEK:function(b){var a=n(b.id);if(a){if(a.ended)a.ended=!1;if(a.paused)try{a.jwapi.sendEvent("play","false")}catch(c){}if(a.currentTime!=b.position)a.currentTime=b.position,h(a._elem,"timeupdate")}},VOLUME:function(b){var a=n(b.id);if(a&&(b=b.percentage/100,a.volume!=b))a.volume=b,h(a._elem,"volumechange")},MUTE:function(b){if(!u||!b.state){var a=n(b.id);if(a&&a.muted!=b.state)a.muted=
b.state,h(a._elem,"volumechange")}}}};var c=function(b){e.each(m.jwEvents,function(a,c){e.each(c,function(c){b.jwapi["add"+a+"Listener"](c,"jQuery.webshims.mediaelement.jwEvents."+a+"."+c)})})},d=function(b){b&&(b._ppFlag===g&&e.prop(b._elem,"autoplay")||!b.paused)&&setTimeout(function(){if(b.isActive=="flash"&&(b._ppFlag===g||!b.paused))try{e(b._elem).play()}catch(a){}},1)},j=function(b){if(b&&b._elemNodeName=="video"){var a,c,d,j={},p,r,i,f=function(f,g){if(g&&f&&!(g<1||f<1||b.isActive!="flash"))if(a&&
(a.remove(),a=!1),j.width=f,j.height=g,clearTimeout(r),c=b._elem.style.width=="auto",d=b._elem.style.height=="auto",c||d){p=p||e(b._elem).getShadowElement();var q;c&&!d?(q=p.height(),f*=q/g,g=q):!c&&d&&(q=p.width(),g*=q/f,f=q);i=!0;setTimeout(function(){i=!1},9);p.css({width:f,height:g})}},g=function(){if(!(b.isActive!="flash"||e.prop(b._elem,"readyState")&&e.prop(this,"videoWidth"))){var p=e.prop(b._elem,"poster");if(p&&(c=b._elem.style.width=="auto",d=b._elem.style.height=="auto",c||d))a&&(a.remove(),
a=!1),a=e('<img style="position: absolute; height: auto; width: auto; top: 0px; left: 0px; visibility: hidden;" />'),a.bind("load error alreadycomplete",function(){clearTimeout(r);var b=this,c=b.naturalWidth||b.width||b.offsetWidth,d=b.naturalHeight||b.height||b.offsetHeight;d&&c?(f(c,d),b=null):setTimeout(function(){c=b.naturalWidth||b.width||b.offsetWidth;d=b.naturalHeight||b.height||b.offsetHeight;f(c,d);a&&(a.remove(),a=!1);b=null},9);e(this).unbind()}).prop("src",p).appendTo("body").each(function(){this.complete||
this.error?e(this).triggerHandler("alreadycomplete"):(clearTimeout(r),r=setTimeout(function(){e(b._elem).triggerHandler("error")},9999))})}};e(b._elem).bind("loadedmetadata",function(){f(e.prop(this,"videoWidth"),e.prop(this,"videoHeight"))}).bind("emptied",g).bind("swfstageresize",function(){i||f(j.width,j.height)}).triggerHandler("swfstageresize");g();e.prop(b._elem,"readyState")&&f(e.prop(b._elem,"videoWidth"),e.prop(b._elem,"videoHeight"))}};m.playerResize=function(b){b&&(b=s.getElementById(b.replace(A,
"")))&&e(b).triggerHandler("swfstageresize")};e(s).bind("emptied",function(b){b=o(b.target);d(b)});var i;m.jwPlayerReady=function(b){var a=n(b.id);if(a&&a.jwapi){clearTimeout(i);a.jwData=b;a.wasSwfReady?e(a._elem).mediaLoad():(b=parseFloat(b.version,10),(b<5.6||b>=6)&&f.warn("mediaelement-swf is only testet with jwplayer 5.6+"),e.prop(a._elem,"volume",a.volume),e.prop(a._elem,"muted",a.muted),c(a));a.wasSwfReady=!0;var b=a.actionQueue.length,F=0,j;if(b&&a.isActive=="flash")for(;a.actionQueue.length&&
b>F;)F++,j=a.actionQueue.shift(),a.jwapi[j.fn].apply(a.jwapi,j.args);if(a.actionQueue.length)a.actionQueue=[];d(a)}};var G=e.noop;if(x){var I={play:1,playing:1},C=["play","pause","playing","canplay","progress","waiting","ended","loadedmetadata","durationchange","emptied"].map(function(b){return b+".webshimspolyfill"}).join(" "),H=function(b){var a=f.data(b.target,"mediaelement");a&&(b.originalEvent&&b.originalEvent.type===b.type)==(a.activating=="flash")&&(b.stopImmediatePropagation(),I[b.type]&&
a.isActive!=a.activating&&e(b.target).pause())};e(s).bind(C,H);G=function(b){e(b).unbind(C).bind(C,H)}}m.setActive=function(b,a,c){c||(c=f.data(b,"mediaelement"));if(c&&c.isActive!=a){a!="html5"&&a!="flash"&&f.warn("wrong type for mediaelement activating: "+a);var d=f.data(b,"shadowData");c.activating=a;e(b).pause();c.isActive=a;a=="flash"?(d.shadowElement=d.shadowFocusElement=c.shadowElem[0],e(b).hide().getShadowElement().show()):(e(b).show().getShadowElement().hide(),d.shadowElement=d.shadowFocusElement=
!1)}};var J=function(){var b=["_bufferedEnd","_bufferedStart","_metadata","_ppFlag","currentSrc","currentTime","duration","ended","networkState","paused","videoHeight","videoWidth","_callMeta"],a=b.length;return function(c){if(c){for(var d=a,e=c.networkState;--d;)delete c[b[d]];c.actionQueue=[];c.buffered.length=0;e&&h(c._elem,"emptied")}}}();m.createSWF=function(b,a,c){if(t){var d=e.extend({},l.jwVars,{image:e.prop(b,"poster")||"",file:a.srcProp}),g=e(b).data("jwvars")||{};if(c&&c.swfCreated)m.setActive(b,
"flash",c),J(c),c.currentSrc=a.srcProp,e.extend(d,g),l.changeJW(d,b,a,c,"load"),z(b,"sendEvent",["LOAD",d]);else{var p=e.prop(b,"controls"),r="jwplayer-"+f.getID(b),q=e.extend({},l.jwParams,e(b).data("jwparams")),h=b.nodeName.toLowerCase(),k=e.extend({},l.jwAttrs,{name:r,id:r},e(b).data("jwattrs")),v=e('<div class="polyfill-'+h+' polyfill-mediaelement" id="wrapper-'+r+'"><div id="'+r+'"></div>').css({position:"relative",overflow:"hidden"});h=="audio"&&!p?v.css({width:0,height:0}):v.css({width:b.style.width||
e(b).width(),height:b.style.height||e(b).height()});v.insertBefore(b);c=f.data(b,"mediaelement",f.objectCreate(E,{actionQueue:{value:[]},shadowElem:{value:v},_elemNodeName:{value:h},_elem:{value:b},currentSrc:{value:a.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(a){if(a>=c.buffered.length)f.error("buffered index size error");else return 0},end:function(a){if(a>=c.buffered.length)f.error("buffered index size error");else return(c.duration-c._bufferedStart)*c._bufferedEnd/100+c._bufferedStart},
length:0}}}));x&&e.extend(c,{volume:e.prop(b,"volume"),muted:e.prop(b,"muted")});e.extend(d,{id:r,controlbar:p?l.jwVars.controlbar||(h=="video"?"over":"bottom"):"none",icons:""+(p&&h=="video")},g,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});d.plugins?d.plugins+=","+y:d.plugins=y;f.addShadowDom(b,v);G(b);m.setActive(b,"flash",c);l.changeJW(d,b,a,c,"embed");j(c);w.embedSWF(B,r,"100%","100%","9.0.0",!1,d,q,k,function(a){if(a.success)c.jwapi=a.ref,p||e(a.ref).attr("tabindex","-1").css("outline",
"none"),i||(clearTimeout(i),i=setTimeout(function(){var b=e(a.ref).css({minHeight:"2px",minWidth:"2px",display:"block"});b[0].offsetWidth>1&&b[0].offsetHeight>1&&location.protocol.indexOf("file:")===0?f.warn("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):(b[0].offsetWidth<2||b[0].offsetHeight<2)&&f.info("JS-SWF connection can't be established on hidden or unconnected flash objects")},
8E3))})}}else setTimeout(function(){e(b).mediaLoad()},1)};var z=function(b,a,c,d){return(d=d||o(b))?(d.jwapi&&d.jwapi[a]?d.jwapi[a].apply(d.jwapi,c||[]):(d.actionQueue.push({fn:a,args:c}),d.actionQueue.length>10&&setTimeout(function(){d.actionQueue.length>5&&d.actionQueue.shift()},99)),d):!1};["audio","video"].forEach(function(b){var a={},c,d=function(d){b=="audio"&&(d=="videoHeight"||d=="videoWidth")||(a[d]={get:function(){var a=o(this);return a?a[d]:x&&c[d].prop._supget?c[d].prop._supget.apply(this):
E[d]},writeable:!1})},j=function(b,c){d(b);delete a[b].writeable;a[b].set=c};j("volume",function(a){var b=o(this);if(b){if(a*=100,!isNaN(a)){(a<0||a>100)&&f.error("volume greater or less than allowed "+a/100);b.muted&&(u=!0);z(this,"sendEvent",["VOLUME",a],b);if(u){try{b.jwapi.sendEvent("mute","true")}catch(d){}u=!1}setTimeout(function(){a/=100;if(!(b.volume==a||b.isActive!="flash"))b.volume=a,h(b._elem,"volumechange"),b=null},1)}}else if(c.volume.prop._supset)return c.volume.prop._supset.apply(this,
arguments)});j("muted",function(a){var b=o(this);if(b)a=!!a,z(this,"sendEvent",["mute",""+a],b),setTimeout(function(){if(!(b.muted==a||b.isActive!="flash"))b.muted=a,h(b._elem,"volumechange"),b=null},1);else if(c.muted.prop._supset)return c.muted.prop._supset.apply(this,arguments)});j("currentTime",function(a){var b=o(this);if(b){if(a*=1,!isNaN(a)){if(b.paused)clearTimeout(b.stopPlayPause),b.stopPlayPause=setTimeout(function(){b.paused=!0;b.stopPlayPause=!1},50);z(this,"sendEvent",["SEEK",""+a],b);
if(b.paused){if(b.readyState>0)b.currentTime=a,h(b._elem,"timeupdate");try{b.jwapi.sendEvent("play","false")}catch(d){}}}}else if(c.currentTime.prop._supset)return c.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(b){a[b]={value:function(){var a=o(this);if(a)a.stopPlayPause&&clearTimeout(a.stopPlayPause),z(this,"sendEvent",["play",b=="play"],a),setTimeout(function(){if(a.isActive=="flash"&&(a._ppFlag=!0,a.paused!=(b!="play")))a.paused=b!="play",h(a._elem,b)},1);
else if(c[b].prop._supvalue)return c[b].prop._supvalue.apply(this,arguments)}}});v.forEach(d);f.onNodeNamesPropertyModify(b,"controls",function(a,c){var d=z(this,c?"showControls":"hideControls",[b]);e(this)[c?"addClass":"removeClass"]("webshims-controls");d&&e(d.jwapi).attr("tabindex",c?"0":"-1")});c=f.defineNodeNameProperties(b,a,"prop")});if(t&&e.browser.msie&&f.borwserVersion<9){var K=e.cleanData;e.cleanData=function(b){b&&b[0]&&b[0].nodeType==1&&e("object",b).add(e(b).filter("object")).each(function(){try{for(var a in this)typeof this[a]==
"function"&&(this[a]=null)}catch(b){}});return K.apply(this,arguments)}}});
(function(e,f,k){var s=k.cfg.mediaelement,g=k.mediaelement,l=f.audio&&f.video,m=!1,w=!window.swfobject||swfobject.hasFlashPlayerVersion("9.0.115"),x=function(){k.ready("mediaelement-swf",function(){if(!g.createSWF)k.modules["mediaelement-swf"].test=!1,delete e.event.special["mediaelement-swfReady"],k.loader.loadList(["mediaelement-swf"])})};if(l){var t=document.createElement("video");f.videoBuffered="buffered"in t;m="loop"in t;k.capturingEvents(["play","playing","waiting","paused","ended","durationchange",
"loadedmetadata","canplay","volumechange"]);k.loader.loadList(["swfobject"]);k.ready("swfobject",function(){(w=swfobject.hasFlashPlayerVersion("9.0.115"))&&k.ready("WINDOWLOAD",x)});f.videoBuffered||(k.addPolyfill("mediaelement-native-fix",{feature:"mediaelement",test:f.videoBuffered,dependencies:["dom-support"]}),k.cfg.waitReady&&e.readyWait++,k.loader.loadScript("mediaelement-native-fix",function(){k.cfg.waitReady&&e.ready(!0)}))}e.webshims.ready("dom-support",function(e,f,k,t,A){var n=function(c,
d){var c=e(c),j={src:c.attr("src")||"",elem:c,srcProp:c.prop("src")};if(!j.src)return j;var i=c.attr("type");if(i)j.type=i,j.container=e.trim(i.split(";")[0]);else if(d||(d=c[0].nodeName.toLowerCase(),d=="source"&&(d=(c.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),i=g.getTypeForSrc(j.src,d))j.type=i,j.container=i,f.warn("you should always provide a proper mime-type using the source element. "+j.src+" detected as: "+i),e.nodeName(c[0],"source")&&c.attr("type",i);if(i=c.attr("media"))j.media=
i;return j};g.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],"audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":["mp4","mpg4","m4r"],"audio/wav":["wav"],"audio/x-m4a":["m4a"],"audio/x-m4p":["m4p"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],
"video/webm":["webm"]}};g.mimeTypes.source=e.extend({},g.mimeTypes.audio,g.mimeTypes.video);g.getTypeForSrc=function(c,d){if(c.indexOf("youtube.com/watch?")!=-1)return"video/youtube";var c=c.split("?")[0].split("."),c=c[c.length-1],f;e.each(g.mimeTypes[d],function(d,e){if(e.indexOf(c)!==-1)return f=d,!1});return f};g.srces=function(c,d){c=e(c);if(d)c.removeAttr("src").removeAttr("type").find("source").remove(),e.isArray(d)||(d=[d]),d.forEach(function(d){var e=t.createElement("source");typeof d=="string"&&
(d={src:d});e.setAttribute("src",d.src);d.type&&e.setAttribute("type",d.type);d.media&&e.setAttribute("media",d.media);c.append(e)});else{var d=[],f=c[0].nodeName.toLowerCase(),g=n(c,f);g.src?d.push(g):e("source",c).each(function(){g=n(this,f);g.src&&d.push(g)});return d}};e.fn.loadMediaSrc=function(c,d){return this.each(function(){d!==A&&(e(this).removeAttr("poster"),d&&e.attr(this,"poster",d));g.srces(this,c);e(this).mediaLoad()})};g.swfMimeTypes=["video/3gpp","video/x-msvideo","video/quicktime",
"video/x-m4v","video/mp4","video/m4p","video/x-flv","video/flv","audio/mpeg","audio/aac","audio/mp4","audio/x-m4a","audio/m4a","audio/mp3","audio/x-fla","audio/fla","youtube/flv","jwplayer/jwplayer","video/youtube"];g.canSwfPlaySrces=function(c,d){var f="";w&&(c=e(c),d=d||g.srces(c),e.each(d,function(c,d){if(d.container&&d.src&&g.swfMimeTypes.indexOf(d.container)!=-1)return f=d,!1}));return f};var o={};g.canNativePlaySrces=function(c,d){var f="";if(l){var c=e(c),i=(c[0].nodeName||"").toLowerCase();
if(!o[i])return f;d=d||g.srces(c);e.each(d,function(d,e){if(e.type&&o[i].prop._supvalue.call(c[0],e.type))return f=e,!1})}return f};g.setError=function(c,d){d||(d="can't play sources");e(c).data("mediaerror",d);f.warn("mediaelementError: "+d);setTimeout(function(){e(c).data("mediaerror")&&e(c).trigger("mediaerror")},1)};var h=function(){var c;return function(d,e,i){f.ready("mediaelement-swf",function(){g.createSWF?g.createSWF(d,e,i):c||(c=!0,x(),h(d,e,i))})}}(),u=function(c,d,e,f,k){e||e!==!1&&d&&
d.isActive=="flash"?(e=g.canSwfPlaySrces(c,f))?h(c,e,d):k?g.setError(c,!1):u(c,d,!1,f,!0):(e=g.canNativePlaySrces(c,f))?d&&d.isActive=="flash"&&g.setActive(c,"html5",d):k?g.setError(c,!1):u(c,d,!0,f,!0)},B=/^(?:embed|object)$/i,y=function(c,d){var j=f.data(c,"mediaelementBase")||f.data(c,"mediaelementBase",{}),i=g.srces(c),h=c.parentNode;clearTimeout(j.loadTimer);e.data(c,"mediaerror",!1);if(i.length&&h&&!B.test(h.nodeName||""))d=d||f.data(c,"mediaelement"),u(c,d,s.preferFlash||A,i)};e(t).bind("ended",
function(c){var d=f.data(c.target,"mediaelement");(!m||d&&d.isActive!="html5"||e.prop(c.target,"loop"))&&setTimeout(function(){!e.prop(c.target,"paused")&&e.prop(c.target,"loop")&&e(c.target).prop("currentTime",0).play()},1)});m||f.defineNodeNamesBooleanProperty(["audio","video"],"loop");f.addReady(function(c,d){e("video, audio",c).add(d.filter("video, audio")).each(function(){y(this)})});["audio","video"].forEach(function(c){var d=f.defineNodeNameProperty(c,"load",{prop:{value:function(){var c=f.data(this,
"mediaelement");y(this,c);l&&(!c||c.isActive=="html5")&&d.prop._supvalue&&d.prop._supvalue.apply(this,arguments)}}});o[c]=f.defineNodeNameProperty(c,"canPlayType",{prop:{value:function(d){var f="";l&&o[c].prop._supvalue&&(f=o[c].prop._supvalue.call(this,d),f=="no"&&(f=""));!f&&w&&(d=e.trim((d||"").split(";")[0]),g.swfMimeTypes.indexOf(d)!=-1&&(f="maybe"));return f}}})});f.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var c=this,d=f.data(c,"mediaelementBase")||f.data(c,
"mediaelementBase",{});clearTimeout(d.loadTimer);d.loadTimer=setTimeout(function(){y(c);c=null},9)}});f.isReady("mediaelement-core",!0)})})(jQuery,Modernizr,jQuery.webshims);
