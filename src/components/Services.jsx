import { useState, useRef } from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence. We help you reach your target audience and drive meaningful results through various digital channels.",
      clues: [
        "SEO optimization for better search rankings",
        "Social media marketing strategies",
        "Pay-per-click advertising campaigns",
        "Email marketing automation"
      ]
    },
    {
      id: "content-creation",
      title: "Content Creation",
      description: "Compelling content that tells your story and resonates with your audience. From copywriting to visual assets, we help you communicate effectively with your customers.",
      clues: [
        "Blog writing and article creation",
        "Visual content design",
        "Video production and editing",
        "Brand storytelling"
      ]
    },
    {
      id: "web-design",
      title: "Web Design",
      description: "Creative, responsive, and user-friendly web designs tailored to your brand. We focus on creating intuitive interfaces that engage visitors and drive conversions.",
      clues: [
        "Responsive mobile-first design",
        "Custom UI/UX wireframes",
        "Brand identity integration",
        "Cross-browser compatibility"
      ]
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom web development solutions built with modern technologies. From simple landing pages to complex web applications, we deliver scalable and maintainable code.",
      clues: [
        "Frontend development with React/Vue",
        "Backend API development",
        "Database design and optimization",
        "Cloud deployment and hosting"
      ]
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description: "User-centered design approaches that enhance the user experience. We create intuitive interfaces and smooth user journeys to keep your users engaged and satisfied.",
      clues: [
        "User research and personas",
        "Wireframing and prototyping",
        "Usability testing",
        "Design system creation"
      ]
    }
  ];

  // Create refs for each section
  const sectionRefs = useRef({});
  services.forEach(service => {
    sectionRefs.current[service.id] = sectionRefs.current[service.id] || useRef(null);
  });

  // Function to scroll to a section when a button is clicked
  const scrollToSection = (id) => {
    sectionRefs.current[id].current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Calculate positions for buttons in a circle
  const calculateButtonPosition = (index, total) => {
    const radius = 175; // Circle radius in pixels
    const angle = (index * 2 * Math.PI / total) - Math.PI/2; // Starting from top
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <div className="services-intro">
          <h1>Services</h1>
          <p>
            We offer a comprehensive range of digital solutions to help your business
            thrive in the online world. Explore our services to see how we can help you
            achieve your goals.
          </p>
        </div>
        
        <div className="services-nav">
          {/* Desktop circular navigation */}
          <div className="circle-nav">
            {services.map((service, index) => {
              const { x, y } = calculateButtonPosition(index, services.length);
              return (
                <button
                  key={service.id}
                  className="circle-button"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  onClick={() => scrollToSection(service.id)}
                >
                  {service.title}
                </button>
              );
            })}
          </div>
          <div className="vertical-nav">
            {services.map((service) => (
              <button
                key={service.id}
                className="vertical-button"
                onClick={() => scrollToSection(service.id)}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="services-content">
        {services.map((service) => (
          <div 
            key={service.id}
            id={service.id} 
            className="service-section"
            ref={sectionRefs.current[service.id]}
          >
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            {service.clues && service.clues.length > 0 && (
              <ul className="service-clues">
                {service.clues.map((clue, index) => (
                  <li key={index}>{clue}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;