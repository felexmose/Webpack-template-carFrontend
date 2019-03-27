import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { ICar } from "./Icar";

let Contentelement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let getAllCarsBtn: HTMLButtonElement= <HTMLButtonElement>document.getElementById("getAllBtn");
let getClearBtn:HTMLButtonElement = <HTMLButtonElement>document.getElementById("clearBtn");
let addCarBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCarBtn");
let deleteCarBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteCarBtn");

deleteCarBtn.addEventListener("click",deleteCar);

function deleteCar():void{
    
}

getAllCarsBtn.addEventListener("click", showAllCars);

getClearBtn.addEventListener("click",() =>{

    Contentelement.innerText = "";
});

addCarBtn.addEventListener("click", addCar);

function addCar():void{
    let addModelElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addModel");
    let addVendorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addVendor");
    let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addPrice");

    let myModel: string = addModelElement.value;
    let myVendor: string = addVendorElement.value;
    let myPrice: number = Number(addPriceElement.value);
    
    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars",
                    {model:myModel, vendor:myVendor,price:myPrice})
        .then(function (response:AxiosResponse):void{
            console.log("status koden er:" + response.status)    
        })
        .catch(function(error: AxiosError):void{

        })
}

function showAllCars():void{
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function(response: AxiosResponse<ICar[]>): void
    {
        console.log(response);

        let result: string = "<ol>"
        
        response.data.forEach((car: ICar) => {
            result += "<li>"+car.model +" "+car.vendor+" "+car.id +"</li>"    
        });
        result +="</ol>"

        Contentelement.innerHTML = result;
    })
    .catch(
        function(error: AxiosError ): void{
            console.log("errrrrrror in my code")
            console.log(error);
        }
        
    )   
    console.log("er i slutning af af show all cars function");
}

//showAllCars();