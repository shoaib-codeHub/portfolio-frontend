import React from 'react';
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.png"
import blob from "../assets/blob.svg"
import "./Home.css";
const Home = () => {

  return (
    <>
      <div className="hero-section">
        <div className="hero-info">
          <h1 className="hero-title">
            Full Stack Developer crafting scalable and user-friendly web applications
          </h1>

          <p className="hero-subtext">
            I build responsive web apps using React, Node.js, and PostgreSQL, focusing on performance and clean design.
          </p>

          <div className="hero-buttons">
            <NavLink to="/projects" className="btn primary">
              View Projects
            </NavLink>

            <NavLink to="/contact" className="btn secondary">
              Contact Me
            </NavLink>
          </div>
        </div>

        <div className="hero-profile">
          <div className="blob-container">
            <img src={blob} alt="blob" className="blob" />
            <img src={profile} alt="profile" className="profile" />
          </div>
        </div>
      </div>

{/* ABOUT SECTION */}
<section className="about-preview">
  <div className="about-container">
    <div className="about-text">
      <h2>About Me</h2>

      <p>
        I’m a full stack developer focused on building modern, scalable web applications.
        I enjoy turning complex problems into simple, clean, and efficient solutions.
      </p>

      <NavLink to="/about" className="btn secondary">
        Learn More
      </NavLink>
    </div>
  </div>
</section>

{/* PROJECT PREVIEW SECTION */}
<section className="project-preview">
  <div className="project-preview-container">

    <div className="project-preview-text">
      <h2>My Work</h2>

      <p>
        Explore some of my recent projects showcasing full stack development,
        responsive design, and scalable architecture.
      </p>

      <NavLink to="/projects" className="btn primary">
        View Projects
      </NavLink>
    </div>

  </div>
</section>



















      <section className="contact-preview">
        <div className="contact-box">
          <h2>Let’s Build Something Great 🚀</h2>

          <p>
            I’m open to freelance projects, collaborations, or full-time opportunities.
            Let’s connect and turn your ideas into reality.
          </p>

          <div className="contact-actions">
            <NavLink to="/contact" className="btn primary">
              Contact Me
            </NavLink>

            <a
              href="https://github.com/shoaib-codeHub"
              target="_blank"
              className="btn secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home