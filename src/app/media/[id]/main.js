'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function MediaPage() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mediaErrors, setMediaErrors] = useState({});

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        console.log('Fetching media for ID:', params.id);
        const res = await axios.get(`/api/media/${params.id}`);
        console.log('Media data received:', res.data);
        // API now returns data directly, not wrapped in .data
        setData(res.data);
      } catch (err) {
        console.error('Error fetching media:', err);
        setError('Media not found or failed to load');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMedia();
    }
  }, [params.id]);

  const getFileType = (filename) => {
    const ext = filename.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      return 'image';
    }
    if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
      return 'video';
    }
    return 'unknown';
  };

  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMediaError = (index) => {
    console.error('Media failed to load at index:', index);
    setMediaErrors(prev => ({ ...prev, [index]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading media...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/upload"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-block"
            >
              Go to Upload
            </a>
          </div>
        </div>
      </div>
    );
  }

  // If we have data, always show it (even if some media fails to load)
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">📱 Media Details</h1>
            <p className="text-indigo-100 text-sm">
              Created: {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Short Description */}
          <div className="bg-indigo-50 border-b border-indigo-100 p-6">
            <h2 className="text-sm font-semibold text-indigo-900 mb-2">
              ✨ AI Summary
            </h2>
            <p className="text-lg text-gray-800 font-medium">{data.shortDesc}</p>
          </div>

          {/* Full Description */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              📝 Full Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {data.fullDesc}
            </p>
          </div>

          {/* Media Files */}
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              🎬 Media Files ({data.files?.length || 0})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.files?.map((file, index) => {
                const fileType = getFileType(file);
                const hasError = mediaErrors[index];
                
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {fileType === 'image' && !hasError && (
                      <img
                        src={file}
                        alt={`Media ${index + 1}`}
                        className="w-full h-64 object-cover"
                        onError={() => handleMediaError(index)}
                      />
                    )}
                    {fileType === 'image' && hasError && (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-sm text-gray-500">Image not available</p>
                          <p className="text-xs text-gray-400 mt-1 break-all">{file.split('/').pop()}</p>
                        </div>
                      </div>
                    )}
                    {fileType === 'video' && !hasError && (
                      <video
                        controls
                        className="w-full h-64 bg-black"
                        preload="metadata"
                        onError={() => handleMediaError(index)}
                      >
                        <source src={file} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {fileType === 'video' && hasError && (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🎬</div>
                          <p className="text-sm text-gray-500">Video not available</p>
                          <p className="text-xs text-gray-400 mt-1 break-all">{file.split('/').pop()}</p>
                        </div>
                      </div>
                    )}
                    {fileType === 'unknown' && (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">📄</div>
                          <p className="text-sm text-gray-500">File type not supported</p>
                        </div>
                      </div>
                    )}
                    <div className="p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-3 truncate" title={file.split('/').pop()}>
                        {file.split('/').pop()}
                      </p>
                      <button
                        onClick={() => handleDownload(file)}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm"
                      >
                        ⬇️ Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download All Button */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="text-center">
              <a
                href="/upload"
                className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                📤 Upload New Media
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
