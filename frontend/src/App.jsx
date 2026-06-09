import React, { useEffect, useState } from "react";

const API_URL = "/api/applications";

const statuses = [
  "Applied",
  "OA Received",
  "Interview",
  "Final Round",
  "Offer",
  "Rejected"
];

function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    dateApplied: "",
    status: "Applied",
    notes: ""
  });

  async function fetchApplications() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setApplications(data);
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      company: "",
      position: "",
      location: "",
      dateApplied: "",
      status: "Applied",
      notes: ""
    });

    fetchApplications();
  }

  async function updateStatus(id, status) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    fetchApplications();
  }

  async function deleteApplication(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    fetchApplications();
  }

  return (
    <div className="app">
      <header>
        <h1>Cloud Resume Tracker</h1>
        <p>Track job applications, interviews, offers, and rejections.</p>
      </header>

      <section className="form-card">
        <h2>Add Application</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
          />

          <input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dateApplied"
            value={form.dateApplied}
            onChange={handleChange}
            required
          />

          <select name="status" value={form.status} onChange={handleChange}>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />

          <button type="submit">Add Application</button>
        </form>
      </section>

      <section className="tracker">
        <h2>Applications</h2>

        <div className="grid">
          {applications.map((appItem) => (
            <div className="card" key={appItem.id}>
              <h3>{appItem.company}</h3>
              <p><strong>Position:</strong> {appItem.position}</p>
              <p><strong>Location:</strong> {appItem.location}</p>
              <p><strong>Date Applied:</strong> {appItem.dateApplied}</p>

              <label>Status</label>
              <select
                value={appItem.status}
                onChange={(e) => updateStatus(appItem.id, e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <p className="notes">{appItem.notes}</p>

              <button
                className="delete-btn"
                onClick={() => deleteApplication(appItem.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;