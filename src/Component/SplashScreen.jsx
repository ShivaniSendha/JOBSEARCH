import React, { useEffect, useState } from 'react';
import '../../src/Component/SplashScreen.css'
import logo from '../assets/Career.webp';

const SplashScreen = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; 
  return (
    <div className="splash-screen">
      <img src={logo} alt="App Logo" className="splash-logo" />
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
