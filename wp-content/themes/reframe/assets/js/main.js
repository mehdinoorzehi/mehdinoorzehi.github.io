/******************************************************************
	
	
	@ Item          Reframe - Resume & Personal Portfolio WordPress Theme
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************/
 
 
 /******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Init
	--  2. Page Loading
	--  3. Smooth Page Scroll
	--  4. Cursor
	--  5. Menu
	--  6. Scroll Bar / Progress Bar
	--  7. Scroll Animations
	--  8. Profile Picture
	--  9. Mobile
	--  10. Misc
 
 
 ******************************************************************/



/** 1. Init
*******************************************************************/

/* Mobile Device Detect Function */
window.mobileAndTabletCheck=function(){let i=!1;var a;return a=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))&&(i=!0),i};
function isIpadOS(){return navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform)}

var config_mobile_max_width_for_layout = 800;
var option_hero_background_twisted_x_offset = "10%";

var is_mobile_device = false;
if(window.mobileAndTabletCheck()) is_mobile_device = true;
if(isIpadOS()) is_mobile_device = true;

function core_init() {
	smooth_scroll();
	menu_setup();
	cursor_setup();
	scroll_animations();
	mobile_layout();
	if(jQuery("#main").hasClass("rfpp_core_wp")) window.addEventListener("load", scroll_bar);
	options_panel()
	image_setup();

} core_init();



/** 2. Page Loading
*******************************************************************/

function page_intro() {

	var tl = gsap.timeline();

	tl.to([".loading-screen h3",".loading-screen .line-frame"], {ease: "power4.inOut", duration:1, opacity:1, y: "100%",});
	tl.to(".loading-screen", {ease: "expo.out", duration: 1.4, y:"100%",delay: 0.15});
	tl.set(".loading-screen",{zIndex:-100});
	tl.from("#main", {ease: "power3.inOut", duration: .8, opacity:0},"-=0.6");
	//tl.add( function(){ jQuery("body").removeClass("loading-screen-on-display") },"-=0.8");

} window.addEventListener('load', page_intro);



/** 3. Smooth Page Scroll
*******************************************************************/

function smooth_scroll() {

	if(is_mobile_device) {

		// Mobile Custom Scroll Layout
		jQuery("#main").css("overflow","hidden");
		jQuery("#main").css("height","auto");
		jQuery("#main").css("width","auto");
		jQuery("#main").css("position","relative");
		jQuery("#main .left-content").css("fixed","absolute");
		jQuery("#main .left-content").css("height","100vh");
		jQuery("#main .right-content").css("position","relative");
		jQuery("#main .right-content").css("height","auto");
		jQuery("#main .right-content").css("overflow","hidden");

	}
	if(is_mobile_device) return;

	viewport = null;
	content = gsap.utils.toArray(".right-content .inner-content")[0];

	if(content == undefined) return;

	if (typeof config_smooth_page_scroll_intensity !== 'undefined') {
		smoothness = config_smooth_page_scroll_intensity;
	} else {
		smoothness = 1;
	}

	if(is_mobile_device == true && typeof config_smooth_page_scroll_intensity !== 'undefined') smoothness = config_smooth_page_scroll_intensity_mobile;

	gsap.set(viewport || content.parentNode, {overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0});
	gsap.set(content, {overflow: "visible"});
	
	let getProp = gsap.getProperty(content),
		setProp = gsap.quickSetter(content, "y", "px"),
		setScroll = ScrollTrigger.getScrollFunc(window),
		removeScroll = function(){ content.style.overflow = "visible"},
		killScrub = function(trigger) {
			let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
			scrub && scrub.kill();
			trigger.animation.progress(trigger.progress);
		},
		height, isProxyScrolling;


	function onResize() {
		height = content.clientHeight;
		content.style.overflow = "visible"
		document.body.style.height = height + "px";
	} onResize();

	ScrollTrigger.addEventListener("refreshInit", onResize);
	ScrollTrigger.addEventListener("refresh",function() {
		removeScroll();
		requestAnimationFrame(removeScroll);
	})

	ScrollTrigger.defaults({scroller: content});
	ScrollTrigger.prototype.update = function(p){p}; 

	ScrollTrigger.scrollerProxy(content, {

		scrollTop: function scrollTop(value) {
		  if (arguments.length) {
			isProxyScrolling = true;
			setProp(-value);
			setScroll(value);
			return;
		  }
	  
		  return -getProp("y");
		},
		getBoundingClientRect: function getBoundingClientRect() {

		  return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight
		  };

		}

	});

	function el_resize_listener() {

		var erdUltraFast = elementResizeDetectorMaker({
			strategy: "scroll"
		});
	
		erdUltraFast.listenTo(document.getElementsByClassName("section-container"), function() {
			ScrollTrigger.refresh();
		});

	} el_resize_listener();
	
	return ScrollTrigger.create({
		animation: gsap.fromTo(content, {y:0}, {
			y: function() { return document.documentElement.clientHeight -height },
			ease: "none",
			onUpdate: ScrollTrigger.update,
			overwrite: true,
		}),
		scroller: window,
		invalidateOnRefresh: true,
		start: 0,
		end: function() {return height - document.documentElement.clientHeight},
		scrub: smoothness,
		onUpdate: function(self) {
			if (isProxyScrolling) {
				killScrub(self);
				isProxyScrolling = false;
			}
		},
		onRefresh: killScrub 
	});

}

