# Wanderlust 🏨

Wanderlust is a full-stack web application inspired by Airbnb, allowing users to discover, list, and review unique places to stay. It's built with Node.js, Express, and MongoDB, and it features a responsive and interactive user interface.



---

## Features

- **User Authentication:** Secure user sign-up, login, and logout functionality using Passport.js.
- **CRUD Operations:** Users can create, read, update, and delete their own property listings.
- **Image Uploads:** Seamless image uploads to the cloud using Multer and Cloudinary, with optimized image transformations for faster loading.
- **Reviews and Ratings:** Authenticated users can leave star ratings and written reviews on listings.
- **Interactive Maps:** Each listing displays its location on an interactive map using the Mapbox API, with geocoding to convert location names into coordinates.
- **Authorization & Middleware:** Robust middleware ensures that only authenticated users can perform certain actions (like creating listings) and only property owners can edit or delete their listings.
- **Flash Messaging:** Provides users with helpful feedback and alerts for actions like successful logins or errors.
- **Responsive Design:** A clean and modern UI built with Bootstrap and EJS, ensuring a great experience on both desktop and mobile devices.

---

## Tech Stack

This project is built with the following technologies:

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Templating Engine:** EJS (Embedded JavaScript) with EJS-Mate for layouts
- **Authentication:** Passport.js (with `passport-local`) for session management
- **File Uploads:** Multer and Cloudinary for cloud-based image storage
- **Mapping:** Mapbox API for geocoding and interactive maps
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Utilities:** `method-override` for PUT and DELETE requests, `connect-flash` for flash messages, `dotenv` for environment variable management.

---

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MOHITPOONIYA/Airbnb.git
    cd Airbnb
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables.
    ```env
    CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUD_API_KEY=<your_cloudinary_api_key>
    CLOUD_API_SECRET=<your_cloudinary_api_secret>
    MAP_TOKEN=<your_mapbox_api_token>
    DB_URL=<your_mongodb_connection_string>
    SECRET=<your_session_secret_key>
    ```

4.  **Start the server:**
    The application will be available at `http://localhost:8080`.
    ```bash
    nodemon app.js
    ```

---

## Usage

Once the server is running, you can:
- **Sign up** for a new account or **log in** with an existing one.
- **Browse** all available listings on the homepage.
- **Create a new listing** by filling out the form and uploading an image.
- **View a listing's details**, including its location on the map.
- **Edit or delete** your own listings.
- **Leave a review** on a listing if you are logged in.


├── .gitignore
├── README.md
├── app.js
├── cloudConfig.js
├── controllers
    ├── listings.js
    ├── reviews.js
    └── users.js
├── init
    ├── data.js
    └── index.js
├── middleware.js
├── models
    ├── listing.js
    ├── review.js
    └── user.js
├── package-lock.json
├── package.json
├── public
    ├── css
    │   ├── rating.css
    │   └── style.css
    └── js
    │   ├── map.js
    │   └── script.js
├── routes
    ├── listing.js
    ├── review.js
    └── user.js
├── schema.js
├── utilis
    ├── ExpressErorr.js
    └── asyncWrap.js
└── views
    ├── error.ejs
    ├── includes
        ├── flash.ejs
        ├── footer.ejs
        └── navbar.ejs
    ├── layouts
        └── boilerplate.ejs
    ├── listings
        ├── edit.ejs
        ├── index.ejs
        ├── new.ejs
        └── show.ejs
    └── users
        ├── login.ejs
        └── signup.ejs
