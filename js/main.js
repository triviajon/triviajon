/* ©2014 - 2021 CodyHouse. A project by @romano_cla and @guerriero_se */

jQuery(document).ready(function($){
	//define store some initial variables
	var	halfWindowH = $(window).height()*0.5,
		halfWindowW = $(window).width()*0.5,
		//define a max rotation value (X and Y axises)
		maxRotationY = 5,
		maxRotationX = 3,
		aspectRatio;

	//detect if hero <img> has been loaded and evaluate its aspect-ratio
	$('.vis-floating-background').find('img').eq(0).load(function() {
		aspectRatio = $(this).width()/$(this).height();
  		if( $('html').hasClass('preserve-3d') ) initBackground();
	}).each(function() {
		//check if image was previously load - if yes, trigger load event
  		if(this.complete) $(this).load();
	});
	
	//detect mouse movement
	$('.vis-background-wrapper').each(function(){
		$(this).on('mousemove', function(event){
			var wrapperOffsetTop = $(this).offset().top;
			if( $('html').hasClass('preserve-3d') ) {
				window.requestAnimationFrame(function(){
					moveBackground(event, wrapperOffsetTop);
				});
			}
		});
	});

	//on resize - adjust .vis-background-wrapper and .vis-floating-background dimentions and position
	$(window).on('resize', function(){
		if( $('html').hasClass('preserve-3d') ) {
			window.requestAnimationFrame(function(){
				halfWindowH = $(window).height()*0.5,
				halfWindowW = $(window).width()*0.5;
				initBackground();
			});
		} else {
			$('.vis-background-wrapper').attr('style', '');
			$('.vis-floating-background').attr('style', '').removeClass('is-absolute');
		}
	});

	function initBackground() {
		var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio), 
			proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
			newImageWidth = Math.ceil(halfWindowW*2*proportions),
			newImageHeight = Math.ceil(newImageWidth/aspectRatio),
			newLeft = halfWindowW - newImageWidth/2,
			newTop = (wrapperHeight - newImageHeight)/2;

		//set an height for the .vis-background-wrapper
		$('.vis-background-wrapper').css({
			'height' : wrapperHeight,
		});
		//set dimentions and position of the .vis-background-wrapper		
		$('.vis-floating-background').addClass('is-absolute').css({
			'left' : newLeft,
			'top' : newTop,
			'width' : newImageWidth,
		});
	}

	function moveBackground(event, topOffset) {
		var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
			yPosition = event.pageY - topOffset,
			rotateX = ((yPosition-halfWindowH)/halfWindowH)*maxRotationX;

		if( rotateY > maxRotationY) rotateY = maxRotationY;
		if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
		if( rotateX > maxRotationX) rotateX = maxRotationX;
		if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

		$('.vis-floating-background').css({
			'-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
		    '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
		});
	}
});

/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
	https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
  var element = document.createElement('p'),
      html = document.getElementsByTagName('html')[0],
      body = document.getElementsByTagName('body')[0],
      propertys = {
        'webkitTransformStyle':'-webkit-transform-style',
        'MozTransformStyle':'-moz-transform-style',
        'msTransformStyle':'-ms-transform-style',
        'transformStyle':'transform-style'
      };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style") ||
                    st.getPropertyValue("-moz-transform-style") ||
                    st.getPropertyValue("-ms-transform-style") ||
                    st.getPropertyValue("transform-style");

    if(transform!=='preserve-3d'){
      html.className += ' no-preserve-3d';
    } else {
    	html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();

$("img.github").click(function(){
	window.location.href = "https://github.com/triviajon/";
});

$("img.linkedin").click(function(){
	window.location.href = "https://www.linkedin.com/in/jon-rosario-6330741b2/";
});

$("img.email").click(function(){
	window.location.href = "mailto:theli@mit.edu";
});

$("img.resume").click(function(){
	window.location.href = "content/resume.pdf";
});

document.body.style.cursor = 'none';

$('img').on('dragstart', function(event) { event.preventDefault(); });


var cursor = document.getElementById('cursor');
document.addEventListener('mousemove', function(e) {
    e.stopPropagation();
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
});