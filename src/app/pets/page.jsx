import AllPetsPage from "../components/AllPetsPage";






const PetPage = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`);
  
 
  const pets = await res.json();

  console.log(pets);

  return (
    <div className="max-w-7xl mx-auto">
      <h1>All pets</h1>

      <div>
        <AllPetsPage petsData={pets} />
      </div>
    </div>
  );
};

export default PetPage;