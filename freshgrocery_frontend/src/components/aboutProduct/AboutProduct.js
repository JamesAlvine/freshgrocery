import React from 'react';

import './AboutProduct.css';

const AboutProduct = () => {
    return <div className="about-product">
        <div className="container py-5">
            <div className="row">
                <div className="col-md-12 text-center about-product-title">
                    <h3>About our products</h3>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center py-4">
                    <div className="col-md-8 ">
                    <p className="fw-bold fs-5">
                        Our products include vegetables, Fruits, legumes an cereals. 
                        For the vegetables and fruits we havest the some few minutes 
                        before delivery, if your delivery distance is long we will user
                        various presevation method like plastic bags and placing them in
                        the refrigirator. As for the legumes and cereals it always be havested
                        some days before delivery and delivered to your desired location. All our
                        products stay fresh for a long time even after delivery depending on your 
                        methods of preservation.
                    </p>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>;
}

export default AboutProduct;
