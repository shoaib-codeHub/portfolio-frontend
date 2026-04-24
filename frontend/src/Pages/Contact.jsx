import React, { useState } from "react";
import "./Contact.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({
    sender_name: "",
    sender_email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", text: data.message || "Failed to send message." });
      } else {
        setStatus({ type: "success", text: "Message sent successfully! I will get back to you soon." });
        setForm({
          sender_name: "",
          sender_email: "",
          message: "",
        });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Something went wrong. Please try again later." });
    }

    setLoading(false);
  };

  return (
    <section className="contact-page fade-in">
      <div className="contact-container">
        
        {/* Left Side: Contact Info */}
        <div className="contact-info">
          <h2>Let's Connect</h2>
          <p>
            I'm currently looking for new opportunities and collaborations. 
            Whether you have a question, a project idea, or just want to say hi, 
            I'll try my best to get back to you!
          </p>
          
          <div className="info-details">
            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>Jaipur, India</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>mohammedshoaib.connect@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            <h3>Send a Message</h3>
            
            <div className="input-group">
              <input
                type="text"
                name="sender_name"
                placeholder="Your Name"
                value={form.sender_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="sender_email"
                placeholder="Your Email"
                value={form.sender_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <textarea
                name="message"
                placeholder="How can I help you?"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={loading ? "loading" : ""}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <div className={`status-message ${status.type}`}>
                {status.type === "success" ? "✅ " : "❌ "}
                {status.text}
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;