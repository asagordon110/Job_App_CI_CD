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
    setForm({ ...form, [event.target.name]: event.target.value });
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
    <main className="page">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">AWS ECS Fargate Project</p>
          <h1>Cloud Resume Tracker</h1>
          <p className="subtitle">
            A cloud-native job application dashboard built with React, Node.js,
            Docker, Amazon ECR, ECS Fargate, ALB, and GitHub Actions.
          </p>

          <div className="hero-badges">
            <span>Dockerized</span>
            <span>ECS Fargate</span>
            <span>CI/CD Enabled</span>
            <span>CloudWatch Ready</span>
          </div>
        </div>

        <div className="cloud-scene">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>
          <div className="cloud-card floating">
            <div className="cloud-icon">☁</div>
            <h2>Production Pipeline</h2>
            <p>GitHub → ECR → ECS → ALB</p>
            <div className="pipeline">
              <span>Code</span>
              <span>Build</span>
              <span>Push</span>
              <span>Deploy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard">
        <div className="panel form-panel">
          <div className="panel-header">
            <p className="eyebrow">New Target</p>
            <h2>Add Job Application</h2>
          </div>

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
              placeholder="Notes, recruiter name, interview prep, follow-up reminders..."
              value={form.notes}
              onChange={handleChange}
            />

            <button type="submit">Deploy Application Record</button>
          </form>
        </div>

        <div className="panel stats-panel">
          <p className="eyebrow">Live Metrics</p>
          <h2>Pipeline Overview</h2>

          <div className="stats-grid">
            <div>
              <strong>{applications.length}</strong>
              <span>Total Apps</span>
            </div>
            <div>
              <strong>
                {
                  applications.filter((app) =>
                    ["Interview", "Final Round", "Offer"].includes(app.status)
                  ).length
                }
              </strong>
              <span>Active Leads</span>
            </div>
            <div>
              <strong>
                {applications.filter((app) => app.status === "Offer").length}
              </strong>
              <span>Offers</span>
            </div>
          </div>

          <div className="terminal">
            <p>$ docker build --platform linux/amd64</p>
            <p>$ docker push amazonaws.com/cloud-resume-tracker</p>
            <p>$ aws ecs update-service --force-new-deployment</p>
          </div>
        </div>
      </section>

      <section className="applications-section">
        <div className="section-title">
          <p className="eyebrow">Application Fleet</p>
          <h2>Tracked Opportunities</h2>
        </div>

        <div className="card-grid">
          {applications.map((appItem) => (
            <article className="job-card" key={appItem.id}>
              <div className="card-top">
                <div>
                  <p className="company">{appItem.company}</p>
                  <h3>{appItem.position}</h3>
                </div>
                <span className={`status ${appItem.status.replaceAll(" ", "-").toLowerCase()}`}>
                  {appItem.status}
                </span>
              </div>

              <div className="job-meta">
                <p>📍 {appItem.location}</p>
                <p>📅 {appItem.dateApplied}</p>
              </div>

              <label>Status</label>
              <select
                value={appItem.status}
                onChange={(e) => updateStatus(appItem.id, e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              {appItem.notes && <p className="notes">{appItem.notes}</p>}

              <button
                className="delete-btn"
                onClick={() => deleteApplication(appItem.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;