import { useState } from 'react';
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  Chat,
  useTracks,
  MediaDeviceSelect,
  TrackToggle,
  DisconnectButton,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import styles from '../styles/VideoRoom.module.css';

interface VideoRoomProps {
  token: string;
  roomId: string;
  participantName: string;
  onLeave: () => void;
}

// Custom Room Content Component
function RoomContent() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - 160px)' }}>
      <ParticipantTile />
    </GridLayout>
  );
}

// Custom Control Bar Component
function CustomControlBar({ 
  onToggleChat, 
  showChat, 
  chatHasNewMessages 
}: { 
  onToggleChat: () => void; 
  showChat: boolean;
  chatHasNewMessages: boolean;
}) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <div className={styles.customControlBar}>
      <div className={styles.controlGroup}>
        {/* Camera Control */}
        <TrackToggle
          source={Track.Source.Camera}
          className={`${styles.controlBtn} ${styles.cameraBtn} ${isCameraOn ? styles.active : styles.inactive}`}
          onChange={(enabled) => setIsCameraOn(enabled)}
        >
          <span className={styles.controlIcon}>
            {isCameraOn ? '📹' : '📵'}
          </span>
          <span className={styles.controlLabel}>
            {isCameraOn ? 'Camera' : 'Camera Off'}
          </span>
        </TrackToggle>

        {/* Microphone Control */}
        <TrackToggle
          source={Track.Source.Microphone}
          className={`${styles.controlBtn} ${styles.micBtn} ${isMicOn ? styles.active : styles.inactive}`}
          onChange={(enabled) => setIsMicOn(enabled)}
        >
          <span className={styles.controlIcon}>
            {isMicOn ? '🎤' : '🔇'}
          </span>
          <span className={styles.controlLabel}>
            {isMicOn ? 'Mic' : 'Mic Off'}
          </span>
        </TrackToggle>

        {/* Chat Toggle */}
        <button
          onClick={onToggleChat}
          className={`${styles.controlBtn} ${styles.chatBtn} ${showChat ? styles.active : styles.inactive}`}
        >
          <span className={styles.controlIcon}>💬</span>
          <span className={styles.controlLabel}>Chat</span>
          {chatHasNewMessages && !showChat && (
            <span className={styles.notificationBadge}>!</span>
          )}
        </button>

        {/* Leave Room */}
        <DisconnectButton className={`${styles.controlBtn} ${styles.leaveBtn}`}>
          <span className={styles.controlIcon}>📞</span>
          <span className={styles.controlLabel}>Leave</span>
        </DisconnectButton>
      </div>

      {/* Device Selection */}
      <div className={styles.deviceControls}>
        <MediaDeviceSelect kind="audioinput" className={styles.deviceSelect} />
        <MediaDeviceSelect kind="videoinput" className={styles.deviceSelect} />
      </div>
    </div>
  );
}

export default function VideoRoom({
  token,
  roomId,
  participantName,
  onLeave,
}: VideoRoomProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatHasNewMessages, setChatHasNewMessages] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';

  const handleToggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setChatHasNewMessages(false);
    }
  };

  return (
    <div className={styles.roomContainer}>
      {/* Header */}
      <div className={styles.roomHeader}>
        <div className={styles.roomInfo}>
          <h1 className={styles.roomTitle}>Room: {roomId}</h1>
          <p className={styles.roomSubtitle}>
            {participantName} 
            <span className={`${styles.roomStatus} ${isConnected ? styles.connected : styles.connecting}`}>
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
          </p>
        </div>
      </div>

      {/* Video Conference */}
      <div className={styles.videoContainer}>
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          data-lk-theme="default"
          className={styles.livekitRoom}
          onConnected={() => {
            setIsConnected(true);
            console.log('Connected to room:', roomId);
          }}
          onDisconnected={() => {
            setIsConnected(false);
            console.log('Disconnected from room');
            onLeave();
          }}
          onError={(error) => {
            console.error('LiveKit error:', error);
            alert('Connection error. Please check your internet connection and try again.');
          }}
        >
          <RoomContent />
          <RoomAudioRenderer />
          
          {/* Custom Control Bar */}
          <CustomControlBar 
            onToggleChat={handleToggleChat}
            showChat={showChat}
            chatHasNewMessages={chatHasNewMessages}
          />

          {/* Chat Overlay */}
          {showChat && (
            <div className={styles.chatOverlay}>
              <div className={styles.chatHeader}>
                <h3>Chat</h3>
                <button onClick={() => setShowChat(false)} className={styles.closeChat}>×</button>
              </div>
              <Chat />
            </div>
          )}
        </LiveKitRoom>
      </div>
    </div>
  );
}
