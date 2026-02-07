# Dynamic Media Music Subscription + Licensing Calculator

A marketing tool to help gyms understand their music and licensing costs, and see how Dynamic Media's subscription simplifies the process.

## Overview

This calculator helps fitness facilities:
- Understand what they'd pay licensing directly through PROs (ASCAP, BMI, SESAC, GMR)
- See how Dynamic Media's music subscription includes required licensing for ambient music
- Compare costs and complexity between direct licensing and the Dynamic Media subscription model

## Pricing Model

**Dynamic Media Subscription: $29.99/month per location ($359.88/year)**

### What's Included:
- **Ambient Music Only**: Full subscription includes all required PRO licensing for ambient music (gym floor, lobby, common areas)
- **With Instructor-Led Classes**: Subscription provides music platform; instructor-led licensing is handled separately with our guidance

## Features

### Music Usage Types:
- **Ambient Music**: Background music in gym areas, lobby, common areas
- **Instructor-Led Group Fitness Classes**: Classes with curated music programming

### Factors Affecting Costs:
- Number of locations (with volume discounts)
- Total membership per location
- Group class rooms (if applicable)
- Classes per week and capacity
- Facility square footage
- HFA membership status

### Calculator Output:
1. **Dynamic Media Subscription Options** (Primary)
   - Ambient-only setup
   - Ambient + instructor-led setup
2. **Educational Comparison** (Accordion)
   - What gyms typically pay licensing directly
   - Breakdown by PRO (ASCAP, BMI, SESAC, GMR)

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

1. Enter your gym's details:
   - Number of locations
   - Total members per location
   - Music usage type (ambient, group fitness, or both)
   - Square footage (for ambient)
   - Group fitness rooms, classes/week, capacity (if applicable)
   - HFA membership status

2. Click "See Your Recommended Setup" to view:
   - Dynamic Media subscription options
   - Cost comparison vs. direct licensing
   - Savings calculation
   - Educational PRO licensing breakdown

## Technical Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase Hosting

## Deployment

```bash
npm run build
firebase deploy
```

## License

MIT 