# 🎥 Video Chat Application with LiveKit

Aplikasi video chat modern yang dibangun dengan **Next.js** dan **LiveKit** untuk komunikasi real-time yang smooth dan reliable.

## 🚀 Fitur Utama

- ✅ **Video Call Real-time** - Kualitas video HD dengan latency rendah
- ✅ **Audio Chat** - Suara jernih dengan noise suppression
- ✅ **Text Chat** - Pesan instan selama video call
- ✅ **Device Control** - Kontrol camera dan microphone manual
- ✅ **Device Selection** - Pilih camera dan microphone yang diinginkan

## 🛠️ Teknologi yang Digunakan

### Framework & Library
- **Next.js 15** - React framework untuk production
- **TypeScript** - Type safety dan better development experience
- **LiveKit** - Real-time communication platform
- **CSS Modules** - Scoped styling untuk komponen

### LiveKit Components
Aplikasi ini menggunakan komponen-komponen LiveKit berikut:

#### 1. **LiveKitRoom**
```tsx
<LiveKitRoom token={token} serverUrl={serverUrl}>
  // Room container utama
</LiveKitRoom>
```
- **Fungsi**: Container utama untuk semua fitur LiveKit
- **Props**: Token autentikasi dan server URL
- **Event**: onConnected, onDisconnected, onError

#### 2. **GridLayout & ParticipantTile**
```tsx
<GridLayout tracks={tracks}>
  <ParticipantTile />
</GridLayout>
```
- **GridLayout**: Layout otomatis untuk video participants
- **ParticipantTile**: Komponen untuk menampilkan video setiap participant
- **Fitur**: Auto-resize, speaking indicator, name display

#### 3. **TrackToggle**
```tsx
<TrackToggle source={Track.Source.Camera} onChange={handleChange}>
  // Button untuk toggle camera/mic
</TrackToggle>
```
- **Fungsi**: Toggle on/off camera atau microphone
- **Props**: Source (Camera/Microphone), onChange callback
- **State**: Automatic track management

#### 4. **Chat**
```tsx
<Chat />
```
- **Fungsi**: Real-time text messaging
- **Fitur**: Message history, auto-scroll, typing indicator
- **UI**: Custom styling dengan dark theme

#### 5. **MediaDeviceSelect**
```tsx
<MediaDeviceSelect kind="videoinput" />
<MediaDeviceSelect kind="audioinput" />
```
- **Fungsi**: Dropdown untuk memilih device input
- **Kind**: videoinput (camera), audioinput (microphone)
- **Auto-detect**: Semua device yang tersedia

#### 6. **DisconnectButton**
```tsx
<DisconnectButton>Leave Room</DisconnectButton>
```
- **Fungsi**: Tombol untuk keluar dari room
- **Event**: Automatic cleanup dan disconnect

#### 7. **RoomAudioRenderer**
```tsx
<RoomAudioRenderer />
```
- **Fungsi**: Render audio dari semua participants
- **Hidden**: Tidak terlihat tapi penting untuk audio playback

## 🏗️ Struktur Project

```
video-chat-app/
├── components/
│   └── VideoRoom.tsx           # Main video room component
├── pages/
│   ├── index.tsx              # Homepage (join room)
│   ├── room/[roomId].tsx      # Dynamic room page
│   └── api/get-token.ts       # API untuk generate LiveKit token
├── styles/
│   ├── VideoRoom.module.css   # Component-specific styles
│   ├── globals-livekit.css    # Global LiveKit overrides
│   ├── homepage.css           # Homepage styles
│   └── room.css               # Room page styles
└── .env.local                 # Environment variables
```

## ⚙️ Setup dan Installation

### 1. Prerequisites
- Node.js 18+ 
- npm atau yarn
- LiveKit Cloud account (gratis)

### 2. Clone Repository
```bash
git clone <repository-url>
cd video-chat-app
```

### 3. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 4. Environment Setup
Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-url
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret
```

> **Cara mendapatkan LiveKit credentials:**
> 1. Daftar di [LiveKit Cloud](https://cloud.livekit.io)
> 2. Buat project baru
> 3. Copy URL, API Key, dan API Secret
> 4. Paste ke file `.env.local`

### 5. Run Development Server
```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🧪 Testing dengan Dua User

