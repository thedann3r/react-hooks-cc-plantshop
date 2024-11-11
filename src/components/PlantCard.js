import React, { useState } from "react";

function PlantCard({image, name, price, id, plants, setPlants}) {
  const [inStock, setInStock] = useState(true)

  function handleToggleStock() {
    setInStock((prevStock) => !prevStock)
  }
  const [updatePlant,setUpdatePlant] = useState({
    name:"",
    image:"",
    price:0
  }) 
  
  function handleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      let remainder = plants.filter(plante => plante.id !== id)
      setPlants(remainder)
      alert(`you just deleted ${name}`)
    })
    .catch(err => console.log(err))
  }
  
    function handleChange(e){
      let name =  e.target.name
      let value =  e.target.value
  
      setUpdatePlant({
        ...updatePlant,
        [name]:value
      })
    }
    function handleUpdate(e){
      e.preventDefault()
      fetch(`http://localhost:6001/plants/${id}`, {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(updatePlant)
      })
      .then(resp => resp.json())
      .then(update => {
        let updates = plants.map(updated => {
          if(updated.id === id){
             updated.name = update.name
             updated.image = update.image
             updated.price = update.price
          }
          return updated
         })
         setPlants(updates)
      }
    )
      .catch(error => console.log(error))
    }
  
  return (
    <ul>
      <li className="card" data-testid="plant-item">
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>Price: {price}</p>
        <p>{id}</p>
        <button className={inStock ? "primary" : ""} onClick={handleToggleStock}>
          {inStock ? "In Stock" : "Out of Stock"}
        </button>
        <form onSubmit={handleUpdate}>
        <input type="text" name="name" placeholder="Plant name" value={updatePlant.name} required onChange={handleChange}/>
        <input type="url" name="image" placeholder="image-url" value={updatePlant.image} required onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={updatePlant.price} required onChange={handleChange}/>
        <button type="submit">Update!</button>
        </form>
        <button onClick={handleDelete}>Delete!</button>
      </li>
    </ul>
  );
}

export default PlantCard;