/** 4. Cursor
*******************************************************************/

function cursor_setup() {

	var customized_cursor = 1;

	if (typeof custom_cursor !== 'undefined')  customized_cursor = custom_cursor;

	if( customized_cursor == 0 || is_mobile_device == true) return;

	jQuery("body").append('<div class="c_cursor_outer"><div class="circle"></div><div class="bg"></div></div></div><div class="c_cursor_inner"></div>');

	gsap.set([".c_cursor_outer",".c_cursor_inner"], {xPercent: -50, yPercent: -50});

	if (typeof custom_cursor !== 'undefined') {

		jQuery(".c_cursor_outer .bg, .c_cursor_outer .circle").css({
			"border-style": cursor_outer_line_style,
			"border-width": cursor_outer_line_width,
			"border-color": cursor_outer_line_color,
		})

		jQuery(".c_cursor_outer").css({
			"width": cursor_outer_dimensions,
			"height": cursor_outer_dimensions,
		})

		jQuery(".c_cursor_inner").css({
			"width": cursor_inner_dimensions,
			"height": cursor_inner_dimensions,
			"background": cursor_inner_color,
		})

	}

	const cursor_outer = document.querySelector(".c_cursor_outer");
	const cursor_inner = document.querySelector(".c_cursor_inner");

	const pos_o = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
	const pos_i = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

	const mouse = { x: 0, y: 0 };

	const speed_o = 0.4;
	const speed_i = 1;

	const x_set_o = gsap.quickSetter(cursor_outer, "x", "px");
	const y_set_o = gsap.quickSetter(cursor_outer, "y", "px");

	const x_set_i = gsap.quickSetter(cursor_inner, "x", "px");
	const y_set_i = gsap.quickSetter(cursor_inner, "y", "px");

	window.addEventListener("mousemove", function(e) {    
		mouse.x = e.x;
		mouse.y = e.y;
	});

	gsap.ticker.add(function() {
	
		const dt_o = 1.0 - Math.pow(1.0 - speed_o, gsap.ticker.deltaRatio()); 
		const dt_i = 1.0 - Math.pow(1.0 - speed_i, gsap.ticker.deltaRatio()); 
		
		pos_o.x += (mouse.x - pos_o.x) * dt_o;
		pos_o.y += (mouse.y - pos_o.y) * dt_o;
		pos_i.x += (mouse.x - pos_i.x) * dt_i;
		pos_i.y += (mouse.y - pos_i.y) * dt_i;

		x_set_o(pos_o.x);
		y_set_o(pos_o.y);
		x_set_i(pos_i.x);
		y_set_i(pos_i.y);

	});

	var click_tl = gsap.timeline().pause();

	click_tl.set(".c_cursor_outer .circle",{opacity:1});
	click_tl.to(".c_cursor_outer .circle",{duration: 0.45, opacity:1, width: "100%", height: "100%",  ease:"power4.out"});
	click_tl.set(".c_cursor_outer .circle",{width: "0", height: "0",opacity:0,});

	window.addEventListener("mousedown", function() {
		click_tl.seek(0).play();
	});

	document.addEventListener("mouseleave", function() {
		gsap.to([".c_cursor_outer",".c_cursor_inner"],{duration: 0.2,opacity:1,scale: 0,overwrite: true});
	});

	document.addEventListener("mouseenter", function() {
		gsap.to([".c_cursor_outer",".c_cursor_inner"],{duration: 0.2,opacity:1,scale: 1,overwrite: true});
	});
	
}



/** 5. Menu
*******************************************************************/

