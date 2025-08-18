import React from 'react';
import './Contact.css';

const Contact = ({ croatian }) => {
  return (
    <div>
        <h1>{ croatian ? "Surađujmo zajedno!" : "Let's work together!" }</h1>
        <h3>{ croatian ? "Ako želite razgovarati o potencijalnoj suradnji, javite nam se." : "If you’d like to chat about a potential project please contact us." }</h3>
    </div>
  );
};

export default Contact;