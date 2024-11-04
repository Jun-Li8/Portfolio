import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000"

const Project = () => {
    const [res,SetRes] = useState<string>("");
    useEffect(() => {
        const fetchAllCollections = async () => {
            try{
                const response = await fetch(`${API_URL}/api/get-language-data`);
                const data = await response.json();
                SetRes(data["Go"]);
            } catch (error){
                console.error('Error fetching collections:', error);
            }
        };
        fetchAllCollections();
    },[]);
    return (
        <h1>
            {res}
        </h1>
    )
}

export default Project;