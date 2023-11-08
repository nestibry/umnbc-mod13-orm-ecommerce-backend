const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    try {
        const data = await Tag.findAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'products' }]
        })
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await Tag.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const data = await Tag.update(req.body, {
            where: {id: req.params.id}
        });
        if(data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.id + ' is not found or updated.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' updated.' , updated_to: req.body  });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete a tag by its `id` value
    try {
        const data = await Tag.destroy({
            where: { id: req.params.id }
        });
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' is deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
