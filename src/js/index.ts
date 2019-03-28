import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { ICar } from "./Icar";

let Contentelement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let getAllCarsBtn: HTMLButtonElement= <HTMLButtonElement>document.getElementById("getAllBtn");
let getClearBtn:HTMLButtonElement = <HTMLButtonElement>document.getElementById("clearBtn");
let addCarBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCarBtn");
let deleteCarBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteCarBtn");
let updateBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("updateBtn");
let getSpecificCarBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getCarBtn");


getSpecificCarBtn.addEventListener("click", getSpecificCar);

function getSpecificCar():void{
    let specificCarDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("specificCarOutput");
    let id2update: HTMLInputElement = <HTMLInputElement>document.getElementById("inputSpecificCar");
    let specificId: number = Number(id2update.value);

    axios.get<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars"+"/"+ specificId)
            
            .then(function (response:AxiosResponse):void{
                console.log("status koden er:" + response.status)
                //let spescificIdSpan: HTMLSpanElement;
                let myCar:ICar = response.data;
                let result: string = myCar.id+" "+myCar.model+" "+myCar.vendor+" "+myCar.price;
                specificCarDiv.innerText = result;
                id2update.value =""; 
            })
            .catch(function(error: AxiosError):void{

            })
}

updateBtn.addEventListener("click",updateCar);

function updateCar():void{
    let Id2Update: HTMLInputElement = <HTMLInputElement>document.getElementById("updateId");
    let updateModel: HTMLInputElement = <HTMLInputElement>document.getElementById("updateModel");
    let updateVendor: HTMLInputElement = <HTMLInputElement>document.getElementById("updateVender");
    let updatePrice: HTMLInputElement = <HTMLInputElement>document.getElementById("updatePrice");

    let car2Update: number = Number(Id2Update.value);

    axios.put("https://webapicar20190326034339.azurewebsites.net/api/cars"+"/"+ car2Update,
                    {model:updateModel.value, vendor:updateVendor.value, price: updatePrice.value})
            .then(function (response: AxiosResponse):void{
                console.log(response.status)
            })
            .catch(function(error:AxiosError):void{
                console.log("errror during updating")
            })

}


deleteCarBtn.addEventListener("click",deleteCar);

function deleteCar():void{
    let deleteThisID: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteCarId");
    let myId: number = Number(deleteThisID.value);
    deleteThisID.value="";

    axios.delete("https://webapicar20190326034339.azurewebsites.net/api/cars"+"/"+ myId)
            
            .then(function (response:AxiosResponse):void{
                console.log("status koden er:" + response.status)    
            })
            .catch(function(error: AxiosError):void{

            })
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
    
    // reset input fields.
    addModelElement.value ="";
    addVendorElement.value ="";
    addPriceElement.value = "";

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
            result += "<li>"+car.model +" "+car.vendor+" "+car.price +"</li>"    
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