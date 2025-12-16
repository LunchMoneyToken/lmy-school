import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Plan from '@/models/Plan';

// POST - Create new plan (admin only)
export async function POST(request) {
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
    
    const { title, for: forText, features, button, order, isActive } = body;

    // Validation
    if (!title || !forText || !features || !Array.isArray(features) || !button) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const plan = await Plan.create({
      title,
      for: forText,
      features,
      button,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      { message: 'Plan created successfully', plan },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}

// GET - Get all plans (public for landing page, but admin can see all)
export async function GET(request) {
  try {
    await connectDB();
    
    // Check if admin is requesting (to see inactive plans too)
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('adminSession');
    const isAdmin = sessionToken && sessionToken.value === process.env.ADMIN_SESSION_SECRET;
    
    let plans;
    if (isAdmin) {
      // Admin sees all plans
      plans = await Plan.find({}).sort({ order: 1, createdAt: 1 });
    } else {
      // Public only sees active plans
      plans = await Plan.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    }
    
    return NextResponse.json({ plans }, { status: 200 });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}
