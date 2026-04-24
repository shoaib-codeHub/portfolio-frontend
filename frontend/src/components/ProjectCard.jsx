import React from "react";

const ProjectCard = ({
  title,
  description,
  tech_stack,
  live_link,
  github_link,
}) => {

  // ✅ clean validation
  const hasLiveLink =
    live_link && live_link.trim() !== "" && live_link !== "#";

  const hasGithubLink =
    github_link && github_link.trim() !== "";

  return (
    <div className="project-card">
      <h3>{title}</h3>

      {/* DESCRIPTION */}
      {description && <p className="desc">{description}</p>}

      {/* TECH STACK */}
      <p className="tech">
        {Array.isArray(tech_stack)
          ? tech_stack.join(" • ")
          : tech_stack}
      </p>

      {/* LINKS */}
      <div className="project-links">

        {/* 🔥 SHOW ONLY IF EXISTS */}
        {hasLiveLink && (
          <a href={live_link} target="_blank" rel="noreferrer">
            Live
          </a>
        )}

        {hasGithubLink && (
          <a href={github_link} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}

      </div>
    </div>
  );
};

export default ProjectCard;