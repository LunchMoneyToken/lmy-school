const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const PlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  for: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Plan = mongoose.models?.Plan || mongoose.model('Plan', PlanSchema);

async function seedPlans() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env file');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if plans already exist
    const existingPlans = await Plan.find({});
    if (existingPlans.length > 0) {
      console.log(`⚠️  Found ${existingPlans.length} existing plan(s) in database.`);
      console.log('   To reseed, delete existing plans first or use the admin panel.');
      await mongoose.disconnect();
      process.exit(0);
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

    console.log('🌱 Seeding plans...');
    const createdPlans = await Plan.insertMany(defaultPlans);
    console.log(`✅ Successfully created ${createdPlans.length} plans:`);
    
    createdPlans.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.title} - ${plan.for}`);
    });

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    console.log('\n🎉 Plans seeded successfully! They will now appear on the landing page.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding plans:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedPlans();
