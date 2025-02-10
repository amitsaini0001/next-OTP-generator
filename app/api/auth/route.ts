if (!process.env.AUTH_SECRET_KEY) {
  throw new Error('AUTH_SECRET_KEY is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (password === process.env.AUTH_SECRET_KEY) {
      const response = new Response(JSON.stringify({ success: true }), {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `isAuthenticated=true; path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
        },
      });
      return response;
    }
    
    return Response.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 