import React, { useEffect, useState } from 'react';
import '../../src/Component/SplashScreen.css'
import logo from '../assets/Career.webp';

const SplashScreen = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; // When loading is complete, don't render the splash screen

  return (
    <div className="splash-screen">
      <img src={logo} alt="App Logo" className="splash-logo" />
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
