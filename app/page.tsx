"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 50) {
        setAnimationClass('animate-opacity');
      } else {
        setAnimationClass('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'>
      {/* Moving objects (circles) */}
      <div className='absolute inset-0 z-0'>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className='absolute w-24 h-24 bg-white rounded-full opacity-20 animate-floating'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Overlay for better text visibility */}
      <div className='absolute inset-0 bg-black opacity-50'></div>

      <div className='relative z-10 text-center'>
        <h1 className='text-16xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s' style={{ marginTop: '20px' }}>LOAD-AI Welcomes You</h1>
        <Button
          onClick={() => router.push('/dashboard')}
          className='bg-primary
           text-black py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors mb-6 relative'
        >
          <div className='absolute inset-0 flex items-center justify-center'>

          </div>
          Let's Generate 🚀✨

        </Button>
        <h2 className='text-6xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-2s'>Let's Get Start</h2>
      </div>
    </div>
  );
}
