"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Reviews = () => {
  const reviews = [
    {
      title: "Finance Officer",
      subtitle: "District",
      text: "Our school became Lunch Money Certified in under 90 days.",
      image: "/assets/review.png"
    },
    {
      title: "Cedar Ridge Elementary",
      subtitle: "Principal",
      text: "Lunch Money helped us eliminate every unpaid meal in our district. Students no longer fear the lunch line.",
      image: "/assets/review.png"
    },
    {
      title: "Manager",
      subtitle: "Cafeteria",
      text: "We finally stopped lunch shaming. Kids get the food they deserve, every day.",
      image: "/assets/review.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleReviews = () => {
    const prevIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
    return [reviews[prevIndex], reviews[currentIndex], reviews[nextIndex]];
  };

  const visibleReviews = getVisibleReviews();

  return (
    <div className="min-h-[600px] sm:min-h-[700px] md:min-h-[800px] py-10 sm:py-16 md:py-20 grid grid-rows-[auto_1fr] archivo-font relative px-4 sm:px-6 md:px-8">
      <div className="font-[700] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] text-center mb-6 sm:mb-8 md:mb-0">
        <p>
          What <span className="text-[#FF8823]">Schools</span> Are
        </p>
        <p>Saying</p>
      </div>

      {/* buttons - hidden on mobile, show on tablet+ */}
      <div className="hidden md:flex justify-between w-full absolute bottom-[200px] md:bottom-[250px] lg:bottom-[300px] left-0 px-8 md:px-16 lg:px-[200px] z-10">
        <div 
          onClick={handlePrev}
          className="cursor-pointer bg-[#FF8823] rounded-full p-2 w-[50px] h-[50px] md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px] flex items-center justify-center hover:bg-[#ff9940] transition-colors"
        >
          <ChevronLeft className="text-white" size={24} />
        </div>
        <div 
          onClick={handleNext}
          className="cursor-pointer bg-[#FF8823] rounded-full p-2 w-[50px] h-[50px] md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px] flex items-center justify-center hover:bg-[#ff9940] transition-colors"
        >
          <ChevronRight className="text-white" size={24} />
        </div>
      </div>

      {/* Mobile buttons */}
      <div className="md:hidden flex justify-between lg:justify-center gap-4 mb-6">
        <div 
          onClick={handlePrev}
          className="cursor-pointer bg-[#FF8823] rounded-full p-2 w-[50px] h-[50px] flex items-center justify-center hover:bg-[#ff9940] transition-colors"
        >
          <ChevronLeft className="text-white" size={24} />
        </div>
        <div 
          onClick={handleNext}
          className="cursor-pointer bg-[#FF8823] rounded-full p-2 w-[50px] h-[50px] flex items-center justify-center hover:bg-[#ff9940] transition-colors"
        >
          <ChevronRight className="text-white" size={24} />
        </div>
      </div>

      {/* slider */}
      <div className="items-end flex flex-col md:flex-row justify-center w-full gap-3 sm:gap-4 overflow-visible md:overflow-hidden">
        {/* Mobile: Show only center card */}
        <div className="md:hidden w-full max-w-md mx-auto pt-6 pb-2">
          <div 
            className={`bg-[rgb(240,243,247)] min-h-[300px] w-full text-center flex flex-col justify-end pb-4 text-[#000] px-6 sm:px-8 rounded-lg relative transition-all duration-500 ease-in-out overflow-visible ${
              isAnimating ? 'transform scale-95 opacity-70' : 'transform scale-100 opacity-100'
            }`}
          >
            <img
              src={visibleReviews[currentIndex].image}
              alt="review"
              className={`w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] object-contain absolute -top-[20%] left-[50%] translate-x-[-50%] transition-all duration-500 ease-in-out ${
                isAnimating ? 'transform translate-x-[-50%] translate-y-[20px] scale-90 opacity-0' : 'transform translate-x-[-50%] scale-100 opacity-100'
              }`}
            />
            <div className="pt-4">
              <h3 className="text-[20px] sm:text-[22px] font-[600]">{visibleReviews[currentIndex].title}</h3>
              <p className="text-[14px] sm:text-[15px] font-[300]">{visibleReviews[currentIndex].subtitle}</p>
            </div>
            <div className="pt-4 sm:pt-5 text-sm sm:text-base">{visibleReviews[currentIndex].text}</div>
          </div>
        </div>

        {/* Desktop: Show 3 cards */}
        <div className="hidden md:flex items-end justify-center w-full gap-3 lg:gap-4">
          {/* Left card - smaller */}
          <div 
            className={`bg-[rgb(240,243,247)] h-[140px] md:h-[160px] lg:h-[160px] w-[200px] md:w-[300px] lg:w-[500px] text-center flex flex-col justify-end pb-3 md:pb-4 text-[#3b434f] px-4 md:px-6 lg:px-10 rounded-lg flex-shrink-0 transition-all duration-500 ease-in-out ${
              isAnimating ? 'transform translate-x-[-50px] md:translate-x-[-80px] lg:translate-x-[-100px] opacity-50' : ''
            }`}
          >
            <div className="pt-2 md:pt-4">
              <h3 className="text-[14px] md:text-[18px] lg:text-[24px] font-[600]">{visibleReviews[0].title}</h3>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] font-[300]">{visibleReviews[0].subtitle}</p>
            </div>
            <div className="pt-3 md:pt-5 text-[10px] md:text-[12px] lg:text-sm">{visibleReviews[0].text}</div>
          </div>

          {/* Center card - larger with image */}
          <div 
            className={`bg-[rgb(240,243,247)] h-[250px] md:h-[280px] lg:h-[300px] w-[250px] md:w-[350px] lg:w-[500px] text-center flex flex-col justify-end pb-3 md:pb-4 text-[#000] px-6 md:px-10 lg:px-14 rounded-lg relative flex-shrink-0 transition-all duration-500 ease-in-out overflow-visible ${
              isAnimating ? 'transform scale-95 opacity-70' : 'transform scale-100 opacity-100'
            }`}
          >
            <img
              src={visibleReviews[1].image}
              alt="review"
              className={`w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[220px] lg:h-[220px] object-contain absolute -top-[25%] md:-top-[30%] left-[50%] translate-x-[-50%] transition-all duration-500 ease-in-out ${
                isAnimating ? 'transform translate-x-[-50%] translate-y-[20px] scale-90 opacity-0' : 'transform translate-x-[-50%] scale-100 opacity-100'
              }`}
            />
            <div className="pt-2 md:pt-4">
              <h3 className="text-[16px] md:text-[20px] lg:text-[24px] font-[600]">{visibleReviews[1].title}</h3>
              <p className="text-[13px] md:text-[15px] lg:text-[16px] font-[300]">{visibleReviews[1].subtitle}</p>
            </div>
            <div className="pt-3 md:pt-5 text-[11px] md:text-[13px] lg:text-base">{visibleReviews[1].text}</div>
          </div>

          {/* Right card - smaller */}
          <div 
            className={`bg-[rgb(240,243,247)] h-[140px] md:h-[160px] lg:h-[160px] w-[200px] md:w-[300px] lg:w-[500px] text-center flex flex-col justify-end pb-3 md:pb-4 text-[#3b434f] px-4 md:px-6 lg:px-10 rounded-lg flex-shrink-0 transition-all duration-500 ease-in-out ${
              isAnimating ? 'transform translate-x-[50px] md:translate-x-[80px] lg:translate-x-[100px] opacity-50' : ''
            }`}
          >
            <div className="pt-2 md:pt-4">
              <h3 className="text-[14px] md:text-[18px] lg:text-[24px] font-[600]">{visibleReviews[2].title}</h3>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] font-[300]">{visibleReviews[2].subtitle}</p>
            </div>
            <div className="pt-3 md:pt-5 text-[10px] md:text-[12px] lg:text-sm">{visibleReviews[2].text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;