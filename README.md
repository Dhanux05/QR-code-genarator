# 📱 QR Media Storage - Local Multimedia System

A fully local Next.js 14 application that creates a QR-based multimedia storage system perfect for hackathon demos and local network file sharing.

## ⚙️ Features

- 📤 **Upload Multiple Files**: Support for images and videos
- 🤖 **AI-Powered Summaries**: Automatic text summarization using Groq LLaMA API
- 📲 **QR Code Generation**: Instant QR codes for easy sharing
- 🌐 **Local Network Access**: Anyone on the same WiFi can access shared media
- 💾 **JSON-Based Storage**: Simple file-based database for quick demos
- 🎨 **Beautiful UI**: Clean interface built with Tailwind CSS

Live Demo-https://690dcc58945a3cd253e7377c--qr-code-genaratorr.netlify.app/

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Groq API key ([Get one free at console.groq.com](https://console.groq.com))

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd d:\Practice\DUMMY
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Open `.env.local` in the project root
   - Replace `your_groq_api_key_here` with your actual Groq API key:
     ```env
     GROQ_API_KEY=gsk_your_actual_key_here
     BASE_URL=http://localhost:3000
     ```

4. **Find your local IP address** (for network access):
   
   **Windows (PowerShell)**:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" under your active network adapter (e.g., `192.168.1.100`)

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the application**:
   - Local: http://localhost:3000
   - **Network access**: http://YOUR_IP:3000 (e.g., http://192.168.1.100:3000)

## 📖 How to Use

### 1. Upload Media

1. Navigate to http://localhost:3000
2. Click "Start Uploading" or go to `/upload`
3. Enter a detailed description of your media
4. Select one or more image/video files
5. Click "Upload & Generate QR Code"

### 2. Share via QR Code

- The system will:
  - Upload your files to `/public/uploads`
  - Generate an AI summary using Groq LLaMA
  - Save metadata to `/data/db.json`
  - Create a QR code pointing to your media

### 3. Access Media

- **Scan the QR code** with any device on the same network
- Or click "Copy Link" to share the URL directly
- The media page displays:
  - AI-generated summary
  - Full description
  - All uploaded media (images/videos)
  - Download buttons for each file

## 🏗️ Project Structure

```
DUMMY/
├── src/
│   └── app/
│       ├── api/
│       │   ├── upload/route.js          # File upload handler
│       │   ├── shorten/route.js         # AI summarization
│       │   ├── generate-qr/route.js     # QR code generation
│       │   ├── save-entry/route.js      # Save to database
│       │   └── media/[id]/route.js      # Fetch media by ID
│       ├── upload/page.js               # Upload form page
│       ├── media/[id]/page.js           # Media display page
│       ├── page.js                      # Home page
│       ├── layout.js                    # Root layout
│       └── globals.css                  # Tailwind styles
├── lib/
│   ├── groq.js                          # Groq API helper
│   └── db.js                            # JSON database CRUD
├── public/
│   └── uploads/                         # Uploaded media files
├── data/
│   └── db.json                          # Local database
├── .env.local                           # Environment variables
└── package.json
```

## 🌐 Network Access Setup

### For Other Devices to Access:

1. **Get your computer's local IP**:
   ```powershell
   ipconfig
   ```

2. **Update BASE_URL in `.env.local`** (optional, for QR codes):
   ```env
   BASE_URL=http://192.168.1.100:3000
   ```

3. **Ensure firewall allows Node.js**:
   - Windows: Allow Node.js through Windows Defender Firewall
   - The dev server should be accessible on port 3000

4. **Access from other devices**:
   - Connect to the same WiFi network
   - Open: `http://YOUR_IP:3000`
   - Scan QR codes to view media

### Troubleshooting Network Access

If devices can't connect:

1. Check Windows Firewall settings
2. Verify both devices are on the same network
3. Try disabling VPN if running
4. Ensure Next.js dev server is running with `-H 0.0.0.0`:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

## 📦 Technologies Used

- **Next.js 14** - React framework with App Router
- **Groq SDK** - LLaMA AI model for text summarization
- **QRCode** - QR code generation library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **UUID** - Unique ID generation
- **Formidable** - Form data parsing

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload multiple files |
| `/api/shorten` | POST | Generate AI summary |
| `/api/generate-qr` | POST | Create QR code |
| `/api/save-entry` | POST | Save entry to database |
| `/api/media/[id]` | GET | Fetch media by ID |

## 💡 Use Cases

- **Hackathon Demos**: Quickly share project screenshots/videos
- **Local Events**: Share media without internet
- **Workshops**: Distribute materials to participants
- **Team Collaboration**: Quick file sharing on local network
- **Portfolio Presentations**: Instant media access via QR

## 🎯 Bonus Features Included

✅ **Copy Link Button**: One-click URL copying to clipboard  
✅ **Network Accessibility**: Full support for same-WiFi access  
✅ **Responsive Design**: Works on mobile and desktop  
✅ **File Type Detection**: Automatic image/video handling  
✅ **Download Functionality**: Individual file downloads  

## 📝 Database Format

Each entry in `/data/db.json`:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "shortDesc": "AI-generated summary",
  "fullDesc": "Full user description",
  "files": ["/uploads/abc123-image.jpg"],
  "createdAt": "2025-11-03T10:30:00.000Z"
}
```

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Groq API Errors
- Verify your API key in `.env.local`
- Check API rate limits at console.groq.com
- Ensure internet connection for API calls

### File Upload Fails
- Check `/public/uploads` directory exists
- Verify file size limits in Next.js config
- Check disk space

## 🔒 Security Notes

⚠️ **This is a LOCAL DEMO application**:
- No authentication/authorization
- Files stored in public directory
- Not suitable for production without security hardening
- Database is a plain JSON file

## 📄 License

This project is created for educational and demo purposes.

## 🤝 Contributing

This is a hackathon demo template. Feel free to fork and customize!

---

**Built with ❤️ for hackathons and local demos**

Need help? Check that:
1. ✅ Groq API key is set correctly
2. ✅ All dependencies are installed
3. ✅ Ports 3000 is available
4. ✅ Firewall allows local network access
