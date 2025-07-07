import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { roomId, participantName } = req.body;

  if (!roomId || !participantName) {
    return res.status(400).json({ error: 'Room ID and participant name are required' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  console.log('Manual Token API Debug:', {
    apiKey: apiKey ? 'Key exists' : 'No key',
    apiSecret: apiSecret ? 'Secret exists' : 'No secret',
    wsUrl: wsUrl ? wsUrl : 'No URL',
    roomId,
    participantName
  });

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Create JWT payload manually
    const payload = {
      iss: apiKey,
      sub: participantName,
      video: {
        roomJoin: true,
        room: roomId,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
      },
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
    };

    const token = jwt.sign(payload, apiSecret, {
      algorithm: 'HS256',
      header: {
        alg: 'HS256',
        typ: 'JWT'
      }
    });

    console.log('Manual token generated successfully for:', participantName, 'in room:', roomId);

    res.status(200).json({ 
      token: token,
      wsUrl: wsUrl,
      roomId: roomId,
      participantName: participantName
    });
  } catch (error) {
    console.error('Error generating manual token:', error);
    res.status(500).json({ 
      error: 'Failed to generate token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
