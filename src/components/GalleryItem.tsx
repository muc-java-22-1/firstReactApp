import "./GalleryItem.css";
import {Character} from "../model";

interface GalleryItemProps {
    character: Character
}

export default function GalleryItem (props: GalleryItemProps) {
    return (
            <div className="CharacterFlexbox">
                <div>
                    <h2>{props.character.name}</h2>
                    <p>
                        Status: {props.character.status}
                        <br/>
                        Species: {props.character.species}
                        <br/>
                        id: {props.character.id}
                    </p>
                    <img src={props.character.image}  alt="Character"/>
                </div>
            </div>
    )
}