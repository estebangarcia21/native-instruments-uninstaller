import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function SplashScreen() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/home');
    }, 750);
  });

  return (
    <h1 className="bg-indigo-600 text-white font-semibold text-4xl h-screen flex flex-col justify-center items-center">
      Native Instruments Uninstaller
    </h1>
  );
}