function menu_setup() {

	var menu_position = "closed";
	var menu_moving = false;
	var menu_timeline = "";
	var menu_btn = jQuery(".m-menu-button");
	var is_wp_menu = jQuery("body.rfpp_blog_mode").length;

	jQuery("#main").append('<div class="menu-overlay"></div>');
	if(is_wp_menu) jQuery(".m-menu-button").removeClass("is-visble");

	function wordpress_core_menu() {

		if(!is_wp_menu) return;

		if(jQuery(".rfpp_blog_wp_menu").length) {
			jQuery(".rfpp_blog_wp_menu").parent().addClass("wp_menu_wrapper");
		}

		jQuery(".wp_menu_wrapper .sub-menu").addClass("main-items");
		jQuery(".wp_menu_wrapper .sub-menu").each(function(){

			var name = jQuery(this).parent(".menu-item").attr("id");
			var parent = jQuery(this).parent("li").attr("id");

			jQuery(this).attr('data-parent', name);
			jQuery(this).append('<li class="menu-item back" data-back="' + parent + '"><a>Back</a></li>');
			jQuery(this).prependTo(".wp_menu_wrapper");

		});

		jQuery(".rfpp_blog_wp_menu").addClass("is-active")

		jQuery(".menu-item-has-children a").click(function(e){

			e.preventDefault();

			var target_id = jQuery(this).parent("li").attr("id");
			var target_sub_menu = jQuery('.sub-menu[data-parent="' + target_id +'"]');
			var target_sub_menu_links = jQuery('.sub-menu[data-parent="' + target_id +'"] li a');

			var timeline = gsap.timeline();

			timeline.to(".m-menu .main-items a",{duration:0.6, y:'100%', ease:"power2.in"});
			timeline.add(function(){ 
				jQuery(".wp_menu_wrapper ul").removeClass("is-active"); 
				target_sub_menu.addClass("is-active");
			});
			timeline.to(target_sub_menu_links, {duration:0.6, y:'0%', ease:"expo.out", stagger: 0.1});

		});

		jQuery(".menu-item.back").click(function(e){

			e.preventDefault();

			var target_id = jQuery(this).data("back");
			var target_menu = jQuery('.menu-item.' + target_id).parent("ul");
			var target_menu_links = target_menu.find("a");

			var timeline = gsap.timeline();

			timeline.to(".m-menu .main-items a",{duration:0.6, y:'100%', ease:"power2.in"});
			timeline.add(function(){ 
				jQuery(".wp_menu_wrapper ul").removeClass("is-active"); 
				target_menu.addClass("is-active");
			});
			timeline.to(target_menu_links, {duration:0.6, y:'0%', ease:"expo.out", stagger: 0.1});

		});

	} wordpress_core_menu();

	gsap.set(".m-menu",{x: "100%"});
	function set_defaults() {
		
		jQuery(".m-menu .rfpp_blog_wp_menu > .menu-item > a").addClass("menu-item-level-1");
		gsap.set(".m-menu .head p",{y:'100%'});

		if(is_wp_menu) {
			gsap.set(".m-menu .main-items a",{y:'100%'});
		} else {
			gsap.set(".m-menu .main-items a,.m-menu .main-items .scroll-to",{y:'100%'});
			gsap.set(".m-menu .social-items a",{y:'100%'});
		}

	}

	function update_timeline(mode) {

		if(menu_timeline === "") set_defaults();

		menu_timeline = gsap.timeline();

		if(mode == "open") {

			menu_timeline.to(".m-menu-button .line:first-child",{duration:0.35, rotate: 45, y:"0.4rem", ease:"power4.inOut"},0);
			menu_timeline.to(".m-menu-button .line:last-child",{duration:0.35, rotate: -45,y:"-0.4rem", ease:"power4.inOut"},0);
			menu_timeline.set(".menu-overlay",{css:{zIndex:100}});
			menu_timeline.to([".right-content",".left-content"],{duration:0.8, opacity: 0.25, left:"-24%",  ease:"power4.inOut"},0);
			menu_timeline.to(".m-menu",{duration:0.8, x: "0%", ease:"power4.inOut"},"-=0.8");
			menu_timeline.to(".m-menu .head p",{duration:0.6, y:'0%', ease:"expo.out"});

			if(is_wp_menu) {
				menu_timeline.to(".m-menu .menu-item-level-1", {duration:0.6, y:'0%', ease:"expo.out", stagger: 0.1},"-=0.6");
			} else {
				menu_timeline.to(".m-menu .main-items a,.m-menu .main-items .scroll-to",{duration:0.6, y:'0%', ease:"expo.out", stagger: 0.1},"-=0.6");
				menu_timeline.to(".m-menu .social-items a",{duration:0.6, y:'0%', ease:"expo.out", stagger: 0.1},"-=0.6");
			}

			menu_timeline.eventCallback("onComplete", function(){
				menu_position = "opened";
				menu_moving = false;
			});

		}

		if(mode == "close") {

			menu_timeline.set(".menu-overlay",{css:{zIndex:-100}});
			menu_timeline.to(".m-menu .head p",{duration:0.6, y:'100%', ease:"power2.in"});

			if(is_wp_menu) {
				menu_timeline.to(".m-menu .main-items a", {duration:0.6, y:'100%', ease:"power2.in"},"-=0.6");
			} else {
				menu_timeline.to(".m-menu .main-items a,.m-menu .main-items .scroll-to",{duration:0.6, y:'100%', ease:"power2.in"},"-=0.6");
				menu_timeline.to(".m-menu .social-items a",{duration:0.6, y:'100%', ease:"power2.in"},"-=0.6");
			}

			menu_timeline.to(".m-menu",{duration:0.7, x: "100%", ease:"power4.inOut"});
			menu_timeline.to([".right-content",".left-content"],{duration:0.7, opacity: 1, left:"0", ease:"power4.inOut"},"-=0.7");
			menu_timeline.to(".m-menu-button .line:first-child",{duration:0.35, rotate: 0, y:0, ease:"power4.inOut"},"-=0.6");
			menu_timeline.to(".m-menu-button .line:last-child",{duration:0.35, rotate: 0,y:0, ease:"power4.inOut"},"-=0.6");
			
			menu_timeline.eventCallback("onComplete", function(){
				jQuery(".wp_menu_wrapper ul").removeClass("is-active"); 
				jQuery(".rfpp_blog_wp_menu").addClass("is-active");
				menu_position = "closed";
				menu_moving = false;
			});

		}

	}

	jQuery(".menu-overlay").on('click', function() {

		if( menu_moving == true) return;
		if(menu_position == "opened")  {
			menu_moving = true;
			update_timeline("close");
		}

	});

	menu_btn.on('click', function() {

		if( menu_moving == true) return;
		menu_moving = true;
		if(menu_position == "opened") { update_timeline("close"); } else { update_timeline("open"); }

	});

	function menu_scroll_to() {

		jQuery(".m-menu").on("click", ".scroll-to",function(){

			if(jQuery(".menu-content-data").data("autoclose") == "yes") {
				update_timeline("close");
			}

			var section_id = jQuery(this).data("target");

			if (section_id.charAt(0) != "#" ) section_id = "#" + section_id;

			var offset = gsap.getProperty(".right-content .inner-content", "y");
			var position = jQuery(section_id).get(0).getBoundingClientRect().top - offset;

			if(is_mobile_device) {

				offset = jQuery("body").get(0).getBoundingClientRect().top;
				position = jQuery(section_id).get(0).getBoundingClientRect().top - offset;
			
			}

			gsap.to(window, {
				scrollTo: position,
				ease: "power4",
				duration: 2,
				overwrite: true
			});

		});

	} menu_scroll_to();

	if(is_wp_menu) {
		if (!jQuery(".rfpp_blog_mode").hasClass("rfpp_menu")) {
			jQuery(".m-menu-button").css("display","none");
		}
	}


}



