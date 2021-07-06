import React from 'react';

const FooterComponent = () => {
  return (
    <React.Fragment>
      <div className="flex-grow-1"></div>
      <footer className="footer bg-dark">
        <p>&copy; {new Date().getFullYear()} Larabiz.</p>
      </footer>
    </React.Fragment>
  );
}

export default FooterComponent;