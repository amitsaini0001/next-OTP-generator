export async function POST() {
  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': 'isAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    },
  });
} 