/** 6. Scroll Bar / Progress Bar
*******************************************************************/

function scroll_bar() {

	var scroll_bar_mode = "bar";

	if (typeof config_scroll_bar !== 'undefined')  scroll_bar_mode = config_scroll_bar;

	if(scroll_bar_mode == "default" || is_mobile_device == true) {
		jQuery("body").removeClass("cursor-hidden");
		return;
	}

	var scroll_bars = {};

	scroll_bars.progress = function () {

		jQuery("body").prepend('<div class="scroll-progress"><div class="inner"></div></div>');
		jQuery("body").addClass("cursor-hidden");

		gsap.to('.scroll-progress .inner', {
			height: "100%",
			ease: 'none',
			scrollTrigger: { 
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				toggleClass: {targets: ".section", className: "active"},
				scrub: 0,
				invalidateOnRefresh: true,
			}
		});

	}

	scroll_bars.bar = function () {

		var calc_out,content_h,window_h;

		jQuery("body").prepend('<div class="scroll-bar"><div class="inner"></div></div>');
		jQuery("body").addClass("cursor-hidden");

		function calc(){

			window_h = jQuery(window).height();
			content_h = jQuery(".right-content .inner-content").height();
			calc_out =  Math.round( 100 / (content_h / window_h) );
			jQuery(".scroll-bar .inner").css("height",calc_out+"%");

		} calc();
		window.addEventListener('resize', calc);
		
		gsap.to('.scroll-bar .inner', {
			top: 100-calc_out + "%",
			ease: 'none',
			scrollTrigger: { 
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				toggleClass: {targets: ".section", className: "active"},
				scrub: 0,
				invalidateOnRefresh: true,
			}
		});

	}
	
	if(scroll_bar_mode != "") {
		scroll_bars[scroll_bar_mode]();	
	} else {
		scroll_bars["bar"]();
	}

}



/** 7. Scroll Animations
*******************************************************************/

