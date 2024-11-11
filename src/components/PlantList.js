import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants,setPlants}) {
  return (
    <div id="container">
      <ul className="cards">
        {plants.length >0 ? plants.map((plantain) => (
          <li key={plantain.id}>
            <PlantCard 
              name={plantain.name} 
              price={plantain.price} 
              image={plantain.image} 
              id={plantain.id}
              plants={plants}
              setPlants={setPlants}
            />
        </li> 
        )):null}
      </ul>
    </div>
  );
}

export default PlantList;