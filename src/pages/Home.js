import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <section className="flex-1 py-20 text-white bg-blue-500">
        <div className="container px-6 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome to ChatGPT</h1>
          <p className="mb-6 text-lg">Experience the power of AI-driven conversations. Start chatting with ChatGPT now!</p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 text-black bg-yellow-500 rounded hover:bg-yellow-600">Try ChatGPT for Free</Link>
            <Link to="/about" className="px-6 py-3 text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-50">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6 mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold">Features</h2>
            <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Instant Responses</h3>
                <p className='select-none text-start'>Get quick and accurate responses to your questions or prompts. Our system utilizes advanced algorithms to provide information at lightning speed. This ensures that you can make informed decisions without unnecessary delays.</p>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Conversational AI</h3>
                <p className='select-none text-start'>Engage in natural and dynamic conversations with advanced AI. The AI is designed to understand context and nuances, making interactions feel more human-like. You can ask follow-up questions and receive relevant answers seamlessly.</p>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Personalized Experience</h3>
                <p className='select-none text-start'>Enjoy responses tailored to your preferences and needs. The system learns from your interactions to offer increasingly relevant suggestions and insights. This personalized touch makes each conversation uniquely beneficial to you.</p>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">24/7 Availability</h3>
                <p className='select-none text-start'>Access assistance anytime, day or night, without interruption. Whether it’s a late-night query or an early morning task, our AI is always ready to help. This level of accessibility ensures you’re never left in the dark when you need support.</p>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Multilingual Support</h3>
                <p className='select-none text-start'>Communicate in multiple languages effortlessly, breaking down barriers to understanding. The AI can seamlessly switch between languages based on your preferences. This feature is ideal for users who operate in diverse linguistic environments.</p>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-xl font-semibold">Continuous Learning</h3>
                <p className='select-none text-start'>Experience an AI that evolves and improves over time, adapting to new information and user interactions. This continuous learning process enhances accuracy and relevance in responses. You'll notice improvements in the quality of conversations as the AI gets better at understanding your needs.</p>
            </div>
            </div>
        </div>
      </section>



      <section className="py-20 bg-gray-200">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
              <p className="text-lg italic">"ChatGPT is amazing! It provides insightful responses and is easy to use."</p>
              <p className="mt-4 font-semibold">- Alex J.</p>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/3">
              <p className="text-lg italic">"I love how ChatGPT can help with so many different topics and questions."</p>
              <p className="mt-4 font-semibold">- Jamie L.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
