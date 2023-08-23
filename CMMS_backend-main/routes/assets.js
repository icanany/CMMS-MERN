const express = require('express');
const router = express.Router();
const assetController = require('../app/api/controllers/assets');

router.get('/', assetController.getAll);
router.post('/', assetController.create);
router.get('/numberId', assetController.createNumberId);
router.get('/ID/:assetId', assetController.getById);
router.get('/print/:assetId', assetController.getPrintDataById);
router.get('/filter/:Id', assetController.getByFilterId);
router.get('/allAsset', assetController.getAllAsset);
router.put('/:assetId', assetController.updateById);
router.delete('/:assetId', assetController.deleteById);

module.exports = router;