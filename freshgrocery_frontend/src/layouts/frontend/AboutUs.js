import React from 'react'
import Vmc from './Vmc'


const AboutUs = () => {
  return (
    <div>
      <section className='py-4 bg-success'>
        <div className='container py-6 '>
          <div className='row'>
            <div className='col-md-9 my-auto '>
              <h3 className="display-6 py-6"><u>About Us</u></h3>
            </div>
            <div className='col-md-3 my-auto'>
              <h6 className='float-end fs-4'><u>Home/About Us</u> </h6>
            </div>
          </div>
        </div>

      </section>


      <section className='section bg-light border-bottom my-4'>
        <div className='container '>
          <h5 className='fw-bolder fs-3'><u>Our Company</u></h5>
          <div className='underline'></div>
          <p className='text-center'>
            <b>Fresh Grocery</b> the biggest online shopping mall in Africa and number one Online Shopping website which has Fresh Grocery for all your day to day needs
            ranging from fruits to vegetables such as cabbage at the best affordable prices whose transaction are done online. Enjoy maximum comfort
            by placing order for quality and better health and hygienic groceries .
          </p>
        </div>

      </section>

      {/* Our vision and Mission */}
      <Vmc />
    </div>
  )
}

export default AboutUs