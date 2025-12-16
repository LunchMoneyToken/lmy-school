import mongoose from 'mongoose';

const ContactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure only one document exists
ContactInfoSchema.statics.getContactInfo = async function() {
  let contactInfo = await this.findOne();
  if (!contactInfo) {
    contactInfo = await this.create({
      email: 'exampleemail@example.com',
      phone: '+265 998 998 9990',
    });
  }
  return contactInfo;
};

const ContactInfo = mongoose.models.ContactInfo || mongoose.model('ContactInfo', ContactInfoSchema);

export default ContactInfo;
