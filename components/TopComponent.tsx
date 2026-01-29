import React from "react";

const TopComponent = () => {
  return (
    <div className="py-1.5 z-[50] text-foreground flex flex-col md:flex-row justify-center items-center md:gap-12 bg-white">
      <p>Књиге и семинари за тренере.</p> <p className="hidden md:block">/</p>
      <p>Терен & Табла</p>
    </div>
  );
};

export default TopComponent;
