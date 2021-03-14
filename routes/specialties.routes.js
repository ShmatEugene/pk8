const { Router } = require('express');
const Speciality = require('../models/Speciality');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/spec/add
router.post('/add', auth, async (req, res) => {
  try {
    specialityFields = req.body.specialityFields;
    console.log(specialityFields);
    const spec = new Speciality({
      code: specialityFields.code,
      title: specialityFields.title,
      yearsToStudy: specialityFields.yearsToStudy,
      stateFundedPlacecesCounter: specialityFields.stateFundedPlacecesCounter,
      stateAccreditation: true,
      desc: specialityFields.desc,
      prospects: specialityFields.prospects,
    });
    await spec.save();
    res.status(201).json({ spec });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/spec/
router.get('/', async (req, res) => {
  try {
    const specs = await Speciality.find();
    res.json(specs);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/spec/:id
router.get('/:id', async (req, res) => {
  try {
    const spec = await Speciality.findById(req.params.id);
    res.json(spec);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
