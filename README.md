# SWEecommerceapp

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

    
## Description of Implemented Features

* **User Authentication:**
    * Users can register, log in, and log out.
* **Product Catalog:**
    * Browse a list of products.
    * View product details (name, description, price, images).
    * Product search and filtering.
* **Shopping Cart:**
    * Add products to the cart.
    * View and modify the cart contents.
    * Select from child or adult prices.
    * Calculate the total price.
* **Checkout Process:**
    * Secure checkout process.
    * Order confirmation.
* **User Profile:**
    * View order history.
    * Manage profile information.
      
## Testing Instructions

4.  **Manual Testing:**
    * Manually test the application by following these steps:
        * **User Authentication:**
            * Register a new user account.
            * Log in with the new account.
            * Log out.
        * **Product Catalog:**
            * Browse the product catalog.
            * View product details.
            * Use the search and filter features.
        * **Shopping Cart:**
            * Add products to the cart.
            * View and modify the cart.
            * Verify the total price calculation.
        * **Checkout Process:**
            * Proceed to checkout.
            * Confirm the order.
        * **User Profile:**
            * View order history.
            * Manage profile information.
       
## Third-Party Libraries

* **React:** (If a frontend application)
    * A JavaScript library for building user interfaces.  Used for creating a dynamic and interactive frontend.
* **Node.js and Express:** (If a backend application)
    * **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.  Used for building the server-side logic.
    * **Express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.  Used for creating the API endpoints and handling server-side logic.
* **Database (e.g., PostgreSQL, MySQL, MongoDB):**
    * Used for storing application data, such as user information, product details, and orders.
* **TypeORM/Sequelize/Mongoose:** (If applicable)
    * Object-Relational Mapping (ORM) libraries that simplify database interactions.  Used to manage the database in an object-oriented way.
* **Authentication Library (e.g., Passport.js, Auth0):**
    * Used for handling user authentication and authorization.
* **Testing Framework (e.g., Jest, Mocha, Cypress):**
    * **Jest/Mocha:** JavaScript testing frameworks used for writing unit and integration tests.
    * **Cypress:** A JavaScript end-to-end testing framework.
* **axios or fetch:**
    * HTTP client for making requests to the server
* **Redux/Context API (If applicable):**
    * Used for state management in the frontend.
* **Tailwind CSS/Bootstrap/Material UI:**
     * CSS frameworks to help with styling