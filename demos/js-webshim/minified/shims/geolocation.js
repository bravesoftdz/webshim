(function(e){if(!navigator.geolocation){var t=function(){setTimeout(function(){throw"document.write is overwritten by geolocation shim. This method is incompatible with this plugin"},1)},n=0,i=webshims.cfg.geolocation||{};navigator.geolocation=function(){var a,r={getCurrentPosition:function(n,r,o){var s,l,u,c=2,d=function(){if(!u)if(a){if(u=!0,n(e.extend({timestamp:(new Date).getTime()},a)),f(),window.JSON&&window.sessionStorage)try{sessionStorage.setItem("storedGeolocationData654321",JSON.stringify(a))}catch(t){}}else r&&!c&&(u=!0,f(),r({code:2,message:"POSITION_UNAVAILABLE"}))},p=function(){c--,h(),d()},f=function(){e(document).unbind("google-loader",f),clearTimeout(l),clearTimeout(s)},h=function(){if(a||!window.google||!google.loader||!google.loader.ClientLocation)return!1;var t=google.loader.ClientLocation;return a={coords:{latitude:t.latitude,longitude:t.longitude,altitude:null,accuracy:43e3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:e.extend({streetNumber:"",street:"",premises:"",county:"",postalCode:""},t.address)},!0},m=function(){if(!a&&(h(),!a&&window.JSON&&window.sessionStorage))try{a=sessionStorage.getItem("storedGeolocationData654321"),a=a?JSON.parse(a):!1,a.coords||(a=!1)}catch(e){a=!1}};return m(),a?(setTimeout(d,1),void 0):i.confirmText&&!confirm(i.confirmText.replace("{location}",location.hostname))?(r&&r({code:1,message:"PERMISSION_DENIED"}),void 0):(e.ajax({url:"http://freegeoip.net/json/",dataType:"jsonp",cache:!0,jsonp:"callback",success:function(e){c--,e&&(a=a||{coords:{latitude:e.latitude,longitude:e.longitude,altitude:null,accuracy:43e3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:{city:e.city,country:e.country_name,countryCode:e.country_code,county:"",postalCode:e.zipcode,premises:"",region:e.region_name,street:"",streetNumber:""}},d())},error:function(){c--,d()}}),clearTimeout(l),window.google&&window.google.loader?c--:l=setTimeout(function(){i.destroyWrite&&(document.write=t,document.writeln=t),e(document).one("google-loader",p),webshims.loader.loadScript("http://www.google.com/jsapi",!1,"google-loader")},800),s=o&&o.timeout?setTimeout(function(){f(),r&&r({code:3,message:"TIMEOUT"})},o.timeout):setTimeout(function(){c=0,d()},1e4),void 0)},clearWatch:e.noop};return r.watchPosition=function(e,t,i){return r.getCurrentPosition(e,t,i),n++,n},r}(),webshims.isReady("geolocation",!0)}})(webshims.$);