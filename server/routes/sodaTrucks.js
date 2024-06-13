const router = require('express').Router();
let SodaTruck = require('../models/sodaTruck.model');

router.route('/').get((req, res) => {
    SodaTruck.find()
    .then(sodaTrucks => res.json(sodaTrucks))
    .catch(err => res.status(400).json('Error: ' + err));
    //res.send('List of all soda trucks');
});

// POST route to create a new soda truck
router.post('/', async (req, res) => {
    const { name, location, sodaStock, iceStock } = req.body;
    const newSodaTruck = new SodaTruck({ name, location, sodaStock, iceStock });
    try {
        await newSodaTruck.save();
        res.status(201).json(newSodaTruck);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to remove an existing soda truck
router.delete('/:id', getSodaTruck, async (req, res) => {
        try {
        await res.sodaTruck.remove();
    res.json({ message: 'Deleted Soda Truck' });
        } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const sodaStock = Number(req.body.sodaStock);
    const iceStock = Number(req.body.iceStock);

    const newSodaTruck = new SodaTruck({ name, location, sodaStock, iceStock });

    newSodaTruck.save()

});

// Middleware to get a soda truck by ID
async function getSodaTruck(req, res, next) {
    let sodaTruck;
    try {
        sodaTruck = await SodaTruck.findById(req.params.id);
        if (sodaTruck == null) {
            return res.status(404).json({ message: 'Cannot find soda truck' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.sodaTruck = sodaTruck;
    next();
}

module.exports = router;

