# Knowledge Graph Backend with Language Model and Neo4j

GitHub Repo: https://github.com/alif338/neo4j-openai-BE

## Overview
This backend application, built with Node.js and Express, serves as the API for knowledge graph data retrieval, integrates a Language Model for prediction, and uses Neo4j as the database.

## Features
- RESTful API for knowledge graph data retrieval.
- Integration with a Language Model (LLM) for predictive analysis.
- Neo4j database management.

## Prerequisites
- Node.js installed on your machine (v18.x or later).
- Neo4j database installed and running (Neo4j Desktop).
- Knowledge graph data imported into Neo4j (Cypher Query Language).

## Installation
1. Clone the repository: `git clone https://github.com/alif338/neo4j-openai-BE.git`
2. Navigate to the backend directory: `cd neo4j-openai-BE`
3. Install dependencies: `npm install`

## Configuration
1. Set `.env` file, refer from `.env.example`
2. Update `NEO4J_*` based on running database at your local computer
3. Configure the Language Model integration credentials. In this project, implements OpenAI from Azure.

## Running the Application
```bash
npm run dev
```
Use this endpoint to generate JSON response of Neo4j
```bash
(POST) {{baseUrl}}/api/v1/generateCompletion
body: prompts (list of string)
```
