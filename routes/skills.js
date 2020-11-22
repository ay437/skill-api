const express = require('express');
const router = express.Router();

let data = [
    { typeOfSkill: 'Javascript', project: 'WB', status: "Good", id: 1 },
    { typeOfSkill: 'ReactJS', project: 'WB', status: "Good", id: 2 },
    { typeOfSkill: 'NodeJS', project: 'WB', status: "Learning", id: 3 },
    { typeOfSkill: 'Typescript', project: 'WB', status: "Learning", id: 4 }
];

router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
router.get('/:id', function (req, res) {
    const findSkill = data.find(function (skill) {
        return skill.id === parseInt(req.params.id);
    });
    findSkill ? res.status(200).json(findSkill) : res.sendStatus(404);
});

// CREATE
router.post('/', function (req, res) {
    const skillIds = data.map(skill => skill.id);
    const newId = skillIds.length > 0 ? Math.max.apply(Math, skillIds) + 1 : 1;
    const newSkill = {
        project: req.body.project,
        typeOfSkill: req.body.typeOfSkill,
        status: req.body.status,
        id: newId,
    };
    data.push(newSkill);
    res.status(201).json(newSkill);
});

// UPDATE
router.put('/:id', function (req, res) {
    const findSkill = data.find(function (skill) {
        return skill.id === parseInt(req.params.id);
    });
    if (findSkill) {
        const updated = {
            project: req.body.project, 
            typeOfSkill: req.body.typeOfSkill,
            status: req.body.status,
            id: findSkill.id
        };
        const targetIndex = data.indexOf(findSkill);
        data.splice(targetIndex, 1, updated);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
router.delete('/:id', function (req, res) {
    const findSkill = data.find(function (skill) {
        return skill.id === parseInt(req.params.id);
    });
    if (findSkill) {
        const targetIndex = data.indexOf(findSkill);
        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});

module.exports = router;