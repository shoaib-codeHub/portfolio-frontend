import React from 'react'
import { NavLink } from 'react-router-dom'
import discord from "../assets/discord.svg"
import github from "../assets/github-icon.svg"
import linkedin from "../assets/linkedin-icon.svg"

import "./Footer.css"
const Footer = () => {
    return (

        <footer className="modern-footer">
            <div className="footer-top">

                {/* BRAND */}
                <div className="footer-brand">
                    <h2>Shoaib-codeHub</h2>
                    <p>
                        Crafting modern, scalable web experiences with clean code and creative design.
                    </p>
                </div>

                {/* LINKS */}
                <div className="footer-links">
                    <h3>Explore</h3>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/projects">Projects</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Shoaib-codeHub. All rights reserved.</p>

                <div className="social-icons">
                    <a href="https://discord.com/users/1443449013541146816" className="social-link" target="_blank" rel="noopener noreferrer">
                        <img src={discord} alt="discord-icon" />
                    </a>
                    <a href="https://github.com/shoaib-codeHub" className="social-link" target="_blank" rel="noopener noreferrer">
                        <img src={github} alt="github-icon" />
                    </a>
                    {/* Added https:// to make the link work properly */}
                    <a href="https://www.linkedin.com/in/shoaib-codehub-4581a7326" className="social-link" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt="linkedin-icon" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer