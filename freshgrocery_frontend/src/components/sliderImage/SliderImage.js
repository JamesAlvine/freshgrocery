import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/images/slideshow-1.jpg';
import img2 from '../../assets/images/slideshow-2.jpg';
import img3 from '../../assets/images/slideshow-3.jpg';



const SliderImage = () => {

	return <div>
		<Carousel fade controls={false}>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={img1}
					alt="First slide"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={img2}
					alt="Second slide"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={img3}
					alt="Third slide"
				/>
			</Carousel.Item>
		</Carousel>

	</div>;
}

export default SliderImage;
