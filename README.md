# 🍽️ GastroZoom - Online Food Ordering Web App

GastroZoom is a web application for ordering food online, built using modern technologies like Vue 3, Vuetify 3, Vite, Pinia, Express, Prisma ORM, MySQL, Docker, and JWT for authentication. The app supports role-based access control (USER, WORKER, ADMIN) and allows customers to view offers, place orders, and manage addresses, while admins can manage users, orders, and notifications.

## 🚀 Features

### Guest Users:
- Can view the homepage, offers, and the about page.

### Registered Users (USER Role):
- View food offers and add them to the cart.
- Create and manage addresses (set primary address, delivery options).
- Place orders and track their status.
- View and remove notifications from the app.
- Do everything a guest can do.

### Workers (WORKER Role):
- Can do everything a USER can do.
- Change the status of orders.

### Admins (ADMIN Role):
- Can do everything a USER and WORKER can do.
- Manage offers (view, add, edit, remove).
- View and manage users (change user roles).
- Create notifications that are sent to all users.

## 🛠️ Technologies Used

### Frontend:
- **Vue 3**: Progressive JavaScript framework.
- **Vuetify 3**: UI framework for building responsive and accessible interfaces.
- **Vite**: Lightning-fast build tool for Vue applications.
- **Pinia**: State management library for Vue.
- **VueUse**: `useLocalStorage` for persisting cart data in localStorage.

### Backend:
- **Node.js** and **Express**: For building the RESTful API.
- **Prisma ORM**: Database management with MySQL.
- **JWT**: Token-based authentication.
- **Bcrypt**: For password hashing.
- **Multer and Axios**: For handling image uploads.
- **CORS**: Cross-origin resource sharing to handle frontend-backend communication.
- **Dotenv**: Environment variable management.
- **Nodemon**: Development tool for automatically restarting the server.

### Database:
- **MySQL**: Managed with Prisma ORM and Docker Compose.

## 🗂️ Prisma Schema

Here is a summary of the Prisma schema used for managing the database models:

- **User**: Manages user details, including roles and associated addresses.
- **Address**: Stores user address information.
- **Food**: Stores details of food offers (name, description, price, image, category).
- **Order**: Contains order details (address, total price, status).
- **OrderItem**: Tracks the individual food items within an order.
- **Message**: Stores system notifications and order updates for users.
- **RevokedToken**: Manages invalidated JWT tokens to ensure security.
- **Enums**: For roles (USER, WORKER, ADMIN), order statuses, food categories, and message types.

## 📦 How to Run the Project

### 1. Set up Environment Variables

Create a `.env` file in the backend directory with the following structure:

```bash
PORT=4000
DATABASE_URL="mysql://root:password@localhost:3306/gastrozoom"
JWT_SECRET="your_jwt_secret"
IMGBB_KEY="your_imgbb_key"
```

### 2. Install Dependencies

Run the following commands to install necessary packages:

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### 3. Set Up MySQL Database with Docker

```bash
docker-compose up --build
```

For subsequent runs:
```bash
docker-compose up
```

### 4. Run Prisma Migrations

Run the migrations to set up the database schema:

```bash
npx prisma migrate dev
```

### 5. Start Backend and Frontend

#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd frontend
npm run dev
```

## 🎨 Application Flow

### Cart and Checkout Process:

1. **Viewing Offers**:
    - Offers are fetched from the backend using Pinia store actions.
    - Images and details are fetched and displayed to the user.

2. **Adding to Cart**:
    - Users select food offers and quantities.
    - Pinia stores the offer details and quantity in localStorage.

3. **Cart Page**:
    - When the cart page is opened, Pinia fetches the food data for the items in the cart from the backend.
    - Users can change quantities or remove items from the cart, which updates the localStorage data.

4. **Order Creation**:
    - After selecting an address, the user creates an order.
    - The order is initialized with the `CREATED` status and is tracked by the user.

5. **Order Status Changes**:
    - Workers or admins can change the order status (e.g., `ACCEPTED`, `IN_DELIVERY`, `DELIVERED`).

### Address Management:
- Users can create multiple addresses and set one as primary.
- Select if delivery should be at the door or if the user will wait outside.
- Addresses can be viewed, removed, and modified.

### Role Management:
- Admins can change user roles between `USER`, `WORKER`, and `ADMIN`.

## ⚙️ Future Improvements

- Add payment gateway integration.
- Improve real-time notifications for order status updates.
- Implement user reviews and ratings for food items.

## 🧑‍💻 Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.