import React from 'react';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div>
      <h1>About Me</h1>
      <p>Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee Nerd.</p>
      <ul>
        <li>Cyber Security</li>
        <li>Software Engineer</li>
        <li>Travel</li>
        <li>Coffee</li>
        <li>Music</li>
        <li>Random Thoughts and words of wisdom</li>
      </ul>
      <blockquote>
        <p>Live, Learn, Travel, Never forget your hobbies!</p>
      </blockquote>
    </div>
  );
};

export default About;
