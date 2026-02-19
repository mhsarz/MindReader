# MindReader: Cognitive Bias Research Platform

## Overview
MindReader is a scalable, full-stack web platform designed to conduct interactive behavioral psychology experiments and educate users on human cognitive heuristics. 

Built as a proof-of-concept for Human-Computer Interaction (HCI) research, this application demonstrates a complete data collection pipeline capable of hosting multiple distinct psychological studies, randomizing user conditions, and securely logging participant data in a cloud database for analysis.

## Live Demo
👉 **https://mind-reader-beta.vercel.app/**

## Current & Planned Modules
* 🧠 **The Anchoring Effect (Live):** An A/B tested experiment measuring how initial numerical anchors influence user estimations.
* 🖼️ **The Framing Effect (In Development):** Measuring risk tolerance based on how choices are presented.
* 📚 **Cognitive Library (Planned):** An educational hub featuring articles explaining the psychology and neuroscience behind each bias tested on the platform.

## The Tech Stack
* **Frontend:** React, Vite, Recharts (for real-time data visualization)
* **Backend:** Python, FastAPI, SQLAlchemy (ORM)
* **Database:** PostgreSQL (hosted on Neon)
* **Deployment:** Vercel (Frontend) & Render (Backend)

## Architectural Highlights
* **Extensible Database Design:** The PostgreSQL schema uses a universal `Experiment` model with a dynamic `bias_type` attribute, allowing researchers to add new biases and experiments without restructuring the database.
* **RESTful API Architecture:** A strict separation of concerns between the React user interface and the database logic.
* **Real-Time Visualization:** Aggregates live participant data and translates it into interactive charts immediately after a user submits their response.
* **Production-Ready Security:** Configured with strict CORS middleware and secured environment variables to protect data integrity.
