# React Blog App

A modern application built with React, featuring user authentication, markdown editing, and comprehensive post management capabilities.
![react-blot](https://github.com/user-attachments/assets/ba107c0d-ba4c-487c-93f3-c9f588c08dd8)

## 🚀 Features

### User Authentication
- **User Registration & Login** - Secure authentication system
- **Protected Routes** - Route protection for authenticated users

### Post Management (CRUD)
- **Create Posts** - Rich text editor with markdown support
- **Read Posts** - Clean, responsive post viewing experience
- **Update Posts** - Edit existing posts with real-time preview
- **Delete Posts** - Remove posts with confirmation dialogs

### Content Creation
- **Markdown Editor** - Built-in text editor supporting markdown syntax
- **Live Preview** - Real-time markdown preview while writing
- **Syntax Highlighting** - Enhanced code block support in posts

### Social Features
- **Like/Unlike System** - Interactive post engagement
- **Commenting System** - Users can comment on posts
- **User Profiles** - View and manage user profiles

### Search & Discovery
- **Post Search** - Full-text search across all posts
- **Content Filtering** - Filter posts by categories, tags, or authors
- **Pagination** - Efficient content loading with page navigation

### User Experience
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Modern UI Components** - Clean interface using DaisyUI
- **Form Validation** - Robust form handling with React Hook Form
- **Loading States** - Smooth user experience with loading indicators

## 🛠️ Tech Stack

### Frontend
- **React** - Component-based UI library
- **React Router** - Client-side routing and navigation
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind

### State Management & Forms
- **Context** - Global state management
- **React Hook Form** - Performant form library with validation
- **Axios** - HTTP client for API requests

### Development Tools
- **Vite** - Build tool and development server
- **ESLint** - Code linting and formatting


## 🔧 Key Components

### Authentication System
- JWT-based authentication
- Protected route wrapper

### Post Editor
- Markdown syntax support
- Real-time preview
- Image upload capability

### Search & Filter System
- Debounced search input
- filter criteria
- pagination options

## 📱 API Integration

The application integrates with a RESTful API with the following endpoints:

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Posts
- `GET /posts` - Fetch posts (with pagination/filtering)
- `GET /posts/:id` - Fetch single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments
- `GET /comments?postId=:id` - Fetch comments for a post
- `POST /comments` - Add comment to a post
- `DELETE /comments/:id` - Delete comment


## 🎨 Styling

The application uses a modern design system built with:

- **TailwindCSS** for utility-first styling
- **DaisyUI** for pre-built component themes
- **Responsive design** patterns
- **Dark/light mode** support
