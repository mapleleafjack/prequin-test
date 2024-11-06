# Investor API

This API provides information about investors and their commitments. Below are the available endpoints, along with sample `cURL` commands to interact with them.

## Table of Contents

- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [List All Investors](#list-all-investors)
  - [Get Investor Details](#get-investor-details)
- [Running Tests](#running-tests)

## Setup

1. **Create a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate 
    ```

2. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    pip install -r requirements-dev.txt
    ```

2. **Run the application**:
    ```bash
    python app.py
    ```
    The API will be available at `http://127.0.0.1:5000/`.

## API Endpoints

### List All Investors

**Endpoint**: `/investors`

- **Method**: `GET`
- **Description**: Retrieves a list of all investors with optional filters for asset class and commitment range.

**Optional Query Parameters**:
- `asset_class`: Filter investors by asset class.
- `min_commitment`: Minimum commitment amount.
- `max_commitment`: Maximum commitment amount.

**Example Requests**:
```bash
# Get all investors
curl -X GET "http://127.0.0.1:5000/investors"

# Get investors with specific asset class and commitment range
curl -X GET "http://127.0.0.1:5000/investors?asset_class=Equity&min_commitment=1000&max_commitment=5000"
```

### Get Investor Details

**Endpoint**: `/investors`

- **Method**: `GET`
- **Description**: Retrieves detailed information about a specific investor, including their commitments.

**Path Parameters**:

- `investor_id`: The unique identifier of the investor

**Optional Query Parameters**:
- `asset_class`: Filter investors by asset class.

**Example Requests**:
```bash
# Get details of a specific investor without filters
curl -X GET "http://127.0.0.1:5000/investors/test_id"

# Get details of a specific investor with asset class filter
curl -X GET "http://127.0.0.1:5000/investors/test_id?asset_class=Equity"
```

### Running Tests
Ensure that you have installed the development dependencies as outlined in the Setup section.

Run all tests with pytest:
```bash
pytest
```