const express = require('express');
const {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetStats,
  addMaintenanceRecord,
} = require('../controllers/assetController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Create router
const router = express.Router();

// ALL ROUTES ARE PROTECTED (must be logged in)
router.use(protect);

// STATS ROUTE (must be before /:id route)
// GET /api/assets/stats/dashboard
router.get('/stats/dashboard', getAssetStats);

// CRUD ROUTES
// GET /api/assets (get all)
// POST /api/assets (create new)
router.route('/').get(getAssets).post(createAsset);

// GET /api/assets/:id (get one)
// PUT /api/assets/:id (update)
// DELETE /api/assets/:id (delete)
router
  .route('/:id')
  .get(getAsset)
  .put(updateAsset)
  .delete(deleteAsset);

// MAINTENANCE ROUTE
// POST /api/assets/:id/maintenance
router.post('/:id/maintenance', addMaintenanceRecord);

// Export router
module.exports = router;