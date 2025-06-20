# Gym Music Licensing Calculator

A comprehensive tool to calculate music licensing fees for gyms from ASCAP, BMI, SESAC, and GMR.

## Features

- Calculate licensing fees from all major Performance Rights Organizations (PROs):
  - SESAC: Tiered pricing based on number of locations
  - ASCAP: Complex fee structure including group classes, ambient music, virtual classes, and social events
  - BMI: Per-member pricing based on music usage type
  - GMR: Flat monthly rate per location

- Support for various factors affecting licensing fees:
  - Number of locations (with chain discounts)
  - Total membership
  - Group class capacity
  - Facility square footage
  - Social events
  - Virtual classes
  - HFAA membership discounts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter your gym's details in the form:
   - Number of locations
   - Total membership count
   - Average group class capacity
   - Facility square footage
   - Number of annual social events
   - Music usage type
   - Virtual classes availability
   - HFAA membership status

2. Click "Calculate Fees" to see a detailed breakdown of:
   - Individual PRO fees with itemized calculations
   - Applicable discounts
   - Total annual licensing cost

## License

MIT 