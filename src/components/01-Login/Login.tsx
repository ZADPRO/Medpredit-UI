import React, { useRef, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import home3 from "../../assets/images/home3.jpg";

import BACKGROUND02 from "../../assets/images_new/BACKGROUND-02.jpg";
import BACKGROUND_GetStarted from "../../assets/images_new/BACKGROUND_GetStarted.jpg";
import BACKGROUND_Discover from "../../assets/images_new/BACKGROUND_Discover.jpg";
import BACKGROUND_LearnAbout from "../../assets/images_new/BACKGROUND_LearnAbout.jpg";
import BACKGROUND_Effortless from "../../assets/images_new/BACKGROUND_Effortless.jpg";

import "./Login.css";
import { IonContent, IonIcon, IonPage, IonRippleEffect } from "@ionic/react";
import { chevronBackCircle, chevronForwardCircle } from "ionicons/icons";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.decrement();
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === slides.length - 1) {
      history.replace("/enroll");
    } else if (carouselRef.current) {
      carouselRef.current.increment();
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const slides = [0, 1, 2, 4];

  const handleSkip = (route: string) => {
    history.replace(route, {
      direction: "forward",
      animation: "slide",
    });
  };

  return (
    <IonPage>
      {/*<IonContent fullscreen>
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
              <p style={{ marginTop: "10px" }} className="description">
                Take control of your health and choose the right doctor anytime,
                anywhere. Your well-being is our priority!
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
              <p style={{ marginTop: "10px" }} className="description">
                Spend less time on data and more time providing exceptional care
                with our efficient and secure app.
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
                guiding your health journey with expertise and dedication.
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
      </IonContent>*/}

      <IonContent fullscreen>
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
            <div className="loginScreen" style={{ backgroundImage: `url(${BACKGROUND_GetStarted})` }}>
              <h2>Welcome to </h2>
              <h1 className="Medprit">MEDPREDiT</h1>
              <div className="description">
                <p>Thank you for choosing Medpredit !</p>
                <p>
                  Using advanced technology and intelligent algorithms,
                  Medpredit analyzes your medical data to provide real-time
                  insights into your health, conditions, and treatments.
                </p>
              </div>
              <button
                style={{
                  width: "60%",
                  height: "3rem",
                  margin: "2rem 0rem 0rem 0rem",
                  borderRadius: "30px",
                  background: "#fff", // Green for enabled
                  color: "#31cbff", // Lighter text color for disabled
                  fontSize: "20px",
                  fontWeight: "bolder",
                  cursor: "pointer", // Change cursor for disabled
                }}
                className="ion-activatable ripple-parent rectangle"
                onClick={() => goToNextSlide()}
              >
                <IonRippleEffect></IonRippleEffect>
                Get Started
              </button>
            </div>
          </div>
          <div className="carouselDiv">
            <div className="carouselDiv2" style={{ backgroundImage: `url(${BACKGROUND_Discover})` }}>
              {/*<img src={home1} className="carouselImage" />*/}
              <div className="contents">
                <p className="heading">
                  <p>Discover </p> <span>Experienced Doctors</span>
                </p>
                <p className="description">
                  MedPredit makes it easy to find top-rated doctors, read
                  reviews, and book consultations across specialties—all in one
                  app. Take control of your health and choose the right doctor
                  anytime, anywhere. Your well-being is our priority!
                </p>
              </div>

              <div className="carouselNavButtons">
                <button
                  className="skipButton"
                  onClick={() => goToPreviousSlide()}
                >
                  Skip
                </button>
                <button className="nextButton" onClick={() => goToNextSlide()}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="carouselDiv">
            <div className="carouselDiv3" style={{ backgroundImage: `url(${BACKGROUND_LearnAbout})` }}>
              {/*<img src={home2} className="carouselImage" />*/}
              <div className="contents">
                <p className="heading">
                  <p>Learn About</p> <span>Your Doctors</span>
                </p>
                <p className="description">
                  MedPredit simplifies and secures medical data management,
                  reducing administrative tasks so you can focus more on what
                  matters most—your patients. Spend less time on data and more
                  time providing exceptional care with our
                  efficient and secure app.
                </p>
              </div>

              <div className="carouselNavButtons">
                <button
                  className="skipButton"
                  onClick={() => goToPreviousSlide()}
                >
                  Skip
                </button>
                <button className="nextButton" onClick={() => goToNextSlide()}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="carouselDiv">
            <div className="carouselDiv4" style={{ backgroundImage: `url(${BACKGROUND_Effortless})` }}>
              {/* <img src={home3} className="carouselImage" />*/}
              <div className="contents">
                <p className="heading">
                  <p>Effortless </p> <span>Data Maintainence</span>
                </p>
                <p className="description">
                  Explore doctor profiles to review qualifications, specialties,
                  experience, and patient reviews. Make informed decisions about
                  your care, knowing you have trusted healthcare professionals
                  guiding your health journey with expertise and dedication.
                </p>
              </div>

              <div className="carouselNavButtons">
                <button
                  className="skipButton"
                  onClick={() => goToPreviousSlide()}
                >
                  Skip
                </button>
                <button className="nextButton" onClick={() => goToNextSlide()}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </Carousel>

        <div className="carouselButtons">
          <div className="carouselIndicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${currentIndex === index ? "active" : ""
                  }`}
              ></span>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;