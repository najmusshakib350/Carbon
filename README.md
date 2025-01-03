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

### 3. PATCH `/api/transport/options/:id`

**Description**:  
Update an existing transport option.

#### Request

- **URL Parameters**: `id` (string, required)
- **Body (JSON)**:
  - `name` (string, optional): New name for the transport option.
  - `cost` (number, optional): Updated cost.
  - `time` (number, optional): Updated time in minutes.
  - `carbonEmission` (number, optional): Updated carbon emission value.

#### Response

- **200 OK**: Transport option updated successfully.
- **400 Bad Request**: No fields provided for update.
- **404 Not Found**: Transport option with the given ID not found.
- **500 Internal Server Error**: Unexpected server error.

### 4. DELETE `/api/transport/options/:id`

**Description**:
Deletes a transport option by its ID.

- **Parameters**:
  - `:id` (path) - The ID of the transport option to delete.
- **Responses**:
  - `200 OK`: The transport option was deleted successfully.
  - `404 Not Found`: Transport option with the given ID was not found.
  - `500 Internal Server Error`: Server encountered an error.

### 5. POST `/api/transport/calculate`

**Description**:
Calculates the total carbon emissions, cost, and time for a combination of transport options.

- **Request Body**:
  - `transportIds` (array of strings) - IDs of the transport options to calculate.
- **Responses**:
  - `200 OK`: Carbon emissions calculated successfully.
  - `400 Bad Request`: Invalid input (e.g., missing or incorrect transport IDs).
  - `404 Not Found`: No transport options found for the given IDs.
  - `500 Internal Server Error`: Server encountered an error.

#### Example

**Request**:

```json
{
  "transportIds": ["63f5a9c4b2d7e5e1e9c1a05d", "63f5a9c4b2d7e5e1e9c1a06e"]
}
```

### 6. POST `/api/transport/preferences`

**Description**:
Suggests the best transport option based on the user's preference (e.g., cost, time, or carbon emission).

- **Request Body**:
  - preference (string) - The user's preference for selecting the best transport option.
- **Responses**:
  - `200 OK`: Suggested transport option based on preference.
  - `400 Bad Request`: Invalid input (e.g., missing or invalid preference).
  - `404 Not Found`: No transport options available.
  - `500 Internal Server Error`: Server encountered an error.

#### Example

**Request**:

```{ "preference": "cost" }

```

### 6. POST `/api/transport/integration`

**Description**:
Fetches and formats transport options for integration with third-party services (e.g., Google Maps).

- **Request Body**:
  - format (string) - Specifies the desired output format (e.g., "google-maps").
- **Responses**:
  - `200 OK`: Transport options successfully formatted.
  - `400 Bad Request`: Invalid input (e.g., missing or unsupported format).
  - `404 Not Found`: No transport options available.
  - `500 Internal Server Error`: Server encountered an error.

#### Example

**Request**:

```{
  "format": "google-maps"
}


```
