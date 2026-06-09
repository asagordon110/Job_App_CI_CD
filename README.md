# Cloud Resume Tracker

A cloud-native job application tracking platform built with React, Node.js, Docker, Amazon ECS Fargate, Amazon ECR, Application Load Balancer, and GitHub Actions CI/CD.

This project was designed to simulate a real-world cloud deployment workflow where application changes are automatically built, containerized, deployed, and updated in AWS.

---

## Features

### Job Application Tracking

Track and manage:

* Company
* Position
* Location
* Date Applied
* Application Status

  * Applied
  * OA Received
  * Interview
  * Final Round
  * Offer
  * Rejected
* Notes

### Cloud Infrastructure

* Containerized using Docker
* Hosted on Amazon ECS Fargate
* Load balanced with Application Load Balancer (ALB)
* Stored in Amazon Elastic Container Registry (ECR)
* Automated deployments with GitHub Actions

### CI/CD Automation

Every push to the `main` branch automatically:

1. Builds a Docker image
2. Pushes the image to Amazon ECR
3. Triggers a new ECS deployment
4. Deploys the updated application

---

# Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
Amazon ECR
    │
    ▼
Amazon ECS Fargate
    │
    ▼
Application Load Balancer
    │
    ▼
Users
```

---

# Tech Stack

## Frontend

* React
* Vite
* CSS3

## Backend

* Node.js
* Express.js

## Cloud

* Amazon ECS Fargate
* Amazon ECR
* Application Load Balancer
* IAM
* Security Groups

## DevOps

* Docker
* GitHub Actions
* AWS CLI

---

# Local Development Setup

## Clone Repository

```bash
git clone <repository-url>
cd cloud-resume-tracker
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:3000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Docker Setup

## Build Docker Image

```bash
docker build --platform linux/amd64 -t cloud-resume-tracker .
```

## Run Docker Container

```bash
docker run -p 3000:3000 cloud-resume-tracker
```

Visit:

```text
http://localhost:3000
```

---

# AWS Deployment

## Create ECR Repository

Repository Name:

```text
cloud-resume-tracker
```

Authenticate Docker:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
```

Tag Image:

```bash
docker tag cloud-resume-tracker:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/cloud-resume-tracker:latest
```

Push Image:

```bash
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/cloud-resume-tracker:latest
```

---

# ECS Deployment

## ECS Cluster

```text
cloud-resume-tracker-cluster
```

## ECS Service

```text
cloud-resume-service
```

## Task Definition

```text
cloud-resume-tracker-task
```

## Container Port

```text
3000
```

## Health Check Endpoint

```text
/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

# CI/CD Pipeline

GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

Pipeline automatically runs on:

```text
git push origin main
```

Pipeline Steps:

1. Checkout code
2. Configure AWS credentials
3. Login to ECR
4. Build Docker image
5. Push image to ECR
6. Force ECS deployment

---

# Required GitHub Secrets

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ACCOUNT_ID
AWS_REGION
ECR_REPOSITORY
ECS_CLUSTER
ECS_SERVICE
```

Example:

```text
AWS_REGION=us-east-1
ECR_REPOSITORY=cloud-resume-tracker
ECS_CLUSTER=cloud-resume-tracker-cluster
ECS_SERVICE=cloud-resume-service
```

---

# How To Use The Resume Tracker

## Add a New Application

Complete the form:

* Company
* Position
* Location
* Date Applied
* Status
* Notes

Click:

```text
Deploy Application Record
```

The application will appear in the dashboard.

---

## Update Status

Use the dropdown on an application card.

Available statuses:

```text
Applied
OA Received
Interview
Final Round
Offer
Rejected
```

The card updates automatically.

---

## Delete Application

Click:

```text
Remove
```

The application record will be deleted.

---

# Current Limitations

Currently application data is stored in memory.

If the ECS container restarts:

```text
Application records are reset.
```

Future improvement:

```text
Amazon RDS PostgreSQL
or
Amazon DynamoDB
```

for persistent storage.

---

# Future Enhancements

* Amazon RDS integration
* DynamoDB support
* User authentication
* CloudWatch dashboards
* Terraform infrastructure
* Blue/Green deployments
* HTTPS with ACM certificates
* Custom Route53 domain
* Application analytics

---

# Resume Highlights

### Cloud Engineering

* Containerized a full-stack application using Docker.
* Deployed workloads to Amazon ECS Fargate.
* Configured Application Load Balancers and health checks.
* Managed container images with Amazon ECR.

### DevOps

* Implemented CI/CD using GitHub Actions.
* Automated deployments from GitHub to ECS.
* Built repeatable cloud deployment workflows.

### Software Engineering

* Developed a React frontend and Node.js backend.
* Designed REST APIs for CRUD operations.
* Built a cloud-native job application management platform.

```
```
