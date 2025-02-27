import Service from '../models/serviceModel.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getService = async (req, res) => {
  try {
    const services = await Service.find({active: true});
    res.json(services);
  } catch (error) {
    res.status(404).json({ message: 'Services not found' });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Public
const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = new Service({ name, description, price });
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: 'Invalid service data' });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Public
const updateService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
      service.name = name;
      service.description = description;
      service.price = price;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid service data' });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Public
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.remove();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid service data' });
  }
};
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid service ID' });
  }
};

export { getService,getServiceById, createService, updateService, deleteService };
