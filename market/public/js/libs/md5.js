var hexcase=0,b64pad="";function hex_md5(c){return rstr2hex(rstr_md5(str2rstr_utf8(c)))}function b64_md5(c){return rstr2b64(rstr_md5(str2rstr_utf8(c)))}function any_md5(c,g){return rstr2any(rstr_md5(str2rstr_utf8(c)),g)}function hex_hmac_md5(c,g){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(c),str2rstr_utf8(g)))}function b64_hmac_md5(c,g){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(c),str2rstr_utf8(g)))}
function any_hmac_md5(c,g,a){return rstr2any(rstr_hmac_md5(str2rstr_utf8(c),str2rstr_utf8(g)),a)}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(c){return binl2rstr(binl_md5(rstr2binl(c),c.length*8))}
function rstr_hmac_md5(c,g){var a=rstr2binl(c);if(a.length>16)a=binl_md5(a,c.length*8);for(var b=Array(16),d=Array(16),e=0;e<16;e++){b[e]=a[e]^909522486;d[e]=a[e]^1549556828}a=binl_md5(b.concat(rstr2binl(g)),512+g.length*8);return binl2rstr(binl_md5(d.concat(a),640))}function rstr2hex(c){for(var g=hexcase?"0123456789ABCDEF":"0123456789abcdef",a="",b,d=0;d<c.length;d++){b=c.charCodeAt(d);a+=g.charAt(b>>>4&15)+g.charAt(b&15)}return a}
function rstr2b64(c){for(var g="",a=c.length,b=0;b<a;b+=3)for(var d=c.charCodeAt(b)<<16|(b+1<a?c.charCodeAt(b+1)<<8:0)|(b+2<a?c.charCodeAt(b+2):0),e=0;e<4;e++)g+=b*8+e*6>c.length*8?b64pad:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>6*(3-e)&63);return g}
function rstr2any(c,g){var a=g.length,b,d,e,f,h,i=Array(Math.ceil(c.length/2));for(b=0;b<i.length;b++)i[b]=c.charCodeAt(b*2)<<8|c.charCodeAt(b*2+1);var k=Math.ceil(c.length*8/(Math.log(g.length)/Math.log(2))),j=Array(k);for(d=0;d<k;d++){h=Array();for(b=f=0;b<i.length;b++){f=(f<<16)+i[b];e=Math.floor(f/a);f-=e*a;if(h.length>0||e>0)h[h.length]=e}j[d]=f;i=h}a="";for(b=j.length-1;b>=0;b--)a+=g.charAt(j[b]);return a}
function str2rstr_utf8(c){for(var g="",a=-1,b,d;++a<c.length;){b=c.charCodeAt(a);d=a+1<c.length?c.charCodeAt(a+1):0;if(55296<=b&&b<=56319&&56320<=d&&d<=57343){b=65536+((b&1023)<<10)+(d&1023);a++}if(b<=127)g+=String.fromCharCode(b);else if(b<=2047)g+=String.fromCharCode(192|b>>>6&31,128|b&63);else if(b<=65535)g+=String.fromCharCode(224|b>>>12&15,128|b>>>6&63,128|b&63);else if(b<=2097151)g+=String.fromCharCode(240|b>>>18&7,128|b>>>12&63,128|b>>>6&63,128|b&63)}return g}
function str2rstr_utf16le(c){for(var g="",a=0;a<c.length;a++)g+=String.fromCharCode(c.charCodeAt(a)&255,c.charCodeAt(a)>>>8&255);return g}function str2rstr_utf16be(c){for(var g="",a=0;a<c.length;a++)g+=String.fromCharCode(c.charCodeAt(a)>>>8&255,c.charCodeAt(a)&255);return g}function rstr2binl(c){for(var g=Array(c.length>>2),a=0;a<g.length;a++)g[a]=0;for(a=0;a<c.length*8;a+=8)g[a>>5]|=(c.charCodeAt(a/8)&255)<<a%32;return g}
function binl2rstr(c){for(var g="",a=0;a<c.length*32;a+=8)g+=String.fromCharCode(c[a>>5]>>>a%32&255);return g}
function binl_md5(c,g){c[g>>5]|=128<<g%32;c[(g+64>>>9<<4)+14]=g;for(var a=1732584193,b=-271733879,d=-1732584194,e=271733878,f=0;f<c.length;f+=16){var h=a,i=b,k=d,j=e;a=md5_ff(a,b,d,e,c[f+0],7,-680876936);e=md5_ff(e,a,b,d,c[f+1],12,-389564586);d=md5_ff(d,e,a,b,c[f+2],17,606105819);b=md5_ff(b,d,e,a,c[f+3],22,-1044525330);a=md5_ff(a,b,d,e,c[f+4],7,-176418897);e=md5_ff(e,a,b,d,c[f+5],12,1200080426);d=md5_ff(d,e,a,b,c[f+6],17,-1473231341);b=md5_ff(b,d,e,a,c[f+7],22,-45705983);a=md5_ff(a,b,d,e,c[f+8],7,
1770035416);e=md5_ff(e,a,b,d,c[f+9],12,-1958414417);d=md5_ff(d,e,a,b,c[f+10],17,-42063);b=md5_ff(b,d,e,a,c[f+11],22,-1990404162);a=md5_ff(a,b,d,e,c[f+12],7,1804603682);e=md5_ff(e,a,b,d,c[f+13],12,-40341101);d=md5_ff(d,e,a,b,c[f+14],17,-1502002290);b=md5_ff(b,d,e,a,c[f+15],22,1236535329);a=md5_gg(a,b,d,e,c[f+1],5,-165796510);e=md5_gg(e,a,b,d,c[f+6],9,-1069501632);d=md5_gg(d,e,a,b,c[f+11],14,643717713);b=md5_gg(b,d,e,a,c[f+0],20,-373897302);a=md5_gg(a,b,d,e,c[f+5],5,-701558691);e=md5_gg(e,a,b,d,c[f+
10],9,38016083);d=md5_gg(d,e,a,b,c[f+15],14,-660478335);b=md5_gg(b,d,e,a,c[f+4],20,-405537848);a=md5_gg(a,b,d,e,c[f+9],5,568446438);e=md5_gg(e,a,b,d,c[f+14],9,-1019803690);d=md5_gg(d,e,a,b,c[f+3],14,-187363961);b=md5_gg(b,d,e,a,c[f+8],20,1163531501);a=md5_gg(a,b,d,e,c[f+13],5,-1444681467);e=md5_gg(e,a,b,d,c[f+2],9,-51403784);d=md5_gg(d,e,a,b,c[f+7],14,1735328473);b=md5_gg(b,d,e,a,c[f+12],20,-1926607734);a=md5_hh(a,b,d,e,c[f+5],4,-378558);e=md5_hh(e,a,b,d,c[f+8],11,-2022574463);d=md5_hh(d,e,a,b,c[f+
11],16,1839030562);b=md5_hh(b,d,e,a,c[f+14],23,-35309556);a=md5_hh(a,b,d,e,c[f+1],4,-1530992060);e=md5_hh(e,a,b,d,c[f+4],11,1272893353);d=md5_hh(d,e,a,b,c[f+7],16,-155497632);b=md5_hh(b,d,e,a,c[f+10],23,-1094730640);a=md5_hh(a,b,d,e,c[f+13],4,681279174);e=md5_hh(e,a,b,d,c[f+0],11,-358537222);d=md5_hh(d,e,a,b,c[f+3],16,-722521979);b=md5_hh(b,d,e,a,c[f+6],23,76029189);a=md5_hh(a,b,d,e,c[f+9],4,-640364487);e=md5_hh(e,a,b,d,c[f+12],11,-421815835);d=md5_hh(d,e,a,b,c[f+15],16,530742520);b=md5_hh(b,d,e,
a,c[f+2],23,-995338651);a=md5_ii(a,b,d,e,c[f+0],6,-198630844);e=md5_ii(e,a,b,d,c[f+7],10,1126891415);d=md5_ii(d,e,a,b,c[f+14],15,-1416354905);b=md5_ii(b,d,e,a,c[f+5],21,-57434055);a=md5_ii(a,b,d,e,c[f+12],6,1700485571);e=md5_ii(e,a,b,d,c[f+3],10,-1894986606);d=md5_ii(d,e,a,b,c[f+10],15,-1051523);b=md5_ii(b,d,e,a,c[f+1],21,-2054922799);a=md5_ii(a,b,d,e,c[f+8],6,1873313359);e=md5_ii(e,a,b,d,c[f+15],10,-30611744);d=md5_ii(d,e,a,b,c[f+6],15,-1560198380);b=md5_ii(b,d,e,a,c[f+13],21,1309151649);a=md5_ii(a,
b,d,e,c[f+4],6,-145523070);e=md5_ii(e,a,b,d,c[f+11],10,-1120210379);d=md5_ii(d,e,a,b,c[f+2],15,718787259);b=md5_ii(b,d,e,a,c[f+9],21,-343485551);a=safe_add(a,h);b=safe_add(b,i);d=safe_add(d,k);e=safe_add(e,j)}return Array(a,b,d,e)}function md5_cmn(c,g,a,b,d,e){return safe_add(bit_rol(safe_add(safe_add(g,c),safe_add(b,e)),d),a)}function md5_ff(c,g,a,b,d,e,f){return md5_cmn(g&a|~g&b,c,g,d,e,f)}function md5_gg(c,g,a,b,d,e,f){return md5_cmn(g&b|a&~b,c,g,d,e,f)}
function md5_hh(c,g,a,b,d,e,f){return md5_cmn(g^a^b,c,g,d,e,f)}function md5_ii(c,g,a,b,d,e,f){return md5_cmn(a^(g|~b),c,g,d,e,f)}function safe_add(c,g){var a=(c&65535)+(g&65535);return(c>>16)+(g>>16)+(a>>16)<<16|a&65535}function bit_rol(c,g){return c<<g|c>>>32-g};