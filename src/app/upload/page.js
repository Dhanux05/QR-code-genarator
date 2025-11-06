'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function UploadPage() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrCode(null);

    try {
      // Step 1: Upload files
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const uploadRes = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const uploadedFiles = uploadRes.data.files;

      // Step 2: Generate summary from description
    //   const shortenRes = await axios.post('/api/shorten', {
    //     text: description
    //   });

      const shortDesc = description

      // Step 3: Save entry to database
      const entryId = uuidv4();
      const entry = {
        id: entryId,
        shortDesc: shortDesc,
        fullDesc: description,
        files: uploadedFiles,
        createdAt: new Date().toISOString()
      };

      // Save to db.json via API
      await axios.post('/api/save-entry', entry);

      // Step 4: Generate QR code
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const url = `${baseUrl}/media/${entryId}`;
      setMediaUrl(url);

      const qrRes = await axios.post('/api/generate-qr', { url });
      setQrCode(qrRes.data.qrCode);

      // Reset form
      setDescription('');
      setFiles([]);
      e.target.reset();

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mediaUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📱 QR Media Storage
          </h1>
          <p className="text-gray-600">
            Upload your media and get a QR code for instant sharing
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="Enter a detailed description of your media..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Files (Images/Videos)
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {files.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  {files.length} file(s) selected
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Upload & Generate QR Code'}
            </button>
          </form>
        </div>

        {qrCode && (
          <div className="bg-white shadow-xl rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ✅ Success! Your QR Code is Ready
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg inline-block">
              <img src={qrCode} alt="QR Code" className="mx-auto" />
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-600">Scan this code to view your media</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  📋 Copy Link
                </button>
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  🔗 Open Link
                </a>
              </div>
              <p className="text-xs text-gray-500 break-all">{mediaUrl}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
