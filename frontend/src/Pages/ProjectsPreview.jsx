import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "./Projectspreview.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProjectsPreview = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      setProject(data[0]);
    };

    fetchProject();
  }, []);

  if (!project) return null;

  return (
    <section className="projects-preview">
      <div className="project-row">

        {/* LEFT */}
        <div className="project-left">
          <ProjectCard
            title={project.title}
            description={project.description}
            tech_stack={project.tech_stack}
            live_link={project.live_link}
            github_link={project.github_link}
          />
        </div>

        {/* RIGHT */}
        <div className="project-right">
          <h3>{project.title}</h3>

          <p className="desc">
            {project.description?.slice(0, 80)}...
          </p>

          <ul>
            {Array.isArray(project.tech_stack) &&
              project.tech_stack.map((tech, i) => (
                <li key={i}>✔ {tech}</li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;