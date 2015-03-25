/*
	SuperBox v1.1.0
  by Mike Cohen: http://www.mikecohen.us
  Latest version: https://github.com/snarehanger/superbox

  Based on SuperBox v1.0.0
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/superbox
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	SuperBox, the lightbox reimagined. Fully responsive HTML5 image galleries.
*/
;(function($) {
		
  /*
    options: {
      previewTemplate: selector string (id or class) containing a template for the full image preview,
      images: [] array of image info, one object: { src: '', description: '', name: '', updated: ''}
      button1Text: Text for the first button,
      button1Clicked: Function for the button1 click event
      button2Text: Text for the second button,
      button2Clicked: Function for the button2 click event       
    }
  */
	$.fn.SuperBox = function(options) {
    options = options || {};
    var superbox;
    if(!options.previewTemplate) {
      superbox      = $('<div class="superbox-show"></div>');
      var superboximg   = $('<img src="" class="superbox-current-img">');
      var superboxclose = $('<div class="superbox-close"></div>');
      
      superbox.append(superboximg).append(superboxclose);
    } else {
      superbox = this.find(options.previewTemplate).find('.superbox-show').clone();      
    }

    var container = this;

    var images = [];
    if(options.images) {
      options.images.forEach(function(element, index){
        var superboxItem = $('<div class="superbox-item"><img src="' 
          + element.src + '" data-img="' + element.src + '" alt="' + element.name + '" data-desc="' + element.description 
          + '" data-updated="' + element.updated + '" class="superbox-img"></div>');
        container.find('.superbox-float').before(superboxItem);
      });
    }    
		
		return this.each(function() {
			
			$('.superbox-item').click(function() {

        $('.superbox-item').removeClass('superbox-selected');
        $(this).addClass('superbox-selected');
		
				var currentimg = $(this).find('.superbox-img');
				var imgData = currentimg.data('img');
        var imgName = currentimg.attr('alt') || '';
        var imgDesc = currentimg.data('desc') || '';
        var imgUpdated = currentimg.data('updated') || '';
				$(superbox).find('img').attr('src', imgData);
        $(superbox).find('.superbox-heading').text(imgName);
        $(superbox).find('.superbox-img-url').text(imgData);
        $(superbox).find('.superbox-img-info').text(imgDesc);
				$(superbox).find('.superbox-updated').text(imgUpdated);

        var button1 = $(superbox).find('.superbox-btn-1');
        if(button1.length > 0 && options.button1Clicked) {
          button1.text(options.button1Text || 'Button 1');
          button1.click(options.button1Clicked);
        }

        var button2 = $(superbox).find('.superbox-btn-2');
        if(button2.length > 0 && options.button2Clicked) {
          button2.text(options.button2Text || 'Button 2');
          button2.click(options.button2Clicked);
        }     

				if($('.superbox-current-img').css('opacity') == 0) {
					$('.superbox-current-img').animate({opacity: 1});
				}
				
				if ($(this).next().hasClass('superbox-show')) {
					$(superbox).toggle();
				} else {
					$(superbox).insertAfter(this).css('display', 'block');
				}
				
				$('html, body').animate({
					scrollTop:$(superbox).position().top - currentimg.width()
				}, 'medium');
			
			});
						
			$('.superbox').on('click', '.superbox-close', function() {
				$('.superbox-current-img').animate({opacity: 0}, 200, function() {
					$('.superbox-show').slideUp();
				});
			});
			
		});
	};
})(jQuery);