import React, { useRef, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import home3 from "../../assets/images/home3.jpg";

import "./Login.css";
import { IonContent, IonIcon, IonPage, IonRippleEffect } from "@ionic/react";
import { chevronBackCircle, chevronForwardCircle } from "ionicons/icons";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const history = useHistory();

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.decrement();
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === slides.length - 1) {
      history.push("/enroll");
    } else if (carouselRef.current) {
      carouselRef.current.increment();
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const slides = [0, 1, 2];

  const handleSkip = (route: string) => {
    history.push(route, {
      direction: "forward",
      animation: "slide",
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="skipButton ">
          <p
            className="ion-activatable ripple-parent rectangle"
            onClick={() => handleSkip("/enroll")}
          >
            <IonRippleEffect></IonRippleEffect>Skip
          </p>
        </div>
        <Carousel
          autoPlay={false}
          infiniteLoop={false}
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
          stopOnHover={false}
          preventMovementUntilSwipeScrollTolerance
          swipeScrollTolerance={50}
          ref={carouselRef}
          onChange={handleSlideChange}
        >
          <div className="carouselDiv">
            <img src={home1} className="carouselImage" />
            <div className="contents">
              <p className="heading">
                Discover <span>Experienced Doctors</span>
              </p>
              <p style={{ textAlign: "center" }} className="description">
                MedPredit makes it easy to find top-rated doctors, read reviews,
                and book consultations across specialties—all in one app.
              </p>
              <p style={{marginTop:"10px"}}  className="description">
              Take
                control of your health and choose the right doctor anytime,
                anywhere. Your well-being is our priority!
              </p>
            </div>
          </div>
          <div className="carouselDiv">
            <img src={home2} className="carouselImage" />
            <div className="contents">
              <p className="heading">
                <span>Learn About</span> <div>Your Doctors</div>
              </p>
              <p className="description">
                MedPredit simplifies and secures medical data management,
                reducing administrative tasks so you can focus more on what
                matters most—your patients.
              </p>
              <p style={{marginTop:"10px"}}  className="description">
                Spend less time on data and more time providing exceptional care
                with our efficient and secure app.
              </p>
            </div>
          </div>
          <div className="carouselDiv">
            <img src={home3} className="carouselImage" />
            <div className="contents">
              <p className="heading">
                <span>Effortless</span> Data Maintainence
              </p>
              <p className="description">
                Explore doctor profiles to review qualifications, specialties,
                experience, and patient reviews. Make informed decisions about
                your care, knowing you have trusted healthcare professionals
                guiding your health journey with expertise and dedication.
              </p>
            </div>
          </div>
        </Carousel>
        <div className="carouselButtons">
          <button
            className="carouselButton"
            onClick={goToPreviousSlide}
            disabled={currentIndex === 0}
          >
            <IonIcon icon={chevronBackCircle}></IonIcon>
          </button>
          <div className="carouselIndicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  currentIndex === index ? "active" : ""
                }`}
              ></span>
            ))}
          </div>
          <button className="carouselButton" onClick={goToNextSlide}>
            <IonIcon icon={chevronForwardCircle}></IonIcon>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
