import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    live_link: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // 📌 Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      console.log("Projects:", data);
      setProjects(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 📌 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId
        ? `${BASE_URL}/api/projects/${editId}`
        : `${BASE_URL}/api/projects`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // Reset form
      setForm({
        title: "",
        description: "",
        tech_stack: "",
        github_link: "",
        live_link: "",
      });

      setEditId(null);
      fetchProjects();

    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // 📌 Delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Delete:", data);

      fetchProjects();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 📌 Edit
  const handleEdit = (project) => {
    setForm(project);
    setEditId(project.id);
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* FORM */}
      <form className="project-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="tech_stack" placeholder="Tech Stack" value={form.tech_stack} onChange={handleChange} />
        <input name="github_link" placeholder="GitHub Link" value={form.github_link} onChange={handleChange} />
        <input name="live_link" placeholder="Live Link" value={form.live_link} onChange={handleChange} />

        <button type="submit">
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* LIST */}
      <div className="projects-list">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>

            <div className="actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;