function scroll_animations() {


	var allow_on_mobile = true;

	if (typeof config_scroll_animation_on_mobile !== 'undefined')  allow_on_mobile = config_scroll_animation_on_mobile;

	if(allow_on_mobile == false && is_mobile_device) return;

	var defaults = {
		duration: 1.2,
		ease: "power4.out",
		animation: "fade_from_bottom",
		once: false,
	}

	gsap.utils.toArray('.scroll-animation').forEach(function(box) {

		var gsap_obj = {};

		var settings = {
			ease: box.dataset.animationEase || defaults.ease,
			duration: box.dataset.animationDuration || defaults.duration,
		}

		var animations = {
			fade_from_bottom: {
				y: 180,
				opacity: 0
			},
			fade_from_left: {
				x: -180,
				opacity: 0
			},
			fade_from_right: {
				x: 180,
				opacity: 0
			},
			fade_in: {
				opacity: 0
			},
			rotate_up: {
				y: 180,
				rotation:10,
				opacity: 0
			},
		}

		var scroll_trigger = {
			scrollTrigger: {
				trigger: box,
				once: defaults.once,
				start: "top bottom+=5%",
				toggleActions: 'play none none reverse',
				markers: false,
			}
		}

		jQuery.extend(gsap_obj, settings);
		jQuery.extend(gsap_obj, animations[ box.dataset.animation || defaults.animation ]);
		jQuery.extend(gsap_obj, scroll_trigger);

		gsap.from(box, gsap_obj);

	});
	  
}



/** 8. Profile Picture
*******************************************************************/

