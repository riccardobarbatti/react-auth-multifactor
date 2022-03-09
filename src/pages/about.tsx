import React from 'react';

const About = () => {
    return (
        <div>
            <h2>This is a Multi-Factor Auth application</h2>
            <h4> Pages: </h4>
            <ul className="list-group">
                <li className="list-group-item">/login</li>
                <li className="list-group-item">/register</li>
                <li className="list-group-item">/about</li>
                <li className="list-group-item">/forgot</li>
                <li className="list-group-item">/reset/:token</li>
                <li className="list-group-item">/* error page</li>
            </ul>
            <p className="mt-5 mb-3 text-muted">&copy; React Auth app 2022</p>
        </div>
    );
};

export default About;