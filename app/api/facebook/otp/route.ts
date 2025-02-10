import { authenticator } from 'otplib';

if (!process.env.FACEBOOK_OTP_SECRET) {
  throw new Error('FACEBOOK_OTP_SECRET is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const otp = authenticator.generate(process.env.FACEBOOK_OTP_SECRET || '');
    const epoch = Math.floor(Date.now() / 1000);
    const timeLeft = 30 - (epoch % 30);
    const expiresAt = epoch + timeLeft;

    return Response.json(
      { 
        otp,
        timeLeft,
        expiresAt
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to generate OTP' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  }
} 