function image_setup() {

	if( jQuery("body.rfpp_blog_mode").length) return;

	function img_three(opts) {

		var parent = opts.parent;

		if( parent == null) return;

		var vertex = "varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}";
		var fragment = "varying vec2 vUv;uniform float dispFactor;uniform float dpr;uniform sampler2D disp;uniform sampler2D texture1;uniform sampler2D texture2;uniform float angle1;uniform float angle2;uniform float intensity1;uniform float intensity2;uniform vec4 res;uniform vec2 parent;mat2 getRotM(float angle) {float s = sin(angle);float c = cos(angle);return mat2(c, -s, s, c);}void main() {vec4 disp = texture2D(disp, vUv);vec2 dispVec = vec2(disp.r, disp.g);vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);vec4 _texture1 = texture2D(texture1, distortedPosition1);vec4 _texture2 = texture2D(texture2, distortedPosition2);gl_FragColor = mix(_texture1, _texture2, dispFactor);}";

		function firstDefined() {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined) return arguments[i];
			}
		}
		
		var dispImage = opts.displacementImage;
		var image = opts.image;
		var imagesRatio = firstDefined(opts.imagesRatio, 1.0);
		var intensity1 = firstDefined(opts.intensity1, opts.intensity, 1);
		var intensity2 = firstDefined(opts.intensity2, opts.intensity, 1);
		var commonAngle = firstDefined(opts.angle, Math.PI / 4); 
		var angle1 = firstDefined(opts.angle1, commonAngle);
		var angle2 = firstDefined(opts.angle2, -commonAngle * 3);
		var userHover = firstDefined(opts.hover, true);
		var easing = firstDefined(opts.easing, Expo.easeOut);

		var texture_is_video = ["avi", "mpg", "mp4", "m4v", "mov", "ogv", "vtt", "wmv", "3gp", "3g2"].some(el => image.includes(el));

		var scene = new THREE.Scene();
		var camera = new THREE.OrthographicCamera(
			parent.offsetWidth / -2,
			parent.offsetWidth / 2,
			parent.offsetHeight / 2,
			parent.offsetHeight / -2,
			1,
			1000
		);

		camera.position.z = 1;

		var renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: true
		});

		renderer.setPixelRatio(2.0);
		renderer.setClearColor(0xffffff, 0.0);
		renderer.setSize(parent.offsetWidth, parent.offsetHeight);
		parent.appendChild(renderer.domElement);

		var render;

		render = function () {
			renderer.render(scene, camera);
			
		};

		var loader = new THREE.TextureLoader();
		loader.crossOrigin = '';

		var disp = loader.load(dispImage);
		disp.magFilter = disp.minFilter = THREE.LinearFilter;

		var disp_textures = {
			tech: { img_name: "tech.jpg"},
			abstract: {img_name: "abstract.jpg"},
			bricks: {img_name: "bricks.jpg"},
			claw: {img_name: "claw.jpg"},
			cult: {img_name: "cult.jpg"},
			numbers: {img_name: "numbers.jpg"},
			pieces: {img_name: "pieces.jpg"},
			species: {img_name: "species.jpg"},
			waves: {img_name: "waves.jpg"},
		}

		jQuery.each( disp_textures, function( key, value ) {
			if(!jQuery(".options-panel").length) return;
			disp_textures[key].texture = loader.load(template_directory_uri + '/assets/images/effect_maps/'+ this.img_name, function(){
				disp_textures[key].texture.magFilter = disp_textures[key].texture.magFilter = THREE.LinearFilter;
			});
		});

		var texture;
		if(texture_is_video) {

			jQuery("#main").append('<video id="profile-image-video" autoplay muted loop style="display:none;"> <source src="' + image + '" type="video/mp4"></video>');
			
			var video = document.getElementById( 'profile-image-video' );
			texture = new THREE.VideoTexture( video );
			
			video.onloadeddata = function () {

				imagesRatio = video.videoHeight / video.videoWidth;
				video.play();
				core();

				video.requestVideoFrameCallback(updateVideoTex); 
				function  updateVideoTex() {
					if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
						texture.needsUpdate = true;
						render();
						video.requestVideoFrameCallback(updateVideoTex); 
					}
				}

			};

		} else {

			texture = loader.load(image, function(){
				texture.magFilter = texture.magFilter = THREE.LinearFilter;
				imagesRatio = texture.image.height / texture.image.width;
				core();
				render();
			});

		}

		function core() {

			let a1, a2;
			var imageAspect = imagesRatio;

			function set_aspect() {

				if (parent.offsetHeight / parent.offsetWidth < imageAspect) {
					a1 = 1;
					a2 = parent.offsetHeight / parent.offsetWidth / imageAspect;
				} else {
					a1 = (parent.offsetWidth / parent.offsetHeight) * imageAspect;
					a2 = 1;
				}

			} set_aspect();

			jQuery("#option-hover .button").on("click",function() {
				btn_active = jQuery(this).data("value");
				jQuery("#option-hover .button.active").removeClass("active");
				jQuery(this).addClass("active");
				mat.uniforms.disp.value = disp_textures[btn_active].texture;
			})

			var mat = new THREE.ShaderMaterial({
				uniforms: {
					intensity1: {
						type: 'f',
						value: intensity1
					},
					intensity2: {
						type: 'f',
						value: intensity2
					},
					dispFactor: {
						type: 'f',
						value: 0.0
					},
					angle1: {
						type: 'f',
						value: angle1
					},
					angle2: {
						type: 'f',
						value: angle2
					},
					texture1: {
						type: 't',
						value: texture
					},
					texture2: {
						type: 't',
						value: texture
					},
					disp: {
						type: 't',
						value: disp
					},
					res: {
						type: 'vec4',
						value: new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2)
					},
					dpr: {
						type: 'f',
						value: window.devicePixelRatio
					}
				},
				vertexShader: vertex,
				fragmentShader: fragment,
				transparent: true,
				opacity: 1.0,
			});
			
			var geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
			var object = new THREE.Mesh(geometry, mat);

			scene.add(object);

			function transitionIn() {
				gsap.to(mat.uniforms.dispFactor,{
					value: 1,
					duration: 1.6,
					ease: easing,
					overwrite: true,
					onUpdate: render,
					onComplete: render,
				});

			}

			function transitionOut() {
				gsap.to(mat.uniforms.dispFactor,{
					value: 0,
					duration: 1.2,
					ease: easing,
					overwrite: true,
					onUpdate: render,
					onComplete: render,
				});
			}

			if (userHover) {
				parent.addEventListener('mouseenter', transitionIn);
				parent.addEventListener('mouseleave', transitionOut);
				parent.addEventListener('touchstart', transitionIn);
				parent.addEventListener('touchend', transitionOut);
			}

			window.addEventListener('resize', function (e) {
				set_aspect();
				object.material.uniforms.res.value = new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2);
				renderer.setSize(parent.offsetWidth, parent.offsetHeight);
				render();
			});

			this.next = transitionIn;
			this.previous = transitionOut;

		}

	};

	if(profile_image_effect_toggle == 0) {


		img_three({
			parent: document.querySelector('.picture-box'),
			intensity: 0.3,
			image: config_profile_image_url,
			displacementImage: template_directory_uri + '/assets/images/effect_maps/abstract.jpg',
			hover: false,
		});

	} else {

		var map_url = template_directory_uri + '/assets/images/effect_maps/' + config_profile_image_effect +'.jpg'
		if(config_profile_image_effect == "custom") map_url = config_profile_image_effect_url;


		img_three({
			parent: document.querySelector('.picture-box'),
			intensity: config_profile_image_effect_intensity,
			image: config_profile_image_url,
			displacementImage: map_url,
		});

	}
	
}



/** 9. Mobile
*******************************************************************/

