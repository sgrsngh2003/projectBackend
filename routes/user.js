const express = require('express');
const User = require('../db'); 
const { z } = require('zod');

const userRouter = express.Router();

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    img: z.string(),
    website: z.string(),
    phone: z.string(),
    address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.number()
    })
});

userRouter.post('/add', async (req, res) => {
    const body = req.body;
    const { success } = userSchema.safeParse(body);

    if (!success) {
        return res.json({
            message: "Invalid schema"
        });
    }

    try {
        const existingUser = await User.findOne({
            $or: [
                { email: body.email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Create new user
        const user = await User.create({
            name: body.name,
            email: body.email,
            img: body.img,
            website: body.website,
            phone: body.phone,
            address: {
                street: body.address.street,
                suite: body.address.suite,
                city: body.address.city,
                zipcode: body.address.zipcode
            }
        });

        res.json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            message: "Internal server error"
        });
    }
});
userRouter.get('/all', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.json({
            message: error
        })
    }
    
})

const updateSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    website: z.string(),
    phone: z.string()
})

userRouter.put('/update', async (req, res) => {
    const body = req.body;
    const { success } = updateSchema.safeParse(body);
    if(!success){
        return res.json({
            message: 'error'
        })
    }
    try{
        await User.findByIdAndUpdate(body.id,{
            name: body.name,
            email: body.email,
            website: body.website,
            phone: body.phone
        }).exec();
        res.json({
            message:" successfully updated"
        })
    }
    catch(error){
        res.json({
            message: "error"
        })
    }
})

const removeSchema = z.object({
    id: z.string()
})


userRouter.delete('/remove', async(req, res) => {
    const body = req.body;
    const { success } = removeSchema.safeParse(body);
    if(!success){
        return res.json({
            message: "invalid schema"
        })
    }
    try {
        await User.findByIdAndDelete(body.id);
        res.json({
            message: 'delete succesfull'
        })
    } catch (error) {
        res.json({
            message: 'error'
        })
    }
})


module.exports = userRouter;
