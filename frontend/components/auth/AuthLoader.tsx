import Image from "next/image";
import { useState, useEffect } from "react";

const AuthLoader = () => {
  const [stage, setStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hideBackground, setHideBackground] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setStage(1);
        setFadeOut(false);
      }, 1000);
    }, 1000);

    const timer2 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setStage(2);
        setFadeOut(false);
      }, 1000);
    }, 5000);

    const timer3 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setStage(3);
        setFadeOut(false);
      }, 1000);
    }, 8000);

    const timer4 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setStage(4);
        setFadeOut(false);
        setHideBackground(true);
      }, 1000);
    }, 11000);
    
    const timer5 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setStage(5);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  if (stage === 5) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-1000 ${
        hideBackground ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`transition-opacity duration-1000 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {stage === 0 && (
          <Image
            src="/logo.png"
            alt="Matcha Logo"
            className="w-64 h-auto"
            {...{ width: 276, height: 112 }}
          />
        )}
        {stage === 1 && (
          <h1 className="lg:text-4xl text-2xl font-bold font-montserrat text-primary text-center">
            Welcome to Matcha
          </h1>
        )}
        {stage === 2 && (
          <h1 className="lg:text-4xl text-2xl font-bold font-montserrat text-primary text-center">
            it&apos;s not just another dating app
          </h1>
        )}
        {stage === 3 && (
          <h1 className="lg:text-4xl text-2xl font-bold font-montserrat text-primary text-center">
            it&apos;s a lifestyle
          </h1>
        )}
      </div>
    </div>
  );
};

export default AuthLoader;
