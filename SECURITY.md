# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of ResQAI seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, report them via email to **muhammedadnanshakil456@gmail.com**.

You should receive a response within 48 hours. If you do not receive a response, please follow up via email to ensure we received your report.

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Preferred Languages

We prefer all communications to be in English.

## Policy

We will:

- Acknowledge receipt of your vulnerability report within 48 hours
- Provide an estimated time frame for a fix
- Notify you when the issue is resolved
- Credit the discoverer (if desired) in any public disclosure

## Scope

The following are considered out of scope:

- Missing HTTP security headers (unless exploitable)
- Rate limiting issues on endpoints
- Self-XSS or issues requiring user interaction with developer tools
- CSV injection without proof of impact
- Issues in third-party dependencies already reported upstream
