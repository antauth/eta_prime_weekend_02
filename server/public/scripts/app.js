$(document).ready(function(){
	// compile template
	var template = Handlebars.compile($('#students').html());
	// make global carousel var for instantiating and updating later
	var carousel = {};

	/**
	 * Carousel representation.
	 * Handles carousel positions and checks boundary conditions.
	 */
	function Carousel() {
		var carousel = [];
		var prevIndex = 0;
		var currentIndex = 0;
		var nextIndex = 0;

		/**
		 * Initialize the carousel array with data
		 * and indices
		 *
		 * @param {array} an array of data to loop through
		 */
		this.init = function (array) {
			carousel = array;
			prevIndex = array.length > 1 ? array.length-1 : null;
			currentIndex = 0;
			nextIndex = array.length > 1 ? currentIndex + 1 : null; 
		}
		/**
		 * Get the last item in the carousel.
		 *
		 * @return the last item in the carousel
		 */
		this.getLastIndex = function() {
			return carousel.length-1;
		}
		/**
		 * Update the prev, current, and next points.
		 * Advance each by 1. Loop around when boundaries hit.
		 */
		this.advanceCarousel = function() {
			// array boundary cases
			if(prevIndex == null && nextIndex == null) {
				return;
			}
			// prev
			if(prevIndex == this.getLastIndex()) {
				prevIndex = 0;
			} else {
				prevIndex++;
			}
			// next
			if(nextIndex == this.getLastIndex()) {
				nextIndex = 0;
			} else {
				nextIndex++;
			}
			// current
			if(currentIndex == this.getLastIndex()) {
				currentIndex = 0;
			} else {
				currentIndex++;
			}
		}
		/**
		 * Update the prev, current, and next points.
		 * Decrease each by 1. Loop around when boundaries hit.
		 */
		this.reverseCarousel = function() {
			// array boundary cases
			if(prevIndex == null && nextIndex == null) {
				return;
			}
			// prev
			if(prevIndex == 0) {
				prevIndex = this.getLastIndex();
			} else {
				prevIndex--;
			}
			// next
			if(nextIndex == 0) {
				nextIndex = this.getLastIndex();
			} else {
				nextIndex--;
			}
			// current
			if(currentIndex == 0) {
				currentIndex = this.getLastIndex();
			} else {
				currentIndex--;
			}
		}
		/**
		 * Get carousel element at prev index.
		 *
		 * @return carousel element at prev index
		 */
		this.getPrev = function() {
			if (prevIndex == null) {
				return;
			}
			return carousel[prevIndex];
		}
		/**
		 * Get carousel element at current index.
		 *
		 * @return carousel element at current index
		 */
		this.getCurrent = function() {
			return carousel[currentIndex];
		}
		/**
		 * Get carousel element at next index.
		 *
		 * @return carousel element at next index
		 */
		this.getNext = function() {
			if (nextIndex == null) {
				return;
			}
			return carousel[nextIndex];
		}
	}
	/** ----------- LOAD DATA ----------- **/
	$.ajax({
		url: '../data/eta.json'
	}).done(function(json){ // once file is retrieved, do the following
		carousel = new Carousel(); // create a new Carousel object
		carousel.init(json.eta); // populate the carousel with data
		renderCarousel(); 
	});
	/** ----------- CLICK EVENTS ----------- **/
	$('.carousel').on('click', '.prev img', function() {
		carousel.reverseCarousel();
		renderCarousel();
	});
	$('.carousel').on('click', '.next img', function() {
		carousel.advanceCarousel();
		renderCarousel();
	});
	/** ----------- HELPER FUNCTIONS ----------- **/
	/**
	 * Renders prev, current, and next carousel items.
	 */
	function renderCarousel() {
		var context = {prev: carousel.getPrev(), current: carousel.getCurrent(), next: carousel.getNext()};
		$('.carousel').html(template(context));
	}

});