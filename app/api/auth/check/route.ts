export async function GET(request: Request) {
  const authCookie = request.headers.get('cookie')?.includes('isAuthenticated=true');
  
  if (authCookie) {
    return new Response(null, { status: 200 });
  }
  
  return new Response(null, { status: 401 });
} 