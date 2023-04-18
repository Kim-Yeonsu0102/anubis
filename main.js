console.clear();


document.addEventListener("DOMContentLoaded", function(){


  gsap.registerPlugin(ScrollTrigger);
  // ScrollTrigger.addEventListener("refresh", () => {
  //   console.log('refresh')
  // })
  // let mobile = window.matchMedia('(max-width: 1023px)').matches



const COUNT = 75;
const REPEAT_COUNT = 3;

const capture = document.querySelector("#capture");

function createCanvases(captureEl) {
	html2canvas(captureEl).then((canvas) => {
		const width = canvas.width;
		const height = canvas.height;
		const ctx = canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, width, height);
		let dataList = [];
		captureEl.style.display = "none";

		for (let i = 0; i < COUNT; i++) {
			dataList.push(ctx.createImageData(width, height));
		}

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				for (let l = 0; l < REPEAT_COUNT; l++) {
					const index = (x + y * width) * 4;
					const dataIndex = Math.floor(
						(COUNT * (Math.random() + (2 * x) / width)) / 3
					);
					for (let p = 0; p < 4; p++) {
						dataList[dataIndex].data[index + p] = imageData.data[index + p];
					}
				}
			}
		}

		dataList.forEach((data, i) => {
			let clonedCanvas = canvas.cloneNode();
			clonedCanvas.getContext("2d").putImageData(data, 0, 0);
			clonedCanvas.className = "capture-canvas";
			document.body.appendChild(clonedCanvas);

			const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
			const randomRotationAngle = 30 * (Math.random() - 0.5);

			let tl = gsap.timeline({
				scrollTrigger: {
					scrub: 1,
					start: () => 0,
					end: () => window.innerHeight * 2
				}
			});

			tl.to(clonedCanvas, {
				duration: 1,
				rotate: randomRotationAngle,
				translateX: 40 * Math.sin(randomAngle),
				translateY: 40 * Math.cos(randomAngle),
				opacity: 0,
				delay: (i / dataList.length) * 2
			});
		});
	});
}

const images = gsap.utils.toArray("img");

imagesLoaded(images).on("always", () =>{
  createCanvases(capture)
});





var sc1 = gsap.timeline({
  scrollTrigger: { 
    trigger: ".remember" ,
    start: "center center ", 
    scrub:true,
    pin:true,
    end:"+=6000",
    // markers: true
  }})
  .to('.remember',{
    opacity:0,
    autoAlpha:0,
    duration:10
  })
  .to('.remember',{
    opacity:1,
    autoAlpha:1,
    duration:6
  })
  .to('.remember .w',{
    opacity:1,
    autoAlpha:1,
    duration:6

  })

  .to('.remember .w ',{
    opacity:0,
    autoAlpha:0,
    duration:10
  
  })



})
