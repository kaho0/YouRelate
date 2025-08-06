'use client';

import { useState } from 'react';
import { Search, Play, MessageCircle, Loader2, Send, Youtube, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface QueryResponse {
  answer: string;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [videoId, setVideoId] = useState('34Na4j8AVgA');
  const [processingVideo, setProcessingVideo] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('34Na4j8AVgA');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setSuccess('');
    setAnswer('');

    try {
      const response = await axios.post<QueryResponse>('http://localhost:8000/query/', {
        video_id: currentVideoId,
        question: question.trim()
      });

      setAnswer(response.data.answer);
    } catch (err) {
      setError('Failed to get answer. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessVideo = async () => {
    if (!videoId.trim()) return;

    setProcessingVideo(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:8000/process-video/', {
        video_id: videoId.trim()
      });
      
      setCurrentVideoId(videoId.trim());
      setAnswer(''); // Clear previous answer
      setSuccess(`Video ${videoId.trim()} processed successfully! You can now ask questions about it.`);
    } catch (err) {
      setError('Failed to process video. Please check the video ID and try again.');
      console.error('Error:', err);
    } finally {
      setProcessingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Youtube className="w-12 h-12 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">YouRelate</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask questions about YouTube videos and get intelligent answers powered by AI
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Video Input Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Play className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Video Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="videoId" className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Video ID
                </label>
                <div className="flex gap-2">
                  <input
                    id="videoId"
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    placeholder="Enter YouTube video ID (e.g., dQw4w9WgXcQ)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    disabled={processingVideo}
                  />
                  <button
                    onClick={handleProcessVideo}
                    disabled={processingVideo || !videoId.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                  >
                    {processingVideo ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Process Video
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the video ID from a YouTube URL (the part after v=)
                </p>
              </div>
            </div>
          </div>

          {/* Current Video Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Play className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Current Video</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <span className="font-medium">Video ID:</span> {currentVideoId}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This video has been indexed and is ready for questions
              </p>
            </div>
          </div>

          {/* Question Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Ask a Question</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to know about this video?
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about the video content..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                  rows={4}
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Getting Answer...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Ask Question
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Answer Display */}
          {answer && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Search className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Answer</h2>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {answer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Powered by AI • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
