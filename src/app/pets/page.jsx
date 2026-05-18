import PetCard from "../components/PetCard";


const PetPage = async () => {

  const res = await fetch('http://localhost:5000/pet');
  
 
  const pets = await res.json();

  console.log(pets);

  return (
    <div className="max-w-7xl mx-auto">
      <h1>All pets</h1>

      <div className="grid grid-cols-4 gap-5">
        {
          pets?.map(pet => <PetCard key={pet._id} pet={pet}/>)
        }
      </div>
    </div> 
  );
};

export default PetPage;
