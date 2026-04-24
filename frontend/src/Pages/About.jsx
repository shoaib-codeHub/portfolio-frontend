import React from "react";
import "./About.css";

const About = () => {
  // Categorized skills for a more professional presentation
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap"]
    },
    {
      title: "Backend & Database",
      skills: ["Node.js", "Express", "Postgres", "SQL"]
    },
    {
      title: "Tools & Version Control",
      skills: ["Git", "GitHub"]
    }
  ];

  // Extracted timeline data for cleaner code and easy updates
  const timelineData = [
    {
      role: "UI Development Intern",
      organization: "iStudio Virtual",
      timeline: "2025",
      description: "Built responsive e-commerce UI using HTML, CSS, JavaScript & Bootstrap. Focused on real-world UI/UX practices and performance optimization."
    },
    {
      role: "BCA - Computer Science",
      organization: "Shekhawati Group of Institutions, Sikar",
      timeline: "2023 – 2026",
      description: "Building a strong foundation in computer science principles, data structures, and software engineering methodologies."
    }
  ];

  return (
    <section className="about-page fade-in">
      
      {/* HERO SECTION */}
      <div className="about-hero">
        <h1>Building Modern Web Experiences</h1>
        <p>
          I am a Full Stack Developer focused on performance, scalability, and clean UI. 
          Bridging the gap between design and engineering, I turn complex ideas into 
          real-world, user-centric web applications.
        </p>
      </div>

      {/* TIMELINE SECTION */}
      <div className="about-content">
        <div className="timeline-section">
          <h2>Experience & Education</h2>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <span className="timeline-date">{item.organization} | {item.timeline}</span>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <div className="skills-section">
        <h2>Technical Arsenal</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div className="skill-category" key={index}>
              <h3>{category.title}</h3>
              <div className="skills-container">
                {category.skills.map((skill, i) => (
                  <div className="skill-pill" key={i}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;