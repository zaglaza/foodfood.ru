var scroll_bar_width=0,scroll_x1=0,scroll_offset=0,scroll_offtemp=0,scroll_act=false,scroll_auto_left=false,scroll_mouse_over=false,scroll_stop=false,el_width=0,scroll_right=0,search_by="search_by_rest",search_offset=0,current_search="moods",current_mood="",current_text="",current_char="",current_tags=Array(),tags_disable=false;
$(document).ready(function(){$("#show_search").click(function(){$("#moods_container, #chars_container, #random_container, #all_container").animate({height:"hide"},200);$("#search_container").animate({height:"show"},200);$("#restaurant_by_mood").animate({height:"hide"},400);$("#additional, #restaurant, #footer").show();current_search="search"});$("#show_chars").click(function(){$("#moods_container, #search_container, #random_container, #all_container").animate({height:"hide"},200);$("#chars_container").animate({height:"show"},
200);$("#chars .item.current.rounded").removeClass("current").removeClass("rounded");$("#restaurant_by_mood").animate({height:"hide"},400);$("#additional, #restaurant, #footer").show();current_search="chars"});$("#show_moods").click(function(){$("#chars_container, #search_container, #random_container, #all_container").animate({height:"hide"},200);$("#moods_container").animate({height:"show"},200);$("#moods .icon").removeClass("active");$("#restaurant_by_mood").animate({height:"hide"},400);$("#additional, #restaurant, #footer").show();
current_search="moods"});$("#show_random").click(function(){$("#chars_container, #search_container, #moods_container, #all_container").animate({height:"hide"},200);$("#random_container").animate({height:"show"},200);$("#restaurant_by_mood").animate({height:"show"},400);select_by_rand();$("#additional, #restaurant, #footer").hide();$(".restaurant_navigate .caption").html("\u0421\u043b\u0443\u0447\u0430\u0439\u043d\u044b\u0435 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b");current_search=
"random"});$("#show_all").click(function(){$("#chars_container, #search_container, #moods_container, #random_container").animate({height:"hide"},200);$("#all_container").animate({height:"show"},200);$("#restaurant_by_mood").animate({height:"show"},400);select_all();$("#additional, #restaurant, #footer").hide();$(".restaurant_navigate .caption").html("\u0412\u0441\u0435 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b");current_search="all"});$("#moods .icon").click(function(){if($(this).hasClass("active")){$(this).removeClass("active");
$("#restaurant_by_mood").animate({height:"hide"},400);$("#additional, #restaurant, #footer").show()}else{current_mood=$(this).attr("uri");$("#moods .icon.active").removeClass("active");$(this).addClass("active");$(".restaurant_navigate .caption").html("\u041d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435 : "+$(this).find(".caption").html());select_by_mood()}});$("#chars .item").click(function(){if($(this).hasClass("current")){$(this).removeClass("current").removeClass("rounded");$("#restaurant_by_mood").animate({height:"hide"},
400);$("#additional, #restaurant, #footer").show()}else{current_char=$(this).html();$("#chars .item.current.rounded").removeClass("current").removeClass("rounded");$(this).addClass("current").addClass("rounded");$(".restaurant_navigate .caption").html("\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0431\u0443\u043a\u0432\u0435 : "+current_char);select_by_char()}});$("#search_types a").click(function(){$("#search_types a.active").removeClass("active");$(this).addClass("active");search_by=$(this).attr("id")});
$("#search_form  .button").click(function(){$(".restaurant_navigate .caption").html("\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b \u043f\u043e\u0438\u0441\u043a\u0430 : "+$("#search_text").val());current_text=$("#search_text").val();select_by_text()});$("#cursor").mousedown(function(a){a=jQuery.event.fix(a);scroll_act=true;scroll_x1=a.pageX});$(document).mouseup(function(){if(scroll_act){scroll_act=false;scroll_offset=scroll_offtemp}});$("#moods").mouseenter(function(){scroll_mouse_over=
true});$("#moods").mouseleave(function(){scroll_mouse_over=false});$("#cursor_top .right_text").css("opacity","0.5");$(document).mousemove(function(a){if(scroll_act){scroll_offtemp=a.pageX-scroll_x1+scroll_offset;if(scroll_offtemp<0)scroll_offtemp=0;if(scroll_offtemp>scroll_right)scroll_offtemp=scroll_right;$("#cursor").css({marginLeft:Math.ceil(scroll_offtemp)});$("#bar_top").scrollLeft(Math.ceil(scroll_offtemp*prop));check_opacity_text();return false}});$("#cursor_top").mousedown(function(a){if(!scroll_act){scroll_offset=
a.pageX-$("#cursor_top").offset().left-$("#cursor").width()/2;if(scroll_offset<0)scroll_offset=0;if(scroll_offset>scroll_right)scroll_offset=scroll_right;$("#cursor").animate({marginLeft:Math.ceil(scroll_offset)},300);$("#bar_top").animate({scrollLeft:Math.ceil(scroll_offset*prop)},300);scroll_offset=Math.ceil(scroll_offset);check_opacity_text_2()}});$(document).mousewheel(function(a,b){if(scroll_mouse_over&&!scroll_stop){scroll_last=scroll_offset;if(b>0)scroll_offset-=2*(el_width/prop);else scroll_offset+=
2*(el_width/prop);if(scroll_offset<0)scroll_offset=0;if(scroll_offset>scroll_right)scroll_offset=scroll_right;if(scroll_last!=scroll_offset){scroll_stop=true;$("#cursor").animate({marginLeft:Math.ceil(scroll_offset)},600);$("#bar_top").animate({scrollLeft:Math.ceil(scroll_offset*prop)},600,function(){scroll_stop=false});check_opacity_text_2()}}else if(!scroll_mouse_over)return true;return false});$("#restaurant_by_mood .restaurant_tags .item").click(function(){if(tags_disable)return false;tags_disable=
true;$(this).hasClass("current")?$(this).removeClass("current"):$(this).addClass("current");current_tags=Array();i=0;$("#restaurant_by_mood .restaurant_tags .item.current").each(function(){current_tags[i]=$(this).attr("tag");i++});current_tags=serialize(current_tags);switch(current_search){case "moods":select_by_mood();break;case "chars":select_by_char();break;case "search":select_by_text();break;case "random":select_by_rand();break;case "all":select_all();break}})});
function select_all(){$("#restaurant_by_mood_content").html("");$("#restaurant_by_mood_content").append($loader);$("#restaurant_by_mood_content #loader").show();$("#restaurant_by_mood").animate({height:"show"},400);$.post("/"+site_city+"/index/all/",{width:$(document).width(),tags:current_tags,offset:search_offset},function(a){a!=""?$("#restaurant_by_mood_content").html(a):$("#restaurant_by_mood_content").html("\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u043f\u043e \u0434\u0430\u043d\u043d\u043e\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b");
tags_disable=false});$("#additional, #restaurant, #footer").hide()}
function select_by_mood(){$("#restaurant_by_mood_content").html("");$("#restaurant_by_mood_content").append($loader);$("#restaurant_by_mood_content #loader").show();$("#restaurant_by_mood").animate({height:"show"},400);$.post("/"+site_city+"/index/mood/",{width:$(document).width(),mood:current_mood,tags:current_tags,offset:search_offset},function(a){a!=""?$("#restaurant_by_mood_content").html(a):$("#restaurant_by_mood_content").html("\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u043f\u043e \u0434\u0430\u043d\u043d\u043e\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b");tags_disable=
false});$("#additional, #restaurant, #footer").hide()}
function select_by_char(){$("#restaurant_by_mood_content").html("");$("#restaurant_by_mood_content").append($loader);$("#restaurant_by_mood_content #loader").show();$("#restaurant_by_mood").animate({height:"show"},400);$.post("/"+site_city+"/index/char/",{width:$(document).width(),"char":current_char,tags:current_tags,offset:search_offset},function(a){a!=""?$("#restaurant_by_mood_content").html(a):$("#restaurant_by_mood_content").html("\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u043f\u043e \u0434\u0430\u043d\u043d\u043e\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b");tags_disable=
false});$("#additional, #restaurant, #footer").hide()}
function select_by_text(){$("#restaurant_by_mood_content").html("");$("#restaurant_by_mood_content").append($loader);$("#restaurant_by_mood_content #loader").show();$("#restaurant_by_mood").animate({height:"show"},400);$.post("/"+site_city+"/index/search/",{width:$(document).width(),search_by:search_by,text:current_text,tags:current_tags,offset:search_offset},function(a){a!=""?$("#restaurant_by_mood_content").html(a):$("#restaurant_by_mood_content").html("\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u043f\u043e \u0434\u0430\u043d\u043d\u043e\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b");tags_disable=
false});$("#additional, #restaurant, #footer").hide()}
function select_by_rand(){$("#restaurant_by_mood_content").html("");$("#restaurant_by_mood_content").append($loader);$("#restaurant_by_mood_content #loader").show();$("#restaurant_by_mood").animate({height:"show"},400);$.post("/"+site_city+"/index/random/",{width:$(document).width(),tags:current_tags,offset:search_offset},function(a){a!=""?$("#restaurant_by_mood_content").html(a):$("#restaurant_by_mood_content").html("\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u044b \u043f\u043e \u0434\u0430\u043d\u043d\u043e\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b");tags_disable=
false});$("#additional, #restaurant, #footer").hide()}
function mood_check_width(){var a=0;$("#bar_top").scrollLeft(0);$("#cursor").css("marginLeft",0);$("#bar .icon").each(function(){padding=parseInt($(this).css("paddingLeft"))+parseInt($(this).css("paddingRight"));margin=parseInt($(this).css("marginLeft"))+parseInt($(this).css("marginRight"));border=2;a=a+$(this).width()+padding+margin+border;el_width=$(this).width()+parseInt($(this).css("paddingLeft"))});bar_width=$("#bar_top").width();scroll_cursor_width=bar_width/(a/bar_width);$("#cursor").width(scroll_cursor_width);
scroll_right=$("#cursor_top").width()-$("#cursor").width()-5;a-=$("#bar_top").width();a>0?$("#cursor_top").show():$("#cursor_top").hide();scroll_bar_width=a;prop=scroll_bar_width/scroll_right}function check_opacity_text(){crt=(scroll_right-scroll_offtemp)/scroll_right*100/100+0.5;if(crt>1)crt=1;clt=1.5-crt;$("#cursor_top .left_text").css("opacity",crt);$("#cursor_top .right_text").css("opacity",clt)}
function check_opacity_text_2(){crt=(scroll_right-scroll_offset)/scroll_right*100/100+0.5;if(crt>1)crt=1;clt=1.5-crt;$("#cursor_top .left_text").css("opacity",crt);$("#cursor_top .right_text").css("opacity",clt)};