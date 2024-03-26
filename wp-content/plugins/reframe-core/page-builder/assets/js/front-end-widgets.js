(function ($) {
	"use strict";

	/* Init Elementor Front Scripts */
	$(window).on( 'elementor/frontend/init', function () {

		// Widget [ ACCORDION ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_accordion.default', function() {

			jQuery( ".accordion:not(.js-added)" ).each(function() {

				var el = $(this);

				el.addClass("js-added")
				
				el.accordionjs({
					activeIndex : 999,
				});


			});

		} );

		// Widget [ PRICING CARD ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_pricing_extended.default', function() {

			jQuery( ".pricing-accordion:not(.js-added)" ).each(function() {

				var el = $(this);

				el.addClass("js-added")

				el.accordionjs({
					slideSpeed  : 200,
					activeIndex : false,
				});

			});

		} );

		// Widget [ TESTIMONIALS ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_testimonial_carousel.default', function() {
			
			jQuery( ".testimonial-carousel:not(.js-added)" ).each(function() {

				var el = $(this);

				el.addClass("js-added")
				
				window.addEventListener("resize",function(){
					set_button_position("current");	
				})
				
				el.on("beforeChange", function(event, slick, currentSlide, nextSlide){
					set_button_position(nextSlide);
				});
			
				el.on("afterChange", function(event, slick, currentSlide, nextSlide){
					ScrollTrigger.refresh()
				});

				el.on("init", function(slick){
					set_button_position(0);
				});

				el.on("init", function(slick){
					set_button_position(0);
				});
			
				el.slick({
					dots: false,
					infinite:  el.data("infinite"),
					speed: el.data("speed"),
					draggable: el.data("draggable"),
					centerMode: true,
					variableWidth: false,
					nextArrow:'<div class="icon-button arrow-next"><span class="ti-arrow-right"></span></div>',
					prevArrow:'<div class="icon-button arrow-prev"><span class="ti-arrow-left"></span></div>',
					arrows: el.data("arrows"),
					edgeFriction: 0.5,
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					cssEase: 'ease'
				});

				function set_button_position(num) {

					if(num =="current") { num = el.slick("slickCurrentSlide"); }
					el.find(".arrow-next").css("top", el.find(".item").eq(num).find(".quote").outerHeight() );
			
				} set_button_position(0);

			});
			
		} );

		// Widget [ PORTFOLIO ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_portfolio.default', function() {
			
			function generate_lightbox_html(content){

				var markup = '<div id="glightbox-body" class="glightbox-container">'
					+'<div class="gloader visible"></div>'
					+'<div class="goverlay"></div>'
					+'<div class="gcontainer">'
						+'<div class="info"><div class="info-container">' + content + '</div></div><div class="info-overlay"></div>'
						+'<div id="glightbox-slider" class="gslider"></div>'
						+'<div class="info-button"><div class="icon-button"><span class="ti-info"></span></div></div>'
						+'<button class="gnext gbtn" tabindex="0" aria-label="Next"><span class="ti-arrow-right"></span></button>'
						+'<button class="gprev gbtn" tabindex="1" aria-label="Previous"><span class="ti-arrow-left"></span></button>'
						+'<button class="gclose gbtn" tabindex="2" aria-label="Close"><span class="ti-close"></span></button>'
					+'</div>'
				+'</div>'
		
				return markup;
		
			}

			$(".work-lightbox:not(.js-added)").each(function(){

				$(this).addClass("js-added");

				// Set lightbox instance
				var lightbox = GLightbox({
					touchNavigation: true,
					loop: false,
					preload: true,
					zoomable: false,
					closeOnOutsideClick: false,
					lightboxHTML: generate_lightbox_html( $(this).find(".info-content").html() ),
				});
		
		
				// Add slides to lightbox
				$( $(this).find(".lightbox-images .item") ).each(function(){
		
					var url = $(this).data("image");
		
					lightbox.insertSlide({
						'href': url,
						'type': 'image',
						'zoomable': false,
					});
		
				});
		
				// Do on lightbox opening
				lightbox.on('open', function () {
			
					var block = false;
					var info_open = false;
					var info_tl = gsap.timeline();

					function menu_controller() {

						if (block == true) return;
						block = true;
					
						if (info_open) {
							$(".glightbox-container .info-button span").removeClass("ti-close").addClass("ti-info");
							info_tl.clear();
							info_tl.set(".gcontainer .gbtn",{display:"block"});
							info_tl.to(".gcontainer .info .info-container",{duration: 0.2, opacity: 0, ease: "power1.in"});
							info_tl.to(".gcontainer .info",{duration: 0.7, x: "-100%", ease: "power4.inOut"});
							info_tl.to(".gcontainer .info-overlay",{duration: 0.4, opacity: 0, ease: "none"},"<");
							info_tl.set(".gcontainer .info-overlay",{ left: "100%"});
							info_tl.eventCallback("onComplete", function(){
								block = false;
								info_open = false;
							});
							
						} else {
							$(".glightbox-container .info-button span").removeClass("ti-info").addClass("ti-close");
							info_tl.clear();
							info_tl.set(".gcontainer .gbtn",{ display:"none"});
							info_tl.set(".gcontainer .info-overlay",{ left:"0"});
							info_tl.to(".gcontainer .info-overlay",{duration: 0.4, opacity: 1, ease: "none"});
							info_tl.to(".gcontainer .info",{duration: 0.7, x:"0%", ease: "power4.out"}, "0");
							info_tl.to(".gcontainer .info .info-container",{duration: 0.3, opacity: 1, ease: "power1.out"},"-=0.6");
							info_tl.eventCallback("onComplete", function(){
								block = false;
								info_open = true;
							});
						}

					}

					$(".glightbox-container .info-overlay").on('click touchend', function () {
						menu_controller();
					});
			
					$(".glightbox-container .info-button").on('click touchend', function () {
						menu_controller();
					});

					$(".gcontainer").on('click touchend', function(e){

						if($(e.target).closest('.gcontainer .info').length > 0) return;
						if($(e.target).closest('.gcontainer .info-button').length > 0) return;
						if($(e.target).closest('.gcontainer .info-overlay').length > 0) return;
						if($(e.target).closest('.gcontainer .gslide-media').length > 0) return;
						if($(e.target).closest('.gcontainer .gbtn').length > 0) return;
						lightbox.close();
					});  
	
			
				});

				// Open lightbox on item click
				$(this).on("click",function(){
					lightbox.open();
				});


				
				
		
			});

		} );


		// Widget [ CONTACT FORM ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_contact_form.default', function() {

			jQuery( ".contact-form:not(.js-added)" ).each(function() {

				var form = $(this);

				form.addClass("js-added")
				
				form.submit(function(e) {

					e.preventDefault();

					var postdata = form.serializeArray();
					postdata.push({name: 'target_mail', value: form.data("targetmail") });

					jQuery.ajax({
						type: "POST",
						url: form.attr("action"),
						data: postdata,
						dataType: "json",
						success: function(json) {
							
							form.find(".error").removeClass("error");
							
							setTimeout(function(){
								if (json.nameMessage !== "") {
									form.find("input[name='name']").addClass("error");
								}
								if (json.emailMessage !== "") {
									form.find("input[name='email']").addClass("error");
								}
								if (json.messageMessage !== "") {
									form.find("textarea[name='message']").addClass("error");
								}
							}, 25);
								
							if (json.succesMessage !== "") {
								form.addClass("success");
								form.find(".button-area").css("display","none");
								form.find("input").val("").prop("disabled", true);
								form.find("textarea").val("").prop("disabled", true); 
								form.find("button").val("").prop("disabled", true);
							}
						}
				
					});

				});

			});
			
		} );

		// Widget [ TESTIMONIALS ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_carousel.default', function() {
			
			$( ".image-carousel:not(.js-added)" ).each(function() {

				var el = $(this);
				
				el.addClass("js-added")

				function get_bl(data) { 
					if(data == "true" || data == true) return true; 
					 return false;
				}
			
				el.slick({
					dots: false,
					infinite: get_bl(el.data("infinite")),
					speed: el.data("speed"),
					draggable: get_bl(el.data("draggable")),
					centerMode: true,
					variableWidth: false,
					nextArrow:'<div class="icon-button arrow-next"><span class="ti-arrow-right"></span></div>',
					prevArrow:'<div class="icon-button arrow-prev"><span class="ti-arrow-left"></span></div>',
					arrows: get_bl(el.data("arrows")),
					edgeFriction: el.data("friction"),
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: get_bl(el.data("animation")),
					cssEase: 'ease'
				});

			});
			
		} );

		// Widget [ TABS ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_tabs.default', function() {

			$( ".tabs" ).each(function() {

				var el = $(this);

				el.addClass("js-added")

				function get_bl(data) { 
					if(data == "true" || data == true) return true; 
					 return false;
				}

				el.tabslet({
					mouseevent:   'click',
					attribute:    'href',
					animation:    get_bl(el.data("animation")),
					autorotate:   false,
					deeplinking:  false,
					pauseonhover: true,
					delay:        400,
					active:       1,
					container: '.tab-content',
				});

			});
			
		} );

		// Widget [ Video ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_video.default', function() {

			var video_players = Array.prototype.slice.call(document.querySelectorAll('.video-player'))

			video_players.forEach(function(player){

				var video = player.querySelectorAll('video')[0];
				var fullscreen_btn =  player.querySelectorAll('.fullscreen-btn')[0];
				var toggle_btn =  player.querySelectorAll('.toggle-btn')[0];
				var progress_bar =  player.getElementsByClassName('progress-bar')[0];
				var progress_bar_fill =  progress_bar.getElementsByClassName('fill')[0];
				var icon = toggle_btn.querySelector("span");
				var block_hide = false;

				var progress;

				function update_progress(percent) {
					gsap.to( progress_bar_fill, { css:{ width:percent +"%" },duration: 0.05, overwrite: true, ease: "none" } );
				}

				function update_btn_icon(state){
					if(state == "play") {
						icon.classList.remove('ti-control-pause');
						icon.classList.add('ti-control-play');
					} else {
						icon.classList.remove('ti-control-play');
						icon.classList.add('ti-control-pause');
					}
				}

				function hide_ui() {
					block_hide = false;
					setTimeout(function(){
						if(block_hide == true || video.paused) return;
						player.classList.add('hide-ui')
					},1800);
				}

				function show_ui() {
					player.classList.remove('hide-ui')
					block_hide = true;
				}

				function secondary_controls(request) {
					if(request == "hide") { player.classList.add('hide-secondary-controls') }
					if(request == "show") { player.classList.remove('hide-secondary-controls') }
				}

				player.addEventListener('mouseleave', hide_ui);
				player.addEventListener('mouseenter', show_ui);

				video.addEventListener('timeupdate',function(){
					progress = video.currentTime / (video.duration/100);
					update_progress(progress);
				},false);

				video.addEventListener('ended',function(){
					update_btn_icon("play");
					show_ui();
					secondary_controls("hide");
				},false);

				video.addEventListener('play',function(){
					secondary_controls("show");
				},false);

				toggle_btn.addEventListener("click", function(){
					if (video.paused) {
						video.play();
						update_btn_icon("pause");

					} else { 
						video.pause();
						update_btn_icon("play");
					}
				});

				fullscreen_btn.addEventListener("click", function(){
					if (video.mozRequestFullScreen) {
						video.mozRequestFullScreen();
					} else if (video.webkitRequestFullScreen) {
						video.webkitRequestFullScreen();
					}  
				});

				progress_bar.addEventListener("click", function(e){
					video.play();
					update_btn_icon("pause");
					var click_position = e.pageX - this.getBoundingClientRect().x;
					video.currentTime = click_position / ( progress_bar.offsetWidth / 100) * (video.duration / 100)
				});

			})
			
		} );

		// Widget [ Audio ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_audio.default', function() {

			var audio_players = Array.prototype.slice.call(document.querySelectorAll('.audio-player'))

			audio_players.forEach(function(player){

				var audio = player.querySelectorAll('audio')[0];
				var toggle_btn =  player.querySelectorAll('.toggle-btn')[0];
				var progress_bar =  player.getElementsByClassName('progress-bar')[0];
				var progress_bar_fill =  progress_bar.getElementsByClassName('fill')[0];
				var icon = toggle_btn.querySelector("span");

				var progress;

				function update_progress(percent) {
					gsap.to( progress_bar_fill, { css:{ width:percent +"%" },duration: 0.05, overwrite: true, ease: "none" } );
				}

				function update_btn_icon(state){
					if(state == "play") {
						icon.classList.remove('ti-control-pause');
						icon.classList.add('ti-control-play');
					} else {
						icon.classList.remove('ti-control-play');
						icon.classList.add('ti-control-pause');
					}
				}

				audio.addEventListener('timeupdate',function(){
					progress = audio.currentTime / (audio.duration/100);
					update_progress(progress);
				},false);

				audio.addEventListener('ended',function(){
					update_btn_icon("play");
				},false);

				toggle_btn.addEventListener("click", function(){
					if (audio.paused) {
						audio.play();
						update_btn_icon("pause");

					} else { 
						audio.pause();
						update_btn_icon("play");
					}
				});

				progress_bar.addEventListener("click", function(e){
					audio.play();
					update_btn_icon("pause");
					var click_position = e.pageX - this.getBoundingClientRect().x;
					audio.currentTime = click_position / ( progress_bar.offsetWidth / 100) * (audio.duration / 100)
				});

			})
			
		} );


		// Widget [ ONE PAGE MENU ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_one_page_menu.default', function() {

			if( $(".menu-content-data").length > 1 ) {
				alert("__Error: You can not use 2 ( or more ) Reframe One Page Menus on the same page."); 
				return;
			}

			$(".m-menu .m-menu-inner").children().remove();
			$(".menu-content-data").children().appendTo(".m-menu .m-menu-inner");

			function menu_display_current_postion() {

				var sections = Array.prototype.slice.call(document.querySelectorAll('.elementor-section'));

				function remove_is_active() { 
					$('.m-menu .main-items .scroll-to').removeClass("is-active"); 
				}

				sections.forEach(function (section, index) {

					if(section.id === "") return;
					
					var trigger = ScrollTrigger.getById(section.id);
					if(trigger != undefined) trigger.kill();
					
					ScrollTrigger.create({
					trigger: section,
					id: section.id,
					start: 'top center',
					end: function end() {
						return "+=".concat(section.clientHeight - 30);
						
					},
					toggleActions: 'play reverse none reverse',
					toggleClass: {
						targets: section,
						className: "is-active"
					},
					onToggle: function() {
						remove_is_active();
						if (section.id != "") $('.m-menu .main-items .scroll-to[data-target*="#' + section.id + '"]').addClass("is-active");

					},
					onLeaveBack: remove_is_active,
					onLeave: remove_is_active,
					});

				});

			} menu_display_current_postion();

		} );

		// Widget [ SCROLL INDICATOR ]
		elementorFrontend.hooks.addAction( 'frontend/element_ready/rfpp_scroll_indicator.default', function() {

			if( $(".scroll-indicator-content").length > 1 ) {
				alert("__Error: You can not use 2 ( or more ) Reframe Scroll Indicator on the same page."); 
				return;
			}

			$(".provoke-scroll-bottom").children().remove();
			$(".scroll-indicator-content").children().appendTo(".provoke-scroll-bottom");

			var trigger = ScrollTrigger.getById('scroll_indicator');
			if(trigger != undefined) trigger.kill();

			ScrollTrigger.create({
				trigger: ".right-content .inner-content",
				start: 'top center',
				id: 'scroll_indicator',
				end: 30,
				toggleClass: {targets: ".provoke-scroll-bottom", className: "is-active"},
			})
		
			var tl_animation_fill = gsap.timeline({ repeat: -1 });
		
			tl_animation_fill.to(".provoke-scroll-bottom .fill .inner",{duration:1.3, top:"100%", ease:"power4.inOut"});
			tl_animation_fill.set(".provoke-scroll-bottom .fill .inner",{ top:"-100%"});
			tl_animation_fill.to(".provoke-scroll-bottom .fill .inner",{duration:1.3, top:"0%", ease:"power4.inOut"});
		

		} );

		var elementor_widgets_init = 0;

		function on_first_widget_init() {

			if(elementor_widgets_init !== 0) return;

			scroll_bar();

			setInterval(function(){ 

				if( jQuery(".widget-one-page-nav").length ) {
					jQuery(".m-menu-button").removeClass("is-visble");
				} else {
					jQuery(".m-menu-button").addClass("is-visble");
				}

				if( jQuery(".scroll-indicator-content").length ) {
					jQuery(".provoke-scroll-bottom").removeClass("is-visible");
				} else {
					jQuery(".provoke-scroll-bottom").addClass("is-visible");
				}

			}, 1100);

			elementor_widgets_init = 1;

		}

		// Global
		elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {} );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', function( $scope ) {
			on_first_widget_init();
		} );
		
	});

})(jQuery);