### Skenario Testing: Video Call 2 Orang

Untuk menguji fitur video call dengan 2 user secara bersamaan:

#### **Method 1: Incognito Window (Recommended)**

1. **Buka Browser Normal**
   ```
   http://localhost:3000
   ```
   - Masukkan nama: `User 1`
   - Masukkan room ID: `test-room`
   - Klik "Join Room"

2. **Buka Incognito/Private Window**
   ```
   Ctrl+Shift+N (Chrome)
   Ctrl+Shift+P (Firefox)
   ```
   - Buka `http://localhost:3000`
   - Masukkan nama: `User 2`
   - Masukkan room ID: `test-room` (sama!)
   - Klik "Join Room"

3. **Allow Camera & Microphone**
   - Browser akan minta permission
   - Klik "Allow" di kedua window
   - Pastikan camera dan mic aktif

#### **Method 2: Different Browsers**
- Browser 1: Chrome → `User 1`
- Browser 2: Firefox → `User 2`
- Room ID: sama untuk keduanya

#### **Method 3: Different Devices**
- Device 1: Laptop → `User 1`
- Device 2: HP → `User 2`
- Connect ke same WiFi network

### 🔍 Checklist Testing

**✅ Video Features:**
- [ ] Video dari kedua user terlihat
- [ ] Camera dapat di-toggle on/off
- [ ] Speaking indicator muncul saat bicara
- [ ] Video quality bagus dan smooth

**✅ Audio Features:**
- [ ] Audio dari kedua user terdengar
- [ ] Microphone dapat di-toggle on/off
- [ ] No echo atau feedback
- [ ] Audio sync dengan video

**✅ Chat Features:**
- [ ] Chat overlay dapat dibuka/ditutup
- [ ] Pesan terkirim real-time
- [ ] Notification badge muncul
- [ ] Message history tersimpan

**✅ Device Controls:**
- [ ] Device selection dropdown bekerja
- [ ] Ganti camera/mic tanpa disconnect
- [ ] Control buttons responsive
- [ ] Leave room berfungsi

### Custom Control Bar
```tsx
// Komponen custom untuk kontrol video call
<CustomControlBar>
  <CameraToggle />    // 📹 Camera on/off
  <MicToggle />       // 🎤 Microphone on/off
  <ChatToggle />      // 💬 Chat toggle
  <LeaveButton />     // 📞 Leave room
  <DeviceSelect />    // 🎛️ Device selection
</CustomControlBar>
```

### Chat Interface
```tsx
// Chat overlay dengan modern design
<ChatOverlay>
  <ChatHeader />      // Title dan close button
  <ChatMessages />    // Message history
  <ChatInput />       // Input untuk ketik pesan
</ChatOverlay>
```

## 🔧 Development

### Build Production

```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

## 📋 Troubleshooting

### Issue: Camera/Microphone Permission
**Problem**: Browser tidak meminta permission atau ditolak
**Solution**: 
1. Check browser settings → Privacy → Camera/Microphone
2. Refresh page dan allow permission
3. Pastikan HTTPS (localhost otomatis secure)

### Issue: Connection Failed
**Problem**: Tidak bisa connect ke LiveKit server
**Solution**:
1. Check `.env.local` file
2. Verify LiveKit URL dan credentials
3. Check network connection
4. Pastikan LiveKit server aktif

### Issue: Audio Echo
**Problem**: Suara echo atau feedback
**Solution**:
1. Gunakan headphone
2. Kurangi volume speaker
3. Test di device yang berbeda

### Issue: Video Quality Rendah
**Problem**: Video buram atau lag
**Solution**:
1. Check internet connection
2. Close aplikasi lain yang menggunakan bandwidth
3. Kurangi jumlah participants
4. Upgrade LiveKit plan jika perlu

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [LiveKit](https://livekit.io) untuk real-time communication platform
- [Next.js](https://nextjs.org) untuk React framework
- [Vercel](https://vercel.com) untuk deployment platform