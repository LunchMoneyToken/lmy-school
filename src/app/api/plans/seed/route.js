import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Plan from '@/models/Plan';

// POST - Seed initial plans (admin only, one-time use)
export async function POST() {
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

    // Check if plans already exist
    const existingPlans = await Plan.find({});
    if (existingPlans.length > 0) {
      return NextResponse.json(
        { 
          message: 'Plans already exist in database. Delete existing plans first if you want to reseed.',
          existingCount: existingPlans.length 
        },
        { status: 200 }
      );
    }

    // Original plans data from landing page
    const defaultPlans = [
      {
        title: "Starter Plan",
        for: "For Small Schools",
        features: [
          "Hedge dashboard",
          "Monthly offset allocation",
          "Standard support"
        ],
        button: "Start Enrollment",
        order: 0,
        isActive: true,
      },
      {
        title: "Growth Plan",
        for: "For mid-sized schools",
        features: [
          "Priority hedge allocation",
          "Multi-school dashboard",
          "Email & phone support"
        ],
        button: "Choose Plan",
        order: 1,
        isActive: true,
      },
      {
        title: "Premium Plan",
        for: "For districts",
        features: [
          "High-volume hedge allocation",
          "Full administrative suite",
          "Dedicated account specialist "
        ],
        button: "Choose Plan",
        order: 2,
        isActive: true,
      },
      {
        title: "Enterprise Plan",
        for: "For state/regional networks",
        features: [
          "Custom hedge strategies",
          "API & data integration",
          "Full support & customization"
        ],
        button: "Contact Us",
        order: 3,
        isActive: true,
      },
    ];

    // Insert plans into database
    const createdPlans = await Plan.insertMany(defaultPlans);

    return NextResponse.json(
      { 
        message: 'Plans seeded successfully!',
        plans: createdPlans,
        count: createdPlans.length
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding plans:', error);
    return NextResponse.json(
      { error: 'Failed to seed plans', details: error.message },
      { status: 500 }
    );
  }
}
