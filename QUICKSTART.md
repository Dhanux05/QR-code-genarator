# 🚀 Quick Start Guide

## First Time Setup (5 minutes)

### Step 1: Get Your Groq API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `gsk_...`)

### Step 2: Configure the Project
1. Open `.env.local` in the project root
2. Replace `your_groq_api_key_here` with your actual API key:
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   BASE_URL=http://localhost:3000
   ```
3. Save the file

### Step 3: Start the Server

**Option A: Local Only** (fastest)
```powershell
npm run dev
```

**Option B: Network Access** (for QR sharing)
```powershell
npm run dev:network
```

### Step 4: Open the App
- Go to: http://localhost:3000
- Click "Start Uploading"

---

## 📱 For Network Access (QR Code Sharing)

### Find Your IP Address

**Windows PowerShell:**
```powershell
.\get-ip.ps1
```

Or manually:
```powershell
ipconfig
```
Look for "IPv4 Address" (e.g., `192.168.1.100`)

### Update Environment (Optional)
For better QR codes, update `.env.local`:
```
BASE_URL=http://192.168.1.100:3000
```

### Share with Others
1. Ensure they're on the same WiFi
2. Start server with: `npm run dev:network`
3. They can access at: `http://YOUR_IP:3000`
4. Or scan the generated QR codes!

---

## 🎯 Usage Flow

1. **Upload Page** (`/upload`)
   - Enter description
   - Select files (images/videos)
   - Click upload
   - Get QR code

2. **Share**
   - Show QR code to others
   - Or copy the link
   - Anyone on WiFi can scan/access

3. **View Media** (`/media/[id]`)
   - Displays AI summary
   - Shows full description
   - Preview all media
   - Download individual files

---

## 🔧 Troubleshooting

### "API key not found" error
- Check `.env.local` has correct API key
- Restart the dev server after changing

### Can't access from other devices
1. Use `npm run dev:network` instead of `npm run dev`
2. Check Windows Firewall allows Node.js
3. Verify same WiFi network
4. Try disabling VPN

### Port 3000 already in use
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Files won't upload
- Check file size (max 50MB)
- Verify `/public/uploads` folder exists
- Check available disk space

---

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the UI in `src/app/upload/page.js`
- Add authentication for production use
- Deploy to a server for permanent hosting

---

## ⚡ Quick Commands

```powershell
# Run setup wizard
.\setup.ps1

# Get your network IP
.\get-ip.ps1

# Start development server (local)
npm run dev

# Start with network access
npm run dev:network

# Build for production
npm run build

# Run production build
npm start
```

---

**Need Help?** Check the main [README.md](README.md) for more details!
