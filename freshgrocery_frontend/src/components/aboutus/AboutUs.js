import './AboutUs.css'
import img_3 from '../../assets/images/img_5.png'


export const AboutUs = () => {
    const align_center ="mx-auto";
    return(
        <section className="about container-fluid">
            <div className="about_content row d-flex justify-content-around p-4">
                <div className="about_message col-md-6 d-flex justify-content-start">
                    <div className={`pb-2 ${align_center}`}>
                    <h2 className="text-uppercase  h2 ">About us</h2>
                    <div className={`about_underline mx-auto ${align_center}`}></div>
                    </div>
                    
                    <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur elit at bibendum hendrerit. Nam id ornare leo. Vestibulum suscipit finibus aliquam. Morbi cursus id lacus non volutpat. In vel fermentum ex. Duis scelerisque leo eget neque dapibus, ac faucibus lectus dapibus. Proin convallis convallis quam in varius. 
                    Quisque eu sem id erat vulputate varius. Nam eu fermentum orci. Nullam sollicitudin leo sit amet eros ullamcorper viverra ac ac ante. Sed auctor enim est, ac aliquam est gravida faucibus. Quisque lacinia suscipit augue.
                    Sed sed mauris eu arcu bibendum hendrerit eget eget neque. In nec suscipit urna, et venenatis lectus. Praesent auctor dui tellus, varius rutrum lectus feugiat ac. Mauris nec pretium ligula. Nam dui eros, feugiat sit amet dui sed, sollicitudin pharetra odio. Nullam ac mi efficitur, malesuada tortor a, tristique nunc. 
                    Nulla commodo dapibus sollicitudin. Curabitur lorem turpis, aliquam a justo non, blandit commodo lacus. Vivamus egestas convallis fringilla. Fusce eu nibh ligula. Ut vitae accumsan mi. Duis dolor leo, convallis eu sapien eu, aliquam aliquet sem. Aenean ullamcorper placerat purus nec lobortis. Duis porttitor sed leo eu suscipit. Quisque quis leo scelerisque, tempor sem sit amet, aliquam sem.   
                    </p>   
                </div>
                <div className="about_image col-md-6 justify-content-end">
                    <img className="w-100 "src={img_3} alt=""/>
                </div>
            </div>
        </section>
    );
}