import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-bold my-8">About Me</h1>
        <p className="text-lg mb-8">
          Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee Nerd.
        </p>
        <ul className="list-disc list-inside mb-8">
          <li>Cyber Security</li>
          <li>Software Engineer</li>
          <li>Travel</li>
          <li>Coffee</li>
          <li>Music</li>
          <li>Random Thoughts and words of wisdom</li>
        </ul>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
          Live, Learn, Travel, Never forget your hobbies!
        </blockquote>
      </main>
      <Footer />
    </div>
  );
};

export default About;
