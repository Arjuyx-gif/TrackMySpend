# Contributing to TrackMySpend

Thank you for your interest in contributing to TrackMySpend! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install` (root) and `cd backend && npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Environment Configuration
Copy `backend/.env.example` to `backend/.env` and configure:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret for JWT tokens
- `PORT`: Backend port (default: 5000)

### Running the Project
```bash
# Run both frontend and backend
npx concurrently "npm run dev" "cd backend && npm run dev"
```

## Code Style

- Use TypeScript for frontend code
- Follow existing code patterns and naming conventions
- Add JSDoc comments for complex functions
- Use meaningful commit messages

## Pull Request Process

1. Update documentation as needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md with your changes
5. Submit a pull request with a clear description

## Reporting Issues

When reporting issues, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/environment information
- Screenshots if applicable

## Feature Requests

Feature requests are welcome! Please provide:
- Clear description of the feature
- Use case and benefits
- Any relevant mockups or examples