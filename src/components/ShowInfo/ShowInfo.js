import React,{useEffect, useState} from "react";
import star from "./assets/Star.svg";
import close from "./assets/Union.svg";
import "./ShowInfo.css";



function ShowInfo(props){
    console.log("llego el countrie",props);


    return(
        <div className="container-info-countrie">
            <div className="container-title-countrie">
                <h2 className="title-countrie-name">{props.countrie.name?.common}</h2>
                <img className="star-style" src={star}></img>
                <img className="close-style" src={close} onClick={()=>props.onclose()} ></img>
            </div>
            <div className="container-detail-countrie">
                <h2>Region: {props.countrie.region}</h2>
                <h2>Ppulation: {props.countrie.population}</h2>
                <h2>Capital: {props.countrie.capital ? props.countrie.capital[0] : "" }</h2>
                <h2>Border Countries: {props.countrie.borders?.map(item=>(item+" "))}</h2>
            </div>
            <div>
                <h2>Flag:</h2>
                <img className= "img-flag-dtail" alt="" src={props.countrie.flags ? props.countrie.flags[0] :""}></img>
            </div>
            
        </div>
        
    )

}
export default ShowInfo;