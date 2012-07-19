$(document).ready(function() {
    var curindex = 0;
    var length = 0;

    $('.gallery').each(function() {
	var thegallery = $(this);
	var left = thegallery.children('.left');
	var right = thegallery.children('.right');
	var viewport = thegallery.children('.viewport');
	var thelist = viewport.children('ul');
	length = thelist.children('li').length;

	var clonefirst = thelist.children('li').first().clone();
	var clonelast = thelist.children('li').last().clone();

	left.css('top', ((thegallery.height() - left.height()) / 2) + 'px');
	right.css('top', ((thegallery.height() - left.height()) / 2) + 'px');
	left.css('left', '-' + (left.width() / 2) + 'px');
	right.css('right', '-' + (right.width() / 2) + 'px');

	thelist.prepend(clonelast);
	thelist.append(clonefirst);

	list_set(thelist, viewport.width(), 1);

	right.click(function() {
	    list_shift_to(thelist, viewport.width(), curindex + 1);
	});
	left.click(function() {
	    list_shift_to(thelist, viewport.width(), curindex - 1);
	});

    });

    function list_set_element(elem, width, counter)
    {
	elem.css('left', (width * counter) + 'px');
	elem.css('top','0px');
	elem.css('width',width + 'px');	
    }

    function list_set(ul, width, index)
    {
	counter = -1 * index;
	ul.children('li').each(function() {
	    list_set_element($(this),width,counter);
	    counter = counter + 1;
	});

	curindex = index;
    }

    function list_shift_to(ul, width, index)
    {
	counter = -1 * index;
	ul.children('li').each(function() {
	    $(this).animate({
		left: (width*counter)+'px',
		top: '0px',
		width: width + 'px'
	    }, 400 ,function() {
		if(index == 0)
		{
		    list_set(ul, width, length);
		} else if(index == length+1)
		{
		    list_set(ul,width, 1);
		}
	    });
	    counter = counter + 1;
	    first = false;
	});

	curindex = index == -1 ? length : index;
    }
});
