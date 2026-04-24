import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "./Project.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="projects-page">
      <h2>My Projects</h2>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            description={p.description}
            tech_stack={p.tech_stack}
            live_link={p.live_link}
            github_link={p.github_link}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;