import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div>
          <img
            src="/images/profile.png"
            className="circle"
            alt="work by me hacker1db"
            style={{ maxWidth: '25%' }}
          />
          <h1>Hacker1db.dev blog</h1>
          <p>Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee Nerd.</p>
          <div>
            <a href="https://www.twitter.com/hacker1db">Twitter</a>
            <a href="https://www.instagram.com/hacker1db">Instagram</a>
            <a href="https://www.twitch.tv/hacker1db">Twitch</a>
            <a href="https://www.github.com/hacker1db">GitHub</a>
            <a href="https://www.youtube.com/channel/UCApwUq9I-WDU_L2-Z4Tc1Aw">YouTube</a>
            <a href="https://tryhackme.com/p/hacker1db">TryHackMe</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
