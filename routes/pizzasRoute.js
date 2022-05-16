const express = require("express");
const router = express.Router();
const Pizza = require('../models/pizzaModel')

router.get("/getallpizzas", async(req, res) => {
    try {
        const {search = '', category = ''} = req.query;
        const pizzas = await Pizza.find({})
        let filteredPizzas = pizzas;
        const trimmedSearch=search.trim();
        if (trimmedSearch) {
            filteredPizzas = filteredPizzas.filter(pizza => pizza?.name?.toLowerCase().includes(trimmedSearch.toLowerCase()))
        }
        if (category) {
            filteredPizzas = filteredPizzas.filter(pizza => pizza?.category === category);
        }
        res.send(filteredPizzas)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/addpizza", async(req, res) => {
    const pizza = req.body || {};
   try {
       const existingPizza = await Pizza.findOne({name: pizza.name, category: pizza.category});
       if (existingPizza) {
        return res.status(400).json(`${existingPizza?.name || 'Pizza'} already added`);
       }
    const newpizza = new Pizza({
        name: pizza.name,
        image: pizza.image,
        variants : ['small','medium','large'],
        description : pizza.description,
        category : pizza.category,
        prices : [pizza.prices]
    })
    await newpizza.save();
    res.send('Pizza added successfully')
   } catch (error) {
       return res.status(400).json("Failed to add pizza");
   }
});

router.post("/getpizzabyid", async(req, res) => {

 const pizzaid = req.body.pizzaid

 try {
     const pizza = await Pizza.findOne({_id : pizzaid})
     res.send(pizza)
 } catch (error) {
     return res.status(400).json({ message: error });
 }
  
});

router.post("/editpizza", async(req, res) => {

    const editedpizza = req.body.editedpizza

    try {
        const pizza = await Pizza.findOne({_id : editedpizza._id})
        
        pizza.name= editedpizza.name,
        pizza.description= editedpizza.description,
        pizza.image= editedpizza.image,
        pizza.category=editedpizza.category,
        pizza.prices = [editedpizza.prices]

        await pizza.save()

        res.send('Pizza updated successfully')

    } catch (error) {
        return res.status(400).json('Failed to update pizza');
    }
  
});

router.post("/deletepizza", async(req, res) => {
    const pizzaid = req.body.pizzaid;

  try {
    await Pizza.findOneAndDelete({_id : pizzaid})
    res.send('Pizza deleted successfully')
  } catch (error) {
    return res.status(400).json('Failed to delete pizza');
  }
});




module.exports = router;
