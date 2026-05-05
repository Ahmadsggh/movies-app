import './AboutPage.css';

function AboutPage() {
  const teamMembers = [
    { name: 'Team Member 1', role: 'Frontend Developer', emoji: '👨‍💻' },
    { name: 'Team Member 2', role: 'UI/UX Designer', emoji: '🎨' },
    { name: 'Team Member 3', role: 'React Developer', emoji: '⚛️' },
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>🎬 About MovieDB</h1>
        <p>A modern movie browsing application built with React.js</p>
      </div>

      <div className="about-section">
        <h2>📖 About the Project</h2>
        <p>
          MovieDB is a component-based front-end web application built as part of the
          Web Applications Programming and Engineering course. It demonstrates modern
          React.js concepts including functional components, hooks, state management,
          client-side routing, and responsive design.
        </p>
      </div>

      <div className="about-section">
        <h2>⚙️ Technologies Used</h2>
        <div className="tech-grid">
          <div className="tech-card">⚛️ React.js</div>
          <div className="tech-card">🔀 React Router</div>
          <div className="tech-card">⚡ Vite</div>
          <div className="tech-card">🎨 CSS3</div>
          <div className="tech-card">📦 npm</div>
          <div className="tech-card">🚀 Render.com</div>
        </div>
      </div>

      <div className="about-section">
        <h2>👥 Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-emoji">{member.emoji}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
