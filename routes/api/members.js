import express from 'express'
import {v4 as uuid} from 'uuid'
import members from "../../Members.js";

const router = express.Router()

router.get('/', (req, res) => {
    res.json(members)
})

router.post('/', (req, res) => {
    const member = {
        id: uuid(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }

    if(!member.name || !member.email) {
        return res.status(400).json({
            message: 'Name and email is required'
        })
    }

    members.push(member)
    return res.json(member)
})

router.get('/:id', (req, res) => {
    const member = members.find(member => member.id === (req.params.id))

    if (member) {
        res.json(member)
    }else {
        res.status(400).json({
            msg: `Member with id: ${req.params.id} not found`
        })
    }
})

router.put('/:id', (req, res) => {
    let found = false
    const updatedMember = req.body

    members.forEach((member => {
        if (member.id === req.params.id) {
            found = true
            member.name = updatedMember.name || member.name
            member.email = updatedMember.email || member.email

            return res.json({
                msg: 'Member updated',
                member,
            })
        }
    }))

    if (!found) {
        return res.status(400).json({
            msg: `Member with id: ${req.params.id} not found`
        })
    }
})

router.delete('/:id', (req, res) => {
    const index = members.findIndex(member => member.id !== req.params.id)
    console.log(index)

    if (index) members.splice(index, 1)
    console.log(members.splice(index, 1))
    return res.json({ msg: 'Member deleted' })
})

export default router