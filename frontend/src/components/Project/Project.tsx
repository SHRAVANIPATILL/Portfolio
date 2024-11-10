import React, { useEffect, useState } from 'react';
import { Container } from "./styles";
import githubIcon from "../../assets/github.svg";
import externalLink from "../../assets/external-link.svg";
import ScrollAnimation from "react-animate-on-scroll";

interface Projects {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  expanded?: boolean;  // Keep track of expanded state for each project
}

export function Project() {
  const [projects, setProjects] = useState<Projects[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects') // Fetch data from the backend API (localhost:5000)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data from backend:", data);
        // Initialize expanded property for each project
        const projectsWithExpanded = data.map((project: Projects) => ({
          ...project,
          expanded: false,  // Initialize as false, meaning description is collapsed
        }));
        setProjects(projectsWithExpanded);
      })
      .catch(error => {
        console.error("Error fetching:", error);
        alert(`Error: ${error.message}`);
      });
  }, []);

  // Handle toggle for the "Read More" button
  const handleReadMore = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? { ...project, expanded: !project.expanded } // Toggle the expanded state for the clicked project
          : project
      )
    );
  };

  return (
    <Container id="project">
      <h2>My Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <ScrollAnimation key={project._id} animateIn="flipInX">
            <div className="project">
              <header>
                <svg
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#23ce6b"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Folder</title>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <img src={externalLink} alt="External link" />
                    </a>
                  )}
                  <a href="#" rel="noreferrer">
                    <img src={githubIcon} alt="Visit site" />
                  </a>
                </div>
              </header>
              <div className="body">
                <h3>{project.title}</h3>
                <p
                  className={`description ${project.expanded ? 'expanded' : ''}`}
                  style={{
                    height: project.expanded ? 'auto' : '200px', // Ensure height is dynamic
                    overflow: project.expanded ? 'initial' : 'hidden', // Hide overflow when collapsed
                  }}
                >
                  {project.description}
                </p>
                <div
                  className="read-more"
                  onClick={() => handleReadMore(project._id)} // Only toggle for the clicked project
                >
                  {project.expanded ? 'Read Less' : 'Read More'}
                </div>
              </div>
              <footer>
                <ul className="tech-list">
                  {project.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </footer>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </Container>
  );
}

export default Project;
