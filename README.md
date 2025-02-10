# NextJS Authenticator and OTP Generator

A secure, self-hosted web application for generating Time-based One-Time Passwords (TOTP) for Meta platforms (currently setup forFacebook and Instagram but can be extended to any platform). Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Secure Authentication**: Password-protected access to prevent unauthorized usage
- **Real-time TOTP Generation**: Generates valid 6-digit codes for Facebook and Instagram
- **Auto-refresh**: Automatically refreshes codes before expiration
- **Visual Countdown**: Shows remaining time for current code validity
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- A secure environment to host the application

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meta-authenticator.git
cd meta-authenticator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create your environment file:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Authentication
AUTH_SECRET_KEY=your-secure-password-here

# OTP Secrets
INSTAGRAM_OTP_SECRET=your-instagram-otp-secret-here
FACEBOOK_OTP_SECRET=your-facebook-otp-secret-here
```

5. Build and run the application:
```bash
# Development
npm run dev
# or
yarn dev

# Production
npm run build
npm run start
# or
yarn build
yarn start
```

## 🔒 Security Considerations

- Host the application on a secure, HTTPS-enabled domain
- Keep your `.env.local` file secure and never commit it to version control
- Regularly rotate your `AUTH_SECRET_KEY`
- Use strong, unique TOTP secrets for each platform
- Enable proper firewall rules on your hosting environment

## 🛠️ Technical Architecture

### Frontend
- Next.js 14 with App Router
- React 18 with Server Components
- TypeScript for type safety
- Tailwind CSS for styling
- Client-side authentication state management

### Authentication Flow
1. Users must authenticate with a password stored in `AUTH_SECRET_KEY`
2. Successful authentication sets an HTTP-only cookie
3. Protected routes and API endpoints verify the authentication cookie
4. Session expires after 24 hours or manual logout

### TOTP Generation
- Uses `otplib` for standard-compliant TOTP generation
- 30-second validity period for each code
- Server-side generation for security
- Anti-cache headers to prevent code reuse

## 📱 API Endpoints

### Authentication
- `POST /api/auth`: Login endpoint
- `GET /api/auth/check`: Session verification
- `POST /api/auth/logout`: Session termination

### OTP Generation
- `POST /api/facebook/otp`: Generate Facebook TOTP
- `POST /api/instagram/otp`: Generate Instagram TOTP

## 🔧 Configuration Options

### Environment Variables
- `AUTH_SECRET_KEY`: Master password for accessing the application
- `INSTAGRAM_OTP_SECRET`: TOTP secret for Instagram
- `FACEBOOK_OTP_SECRET`: TOTP secret for Facebook

### Server Configuration
- Default port: 3000 (configurable in package.json)
- Supports custom Next.js configuration via `next.config.mjs`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This project is not affiliated with, maintained, authorized, endorsed, or sponsored by Meta or any of its affiliates.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [otplib](https://github.com/yeojz/otplib) - TOTP implementation
