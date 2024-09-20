import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import necessary components

const ContactUs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // Map container style
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  // Map center coordinates (San Francisco as an example)
  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 bg-gray-100">
      {/* Hero Section */}
      <div className="w-full px-4 py-16 text-center text-white bg-blue-500">
        <h1 className="text-4xl font-bold">Get in Touch with Us</h1>
        <p className="mt-4 text-lg">We're here to help you with any queries or concerns you might have.</p>
        <button className="px-6 py-2 mt-6 font-semibold text-blue-500 bg-white rounded">
          Contact Us
        </button>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-2xl mt-12">
        <h2 className="mb-4 text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            'What is your return policy?',
            'How can I track my order?',
            'Do you ship internationally?',
            'What payment methods do you accept?',
            'How can I contact customer support?',
            'Can I change or cancel my order?',
          ].map((question, index) => (
            <div key={index} className="p-4 border rounded">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex items-center justify-between w-full font-semibold text-left"
              >
                <span>{question}</span>
                <span>{openQuestion === index ? '-' : '+'}</span>
              </button>
              {openQuestion === index && (
                <p className="mt-2 text-gray-700">
                  Detailed answer to the question goes here...
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map and Contact Details */}
      <div className="flex flex-col w-full mt-12 md:flex-row">
        {/* Google Map */}
        <div className="h-64 md:w-2/3">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
              {/* Marker */}
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="mt-6 md:w-1/3 md:pl-6 md:mt-0">
          <h3 className="mb-2 text-xl font-semibold">Contact Details</h3>
          <p className="text-gray-700">Phone: (123) 456-7890</p>
          <p className="text-gray-700">Email: contact@example.com</p>
          <p className="text-gray-700">Address: 123 Example St, City, Country</p>
          <p className="text-gray-700">
            Follow us:{' '}
            <a href="#" className="text-blue-500">
              Facebook
            </a>
            ,{' '}
            <a href="#" className="text-blue-500">
              Twitter
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex flex-col w-full mt-12 md:flex-row">
        <div className="p-6 bg-gray-200 rounded-lg md:w-1/2">
          <img
            src="/path/to/image.jpg"
            alt="Contact Us"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h3 className="mb-4 text-2xl font-semibold">Contact Form</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Subject</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea className="w-full p-2 border rounded" rows="4"></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-blue-500 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
