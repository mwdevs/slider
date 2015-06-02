var index = 1;		
var nextSlide = 2;

$(document).ready(function() {
	$('#slider>img#1').fadeIn(500);

	startLoop();

});

//init
function startLoop() {

	//how many images in slider to know where to start/end
	counter= $('#slider>img').size();							
	//interval to set loop for images @ number of m/s (4500)
	loop= setInterval(function(){								
		//check to see if the next img not available, resets to beginning
		if(nextSlide > counter) {
			nextSlide = 1
			index = 1
		}

		$('#slider>img').fadeOut(500); //fades out all images
		$('#slider>img#' + nextSlide).fadeIn(500); //uses nextSlide to choose next image to fade in, # + nextSlide gives ID of img

		index = nextSlide; //creates loop by setting 'index' to 'next'
		nextSlide = nextSlide + 1; //updates next on list to give next slide

	}, 4500)
}

//listeners for user control buttons (TO DO: figure out why jquery solution won't work, also look for solution that doesn't use HTML event handler)

$("#prev").on('click', function() { 

	newSlide= index -1;
	showSlide(newSlide); 
});

var prevButton = document.getElementById("prev");	//DOM handler
prevButton.addEventListener('click', prev(), false);

prevButton.onclick= prev;		//other type of DOM handler

function prev() {
	newSlide= index -1;
	showSlide(newSlide);
}

//same thing but for 'next'
$("#next").on('click', function() {

	newSlide= index +1; 
	showSlide(newSlide);
});

var nextButton = document.getElementById("next");
nextButton.addEventListener('click', next(), false);

nextButton.onclick= next;

function next() {
	newSlide= index +1;
	showSlide(newSlide);
}

//freeze image slide on hover
$('#slider>img').mouseenter(

	function(){
		stopLoop();
	},

	function() {
		startLoop();
	}); 

//'loop' is an interval, stops if controls activated/for other fucntions, like hover 
function stopLoop() {
	window.clearInterval(loop);
}

//showSlide function for if user controls activated
function showSlide(key) {
	stopLoop(); //first stop loop to prevent skipping

	if(key > counter) {
			key = 1;
		}

	else if(key < 1) {
			key = counter; 
		}

	$('#slider>img').fadeOut(500); 
	$('#slider>img#' + key).fadeIn(500); 

	index = key;
	nextSlide = key + 1; 
	startLoop(); //to restart slider if controls used
}
