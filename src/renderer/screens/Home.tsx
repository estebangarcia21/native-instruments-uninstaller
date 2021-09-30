import React from 'react';

interface CardProps {
  title: string;
}

function Card({ title }: CardProps) {
  return (
    <div className="p-6 rounded relative overflow-hidden bg-gray-100 border">
      <div className="w-[40%] absolute top-0 left-0 skew-x-[45deg] bg-blue-600 h-[500px]" />
      <h1 className="z-50 relative font-medium text-lg text-white">{title}</h1>
    </div>
  );
}

export default function Home() {
  return (
    <div className="p-10 h-screen bg-white">
      <div className="flex flex-col space-y-10">
        <Card title="Kontakt" />
      </div>
    </div>
  );
}
