import React from "react";

const Working = () => {
  const cards = [
    {
      number: "01",
      numberImage: "/assets/num1.png",
      iconImage: "/assets/work1.png",
      iconwidth: "40px",
      iconheight: "40px",
      title: "Fund the Pool",
      description:
        "Donors contribute funds to the Lunch Money pool to protect schools from unpaid lunch debt.",
    },
    {
      number: "02",
      numberImage: "/assets/num2.png",
      iconImage: "/assets/work2.png",
      iconwidth: "40px",
      iconheight: "40px",
      title: "LMY Offset Credits Are Issued",
      description:
        "The protocol issues Lunch Money (LMY) offset credits equal to the funded amount.",
    },
    {
      number: "03",
      numberImage: "/assets/num3.png",
      iconImage: "/assets/work3.png",
      iconwidth: "40px",
      iconheight: "40px",
      title: "The Protocol Applies LMY",
      description:
        "Using automated rules, the protocol applies LMY credits to reduce unpaid school lunch balances.",
    },
    {
      number: "04",
      numberImage: "/assets/num4.png",
      iconImage: "/assets/work4.png",
      iconwidth: "40px",
      iconheight: "40px",
      title: "LMY Is Retired, Debt Is Eliminated",
      description: "Applied LMY credits are permanently retired (burned), and the school moves toward Lunch Money Certified: Debt-Free status.",
    },
  ];

  return (
    <div className="min-h-[500px] sm:min-h-[700px] md:min-h-[1020px] grid grid-rows-[auto_1fr] pt-8 sm:pt-12 md:pt-[60px] lg:pt-[100px] pb-6 sm:pb-8 md:pb-[40px] lg:pb-[50px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[150px]">
      {/* heading */}
      <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-0">
        <p className="text-[#FF8823] text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight">How Lunch Money</p>
        <p className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight">Works</p>
      </div>
      {/* description */}
      <div className="flex items-end justify-center">
        {/* Circular container - hidden on mobile, show stacked cards instead */}
        <div className="hidden md:flex w-full max-w-[640px] h-[640px] rounded-full border-[3px] border-[#FF8823] items-center justify-center p-6 relative">
          <img
            src="/assets/moneyWorking.png"
            alt=""
            className="w-full h-full object-contain"
          />

          {/* steps */}

          {/* Orbiting cards container */}
          <div className="absolute inset-0 animate-orbit ">
            {cards.map((card, index) => {
              // Position cards at 4 corners of the orbit
              const positions = [
                { top: "0%", left: "-10%" }, // top-left
                { top: "0%", right: "-10%" }, // top-right
                { bottom: "0%", left: "-10%" }, // bottom-left
                { bottom: "0%", right: "-10%" }, // bottom-right
              ];
              const pos = positions[index];

              return (
                <div
                  key={card.number}
                  className="bg-white w-[280px] md:w-[320px] h-[160px] md:h-[180px] absolute rounded-xl shadow-lg animate-counter-orbit grid grid-rows-[1fr_2fr] p-2"
                  style={pos}
                >
                  <div className="flex items-end justify-center ">
                    <img
                      src={card.iconImage}
                      alt=""
                      className="w-[40px] h-[40px] object-contain"
                    />
                  </div>
                  <div className=" flex flex-col justify-end pb-2">
                    <p className="text-[16px] md:text-[20px] font-[600] text-center">
                      {card.title}
                    </p>
                    <p className="text-[12px] px-2 md:text-[16px] font-[300] text-center">
                      {card.description}
                    </p>
                  </div>

                  {/* worker number */}
                  <img
                    src={card.numberImage}
                    alt=""
                    className={`w-[40px] h-[40px] object-contain 
                        absolute top-1/2 -translate-y-1/2
                        ${(index+1)%2===0 ? '-left-[20px]' : '-right-[20px]'}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Stacked cards */}
        <div className="md:hidden w-full max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
          {cards.map((card, index) => (
            <div
              key={card.number}
              className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 relative"
            >
              <div className="flex items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <img
                      src={card.iconImage}
                      alt=""
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain flex-shrink-0"
                    />
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-[600] leading-tight">
                      {card.title}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[15px] lg:text-[16px] font-[300] text-[#626B75] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Working;
