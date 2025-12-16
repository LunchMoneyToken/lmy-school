import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';

// Helper function to check admin authentication
async function checkAdminAuth() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('adminSession');
  if (!sessionToken || sessionToken.value !== process.env.ADMIN_SESSION_SECRET) {
    return false;
  }
  return true;
}

// PUT - Update enrollment (admin only)
export async function PUT(request, { params }) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
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

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        schoolName,
        districtName,
        administratorName,
        email,
        totalStudents: parseInt(totalStudents),
        currentLunchDebt,
      },
      { new: true, runValidators: true }
    );

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Enrollment updated successfully', enrollment },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    );
  }
}

// DELETE - Delete enrollment (admin only)
export async function DELETE(request, { params }) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const enrollment = await Enrollment.findByIdAndDelete(id);

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Enrollment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    );
  }
}
