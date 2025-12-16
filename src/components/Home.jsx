import HeroBanner from "./HeroBanner";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DebtTracker from "./DebtTracker";
import Banner from "./Banner";
import Plans from "./Plans";
import EnrollmentForm from "./EnrollmentForm";
import Sponsers from "./Sponsers";
import Faq from "./Faq";
import Working from "./Working";
import Reviews from "./Reviews";

export default function Home() {
  return (
    <div className="mb-20">
      <div id="home">
        <HeroBanner />
      </div>
      <div id="how-it-works">
        <HeroSection />
      </div>
      <div id="benefits">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <Working />
      </div>
      <div id="track-rewards">
        <DebtTracker />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <Banner />
      <div id="plans">
        <Plans />
      </div>
      <div id="enrollment-form">
        <EnrollmentForm />
      </div>
      <div id="reviews">
        <Sponsers />
      </div>
      <Faq />
    </div>
  );
}