function mobile_layout() {

	if(jQuery("#main").hasClass("rfpp_core_wp")) return;

	var is_top = true;
	
	ScrollTrigger.create({
		trigger: ".right-content .inner-content",
		id:"mobile_layout",
		start: 'top center',
		end: 30,
		onLeave: function() {

			is_top = false;

			if(!jQuery("body").hasClass("mobile")) return;

			gsap.to(".mobile .left-content",{duration:0.1, zIndex:-2,overwrite: true})
			gsap.to(".mobile .left-content .inner-content",{duration:0.86, opacity:0.25, x:"-75%", rotateY: "50deg", ease:"power3.inOut",zIndex:-2,overwrite: true})
			gsap.to(".mobile .left-content .inner-content .name",{duration:0.4, opacity:0, ease:"power2.inOut",overwrite: true})
	
		},
		onEnterBack: function() {

			is_top = true;

			if(!jQuery("body").hasClass("mobile")) return;

			gsap.to(".mobile .left-content",{duration:0.1, zIndex:2,overwrite: true})
			gsap.to(".mobile .left-content .inner-content",{duration:0.86, opacity:1,  x:"0%", rotateY: "0", ease:"power3.inOut",overwrite: true})
			gsap.to(".mobile .left-content .inner-content .name",{duration:0.4, opacity:1, ease:"power2.inOut",overwrite: true})
			
		},
	}).disable();

	function resize() {

		if(jQuery(window).width() < config_mobile_max_width_for_layout) { 
			
			jQuery("body").addClass("mobile");
			ScrollTrigger.getById("mobile_layout").enable();
			if(is_top) {
				gsap.to(".mobile .left-content",{duration:0.1, zIndex:2,overwrite: true})
				gsap.to(".mobile .left-content .inner-content",{duration:0.86, opacity:1,  x:"0%", rotateY: "0", ease:"power3.inOut",overwrite: true})
				gsap.to(".mobile .left-content .inner-content .name",{duration:0.4, opacity:1, ease:"power2.inOut",overwrite: true})
			
			} else {
				gsap.to(".mobile .left-content",{duration:0.1, zIndex:-2,overwrite: true})
				gsap.to(".mobile .left-content .inner-content",{duration:0.86, opacity:0.25, x:"-75%", rotateY: "50deg", ease:"power3.inOut",zIndex:-2,overwrite: true})
				gsap.to(".mobile .left-content .inner-content .name",{duration:0.4, opacity:0, ease:"power2.inOut",overwrite: true})
	
			}
			
		} else {
			jQuery("body").removeClass("mobile");
			ScrollTrigger.getById("mobile_layout").disable();
			gsap.to(".left-content",{duration:0.1, zIndex:2,overwrite: true})
			if(jQuery(".left-content .inner-content").data("3d") == '"0"') {
				gsap.to(".left-content .inner-content",{duration:0.86, opacity:1,  x:"0%", rotateY: "0deg", ease:"power3.inOut",overwrite: true})
			} else {
				gsap.to(".left-content .inner-content",{duration:0.86, opacity:1,  x:"0%", rotateY: "5deg", ease:"power3.inOut",overwrite: true})
			}
			gsap.to(".left-content .inner-content .name",{duration:0.4, opacity:1, ease:"power2.inOut",overwrite: true})
		}

	} resize();
	window.addEventListener("resize",resize);
 
} 



/** 10. Misc
*******************************************************************/

// Set Colors
if (typeof config_color_scheme !== 'undefined') {
	jQuery("body").addClass("colors_" + config_color_scheme);
}

