# Vehicle Rental Management System – Backend API

## Live URL    

---

## Project Overview

-  **Vehicles** – Manage vehicle inventory & availability  
-  **Customers** – Customer accounts & profiles  
-  **Bookings** – Rent & return vehicles with cost calculation  
- **Authentication** – JWT-based, role-based (Admin & Customer)

---

## Technology Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **PostgreSQL**
- **pg** (node-postgres)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT auth)

---

## Features 

- Users can sign up as either an admin or a customer with jwt-based authentication
- As customers, they can book vehicles for rent and return them when done
- Admins can manage vehicles and customers


## Setup & Usage Instructions

**Clone the git ropo**
[repo](https://github.com/umarfaruk2/node_assignment)

**install**

npm install

---

**env file**

PORT = 5000
DB_URL = postgresql://neondb_owner:npg_qRxb1pzLc3vO@ep-frosty-sea-ada1ppsa-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET = 28c0d43f476c9122ff4800bb3e375f87394f59cda738c8f22ae24aa0536dda251b701644719bf6065480fc0ea69308b30b16303f7e3e9fc91e12ed58fdc9ab05

**start the server**

**For local run** - npm run dev
