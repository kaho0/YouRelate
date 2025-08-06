# YouRelate - Next.js Frontend

A modern Next.js frontend for the YouRelate YouTube Q&A system, built with TypeScript and Tailwind CSS.

## Features

- 🎥 YouTube video Q&A interface
- 🤖 AI-powered answers using Google Gemini
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast and intuitive user experience with Next.js
- 📱 Mobile-friendly design
- 🚀 Server-side rendering capabilities

## Tech Stack

- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling (built-in support)
- **Lucide React** for icons
- **Axios** for API calls

## Getting Started

### Prerequisites

Make sure you have the backend running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. The app will connect to the backend automatically
2. Enter your question about the YouTube video in the text area
3. Click "Ask Question" to get an AI-powered answer
4. The answer will be displayed below the form

## API Endpoints

The frontend communicates with the following backend endpoints:

- `POST /query/` - Submit a question about a YouTube video

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main application component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles with Tailwind
└── ...
```

## Backend Integration

This frontend is designed to work with the FastAPI backend that:
- Fetches YouTube video transcripts
- Creates vector embeddings for semantic search
- Uses Google Gemini AI for answer generation

Make sure the backend is running before using the frontend.
