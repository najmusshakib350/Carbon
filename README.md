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

### 1. GET `/api/transport/options`

**Description**:  
This endpoint fetches all available transport options from the database.

**Request:**

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/transport/options`

**Response:**

- **Success (200)**:  
  Returns a list of all transport options.

  Example Response:

  ```json
  {
    "success": true,
    "data": [
      {
        "name": "Bus",
        "cost": 10,
        "time": 30,
        "carbonEmission": 50
      },
      {
        "name": "Train",
        "cost": 20,
        "time": 15,
        "carbonEmission": 30
      }
    ]
  }
  ```

### 2. POST `/api/transport/options`

**Description**:  
This endpoint allows you to add a new transport option to the database.

**Request:**

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/transport/options`
- **Body**:

  - `name` (string): Name of the transport option.
  - `cost` (number): Cost of using this transport option.
  - `time` (number): Time taken by this transport option.
  - `carbonEmission` (number): Carbon emission by this transport option.

  Example request body:

  ```json
  {
    "name": "Bus",
    "cost": 10,
    "time": 30,
    "carbonEmission": 50
  }
  ```
