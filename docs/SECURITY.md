# Security Policy

## Supported Versions

We support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in TrackMySpend, please report it responsibly:

### How to Report

1. **Do not** create a public GitHub issue for security vulnerabilities
2. Email the maintainers directly with details
3. Include steps to reproduce the vulnerability
4. Provide any relevant proof-of-concept code

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)
- Your contact information

### Response Timeline

- **24 hours**: Initial response acknowledging receipt
- **7 days**: Assessment and confirmation of the vulnerability
- **30 days**: Fix deployed (for confirmed vulnerabilities)

## Security Measures

TrackMySpend implements several security measures:

### Authentication & Authorization
- Password hashing using bcrypt
- JWT token-based authentication
- Environment-based secret management
- Input validation and sanitization

### Data Protection
- Secure database connections
- Environment variable configuration
- HTTPS enforcement in production
- Secure cookie settings

### Development Security
- Dependency vulnerability scanning
- Secure coding practices
- Regular security updates
- Code review requirements

## Best Practices for Users

### For Developers
- Use strong JWT secrets in production
- Regularly update dependencies
- Use HTTPS in production
- Implement proper error handling
- Follow the security checklist in DEPLOYMENT.md

### For End Users
- Use strong, unique passwords
- Keep your browser updated
- Log out when finished
- Report suspicious activity

## Disclosure Policy

- Vulnerabilities will be disclosed after fixes are deployed
- Credit will be given to reporters (unless requested otherwise)
- A security advisory will be published for significant vulnerabilities

Thank you for helping keep TrackMySpend secure!