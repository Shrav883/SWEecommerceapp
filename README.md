# SWEecommerceapp

"Showtime" is a web-based application designed to streamline the process of purchasing movie tickets online.

## Implemented Features

* **Movie Collection Display:**
    * Lists movies with their names, release dates, and directors.
* **Search Functionality:**
    * Allows users to search for movies by name or director.
* **Detailed Movie Information:**
    * Provides a dropdown option for each movie to display comprehensive details, including:
        * Movie ID
        * Description
        * Release Date
        * Director
        * Main Actor
        * Category
        * Ticket Price
        * Best Seller status
        * Movie Image.
* **Booking Simulation:**
    * Includes a "Book Now" button to simulate the ticket booking process.
* **Cart Management:**
    * Allows users to add movies to a cart.
* **Order Management:**
    * Allows users to view and manage orders.
* **User Profile Management:**
    * Allows users to manage their profiles.
* **Seat Selection:**
    * Allows users to select seats for a movie.
* **Navigation Bar:**
    * Provides a navigation bar for easy access to different pages.
* **Hero Section:**
    * Includes a hero section on the home page.
* **About Us Page:**
    * Provides information about the application.
* **Contact Us Page:**
    * Provides a contact form for users to reach out.
* **Login Page:**
    * Allows users to log in or create an account.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shrav883/SWEecommerceapp.git
    ```


3.  **Install dependencies:**
    ```bash
    npm install  # or yarn install

    
    ```
    This command installs all the necessary packages listed in the `package.json` file.

6.  **Run**
        npm run dev
      
## Project Structure
SWEecommerceapp/
├── public/
│   ├── favicon.ico
│   └── ... (other static assets)
├── src/
│   ├── assets/
│   │   ├── assets.js       (Movie data)
│   │   └── mockOrders.js    (Mock order data)
│   ├── components/
│   │   ├── Hero.jsx        (Hero section component)
│   │   ├── Navbar.jsx      (Navigation bar component)
│   ├── pages/
│   │   ├── About.jsx       (About page component)
│   │   ├── Cart.jsx        (Cart page component)
│   │   ├── Contact.jsx     (Contact page component)
│   │   ├── Home.jsx        (Home page component)
│   │   ├── Login.jsx       (Login page component)
│   │   ├── Movie.jsx       (Movie list component)
│   │   ├── MyProfile.jsx   (User profile page component)
│   │   ├── Orders.jsx      (Orders page component)
│   │   ├── Selectseat.jsx  (Seat selection page component)
│   ├── App.jsx            (Main application component)
│   ├── main.jsx           (Entry point of the application)
│   ├── index.css          (Global styles)
│   └── vite-env.d.ts      (TypeScript environment declarations for Vite)
├── index.html           (Vite's entry HTML file)
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── vite.config.js       (Vite configuration)

## Testing Instructions

This project does not include unit or integration tests at this time. However, you can manually test the application by:

1.  Starting the development server (`npm run dev`).
2.  Navigating to the application in your browser.
3.  Using the search bar to find movies.
4.  Clicking the "View Details" button to expand movie information.
5.  Verifying that all movie details are displayed correctly.
6.  Clicking the "Book Now" button to simulate a booking.
7.  Adding movies to the cart.
8.  Navigating to the cart page and verifying the cart items.
9.  Placing an order and verifying the order details.
10. Navigating to the user profile page and verifying the user information.
11. Selecting seats for a movie.
12. Navigating to the about and contact pages.
13. Logging in and verifying the login functionality.
       
## Third-Party Libraries Used

* **React:** (If a frontend application)
    * A JavaScript library for building user interfaces.  Used for creating a dynamic and interactive frontend.
* **React Router DOM:**
    * Used for client-side routing, allowing navigation between different views without full page reloads.
    * `npm install react-router-dom`
* **Tailwind CSS:**
    * Used for styling the application, providing a utility-first approach to CSS. It allows for rapid UI development and ensures a consistent design.
    * `npm install -D tailwindcss postcss autoprefixer`
    * `npx tailwindcss init -p`


## Running Build

To create a production build of the application, run:

```bash
npm run build