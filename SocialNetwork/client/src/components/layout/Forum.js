import React from 'react';
import Navbar from './Navbar';

export const Forum = () => {
    Navbar("home");
    return (
      <section className="forum">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Post</h1>
          </div>
        </div>
      </section>
    )
}

export default Forum
