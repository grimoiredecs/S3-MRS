import React, { useState } from "react";
import { FaBell, FaComments, FaUserCircle, FaChevronDown } from "react-icons/fa";
import ChatBox from "./ChatBox"; // <-- import
import "./HomePage.css";

const HomePage: React.FC = () => {
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="homepage">
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Dashboard</a>
                    <a href="#">Book</a>
                </div>
                <div className="nav-icons">
                    <FaBell />
                    <FaComments
                        onClick={() => setShowChat((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />
                    <FaUserCircle />
                    <FaChevronDown />
                </div>
            </nav>

            <div className="hero">
                <div className="about-box">
                    <p>
                        In response to the growing need for effective self-study spaces, Ho Chi Minh City University of Technology (HCMUT) has developed the Smart Study Space project to enhance the learning environment for students.
                    </p>
                    <p>
                        The Smart Study Spaces are equipped with advanced facilities, including IoT-enabled sensors and smart devices, to provide comfortable and efficient study areas. These spaces allow students to find and reserve study spots easily, ensuring an optimal learning experience.
                    </p>
                    <p>
                        Students and university staff interact with the system through a user-friendly platform that facilitates booking, monitoring, and managing the study spaces. This interaction helps maintain an organized and accessible environment for all users.
                    </p>
                    <p>
                        The platform is available on both web and mobile applications, featuring Single Sign-On (SSO) authentication for seamless access. Integration with IoT devices enables real-time updates and automation, making the Smart Study Space a cutting-edge solution for modern educational needs.
                    </p>
                </div>
            </div>

            {showChat && <ChatBox />}
        </div>
    );
};

const AboutPage: React.FC = () => {
    return (
        <div className="homepage">
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Dashboard</a>
                    <a href="#">Book</a>
                </div>
                <div className="nav-icons">
                    <FaBell />
                    <FaComments style={{ cursor: "pointer" }} />
                    <FaUserCircle />
                    <FaChevronDown />
                </div>
            </nav>

            <div className="hero">
                <div className="about-box">
                    <p>
                        In response to the growing need for effective self-study spaces, Ho Chi Minh City University of Technology (HCMUT) has developed the Smart Study Space project to enhance the learning environment for students.
                    </p>
                    <p>
                        The Smart Study Spaces are equipped with advanced facilities, including IoT-enabled sensors and smart devices, to provide comfortable and efficient study areas. These spaces allow students to find and reserve study spots easily, ensuring an optimal learning experience.
                    </p>
                    <p>
                        Students and university staff interact with the system through a user-friendly platform that facilitates booking, monitoring, and managing the study spaces. This interaction helps maintain an organized and accessible environment for all users.
                    </p>
                    <p>
                        The platform is available on both web and mobile applications, featuring Single Sign-On (SSO) authentication for seamless access. Integration with IoT devices enables real-time updates and automation, making the Smart Study Space a cutting-edge solution for modern educational needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
