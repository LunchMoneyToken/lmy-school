import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';

// POST - Create new enrollment
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { schoolName, districtName, administratorName, email, totalStudents, currentLunchDebt } = body;

    // Validation
    if (!schoolName || !districtName || !administratorName || !email || !totalStudents || !currentLunchDebt) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.create({
      schoolName,
      districtName,
      administratorName,
      email,
      totalStudents: parseInt(totalStudents),
      currentLunchDebt,
    });

    return NextResponse.json(
      { message: 'Enrollment submitted successfully', enrollment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to submit enrollment' },
      { status: 500 }
    );
  }
}

// GET - Get all enrollments (admin only)
export async function GET() {
  try {
    // Check for admin session
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('adminSession');
    
    if (!sessionToken || sessionToken.value !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ enrollments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}
