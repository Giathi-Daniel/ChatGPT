import React from 'react';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="mb-8 pt-[2rem]">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-70"></div>
          <div className="relative max-w-4xl px-6 py-12 mx-auto text-center z-1">
            <h1 className="mb-4 text-4xl font-bold text-white">Welcome to ChatGPT Clone</h1>
            <p className="mb-6 text-lg text-white">
              Our platform is designed to make your interactions with AI more intuitive and effective. Explore how our technology can help you achieve more.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 text-blue-500 bg-white rounded-lg shadow-lg hover:bg-gray-200">
                Learn More
              </button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full p-6 text-center bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/4">
              <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
              <p className="text-gray-700">
                To deliver cutting-edge AI technology that enhances user interaction and provides intelligent solutions.
              </p>
            </div>
            <div className="w-full p-6 text-center bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/4">
              <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
              <p className="text-gray-700">
                To be the leading provider of AI-driven solutions that transform industries and improve lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <img src="/path/to/member1.jpg" alt="Team Member 1" className="w-24 h-24 mx-auto mb-4 rounded-full"/>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
            </div>
            <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <img src="/path/to/member2.jpg" alt="Team Member 2" className="w-24 h-24 mx-auto mb-4 rounded-full"/>
                <h3 className="text-xl font-semibold">Jane Smith</h3>
                <p className="text-gray-600">CTO</p>
              </div>
            </div>
            <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <img src="/path/to/member3.jpg" alt="Team Member 3" className="w-24 h-24 mx-auto mb-4 rounded-full"/>
                <h3 className="text-xl font-semibold">Alex Johnson</h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
