
import React from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
  animationData: object;
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
  ariaLabel?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationData,
  className = "",
  loop = true,
  autoPlay = true,
  ariaLabel = "Animated illustration",
}) => (
  <div className={className} aria-label={ariaLabel} role="img">
    <Lottie animationData={animationData} loop={loop} autoplay={autoPlay} />
  </div>
);

export default LottiePlayer;
