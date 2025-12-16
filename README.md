# 🍎 Lunch Money - School Enrollment Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern platform for managing school enrollments and tracking lunch debt**

[Features](#-features) • [Installation](#-installation) • [Configuration](#-configuration) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Admin Panel](#-admin-panel) • [Testing](#-testing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Admin Panel](#-admin-panel)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

Lunch Money is a comprehensive web application designed to help schools manage enrollments and track lunch debt. The platform features a user-friendly enrollment form for schools to register and a secure admin panel for managing all enrollments.

### Key Highlights

- ✨ **Modern UI/UX** - Beautiful, responsive design built with Tailwind CSS
- 🔒 **Secure Admin Panel** - Environment-based authentication
- 📊 **Real-time Management** - View, edit, and delete enrollments
- 🗄️ **MongoDB Integration** - Robust database storage
- 🚀 **Next.js 15** - Latest features and performance optimizations

---

## ✨ Features

### Public Features
- **School Enrollment Form**
  - Easy-to-use form for school registration
  - Real-time validation
  - Success/error notifications
  - Responsive design

### Admin Features
- **Secure Authentication**
  - Environment variable-based login
  - Session management
  - Protected routes

- **Enrollment Management**
  - View all enrollments in a table
  - Inline editing capabilities
  - Delete enrollments with confirmation
  - Sort by creation date (newest first)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.1.0 | React framework with App Router |
| **React** | 19.2.0 | UI library |
| **MongoDB** | Latest | Database |
| **Mongoose** | 9.0.1 | MongoDB ODM |
| **Tailwind CSS** | 3.4.17 | Styling |
| **Node.js** | Latest | Runtime environment |

---

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Lunch-Money
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/lunch-money
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
ADMIN_SESSION_SECRET=your_random_secret_key_here
NODE_ENV=development
```

### Step 4: Start MongoDB

**Local MongoDB:**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

**MongoDB Atlas:**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `.env`

### Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes | `mongodb://localhost:27017/lunch-money` |
| `ADMIN_USERNAME` | Admin panel username | ✅ Yes | `admin` |
| `ADMIN_PASSWORD` | Admin panel password | ✅ Yes | `secure_password_123` |
| `ADMIN_SESSION_SECRET` | Session encryption key | ✅ Yes | `random_string_here` |
| `NODE_ENV` | Environment mode | ❌ No | `development` or `production` |

### MongoDB Connection

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/lunch-money
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lunch-money?retryWrites=true&w=majority
```

---

## 🚀 Usage

### Public Enrollment Form

1. Navigate to the homepage
2. Scroll to the "School Enrollment Form" section
3. Fill in all required fields:
   - School Name
   - District Name
   - Administrator Name
   - Email Address
   - Total Students
   - Current Lunch Debt
4. Click "Enroll School"
5. You'll see a success message upon submission

### Admin Panel Access

1. Navigate to `/admin/login`
2. Enter your admin credentials (from `.env`)
3. Click "Login"
4. You'll be redirected to the dashboard

### Managing Enrollments

**View Enrollments:**
- All enrollments are displayed in a table
- Sorted by creation date (newest first)

**Edit Enrollment:**
1. Click "Edit" on any enrollment row
2. Modify the fields inline
3. Click "Save" to update
4. Click "Cancel" to discard changes

**Delete Enrollment:**
1. Click "Delete" on any enrollment row
2. Confirm the deletion
3. The enrollment will be permanently removed

**Logout:**
- Click the "Logout" button in the top-right corner

---

## 📡 API Documentation

### Enrollment Endpoints

#### `POST /api/enrollments`
Submit a new school enrollment.

**Request Body:**
```json
{
  "schoolName": "Lincoln High School",
  "districtName": "Springfield District",
  "administratorName": "John Doe",
  "email": "admin@lincoln.edu",
  "totalStudents": 500,
  "currentLunchDebt": "5%"
}
```

**Response (201):**
```json
{
  "message": "Enrollment submitted successfully",
  "enrollment": {
    "_id": "...",
    "schoolName": "Lincoln High School",
    ...
  }
}
```

#### `GET /api/enrollments`
Get all enrollments (Admin only).

**Headers:**
- Requires admin session cookie

**Response (200):**
```json
{
  "enrollments": [
    {
      "_id": "...",
      "schoolName": "...",
      "districtName": "...",
      "administratorName": "...",
      "email": "...",
      "totalStudents": 500,
      "currentLunchDebt": "5%",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### `PUT /api/enrollments/[id]`
Update an enrollment (Admin only).

**Request Body:**
```json
{
  "schoolName": "Updated School Name",
  "districtName": "...",
  "administratorName": "...",
  "email": "...",
  "totalStudents": 600,
  "currentLunchDebt": "4%"
}
```

**Response (200):**
```json
{
  "message": "Enrollment updated successfully",
  "enrollment": { ... }
}
```

#### `DELETE /api/enrollments/[id]`
Delete an enrollment (Admin only).

**Response (200):**
```json
{
  "message": "Enrollment deleted successfully"
}
```

### Admin Endpoints

#### `POST /api/admin/login`
Admin login.

**Request Body:**
```json
{
  "username": "admin",
  "password": "your_password"
}
```

**Response (200):**
```json
{
  "message": "Login successful"
}
```

#### `GET /api/admin/login`
Check authentication status.

**Response (200):**
```json
{
  "authenticated": true
}
```

#### `POST /api/admin/logout`
Admin logout.

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 🔐 Admin Panel

### Access

- **URL:** `http://localhost:3000/admin/login`
- **Credentials:** Set in `.env` file

### Features

- ✅ Secure authentication
- 📊 Enrollment dashboard
- ✏️ Inline editing
- 🗑️ Delete functionality
- 🔒 Session management
- 📱 Responsive design

### Security

- Credentials stored only in environment variables
- HTTP-only cookies for session management
- Protected API routes
- No hardcoded credentials

---

## 📁 Project Structure

```
Lunch-Money/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.jsx          # Admin dashboard
│   │   │   └── login/
│   │   │       └── page.jsx          # Admin login page
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.js      # Admin login/logout API
│   │   │   │   └── logout/
│   │   │   │       └── route.js      # Admin logout API
│   │   │   └── enrollments/
│   │   │       ├── [id]/
│   │   │       │   └── route.js      # Update/Delete enrollment
│   │   │       └── route.js          # Create/Get enrollments
│   │   ├── layout.jsx                # Root layout
│   │   └── page.jsx                   # Homepage
│   ├── components/
│   │   ├── EnrollmentForm.jsx         # Enrollment form component
│   │   ├── Navbar.jsx                 # Navigation bar
│   │   ├── Footer.jsx                 # Footer component
│   │   └── ...                        # Other components
│   ├── lib/
│   │   └── mongodb.js                 # MongoDB connection utility
│   └── models/
│       └── Enrollment.js              # Enrollment Mongoose model
├── public/
│   └── assets/                        # Static assets
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore rules
├── jsconfig.json                      # JavaScript configuration
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies
└── README.md                          # This file
```

---

## 🔒 Security

### Best Practices Implemented

1. **Environment Variables**
   - All sensitive data stored in `.env`
   - `.env` excluded from version control

2. **Authentication**
   - Session-based authentication
   - HTTP-only cookies
   - Secure session secrets

3. **API Protection**
   - Admin routes require authentication
   - Input validation on all endpoints
   - Error handling without exposing internals

4. **Data Validation**
   - Email format validation
   - Required field checks
   - Type validation

### Production Recommendations

- Use strong `ADMIN_PASSWORD`
- Generate random `ADMIN_SESSION_SECRET`
- Enable HTTPS
- Use MongoDB Atlas with IP whitelisting
- Set `NODE_ENV=production`
- Implement rate limiting
- Add CORS configuration if needed

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseServerSelectionError`

**Solutions:**
- Verify MongoDB is running: `mongosh` or check service status
- Check `MONGODB_URI` in `.env`
- For Atlas: Verify network access and credentials
- Check firewall settings

### Admin Login Not Working

**Solutions:**
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
- Check browser console for errors
- Clear cookies and try again
- Verify `ADMIN_SESSION_SECRET` is set

### Form Submission Fails

**Solutions:**
- Check browser console for errors
- Verify MongoDB connection
- Check all required fields are filled
- Verify email format is correct

### Build Errors

**Solutions:**
- Delete `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Development

### Adding New Features

1. Create components in `src/components/`
2. Add API routes in `src/app/api/`
3. Update models in `src/models/` if needed
4. Test thoroughly before deployment

### Database Schema

**Enrollment Model:**
```javascript
{
  schoolName: String (required)
  districtName: String (required)
  administratorName: String (required)
  email: String (required)
  totalStudents: Number (required)
  currentLunchDebt: String (required)
  createdAt: Date (auto-generated)
}
```

---

## 🧪 Testing

Comprehensive testing guide is available in [TESTING.md](./TESTING.md).

### Quick Test

1. **Test Enrollment Form:**
   - Fill out and submit the enrollment form on the homepage
   - Verify success message appears
   - Check MongoDB for saved data

2. **Test Admin Panel:**
   - Navigate to `/admin/login`
   - Login with credentials from `.env`
   - View, edit, and delete enrollments

3. **Test API Endpoints:**
   ```bash
   # Test enrollment submission
   curl -X POST http://localhost:3000/api/enrollments \
     -H "Content-Type: application/json" \
     -d '{"schoolName":"Test","districtName":"Test","administratorName":"Test","email":"test@test.com","totalStudents":100,"currentLunchDebt":"5%"}'
   ```

For detailed testing procedures, see [TESTING.md](./TESTING.md).

---

## 📞 Support

For issues and questions:
- Check the [Troubleshooting](#-troubleshooting) section
- Review [TESTING.md](./TESTING.md) for testing procedures
- Review API documentation
- Check browser console for errors
- Verify environment configuration

---

<div align="center">

**Built with ❤️ using Next.js and MongoDB**

⭐ Star this repo if you find it helpful!

</div>
