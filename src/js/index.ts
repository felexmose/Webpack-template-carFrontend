import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { ICar } from "./Icar";

let Contentelement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");

function showAllCars():void{
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function(response: AxiosResponse<ICar[]>): void
    {
        console.log(response);
        //Contentelement.textContent = String(response.data[1]);
    })
    .catch(
        function(error: AxiosError ): void{
            console.log("errrrrrror in my code")
            console.log(error);
        }
        
    )   
    console.log("er i slutning af af show all cars function");
}

showAllCars();