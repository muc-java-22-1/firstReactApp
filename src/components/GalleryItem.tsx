import "./GalleryItem.css";

interface GalleryItemProps {
    name: string;
    status: string;
    species: string;
    image_url: string;
}

export default function GalleryItem (props: GalleryItemProps) {
    return (
            <div className="CharacterFlexbox">
                <div>
                    <h2>{props.name}</h2>
                    <p>
                        Status: {props.status}
                        <br/>
                        Species: {props.species}
                    </p>
                    <img src={props.image_url}  alt="Character"/>
                </div>
            </div>
    )
}