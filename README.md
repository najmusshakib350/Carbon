# Transport Emissions API

A REST API to help users compare different public transport combinations (e.g., bus, train, walking, car share) based on their carbon emissions. The goal is to encourage sustainable travel by suggesting the most environmentally-friendly options.

## Features

- Accepts various public transport combinations as input.
- Calculates and compares carbon emissions for different options.
- Suggests the least carbon-intensive option.
- Supports user preferences like cost, time, and transport type.
- Provides data validation and robust testing.

## Tech Stack

- **Backend Framework**: Express.js (with TypeScript)
- **Database**: MongoDB (using MongoDB Atlas or local instance)
- **Validation**: Zod for data validation
- **Testing**: Jest for unit and end-to-end tests
- **Environment Management**: dotenv for environment variables
- **Development Tools**: ts-node-dev for watch mode

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16+)
- npm (v7+)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
