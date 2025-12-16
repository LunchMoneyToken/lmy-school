import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import ContactInfo from '@/models/ContactInfo';

// GET - Get contact info (public)
export async function GET() {
  try {
    await connectDB();
    const contactInfo = await ContactInfo.getContactInfo();
    
    return NextResponse.json({ contactInfo }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

// PUT - Update contact info (admin only)
export async function PUT(request) {
  try {
    // Check for admin session
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('adminSession');
    
    if (!sessionToken || sessionToken.value !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    
    const { email, phone } = body;

    // Validation
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
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

    // Get or create contact info
    let contactInfo = await ContactInfo.findOne();
    
    if (contactInfo) {
      contactInfo.email = email;
      contactInfo.phone = phone;
      contactInfo.updatedAt = new Date();
      await contactInfo.save();
    } else {
      contactInfo = await ContactInfo.create({
        email,
        phone,
      });
    }

    return NextResponse.json(
      { message: 'Contact info updated successfully', contactInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}
