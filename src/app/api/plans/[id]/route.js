import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Plan from '@/models/Plan';

// PUT - Update plan (admin only)
export async function PUT(request, { params }) {
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
    const { id } = params;
    const body = await request.json();
    
    const { title, for: forText, features, button, order, isActive } = body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (forText !== undefined) updateData.for = forText;
    if (features !== undefined) updateData.features = features;
    if (button !== undefined) updateData.button = button;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;
    updateData.updatedAt = new Date();

    const plan = await Plan.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Plan updated successfully', plan },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

// DELETE - Delete plan (admin only)
export async function DELETE(request, { params }) {
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
    const { id } = params;

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Plan deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}
