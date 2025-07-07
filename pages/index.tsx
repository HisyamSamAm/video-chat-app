import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const generateRoomId = () => {
    return 'room-' + Math.random().toString(36).substring(2, 10);
  };

  const handleCreateRoom = () => {
    if (!participantName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    const newRoomId = generateRoomId();
    setIsCreating(true);
    
    // Show room ID to user
    alert(`Room created! Room ID: ${newRoomId}\nShare this ID with others to join.`);
    
    router.push(`/room/${newRoomId}?name=${encodeURIComponent(participantName)}`);
  };

  const handleJoinRoom = () => {
    if (!roomId.trim() || !participantName.trim()) {
      alert('Please enter both room ID and your name');
      return;
    }
    
    router.push(`/room/${roomId}?name=${encodeURIComponent(participantName)}`);
  };

  return (
    <>
      <Head>
        <title>Simple Video Chat</title>
        <meta name="description" content="Simple video chat like Zoom" />
      </Head>

      <div className="homepage-container">
        <div className="homepage-card">
          <h1 className="homepage-title">
            Simple Video Chat
          </h1>
          
          <div className="form-group">
            <label className="form-label">
              Your Name
            </label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Enter your name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <button
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="btn btn-primary"
            >
              {isCreating ? 'Creating Room...' : 'Create New Room'}
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="form-group">
            <label className="form-label">
              Room ID
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="form-input"
            />
          </div>

          <button
            onClick={handleJoinRoom}
            className="btn btn-success"
          >
            Join Room
          </button>

          <div className="instructions-box">
            <h3 className="instructions-title">How to use:</h3>
            <ol className="instructions-list">
              <li>Open two browser tabs/windows</li>
              <li>In first tab: Enter name → Create Room</li>
              <li>Copy the room ID from the alert or URL</li>
              <li>In second tab: Enter name → Enter room ID → Join Room</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}