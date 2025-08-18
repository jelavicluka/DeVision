import React, { useEffect, useRef } from "react";
import './Projects.css';
import chevapImage from '../assets/chevap.jpg';
import levelImage from '../assets/level.jpg';
import bloomImage from '../assets/weddings.jpg';
import bestImage from '../assets/best.jpg';

const Projects = ({ croatian }) => {
    const projectsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (projectsRef.current) {
            observer.observe(projectsRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    const projects = [
        {
            id: 1,
            image: chevapImage,
            title: "Chevap House",
            description: croatian ? "Svijet ćevapa, gdje se susreću tradicija, kvaliteta i strast prema savršenom okusu." : "Description for Chevap."
        },
        {
            id: 2,
            image: levelImage,
            title: "Level Restaurant",
            description: croatian ? "Level Restaurant. The next stage of restaurants." : "Description for Level."
        },
        {
            id: 3,
            image: bestImage,
            title: "Grupa Best",
            description: croatian ? "Grupu Best godinama je prvi izbor za sve vrste zabava!" : "Description for Group Best."
        },
        {
            id: 4,
            image: bloomImage,
            title: "Bloom Weddings",
            description: croatian ? "Bloom je naš pilot projekt. Upravo s njima smo započeli ovu priču!" : "Description for Bloom."
        }
    ];

    return (
        <section className="projects-container" ref={projectsRef}>
            <div className="projects-grid">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;