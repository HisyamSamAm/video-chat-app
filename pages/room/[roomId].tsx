import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import VideoRoom from '../../components/VideoRoom';

export default function RoomPage() {
  const router = useRouter();
  const { roomId, name } = router.query;
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!roomId || !name) return;

    const getToken = async () => {
      try {
        const response = await fetch('/api/get-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: roomId as string,
            participantName: name as string,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get token');
        }

        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        setError('Failed to join room. Please try again.');
        console.error('Error getting token:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, [roomId, name]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-title">Joining room...</div>
        <div className="loading-subtitle">Please wait while we connect you</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠</div>
        <div className="error-title">Connection Failed</div>
        <div className="error-message">{error}</div>
        <button
          onClick={() => router.push('/')}
          className="error-btn"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Room {roomId} - Video Chat</title>
      </Head>
      
      <VideoRoom
        token={token}
        roomId={roomId as string}
        participantName={name as string}
        onLeave={() => router.push('/')}
      />
    </>
  );
}