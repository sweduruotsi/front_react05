import React, {useState, useEffect} from "react";
import PlacesList from "./components/PlacesList";
// import AddPlace from "./components/AddPlace";
import Loading from "./components/Loading";
import Map from "./components/Map";
import Header from "./components/Header";

const App = () => {
    const [isLoading,setIsLoading]=useState(false);
    const [places, setPlaces] = useState([]);
    const [center, setCenter] = useState([62.6,29.77])
    const [user,setUser]=useState(null)

    const getAllPlaces = () => {
        setIsLoading(true);
        
        setTimeout(()=>
            fetch("http://localhost:3001/api/places")
            .then((response) => {
                return response.json(); // returns another promise
            })
            .then((placesData) => {
                setPlaces(placesData);
                setIsLoading(false);
            })
            .catch((err) => {
                alert("Something went bad");
                console.log("Error: ", err);
                setIsLoading(false);
            }),1000); // artificially slowing down by 1 second
    };

    useEffect(()=>getAllPlaces(),[])

    const listItemClick=(id)=>{
        const place = places.find(p=>p.ID===id);
        setCenter([place.Latitude,place.Longitude]);
    }

    const doLogout=()=>{
        setUser(null);
    }

    // should open window
    const openLogin=()=>{
        setUser({id:3,name:"Petri"});
    }

    return (
        <>
            {
            /* This is a comment inside JSX
            <AddPlace setIsLoading={setIsLoading}/>
            <br />
            <br />
            <hr />
            <br />
            */
            }
            <Header user={user} doLogout={doLogout}
                openLogin={openLogin}/>
            {
                isLoading?<Loading/>:
                <div id="content">
                    <PlacesList itemClick={listItemClick} 
                        loggedInUser={user} places={places}/>
                    <Map center={center} places={places}/>
                </div>
            }
        </>
    );
};

export default App;
