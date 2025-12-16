import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not configured' },
        { status: 500 }
      );
    }

    // Verify credentials
    if (username === adminUsername && password === adminPassword) {
      // Set session cookie
      const cookieStore = cookies();
      const sessionSecret = process.env.ADMIN_SESSION_SECRET || 'default-secret-change-in-env';
      
      const response = NextResponse.json(
        { message: 'Login successful' },
        { status: 200 }
      );

      response.cookies.set('adminSession', sessionSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    );
  }
}

// GET - Check if admin is logged in
export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('adminSession');
    
    if (sessionToken && sessionToken.value === process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }
    
    return NextResponse.json({ authenticated: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
