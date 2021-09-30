import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function SplashScreen() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/home');
    }, 1000);
  });

  return (
    <div style={{ height: '100vh', background: 'gray' }}>Splash Screen</div>
  );
}
