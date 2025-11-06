export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            📱 Scanart
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A fully local multimedia storage system powered by QR codes and AI summarization
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/upload"
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Uploading
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Media</h3>
            <p className="text-gray-600">
              Upload multiple images and videos with detailed descriptions
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Summary</h3>
            <p className="text-gray-600">
              Groq LLaMA automatically generates short summaries of your content
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📲</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">QR Code Share</h3>
            <p className="text-gray-600">
              Get instant QR codes to share your media across the local network
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Upload Your Media</h4>
                <p className="text-gray-600">Select images/videos and add a description</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Generates Summary</h4>
                <p className="text-gray-600">Groq LLaMA creates a concise summary automatically</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Get Your QR Code</h4>
                <p className="text-gray-600">Receive a unique QR code linking to your media</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Share & Access</h4>
                <p className="text-gray-600">Anyone on the same network can scan and view your content</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/upload"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Get Started Now →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-sm">
            💡 Perfect for hackathon demos and local file sharing
          </p>
          <p className="text-xs mt-2">
            All data stored locally • Works on your network
          </p>
        </div>
      </div>
    </div>
  );
}
