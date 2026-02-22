const mongoose = require('mongoose');

// Schema for maintenance records (sub-document)
const maintenanceRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Routine', 'Repair', 'Inspection', 'Upgrade', 'Emergency'],
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  performedBy: {
    type: String,
  },
});

// Define what an Asset looks like in the database
const assetSchema = new mongoose.Schema(
  {
    // Asset name - required
    name: {
      type: String,
      required: [true, 'Please provide an asset name'],
      trim: true,
      maxlength: [100, 'Asset name cannot exceed 100 characters'],
    },
    
    // Category - required, must be one of these options
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Equipment', 'Vehicle', 'Tool', 'Furniture', 'Electronics', 'Other'],
    },
    
    // Status - required, default is Active
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive', 'Maintenance', 'Retired'],
      default: 'Active',
    },
    
    // Description - optional
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    
    // Serial number - optional, must be unique if provided
    serialNumber: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
      trim: true,
    },
    
    // Purchase date - optional
    purchaseDate: {
      type: Date,
    },
    
    // Purchase price - optional, cannot be negative
    purchasePrice: {
      type: Number,
      min: [0, 'Purchase price cannot be negative'],
    },
    
    // Location - optional
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    
    // Who is using this asset - optional
    assignedTo: {
      type: String,
      trim: true,
    },
    
    // Condition - optional, default is Good
    condition: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor'],
      default: 'Good',
    },
    
    // Maintenance schedule
    maintenanceSchedule: {
      lastMaintenance: Date,
      nextMaintenance: Date,
      maintenanceInterval: {
        type: Number, // Days between maintenance
        default: 90,
      },
    },
    
    // Array of maintenance records
    maintenanceHistory: [maintenanceRecordSchema],
    
    // Image URL - optional
    imageUrl: {
      type: String,
    },
    
    // Additional notes - optional
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    
    // Who created this asset - required, references User model
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create indexes for better search performance
assetSchema.index({ name: 'text', description: 'text' }); // Text search
assetSchema.index({ category: 1, status: 1 }); // Filter by category and status
assetSchema.index({ createdBy: 1 }); // Filter by creator
assetSchema.index({ createdAt: -1 }); // Sort by date

// Virtual property to check maintenance status
assetSchema.virtual('maintenanceStatus').get(function () {
  if (!this.maintenanceSchedule?.nextMaintenance) return 'Unknown';
  
  const now = new Date();
  const nextMaintenance = new Date(this.maintenanceSchedule.nextMaintenance);
  const daysUntil = Math.ceil((nextMaintenance - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0) return 'Overdue';
  if (daysUntil <= 7) return 'Due Soon';
  return 'Up to Date';
});

// Include virtual properties in JSON
assetSchema.set('toJSON', { virtuals: true });
assetSchema.set('toObject', { virtuals: true });

// Export the Asset model
module.exports = mongoose.model('Asset', assetSchema);