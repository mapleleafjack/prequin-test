# Investment Dashboard

This project is an investment dashboard built with React and TypeScript, using Vite as the build tool. It displays a list of investors and their associated commitments, with filtering and sorting options. 

## Features

- **Investor List**: View a list of investors with details such as name, type, date added, and total commitments.
- **Commitment Details**: Select an investor to see the breakdown of their commitments by asset class.
- **Filtering and Sorting**: Sort investors and commitments by various attributes, and filter commitments by asset class.
- **Routing**: Uses React Router for navigation between the investor list and individual commitment details.

## Project Structure

 ├── main.tsx # Entry point of the app 
 ├── index.css # Global styles 
 ├── types.ts # Type definitions 
 ├── Router.tsx # App router configuration 
 ├── vite-env.d.ts # Vite environment type definitions 
 ├── components/ # Component directory 
    │ 
    ├── Commitments/ # Commitments component and tests 
    └── InvestorsList/ # Investors list component and tests

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- npm (>=6.x)

### Installation

. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

. **Install dependencies:**

    ```bash
    npm install
    ```
. **Running the app*

    ```bash
    npm run dev
    ```