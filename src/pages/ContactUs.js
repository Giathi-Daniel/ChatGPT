import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const containerStyle = {
    inlineSize: '100%',
    blockSize: '100%',
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center py-8 bg-gray-100">
        <div className="w-full py-16 mt-8 text-center text-white bg-blue-500">
          <h1 className="text-4xl font-bold">Get in Touch with Us</h1>
          <p className="mt-4 text-lg">We're here to help you with any queries or concerns you might have.</p>
          <button className="px-6 py-2 mt-6 font-semibold text-blue-500 bg-white rounded">
            Contact Us
          </button>
        </div>

        {/* FAQ Section */}
        <div className="w-full px-4 mt-12 md:px-14">
          <h2 className="mb-4 text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { question: 'What is this ChatGPT clone?', answer: 'This ChatGPT clone is an AI-powered conversational assistant designed to engage users in natural language discussions.' },
              { question: 'How does the ChatGPT clone work?', answer: 'The ChatGPT clone utilizes advanced machine learning algorithms to process and understand user inputs.' },
              { question: 'What kind of topics can I discuss with the ChatGPT clone?', answer: 'You can discuss a wide range of topics, including technology, science, history, entertainment, and everyday life questions.' },
              { question: 'Is my conversation with the ChatGPT clone private?', answer: 'While we strive to ensure user privacy, please be aware that conversations may be logged for quality purposes.' },
              { question: 'Can I use the ChatGPT clone for business purposes?', answer: 'Yes, the ChatGPT clone can assist with business inquiries, customer support, and content generation.' },
              { question: 'How can I provide feedback about the ChatGPT clone?', answer: 'We welcome your feedback! You can submit your comments or suggestions through our contact form.' },
              { question: 'What should I do if I encounter an error?', answer: 'If you encounter any issues, please refresh the page or try again later.' },
              { question: 'Is there a mobile app for the ChatGPT clone?', answer: 'Currently, there is no dedicated mobile app, but it is accessible through mobile browsers.' },
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex items-center justify-between w-full font-semibold text-left"
                >
                  <span>{item.question}</span>
                  <span>{openQuestionIndex === index ? '-' : '+'}</span>
                </button>
                {openQuestionIndex === index && (
                  <p className="mt-2 text-gray-700">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full mt-12 px-14 md:flex-row md:justify-between">
          {/* Google Maps and Contact Details */}
          <div className="flex flex-col md:w-2/3">
            <div className="mb-4 h-[41.5rem]">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={14}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Contact Details</h3>
              <p className="text-gray-700">Phone: (123) 456-7890</p>
              <p className="text-gray-700">Email: contact@example.com</p>
              <p className="text-gray-700">Address: 123 Example St, City, Country</p>
              <p className="text-gray-700">
                Follow us: 
                <a href="#" className="text-blue-500"> Facebook</a>, 
                <a href="#" className="text-blue-500"> Twitter</a>
              </p>
            </div>
          </div>

          <div className="md:w-1/3 md:pl-6 md:mt-2">
            <div className="bg-white rounded-lg shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2017/07/15/11/34/support-2506172_640.jpg"
                alt="Contact Us"
                className="object-cover w-full rounded-t-lg h-80" 
              />
              <div className="p-6">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
