import { AppProps } from 'next/app';
import '../styles/homepage.css';
import '../styles/room.css';
import '../styles/globals-livekit.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