// Option Panel
function options_panel() {

	if(is_mobile_device) return;
	if (typeof demo_mode_avanzare === 'undefined' || demo_mode_avanzare == 0) return;


	var panel_html = 
	'<div class="open-options-panel noselect"><span class="ti-settings"></span></div>'+
	'<div class="options-panel noselect">'+
		'<div class="panel">'+
			'<div class="headline"><p>Configuration</p><div class="seperator-line m-t-2"></div></div>'+
			'<div class="option-grid m-t-6"></div>'+
		'</div>'+
		'<div class="panel-overlay"></div>'+
		'<span class="ti-close close-button"></span>'+
	'</div>';

	var option_color_html = 
	'<div class="item" id="option-color">'+
		'<p class="tag">COLOR</p>'+
		'<div class="options">'+
			'<div class="option"><div class="color active" data-value="colors_warning_yellow"><div class="bg" style="background-color: #e3af00;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_future_blue"><div class="bg" style="background-color: #1338f3;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_dynamic_red"><div class="bg" style="background-color: #f31313;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_mystic_orange"><div class="bg" style="background-color: #ff6f1e;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_dreamy_turquoise"><div class="bg" style="background-color: #0bc5fc;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_polar_white"><div class="bg" style="background-color: #fff;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_sweet_purple"><div class="bg" style="background-color: #ff99cc;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_eco_green"><div class="bg" style="background-color: #0dd02e;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_acid_green"><div class="bg" style="background-color: #cceb00;"></div></div></div>'+
			'<div class="option"><div class="color" data-value="colors_coated_grey"><div class="bg" style="background-color: #c0c0c0;"></div></div></div>'+
		'</div>'+
	'</div>';

	var option_scrollbar_html = 
	'<div class="item m-t-6" id="option-scrollbar">'+
		'<p class="tag">SCROLLBAR</p>'+
		'<div class="options">'+
			'<div class="option"><div class="button active" data-value="bar"><p class="small">Bar</p></div></div>'+
			'<div class="option"><div class="button" data-value="progress"><p class="small">Progress</p></div></div>'+
			'<div class="option"><div class="button" data-value="default"><p class="small">Default</p></div></div>'+
		'</div>'+
	'</div>';

	var option_hover_html = 
	'<div class="item m-t-6" id="option-hover">'+
		'<p class="tag">HOVER EFFECT ( MAIN IMAGE )</p>'+
		'<div class="options">'+
			'<div class="option"><div class="button active" data-value="tech"><p class="small">Tech</p></div></div>'+
			'<div class="option"><div class="button" data-value="abstract"><p class="small">Abstract</p></div></div>'+
			'<div class="option"><div class="button" data-value="bricks"><p class="small">Bricks</p></div></div>'+
			'<div class="option"><div class="button" data-value="claw"><p class="small">Claw</p></div></div>'+
			'<div class="option"><div class="button" data-value="numbers"><p class="small">Numbers</p></div></div>'+
			'<div class="option"><div class="button" data-value="cult"><p class="small">Cult</p></div></div>'+
			'<div class="option"><div class="button" data-value="pieces"><p class="small">Pieces</p></div></div>'+
			'<div class="option"><div class="button" data-value="waves"><p class="small">Waves</p></div></div>'+
			'<div class="option"><div class="button" data-value="species"><p class="small">Species</p></div></div>'+
		'</div>'+
	'</div>';

	jQuery("body").append(panel_html);
	jQuery(".options-panel .option-grid").append(option_color_html);
	jQuery(".options-panel .option-grid").append(option_scrollbar_html);
	jQuery(".options-panel .option-grid").append(option_hover_html);

	function panel() {

		var tl_panel = gsap.timeline({});
		var lock = false;

		function close() {
			if(lock == 1) return;
			lock = true;
			tl_panel.to(".options-panel .panel",{duration:.5, opacity:0, ease:"power2.inOut"});
			tl_panel.to(".options-panel",{duration:.5, opacity:0, ease:"power2.inOut"});
			tl_panel.set(".options-panel",{ zIndex:-10000});
			tl_panel.to(".open-options-panel",{duration:.2, x:"0", ease:"power1.inOut"});
			tl_panel.call(function(){
				lock = false;
			})
		}

		function open() {
			if(lock == 1) return;
			lock = true;
			tl_panel.to(".open-options-panel",{duration:.2, x:"-100%", ease:"power1.inOut"});
			tl_panel.set(".options-panel",{ zIndex:100});
			tl_panel.to(".options-panel",{duration:.5, opacity:1, ease:"power2.inOut"});
			tl_panel.to(".options-panel .panel",{duration:.5,opacity:1, ease:"power2.inOut"});
			tl_panel.call(function(){
				lock = false;
			})
		}

		jQuery(".open-options-panel").click(open);
		jQuery(".panel-overlay").click(close);
		jQuery(".options-panel .ti-close").click(close);

	} panel();

	function option_colors() {

		var last_color;
		var upcoming_color;

		jQuery(".options-panel .color").on("click",function() {

			last_color = jQuery(".options-panel .color.active").data("value");
			upcoming_color = jQuery(this).data("value")

			jQuery(".options-panel .color").removeClass("active");
			jQuery(this).addClass("active");

			jQuery("body").removeClass(last_color);
			jQuery("body").addClass(upcoming_color);
	
		})

	} option_colors();

	function option_scrollbar() {

		var btn_active = jQuery("#option-scrollbar .button.active").data("value");

		function update(data) {
			switch(data) {
				case "bar":
					jQuery("body").addClass("cursor-hidden");
					gsap.set(".scroll-progress",{opacity:0});
					gsap.set(".scroll-bar",{opacity:1});
				break;
				case "progress":
					jQuery("body").addClass("cursor-hidden");
					gsap.set(".scroll-progress",{opacity:1});
					gsap.set(".scroll-bar",{opacity:0});
				break;
				case "default":
					jQuery("body").removeClass("cursor-hidden");
					gsap.set(".scroll-progress",{opacity:0});
					gsap.set(".scroll-bar",{opacity:0});
				break;default:
			  }
		} 

		
		jQuery("body").addClass("cursor-hidden");

		window.addEventListener("load",function() {
			config_scroll_bar = "progress";
			scroll_bar();
			update(btn_active);
		});

		jQuery("#option-scrollbar .button").on("click", function() {

			btn_active = jQuery(this).data("value");

			jQuery("#option-scrollbar .button.active").removeClass("active");
			jQuery(this).addClass("active");

			update(btn_active);
	
		})

	} option_scrollbar();

}