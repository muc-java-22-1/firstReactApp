import "./GalleryItem.css";
import {Character} from "../model";
import {useNavigate} from "react-router-dom";

interface GalleryItemProps {
    character: Character
}

export default function GalleryItem(props: GalleryItemProps) {

    const nav = useNavigate();

    return (
        <div data-testid={"Character" + props.character.id} className="CharacterFlexbox"
             onClick={() => nav(`/details/${props.character.id}`)}>
            <div>
                <h2>{props.character.name}</h2>
                <p>
                    Status: {props.character.status}
                    <br/>
                    Species: {props.character.species}
                    <br/>
                    id: {props.character.id}
                </p>
                <img src={props.character.image} alt="Character"/>
            </div>
        </div>
    )
}