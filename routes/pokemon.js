const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const API_URL = process.env.API_URL

router.get("/", async(req,res)=>{
    try {
        const response = await axios.get(`${API_URL}?limit=20`);  
        return res.render("pages/home", {pokemonList: response.data.results});      
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.get("/pokemon/:name", async(req,res) =>{
    try{
        const {name} = req.params;
        const response = await axios.get(`${API_URL}/${name}`);
        return res.render("pages/details", {pokemon: response.data});
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
} );

router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.redirect("/");
    const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
    return res.render("pages/details", { pokemon: response.data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const pokemons = [
  { id: 1, name: "Pikachu", image: "/images/pikachu.png" },
  { id: 2, name: "Charmander", image: "/images/charmander.png" },
  { id: 3, name: "Bulbasaur", image: "/images/bulbasaur.png" },
];

router.get('/home', (req, res) => {
  res.render('pages/home', { pokemons }); 
});


module.exports = router;