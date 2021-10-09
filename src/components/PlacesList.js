import ListItem from "./ListItem";
import EditableListItem from "./EditableListItem";

const PlacesList = ({loggedInUser,places,itemClick}) => {
    
    return(
        <div id="placesResult">
            {
                places.map(p=>{
                    if(loggedInUser){
                        console.log(p.UserID,loggedInUser.id)
                    }
                    if(loggedInUser && 
                        p.UserID ===loggedInUser.id){
                        return <EditableListItem 
                        onItemClick={itemClick} 
                        key={"place_"+p.ID} place={p}/>
                    }else{
                        return <ListItem 
                        onItemClick={itemClick} 
                        key={"place_"+p.ID} place={p}/>
                    }
                    
                }
                )
            }
        </div>
    )
}

export default PlacesList;