import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ServiceCards.css';

const ServiceCards = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Create stunning, responsive websites tailored to your business needs with modern technologies and best practices.",
      delay: 0
    },
    {
      id: 2,
      title: "Mobile Applications",
      description: "Build powerful mobile apps for iOS and Android that engage your users and drive business growth. Be seen on the application stores!",
      delay: 100
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Design intuitive and beautiful user interfaces that provide exceptional user experiences across all platforms. Have a user friendly look and functioality.",
      delay: 200
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Boost your online presence with strategic digital marketing campaigns that reach your target audience.",
      delay: 300
    },
    {
      id: 5,
      title: "E-commerce Solutions",
      description: "Launch your online store with secure, scalable e-commerce platforms that drive sales and conversions.",
      delay: 400
    },
    {
      id: 6,
      title: "Cloud Services",
      description: "Leverage cloud infrastructure to scale your applications efficiently and reduce operational costs.",
      delay: 500
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleReadMore = (service) => {
    window.scrollTo(0, 0);
    console.log(`Navigating to Services for: ${service.title}`);
  };

  return (
    <div className="service-cards-container">
      <div className="service-cards-grid">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={el => cardRefs.current[index] = el}
            data-card-id={service.id}
            className={`service-card ${visibleCards.includes(service.id) ? 'visible' : 'hidden'}`}
            style={{
              transitionDelay: visibleCards.includes(service.id) ? `${service.delay}ms` : '0ms'
            }}
          >
            <div className="service-card-content">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              <NavLink 
                to="/services"
                className="service-card-button"
                onClick={() => handleReadMore(service)}
              >
                Read More
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;