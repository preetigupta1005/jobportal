# 🚀 JobPortal - Full Stack Job Board Application

A modern, production-ready job portal application built with React, Node.js, Express, and MongoDB. Features role-based authentication for students and recruiters, real-time job applications, and a responsive design.

## ✨ Features

### For Students (Job Seekers)
- 🔐 Secure signup/login with email verification
- 🔍 Browse and search job listings
- 📝 Apply to jobs with profile
- 📊 Track application status
- 👤 Update profile with skills, bio, and resume upload
- 🎨 Profile photo upload via Cloudinary

### For Recruiters (Employers)
- 🏢 Register and manage companies
- 📰 Post job listings
- 📋 View and manage applicants
- ✅ Accept/reject applications
- 📊 Dashboard for posted jobs

### Technical Features
- 🔒 **Security**: JWT authentication, Helmet.js security headers, rate limiting
- ⚡ **Performance**: Optimized database queries with indexes
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- 🎨 **Modern UI**: Shadcn/ui components with Radix UI primitives
- 🔄 **State Management**: Redux Toolkit with Redux Persist
- 🌐 **API**: RESTful API architecture
- 📸 **Image Handling**: Cloudinary integration for file uploads
- 🛡️ **Validation**: Client & server-side validation
- 🎯 **Error Handling**: Comprehensive error boundaries & logging

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router v6** for routing
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Radix UI** primitives
- **Axios** for HTTP requests
- **Sonner** for toast notifications
- **Framer Motion** for animations

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt.js** for password hashing
- **Multer** for file uploads
- **Cloudinary** for media storage
- **Cookie Parser** for cookie handling
- **CORS** for cross-origin requests
- **Helmet.js** for security headers
- **Express Rate Limit** for rate limiting

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# - MongoDB URI
# - Cloudinary credentials
# - JWT secret
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your backend URL
```

## 🚀 Running the Application

### Option 1: Manual Start

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Option 2: Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d
```

Access the application at `http://localhost:5173`

## 📁 Project Structure

```
jobportal/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Auth, validation, rate limiting
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── index.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks
│   │   ├── redux/       # State management
│   │   ├── utils/       # Helpers & constants
│   │   └── App.jsx      # Main app component
│   └── public/
└── docker-compose.yml
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/jobportal
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

## 📊 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user
- `POST /api/v1/user/profile/update` - Update profile

### Companies
- `POST /api/v1/company/register` - Register company
- `GET /api/v1/company/get` - Get user companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company

### Jobs
- `POST /api/v1/job/post` - Post job (recruiter only)
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `GET /api/v1/job/getadminjobs` - Get admin jobs

### Applications
- `POST /api/v1/application/apply/:jobId` - Apply to job
- `GET /api/v1/application/get/:id` - Get application
- `GET /api/v1/application/getadminjobs/:id/applicants` - Get applicants

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure authentication
- **HTTP-only Cookies**: XSS protection
- **Rate Limiting**: Brute force protection
- **Helmet.js**: Security headers
- **Input Validation**: Client & server-side
- **CORS**: Configured origins

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop (1280px+)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend
- Deploy to Heroku, Railway, or Render
- Use MongoDB Atlas for database
- Configure environment variables

### Frontend
- Deploy to Vercel, Netlify, or GitHub Pages
- Update backend URL in environment variables

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built with ❤️ using the MERN Stack

---

## 🆘 Quick Start with Docker

```bash
# Make sure Docker Desktop is running
docker-compose up --build
```

Access at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🛠️ Manual Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## ❓ Troubleshooting

**MongoDB Connection Error**: Start MongoDB or use MongoDB Atlas  
**Port in Use**: Run `npx kill-port 3000` and `npx kill-port 5173`  
**Upload Errors**: Check Cloudinary credentials in .env

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Advanced job filters
- [ ] Job recommendations
- [ ] Chat between recruiters & candidates
- [ ] Resume parsing
- [ ] Interview scheduling
- [ ] Analytics dashboard
- [ ] Social login (Google, LinkedIn)
- [ ] Multi-language support
