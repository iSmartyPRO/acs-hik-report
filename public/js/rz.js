!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.rz=r():e.rz=r()}(self,(function(){return function(){var e={8:function(e){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},905:function(e,r,t){e=t.nmd(e);var n=t(8);function o(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var a=String.fromCharCode(160),i=function(e){return Boolean("string"==typeof e||e instanceof String)},l=function(e){return Boolean("number"==typeof e&&Number.isFinite(e))},s=function(e){return Boolean("boolean"==typeof e)},u=function(e){return Boolean(e instanceof Date)},c=function(e){return Boolean(e&&"object"===n(e)&&e.constructor===Array)},f=function(e){return Boolean(e&&"object"===n(e)&&e.constructor===Object)},m=function(e){return Boolean(null==e)},h=function(e){return Boolean(e&&"object"===n(e)&&e.constructor===RegExp)},g=function(e){return Boolean(e&&"null"!==e&&"undefined"!==e&&""!==e)},p=function(e){return Boolean(Math.round(e)===e)},d=function(e){var r={};try{r=JSON.stringify(e)}catch(e){r=null}return r},v=function(e){var r={};try{r=JSON.parse(e)}catch(e){r=null}return r},b=function(e){var r=null;if(u(e))r=new Date(e.getTime());else if(c(e))r=e.slice(0);else if(f(e)){var t=d(e);r=v(t)}else(l(e)||i(e)||s(e))&&(r=e);return r},y=function(e){var r=[];return f(e)?(Object.keys(e).forEach((function(e){r.push(e)})),r):r},w=function(e,r){return!(!f(e)||!i(r))&&Boolean(r in e)},S=function(e,r){var t=0;return l(r)&&p(r)&&r>=-6&&r<=6&&(t=r),t=Math.pow(10,t),Math.round(e*t)/t},k=function(e,r,t){return""===r?"":" "+r+("1"===e[e.length-2]?t[2]:t[[2,0,1,1,1,2,2,2,2,2][e[e.length-1]]])},D=function(e,r,t,n){var o,a,i=n||0,l=r||"",s=t||"";return!e||i>e.length?"":(0===l.length&&s.length>0?(o=i,a=e.indexOf(s,i)):l.length>0&&0===s.length?(o=e.indexOf(l,i),a=e.length):(o=e.indexOf(l,i),~(a=e.indexOf(s,o+l.length))||(a=o+l.length)),-1===o||-1===a?"":e.slice(o+r.length,a))},x=function(e){return e.replace(/(\s+|\n+)$/g,"")},M=function(e){return e.replace(/^(\s+|\n+)/g,"")},Y=function(e,r,t){return e.split(r).join(t)},U=function(e){var r=Y(e,a," ");return M(x(r))},B=function(e){var r=Y(e,a," ");return U(r).replace(/\s\s+/g," ")},j=function(e){return Y(e,a,"").replace(/(\s|\n)/g,"")},R=function(e){var r={"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};return e.split("").map((function(e){return r[e]||e})).join("")},N=function(e,r,t,n){if(!c(e)||!e.length||m(r))return!1;var o=!1,a=r;i(a)&&(!0===t&&(a=a.trim()),!0===n&&(a=a.toLowerCase()));for(var l=0;l<e.length;l++){var s=e[l];if(i(s)&&(!0===t&&(s=s.trim()),!0===n&&(s=s.toLowerCase())),s===a){o=!0;break}}return o},E=function(e,r,t){if(!e||!i(e))return 0;var n=Y(e.replace(/\s+/g,"").replace(/,/,"."),a,"").match(/^-?(\d+(\.\d*)?|\.\d+)$/);if(!n.length)return 0;try{var o=Number(n[0]);return t&&(o=Math.abs(o)),r&&(o=S(o,r)),o}catch(e){return 0}},O=function(e,r,t){if(!i(e))return null;var n=Y(e.replace(/,/,"."),a).match(/-?\d+(\.\d+)?/gi);if(c(n)){for(var o=0;o<n.length;o++)n[o]=E(n[o]),t&&(n[o]=Math.abs(n[o])),r&&(n[o]=S(n[o],r));return n}return null};e.exports={log:function r(t){return new Promise((function(n,o){var a=b(t);if(i(a))a={message:t,msgtype:"info",toconsole:!0,tobase:!1};else if(!f(a))return void o(new Error("(prms) is not a String and is not an Object"));if(a.msg&&!a.message&&(a.message=a.msg),a.message&&""!==a.message){if(i(a.message)&&!a.message.startsWith("ClientSide. ")&&(a.message="ClientSide. "+a.message),!a.caller)try{a.caller=r.caller,a.caller=String(a.caller)}catch(e){a.caller="???"}a.caller.length>100&&(a.caller=a.caller.slice(0,100)+"...."),a.msgtype=a.msgtype||"info",a.module=a.module||function(){var r="???";if(e&&e.parent){var t=Y(e.parent.filename,"\\","/").split("/");r=t[t.length-1],t.length>1&&(r=t[t.length-2]+"/"+t[t.length-1])}else{var n=String((new Error).stack).replace("Error\n","").split("\n"),o=[];n.forEach((function(e){o.push(e.trim().replace(/^at\s/g,""))}));for(var a=0;a<o.length;a++)if(/\[as log\]/g.test(o[a])){r=o[a+1]||o[a];break}var i=/\/js\/([a-z]+\.(js|jsx|ejs))/gi;i.test(r)&&(r=r.match(i)[0])}return r}(),a.datetime=a.datetime||new Date,!0===a.tobase&&window.$?window.$.ajax({type:"POST",data:JSON.stringify(a),contentType:"application/json",url:"/api/toserverlog"}).done((function(e){e.userip&&(a.userip=e.userip),!0!==a.toconsole&&void 0!==a.toconsole||("error"===a.msgtype?console.error(a.message):console.log(a)),n(!0)})).fail((function(e){console.log(e),o(new Error("$.ajax error"))})):(!0!==a.toconsole&&void 0!==a.toconsole||("error"===a.msgtype?console.error(a):console.log(a)),n(!0))}else o(new Error("arg message is null"))}))},isString:i,isNumber:l,canbeNumber:function(e){return Boolean(!Number.isNaN(parseFloat(e))&&Number.isFinite(e))},isBoolean:s,isDate:u,isArray:c,isFunction:function(e){return Boolean("function"==typeof e)},isObject:f,isUndefinedOrNull:m,isRegExp:h,isRealValue:g,isMobileDevice:function(e){return Boolean(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(e.substr(0,4)))},documentSize:function(e){var r={width:0,height:0,result:!1},t=e||document;return t&&t.documentElement&&t.documentElement.scrollWidth&&(r.width=t.documentElement.scrollWidth,r.height=t.documentElement.scrollHeight,r.result=!0),r},windowSize:function(e){var r={width:0,height:0,result:!1},t=e||window;return t&&t.innerWidth&&t.innerHeight&&(r.width=t.innerWidth,r.height=t.innerHeight,r.result=!0),r},objByString:function(e,r){for(var t=r.replace(/\[(\w+)\]/g,".$1"),n=(t=t.replace(/^\./,"")).split("."),o=b(e),a=0,i=n.length;a<i;a++){var l=n[a];if(!(l in o))return null;o=o[l]}return o},objClone:b,objKeys:y,objHasKey:w,objToJSON:d,objFromJSON:v,strSubString:D,strToNum:E,strTrimRight:x,strTrimLeft:M,strTrim:U,strTrimMiddle:B,strTrimAll:j,strReplaceAll:Y,strGetShortFIO:function(e){var r=String(e||"");if(""===r)return"";var t=B(r).split(" ");return t.length>1&&(r=t[0]+" "+t[1].slice(0,1)+".",t[2]&&(r+=t[2].slice(0,1)+".")),r},strMakeID:function(e){for(var r="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)r+=t.charAt(Math.floor(Math.random()*t.length));return r},strTransliterateRUtoEN:R,strFileExtension:function(e){var r=(e||"").split("."),t=(r[r.length-1]||r).trim().toLowerCase();return r.length>=2?t:""},strClearFileName:function(e){var r=e.lastIndexOf("."),t=r<0?"":e.slice(0,r),n=(t=Y(t,"\\","/")).lastIndexOf("/");return n<0?t:t.slice(n+1,t.length-n-1)},strCanBeNum:function(e){if(null!==e&&""!==e&&void 0!==e){var r=e;i(e)&&(r=Y(e,a).replace(/,/g,".").replace(/\s/g,""));var t=parseInt(r,10);return!(Number.isNaN(t)||Number.isFinite(t))}return 0},strGetAllNumbers:O,strSearchNum:function(e,r,t,n){if(!g(e))return 0;var o=0,a=O(e,t,n);return c(a)&&(0===r?o=a[a.length-1]:p(r)&&l(a[r-1])&&(o=a[r-1])),o},strCompare:function(e,r,t){if(!i(e)||!i(r))return!1;if(!t||!i(t))return Boolean(e===r);var n=j(t).toLowerCase().replace(/(,|\.)/g,";").split(";"),o=e,a=r;return n.forEach((function(e){"touppercase"===e||"tolowercase"===e||"casenosensitive"===e?(o=o.toLowerCase(),a=a.toLowerCase()):"trim"===e?(o=U(o),a=U(a)):"trimmiddle"===e?(o=B(o),a=B(a)):"trimall"===e?(o=j(o),a=j(a)):"transliterate"===e&&(o=R(o),a=R(a))})),N(n,"substring")?Boolean(~o.indexOf(a)):Boolean(o===a)},hasUnicode:function(e){for(var r=0;r<e.length;r++)if(e.charCodeAt(r)>127)return!0;return!1},arrContains:N,arrPush:function(e,r){var t=[];if(c(e)?t=e:t.push(e),c(r))for(var n=0;n<r.length;n++)t.push(r[n]);else t.push(r);return t},arrRemove:function(e,r,t,n,o){var a=[],l=[],s=[];c(e)?l=e:l.push(e),c(r)?s=r:s.push(r);for(var u=0;u<l.length;u++){var f=l[u];if(i(f)&&(n&&(f=f.trim()),o&&f.toLowerCase()),!t||i(f)&&""!==f){for(var m=!1,h=0;h<s.length;h++){var g=s[h];if(i(g)&&(n&&(g=g.trim()),o&&g.toLowerCase()),g===f){m=!0;break}}m||a.push(l[u])}}return a},arrGetUnique:function(e,r,t,n){for(var o=[],a=0;a<e.length;a++){var l=e[a];if(i(l)&&(t&&(l=l.trim()),n&&l.toLowerCase()),!r||""!==l){for(var s=!1,u=0;u<o.length;u++){var c=o[u];if(i(c)&&(t&&(c=c.trim()),n&&c.toLowerCase()),c===l){s=!0;break}}s||o.push(e[a])}}return o},arrCompare:function(e,r,t){if(!c(e))return!1;var n=b(r);c(r)||(n=[r]);for(var o=!0,a=0;a<n.length;a++){for(var i=!1,l=0;l<e.length;l++)if(e[a]===n[l]){i=!0;break}if(!i){o=!1;break}}if(!0===t)for(var s=0;s<e.length;s++){for(var u=!1,f=0;f<n.length;f++)if(n[s]===e[f]){u=!0;break}if(!u){o=!1;break}}return o},arrFindObj:function(e,r,t){if(!c(e)||!f(r))return!1;var n=-1,o="",a={};if(t&&c(t)){for(var i=0;i<t.length;i++)w(r,t[i])&&(a[t[i]]=r[t[i]]);o=JSON.stringify(a)}else o=JSON.stringify(r);for(var l=0;l<e.length;l++){var s=e[l],u={},m="";if(t&&c(t)){for(var h=0;h<t.length;h++)w(s,t[h])&&(u[t[h]]=s[t[h]]);m=JSON.stringify(u)}else{for(var g=y(r),p=0;p<g.length;p++)w(s,g[p])&&(u[g[p]]=s[g[p]]);m=JSON.stringify(u)}if(m===o){n=l;break}}return n},numIsInt:p,numRoundTo:S,numRoundToNearest:function(e,r){return!!l(r)&&Number(e%r?e+r-e%r:e)},numToFloatStr:function(e,r,t){var n,o,a,i=0;if(l(r)&&p(r)&&r>=-6&&r<=6&&(i=r),n=S(e,i).toString().replace(".",","),i>0)if(-1===(o=n.indexOf(",")))n+=","+"0".repeat(i);else{var s=n.slice(0,o-1),u=n.slice(o+1,n.length-o-1);i>0&&u.length>i?n=s+","+u.slice(0,i):n+="0".repeat(i-(n.length-o-1)),n+="0".repeat(i-(n.length-o-1))}if(-1===(o=n.indexOf(","))&&(o=n.length),a=-1===(a=n.indexOf("-"))?0:1,!1!==t)for(i=o-3;i>a;i-=3)n=n.slice(0,i)+" "+n.slice(i,n.length-i+1);return n},numToPhrase:function(e,r){var t=S(e,2);if(t<0||t>999999999999999)return!1;var n="RUB";if(i(r)&&(n=r.trimAll().toUpperCase()),"RUB"!==n&&"USD"!==n&&"EUR"!==n)return!1;var o=[];o[0]=[],o[1]=[],o[2]=[],o[3]=[],o[4]=[],o[9]=[],o[0][-1]={RUB:"рублей",USD:"долларов США",EUR:"евро"},o[0][1]={RUB:"рубль",USD:"доллар США",EUR:"евро"},o[0][2]={RUB:"рубля",USD:"доллара США",EUR:"евро"},o[0][3]={RUB:"рубля",USD:"доллара США",EUR:"евро"},o[0][4]={RUB:"рубля",USD:"доллара США",EUR:"евро"},o[1][-1]="тысяч",o[1][1]="тысяча",o[1][2]="тысячи",o[1][3]="тысячи",o[1][4]="тысячи",o[2][-1]="миллионов",o[2][1]="миллион",o[2][2]="миллиона",o[2][3]="миллиона",o[2][4]="миллиона",o[3][-1]="миллиардов",o[3][1]="миллиард",o[3][2]="миллиарда",o[3][3]="миллиарда",o[3][4]="миллиарда",o[4][-1]="триллионов",o[4][1]="триллион",o[4][2]="триллиона",o[4][3]="триллиона",o[4][4]="триллиона",o[9][-1]={RUB:"копеек",USD:"центов",EUR:"центов"},o[9][1]={RUB:"копейка",USD:"цент",EUR:"цент"},o[9][2]={RUB:"копейки",USD:"цента",EUR:"цента"},o[9][3]={RUB:"копейки",USD:"цента",EUR:"цента"},o[9][4]={RUB:"копейки",USD:"цента",EUR:"цента"};var a=[];a[1]={0:"один",1:"одна",2:"один",3:"один",4:"один"},a[2]={0:"два",1:"две",2:"два",3:"два",4:"два"},a[3]="три",a[4]="четыре",a[5]="пять",a[6]="шесть",a[7]="семь",a[8]="восемь",a[9]="девять",a[10]="десять",a[11]="одиннадцать",a[12]="двенадцать",a[13]="тринадцать",a[14]="четырнадцать",a[15]="пятнадцать",a[16]="шестнадцать",a[17]="семнадцать",a[18]="восемнадцать",a[19]="девятнадцать",a[20]="двадцать",a[30]="тридцать",a[40]="сорок",a[50]="пятьдесят",a[60]="шестьдесят",a[70]="семьдесят",a[80]="восемьдесят",a[90]="девяносто",a[100]="сто",a[200]="двести",a[300]="триста",a[400]="четыреста",a[500]="пятьсот",a[600]="шестьсот",a[700]="семьсот",a[800]="восемьсот",a[900]="девятьсот";var l,s,u="",c=Math.floor(t);if(c>0){var m=[];for(l=0;l<=4;l++)m[l]=c%1e3,c=Math.floor(c/1e3);var h=[];for(l=0;l<=4;l++)h[l]=[],h[l][0]=m[l]%10,h[l][10]=m[l]%100-h[l][0],h[l][100]=m[l]-h[l][10]-h[l][0],h[l][11]=m[l]%100;for(l=4;l>=0;l--)m[l]>0&&(a[h[l][100]]&&(u+=" "+(f(a[h[l][100]])?a[h[l][100]][l]:a[h[l][100]])),a[h[l][11]]?u+=" "+(f(a[h[l][11]])?a[h[l][11]][l]:a[h[l][11]]):(a[h[l][10]]&&(u+=" "+(f(a[h[l][10]])?a[h[l][10]][l]:a[h[l][10]])),a[h[l][0]]&&(u+=" "+(f(a[h[l][0]])?a[h[l][0]][l]:a[h[l][0]]))),s=a[h[l][11]]?h[l][11]:h[l][0],o[l][s]?u+=0===l?" "+o[l][s][n]:" "+o[l][s]:u+=0===l?" "+o[l][-1][n]:" "+o[l][-1]);0===m[0]&&(u+=" "+o[0][-1][n])}else u="Ноль "+o[0][-1][n];return(c=S(100*(t-Math.floor(t)),0))<10&&(c="0"+c),u=(u=B(u)).slice(0,1).toUpperCase()+u.slice(1),u+=" "+c,s=a[c*=1]?c:c%10,o[9][s]?u+=" "+o[9][s][n]:u+=" "+o[9][-1][n],u},numToPhrase2:function(e,r){function t(e,r){var t=[[""," один"," два"," три"," четыре"," пять"," шесть"," семь"," восемь"," девять"],[" десять"," одиннадцать"," двенадцать"," тринадцать"," четырнадцать"," пятнадцать"," шестнадцать"," семнадцать"," восемнадцать"," девятнадцать"],["",""," двадцать"," тридцать"," сорок"," пятьдесят"," шестьдесят"," семьдесят"," восемьдесят"," девяносто"],[""," сто"," двести"," триста"," четыреста"," пятьсот"," шестьсот"," семьсот"," восемьсот"," девятьсот"],[""," одна"," две"]];return t[3][e[0]]+(1===e[1]?t[1][e[2]]:t[2][e[1]]+(r?t[4][e[2]]:t[0][e[2]]))}var n=S(e,0).toString(),o="",a=[["","тысяч","миллион","миллиард","триллион","квадриллион","квинтиллион","секстиллион","септиллион","октиллион","нониллион","дециллион"],["а","и",""],["","а","ов"]];if(""===n||"0"===n)return"Ноль";1===(n=n.split(/(?=(?:\d{3})+$)/))[0].length&&(n[0]="00"+n[0]),2===n[0].length&&(n[0]="0"+n[0]);for(var i=n.length-1;i>=0;i--)"000"!==n[i]&&(o=(!(r&&i===n.length-1||i===n.length-2)||"1"!==n[i][2]&&"2"!==n[i][2]?t(n[i]):t(n[i],1))+k(n[i],a[0][n.length-1-i],i===n.length-2?a[1]:a[2])+o);return o[1].toUpperCase()+o.substring(2)},declOfNum:k,numRandom:function(e,r){var t=0;l(e)&&p(e)&&(t=e);var n=10;return l(r)&&p(r)&&(n=r),Math.floor(Math.random()*(n-t+1))+t},dateToString:function(e,r,t){if(!u(e))return"";var n="YYYY-MM-DD";i(r)&&""!==r&&(n=r);var o=b(e);t&&o.setTime(o.getTime()+6e4*t*60);var a=+o.getMonth()+1,l=+o.getDate(),s=o.getFullYear(),c=(a<10?"0":"")+a,f=(l<10?"0":"")+l,m="0"+o.getHours();m=m.slice(-2);var h="0"+o.getMinutes();h=h.slice(-2);var g="0"+o.getSeconds();g=g.slice(-2);var p,d,v,y="";switch(n){case"DD.MM.YYYY":y=f+"."+c+"."+s;break;case"DD.MM.YYYY hh:mm":y=f+"."+c+"."+s+" "+m+":"+h;break;case"DD.MM.YYYY hh:mm:ss":y=f+"."+c+"."+s+" "+m+":"+h+":"+g;break;case"YYYY-MM-DD hh:mm:ss":y=s+"-"+c+"-"+f+" "+m+":"+h+":"+g;break;case"dd DD.MM.YYYY":p=o,v="ru",i(d)&&(v=d),y=("ru"===v?["вс","пн","вт","ср","чт","пт","сб"]:["su","mo","tu","we","th","fr","sa"])[p.getDay()]+" "+f+"."+c+"."+s;break;default:y=s+"-"+c+"-"+f}return y},dateFromString:function(e,r,t){if(!i(e))return null;var n="YYYY-MM-DD";i(r)&&""!==r&&(n=r);var o,a,l,s,u=0,c=0,f=0;switch(n){case"DD.MM.YYYY":o=+(s=e.split("."))[0],a=+s[1]-1,l=+s[2];break;case"DD.MM.YYYY hh:mm":case"DD.MM.YYYY hh:mm:ss":var m=D(e,""," ");if(""===m){o=+(s=e.split("."))[0],a=+s[1]-1,l=+s[2];break}var h=D(e," ","");o=+(s=m.split("."))[0],a=+s[1]-1,l=+s[2];var g=h.split(":");u=+g[0],g.length>1&&(c=+g[1]),g.length>2&&(f=+g[2]);break;case"YYYY-MM-DD hh:mm:ss":var p=D(e,""," ");if(""===p){o=+(s=e.split("-"))[2],a=+s[1]-1,l=+s[0];break}var d=D(e," ","");o=+(s=p.split("-"))[2],a=+s[1]-1,l=+s[0];var v=d.split(":");u=+v[0],v.length>1&&(c=+v[1]),v.length>2&&(f=+v[2]);break;default:o=+(s=e.split("-"))[2],a=+s[1]-1,l=+s[0]}var b=0;try{b=new Date(l,a,o,u,c,f),t&&b.setTime(b.getTime()+6e4*t*60)}catch(e){}return b},dateDaysBetween:function(e,r){try{var t=e.getTime()-r.getTime();return Math.ceil(t/864e5)-1}catch(e){return null}},ExcelDateToJSDate:function(e){var r=Math.floor(e-25569),t=new Date(86400*r*1e3),n=e-Math.floor(e)+1e-7,o=Math.floor(86400*n),a=o%60;o-=a;var i=Math.floor(o/3600),l=Math.floor(o/60)%60;return new Date(t.getFullYear(),t.getMonth(),t.getDate(),i,l,a)},JSDateToExcelDate:function(e){var r=b(e);return u(r)?(r.setTime(r.getTime()+216e5),Number(r)/864e5+25569):0},validateTimestamp:function(e){if(!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(e))return!1;var r=e.split(/[^\d]+/),t=parseFloat(r[1]),n=parseFloat(r[2]),o=parseFloat(r[3]),a=parseFloat(r[4]),i=parseFloat(r[5]);return o<25&&a<61&&i<61&&t<13&&n<32},Base64encode:function(e){return Buffer.from(e).toString("base64")},Base64decode:function(e,r){return Buffer.from(e,"base64").toString(r||"utf8")},fetchGetHeaders:function(e,r){var t={result:!1,headers:[],values:[],header:r,value:void 0};if(e&&e.headers){var n,a=function(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,r){if(e){if("string"==typeof e)return o(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return l=e.done,e},e:function(e){s=!0,i=e},f:function(){try{l||null==t.return||t.return()}finally{if(s)throw i}}}}(e.headers.entries());try{for(a.s();!(n=a.n()).done;){var i=n.value;i.length&&(t.headers.push(i[0]),t.values.push(i[1]),r&&""!==r?i[0].toLowerCase()===r.toLowerCase()&&(t.header=i[0],t.value=i[1],t.result=!0):t.result=!0)}}catch(e){a.e(e)}finally{a.f()}}return t},delay:function(e){return new Promise((function(r){setTimeout(r,e)}))},compareIP:function(e,r){var t=!1;if(!e||!i(e)||!r)return t;if(i(r))return Boolean(e===r);if(h(r))return r.lastIndex=0,r.test(e);if(c(r))for(var n=0;n<r.length;n++){if(i(r[n])&&e===r){t=!0;break}if(h(r[n])&&(r[n].lastIndex=0,r[n].test(e))){t=!0;break}}return t}}}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var a=r[n]={id:n,loaded:!1,exports:{}};return e[n](a,a.exports,t),a.loaded=!0,a.exports}return t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},t(905)}()}));
//# sourceMappingURL=rz.js.map