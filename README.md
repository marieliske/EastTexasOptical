# East Texas Optical

Production website built for a real optometry business.

This project combines a modern React frontend with a lightweight Express API to deliver business information, location details, and live customer reviews in a secure and reliable way.

## Project goals

- Build a fast, mobile-friendly website for a local business
- Integrate Google Maps and Google Reviews
- Protect sensitive API credentials by keeping review requests server-side
- Deploy and operate the app in a production VPS environment

## Key features

- Multi-page responsive frontend with client-side routing
- Services and contact experience tailored for local customers
- Live Google Map embedded on the Contact page
- Google Reviews fetched through a backend proxy endpoint
- Health endpoint for monitoring and deployment verification

## Tech stack

Frontend
- React
- React Router
- Vite
- CSS

Backend
- Node.js
- Express
- Helmet
- CORS
- express-rate-limit

Integrations
- Google Places API
- Google Maps JavaScript API

Infrastructure
- Ubuntu VPS
- Nginx
- PM2
- Let's Encrypt TLS

## Architecture

- Vite builds the frontend into static assets served by Nginx
- Express provides API endpoints for health checks and Google reviews
- Nginx reverse-proxies API traffic to the Node process
- Reviews are requested server-side so private API keys are not exposed to the browser

## Security and reliability highlights

- Security headers with Helmet
- CORS origin allowlisting
- Rate limiting on reviews endpoint
- Server-side caching for external API responses
- Process supervision and restart management with PM2

## Outcomes

- Delivered a production-ready website used by real customers
- Implemented secure third-party API integration with protected credentials
- Established a repeatable deployment workflow for ongoing updates
