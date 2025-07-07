import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function JoinRoom() {
  const [roomId, setRoomId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleJoinRoom = () => {
    if (!roomId.trim() || !participantName.trim()) {
      alert('Please enter both room ID and your name');
      return;
    }
    
    setIsJoining(true);
    router.push(`/room/${roomId}?name=${encodeURIComponent(participantName)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <>
      <Head>
        <title>Join Room - Video Chat</title>
        <meta name="description" content="Join a video chat room" />
      </Head>

      <div className="join-container">
        <div className="join-card">
          <div className="join-header">
            <h1 className="join-title">Join Video Chat</h1>
            <p className="join-subtitle">Enter room details to join the conversation</p>
          </div>
          
          <div className="join-form">
            <div className="form-group">
              <label className="form-label">
                Your Name
              </label>
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name"
                className="form-input"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Room ID
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter room ID"
                className="form-input"
              />
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={isJoining}
              className="btn btn-primary btn-large"
            >
              {isJoining ? 'Joining Room...' : 'Join Room'}
            </button>
          </div>

          <div className="join-footer">
            <p className="join-help">
              Don&apos;t have a room ID? 
              <button 
                onClick={() => router.push('/')} 
                className="link-btn"
              >
                Create a new room
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .join-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .join-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(10px);
        }

        .join-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .join-title {
          color: #2d3748;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .join-subtitle {
          color: #718096;
          font-size: 1rem;
          margin: 0;
        }

        .join-form {
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          transform: none;
        }

        .btn-large {
          padding: 18px 16px;
          font-size: 18px;
        }

        .join-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .join-help {
          color: #718096;
          font-size: 0.9rem;
          margin: 0;
        }

        .link-btn {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
          margin-left: 4px;
        }

        .link-btn:hover {
          color: #764ba2;
        }

        @media (max-width: 768px) {
          .join-container {
            padding: 12px;
          }
          
          .join-card {
            padding: 24px;
          }
          
          .join-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
}
