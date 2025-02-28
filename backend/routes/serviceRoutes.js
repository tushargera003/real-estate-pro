import express from 'express';
import { getService, createService, updateService, deleteService ,getServiceById ,getAllServices} from '../controllers/serviceController.js';

const router = express.Router();

router.route('/')
  .get(getAllServices)
  .post(createService);

router.route('/:id')
  .put(updateService)
  .get(getServiceById)
  .delete(deleteService);

export default router;
