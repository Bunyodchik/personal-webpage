const slides = document.querySelector('.slides');

//FETCH DATA FROM JSON
fetch('data.json')
	.then((res) => res.json())
	.then((data) => {
		slides.innerHTML = data.map(
			(item) => `
    	  <img
    			src=${item.url}
    			alt=${item.description}
    			class="slide"
    		/>
    `
		);

		//INITIALIZE TIMER FOR CAROUSEL
		const delay = 3000; //ms

		const slidesCount = slides.childElementCount;
		const maxLeft = (slidesCount - 1) * 100 * -1;

		let current = 0;

		//CHANGE SLIDE FUNCTION
		function changeSlide(next = true) {
			if (next) {
				current += current > maxLeft ? -100 : current * -1;
			} else {
				current = current < 0 ? current + 100 : maxLeft;
			}

			slides.style.left = current + '%';
		}

		// AUTOCHANGE FUNCTION
		let autoChange = setInterval(changeSlide, delay);
		const restart = function () {
			clearInterval(autoChange);
			autoChange = setInterval(changeSlide, delay);
		};

		// CONTROL BUTTONS
		document
			.querySelector('.next-slide')
			.addEventListener('click', function () {
				changeSlide();
				restart();
			});

		document
			.querySelector('.prev-slide')
			.addEventListener('click', function () {
				changeSlide(false);
				restart();
			});
	});
