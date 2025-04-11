import React from 'react';
import { assets } from '../assets/assets'; // Adjust the path as needed

const About = () => {
  return (
    <div className="bg-red-700 py-12 rounded-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">
            Showtime: Movie Ticket Booking Platform
          </h1>
          <img
            src={assets.logo} // Use your logo here
            alt="Showtime Logo"
            className="mx-auto h-25 mb-4 rounded-lg" // Adjust size as needed
          />
        </header>

        {/* Introduction Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
          "Showtime" is a web-based application designed to streamline the process of purchasing movie tickets online.
          </p>
        </section>

        {/* Purpose Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Purpose of the Project 1
          </h2>
          <p className="text-gray-700 mb-4">
            The primary aim of these projects is to enhance our understanding of how sophisticated
            software systems are built using industry-standard technologies. By engaging in the
            development of a front-end interface and back-end integration, explore the
            critical processes of modern software development, testing, and deployment.
          </p>
        </section>

        {/* Front-End Development (Project #1) Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Implemented features
          </h2>

<ul>
  <li>
    <strong>Movie Collection Display:</strong>
    <p>Lists movies with their names, release dates, and directors.</p>
  </li>
  <li>
    <strong>Search Functionality:</strong>
    <p>Allows users to search for movies by name or director.</p>
  </li>
  <li>
    <strong>Detailed Movie Information:</strong>
    <p>Provides a dropdown option for each movie to display comprehensive details, including:</p>
    <ul>
      <li>Movie ID</li>
      <li>Description</li>
      <li>Release Date</li>
      <li>Director</li>
      <li>Main Actor</li>
      <li>Category</li>
      <li>Ticket Price</li>
      <li>Best Seller status</li>
      <li>Movie Image.</li>
    </ul>
  </li>
  <li>
    <strong>Booking Simulation:</strong>
    <p>Includes a "Book Now" button to simulate the ticket booking process.</p>
  </li>
  <li>
    <strong>Cart Management:</strong>
    <p>Allows users to add movies to a cart.</p>
  </li>
  <li>
    <strong>Order Management:</strong>
    <p>Allows users to view and manage orders.</p>
  </li>
  <li>
    <strong>User Profile Management:</strong>
    <p>Allows users to manage their profiles.</p>
  </li>
  <li>
    <strong>Seat Selection:</strong>
    <p>Allows users to select seats for a movie.</p>
  </li>
  <li>
    <strong>Navigation Bar:</strong>
    <p>Provides a navigation bar for easy access to different pages.</p>
  </li>
  <li>
    <strong>Hero Section:</strong>
    <p>Includes a hero section on the home page.</p>
  </li>
  <li>
    <strong>About Us Page:</strong>
    <p>Provides information about the application.</p>
  </li>
  <li>
    <strong>Contact Us Page:</strong>
    <p>Provides a contact form for users to reach out.</p>
  </li>
  <li>
    <strong>Login Page:</strong>
    <p>Allows users to log in.</p>
  </li>
</ul>
        </section>

        {/* Add more sections as needed, (ADD REFERENCES!!! ) following the same structure */}
      </div>
    </div>
  );
};

export default About;