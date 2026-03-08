const Asset = require('../models/Asset');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * @desc    Get all assets with filtering, search, sort, and pagination
 * @route   GET /api/assets
 * @access  Private
 */
const getAssets = async (req, res, next) => {
  try {
    // Build query object based on URL parameters
    const query = {};

    // SEARCH: Search by name or description
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // FILTER: Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // FILTER: Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // FILTER: Filter by condition
    if (req.query.condition) {
      query.condition = req.query.condition;
    }

    // PAGINATION: Page and limit
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // SORTING: Sort by field (use - for descending)
    let sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      sortFields.forEach((field) => {
        if (field.startsWith('-')) {
          sort[field.substring(1)] = -1; // Descending
        } else {
          sort[field] = 1; // Ascending
        }
      });
    } else {
      sort = { createdAt: -1 }; // Default: newest first
    }

    // Execute query
    const assets = await Asset.find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'username email'); // Include creator info

    // Get total count for pagination
    const total = await Asset.countDocuments(query);

    // Pagination result
    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    };

    res.status(200).json({
      success: true,
      count: assets.length,
      pagination,
      data: assets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single asset by ID
 * @route   GET /api/assets/:id
 * @access  Private
 */
const getAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id).populate(
      'createdBy',
      'username email'
    );

    if (!asset) {
      return next(new ErrorResponse('Asset not found', 404));
    }

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new asset
 * @route   POST /api/assets
 * @access  Private
 */
const createAsset = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const asset = await Asset.create(req.body);

    res.status(201).json({
      success: true,
      data: asset,
      message: 'Asset created successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update asset
 * @route   PUT /api/assets/:id
 * @access  Private
 */
const updateAsset = async (req, res, next) => {
  try {
    let asset = await Asset.findById(req.params.id);

    if (!asset) {
      return next(new ErrorResponse('Asset not found', 404));
    }

    // Check ownership or admin role
    if (
      asset.createdBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse('Not authorized to update this asset', 403)
      );
    }

    asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators
    });

    res.status(200).json({
      success: true,
      data: asset,
      message: 'Asset updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete asset
 * @route   DELETE /api/assets/:id
 * @access  Private (Admin or Owner)
 */
const deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return next(new ErrorResponse('Asset not found', 404));
    }

    // Check ownership or admin role
    if (
      asset.createdBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse('Not authorized to delete this asset', 403)
      );
    }

    await asset.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Asset deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get asset statistics for dashboard
 * @route   GET /api/assets/stats/dashboard
 * @access  Private
 */
const getAssetStats = async (req, res, next) => {
  try {
    // Total assets
    const totalAssets = await Asset.countDocuments();

    // Assets by status
    const statusStats = await Asset.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Assets by category
    const categoryStats = await Asset.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Assets by condition
    const conditionStats = await Asset.aggregate([
      {
        $group: {
          _id: '$condition',
          count: { $sum: 1 },
        },
      },
    ]);

    // Total value of assets
    const valueStats = await Asset.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$purchasePrice' },
          avgValue: { $avg: '$purchasePrice' },
        },
      },
    ]);

    // Recent assets (last 5)
    const recentAssets = await Asset.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'username');

    // Assets needing maintenance soon (next 7 days)
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const maintenanceDue = await Asset.find({
      'maintenanceSchedule.nextMaintenance': {
        $gte: now,
        $lte: sevenDaysFromNow,
      },
    }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalAssets,
        statusStats: statusStats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        categoryStats: categoryStats.map((item) => ({
          category: item._id,
          count: item.count,
        })),
        conditionStats: conditionStats.map((item) => ({
          condition: item._id,
          count: item.count,
        })),
        totalValue: valueStats[0]?.totalValue || 0,
        avgValue: valueStats[0]?.avgValue || 0,
        recentAssets,
        maintenanceDue,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add maintenance record to asset
 * @route   POST /api/assets/:id/maintenance
 * @access  Private
 */
const addMaintenanceRecord = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return next(new ErrorResponse('Asset not found', 404));
    }

    // Add maintenance record
    asset.maintenanceHistory.push(req.body);

    // Update last maintenance date
    asset.maintenanceSchedule.lastMaintenance = req.body.date;

    // Calculate next maintenance date
    if (asset.maintenanceSchedule.maintenanceInterval) {
      const nextDate = new Date(req.body.date);
      nextDate.setDate(
        nextDate.getDate() + asset.maintenanceSchedule.maintenanceInterval
      );
      asset.maintenanceSchedule.nextMaintenance = nextDate;
    }

    await asset.save();

    res.status(200).json({
      success: true,
      data: asset,
      message: 'Maintenance record added successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Export all functions
module.exports = {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetStats,
  addMaintenanceRecord,
};