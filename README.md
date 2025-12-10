# Simple API Integration

A lightweight Express.js API that integrates with JSONPlaceholder to fetch and filter posts with caching support.

## Features

- Fetch all posts with optional filtering
- Get individual posts with user information
- In-memory caching for improved performance
- Query by user ID or search terms
- Comprehensive error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ravirraj/simple-api-integration.git
cd simple-api-integration
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### Get All Posts
```
GET /posts
```

**Query Parameters:**
- `userId` (optional) - Filter posts by user ID
- `search` (optional) - Search posts by title or body

**Example:**
```bash
curl http://localhost:3000/posts?userId=1
curl http://localhost:3000/posts?search=lorem
```

### Get Post by ID
```
GET /posts/:id
```

**Example:**
```bash
curl http://localhost:3000/posts/1
```

## Project Structure

```
src/
├── app.js                     # Express app configuration
├── server.js                  # Server entry point
├── routes/
│   └── posts.routes.js        # Posts route handlers
└── services/
    └── jsonPlaceHolderApi.js  # API integration & caching logic
```

## Dependencies

- **express** - Web framework
- **axios** - HTTP client for API requests
- **nodemon** (dev) - Auto-restart during development
