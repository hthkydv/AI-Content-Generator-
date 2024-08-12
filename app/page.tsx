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

  const features = [
    {
      title: "✨ Multiple Templates",
      description: "With a wide selection of templates, you can effortlessly create content for any purpose—be it blogs, social media, or emails."
    },
    {
      title: "💡 Seamless Experience",
      description: "The user-friendly interface ensures a smooth and intuitive content creation process from start to finish."
    },
    {
      title: "🔒 Secure Authentication",
      description: "We've implemented robust authentication protocols to keep your profile and data secure."
    },
    {
      title: "📜 History Feature",
      description: "Keep track of all your generated content with our history feature, so you can easily access and reuse your previous work whenever needed."
    },
    {
      title: "💎 Premium Features",
      description: "Unlock additional premium features, including advanced content options and personalized templates, to take your content to the next level."
    },
    {
      title: "💳 Safe Transactions",
      description: "Enjoy secure and hassle-free payments through Razorpay when upgrading to our premium plans, ensuring your financial data is protected."
    },
  ];

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black text-white'>
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
        <h1 className='text-8xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s' style={{ marginTop: '20px' }}>
          LOAD-AI Welcomes You
        </h1>
        <Button
          onClick={() => router.push('/dashboard')}
          className='bg-yellow-500 text-black py-4 px-8 text-lg rounded-full shadow-lg hover:bg-yellow-600 transition-colors mb-6 relative'
        >
          Let's Generate 🚀✨
        </Button>
        <h2 className='text-5xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-2s'>Let's Get Started</h2>
      </div>

      {/* Navigation with website information */}
      <nav className='relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4'>
        {features.map((feature, index) => (
          <div 
            key={index} 
            className='flex flex-col items-start p-4 bg-white text-black rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition-colors h-full'
          >
            <h3 className='text-2xl font-bold mb-2'>{feature.title}</h3>
            <p className='text-lg'>{feature.description}</p>
          </div>
        ))}
        
      </nav>
    </div>
  );
}
