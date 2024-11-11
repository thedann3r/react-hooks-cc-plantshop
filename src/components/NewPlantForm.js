import React, { useState } from "react";

function NewPlantForm({plants,setPlants}) {
  const [newPlant,setNewPlant] = useState({
      name :"",
      image:"",
      price:0,
      id:0
    })
   function handleChange(e){
    let name = e.target.name
    let value = e.target.value

    setNewPlant({
      ...newPlant,
      [name]:value
    })
   }
   function handleSubmit(e){
    e.preventDefault()
    fetch("http://localhost:6001/plants", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newPlant)
    })
    .then(resp => resp.json())
    .then(pla => {setPlants([...plants,pla])
      setNewPlant({
        name :"",
        image:"",
        price:0,
        id:0
      })
    })
    .catch(err => console.log(err))
   }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} required onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image} required onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} required onChange={handleChange}/>
        <input type="number" name="id" placeholder="id" value={newPlant.id} required onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  ); 
}

export default NewPlantForm;
