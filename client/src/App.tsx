import React, { useState } from 'react';
// Import components for different phases later
// import ResumeUpload from './components/ResumeUpload';
// import SkillGapViewer from './components/SkillGapViewer';
// import LearningPlan from './components/LearningPlan';
// import MentorConnect from './components/MentorConnect';

function App() {
  const [message, setMessage] = useState('Loading...');

  // Example API call (replace with actual logic later)
  React.useEffect(() => {
    fetch('/api/') // Assuming server runs on the same host or proxy is set up
      .then(res => res.ok ? res.text() : Promise.reject(`HTTP error! status: ${res.status}`))
      .then(data => setMessage(data))
      .catch(error => {
        console.error("Error fetching from server:", error);
        setMessage("Failed to connect to server. Is it running?");
      });
  }, []);


  return (
    <div>
      <h1>SkillSync AI Dashboard</h1>
      <p>Server status: {message}</p>
      {/* Placeholder sections for future components */}
      <section>
        <h2>Phase 1: Upload Resume / Connect GitHub</h2>
        {/* <ResumeUpload /> */}
        <p>Component placeholder...</p>
      </section>
      <section>
        <h2>Phase 2: Analyze & View Skill Gaps</h2>
        {/* <SkillGapViewer /> */}
        <p>Component placeholder...</p>
      </section>
      <section>
        <h2>Phase 3: Generate Learning Plan</h2>
        {/* <LearningPlan /> */}
        <p>Component placeholder...</p>
      </section>
      <section>
        <h2>Phase 4: Connect with Mentors</h2>
        {/* <MentorConnect /> */}
        <p>Component placeholder...</p>
      </section>
    </div>
  );
}

export default App; 