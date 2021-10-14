import React,{useEffect, useState} from "react";
import icoLupa from './assets/lupa.svg';
import rectangle from './assets/Rectangle.svg';
import './searchBar.css';
import services from '../../services/services.js';
import ShowInfo from "../ShowInfo/ShowInfo.js";


function SearchBar(){
    const axios = require('axios');
    const [countries , setCountries ]=useState([]);
    const [selectRegions , setSelectRegions ]=useState("");
    const [input , setInput ]=useState("");
    const [countriesOrinalResponse , setcountriesOrinalResponse ]=useState([]);
    const [countrieDetail , setCountrieDetails ]=useState({});
    const [openModal , setOpenModal ]=useState(false);
    
    

    function GetServices() {
        axios.get(services.endpoint+'/all', {
           })
           .then(function (response) {
             console.log(response.data);
             const countriesResponse= response.data;
             countriesResponse.sort((a,b)=>(a.name.common.localeCompare(b.name.common)));
             setCountries(countriesResponse);
             setcountriesOrinalResponse (countriesResponse);
           })
           .catch(function (error) {
             console.log(error);
           });
        }


    function ChangeRegion(event){
      console.log(event.target.value,"ENTRE");
      setSelectRegions(event.target.value);  
    }

    function Input(event){
      console.log(event.target.value);
      setInput(event.target.value);
    }

    function OnSearch(){
      const filterCountries=countriesOrinalResponse.filter((item)=>(item.name.common.includes(input)) || (item.region.includes(input)) || (item.flags[0].includes(input)) || (item.capital[0].includes(input)) ||  (item.population.includes(input))  )
      setCountries(filterCountries);
    }


    useEffect(()=>{
      GetServices();
    },
    []
    )



    return(
        <div>
            <div className="container-header">
              <h1 className="title-style"> Find any <span style={{color:'#21ADCF'}}>country</span><br></br> in the world. <br></br>
              </h1>
              <img alt="" src={rectangle}></img>
              <div className="container-input">
              <input className="input-searchbox" value={input} onChange={Input} placeholder="Search contry"></input>
              <select value={selectRegions} onChange={ChangeRegion} placeholder="Show All">
                <option value="">Show All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value ="Europe">Europe</option>
                <option value ="Oceania">Oceania</option>
                <option value="Asia">Asia</option>

           </select>
          
           <img alt="" className="ico-lupa-searchbox" src={icoLupa} onClick={OnSearch}></img>
              </div>
          </div>

       <div className="container-searchbox">
           { (selectRegions===""|| selectRegions==="Africa") && <div>
            <h2>Africa</h2>
            
            {countries.filter((item)=>(item.region==="Africa")).map(item =>(<div className="container-imgText"onClick={()=>{setCountrieDetails(item);setOpenModal(true)}}><img className="ico-flag" src={item.flags[0]}></img><h3> {item.name.common} </h3></div>))}
           </div>}
           { (selectRegions===""|| selectRegions==="Americas") && <div>
            
            <h2>Americas</h2>
            
            {countries.filter((item)=>(item.region==="Americas")).map((item) =>(<div className="container-imgText" onClick={()=>{setCountrieDetails(item);setOpenModal(true)}}><img className="ico-flag" src={item.flags[0]}></img><h3> {item.name.common} </h3></div>))}
           </div>}
           {(selectRegions===""|| selectRegions==="Asia") && <div>
            <h2>Asia</h2>
            
            {countries.filter((item)=>(item.region==="Asia")).map(item =>(<div className="container-imgText" onClick={()=>{setCountrieDetails(item);setOpenModal(true)}}><img className="ico-flag" src={item.flags[0]}></img><h3> {item.name.common} </h3></div>))}
           </div>}
           {(selectRegions===""|| selectRegions==="Europe") && <div>
            <h2>Europe</h2>
            
            {countries.filter((item)=>(item.region==="Europe")).map(item =>(<div className="container-imgText" onClick={()=>{setCountrieDetails(item);setOpenModal(true)}}><img className="ico-flag" src={item.flags[0]}></img><h3> {item.name.common} </h3></div>))}
           </div>}

           {(selectRegions===""|| selectRegions==="Oceania") && <div>
            <h2>Oceania</h2>
            
            {countries.filter((item)=>(item.region==="Oceania")).map(item =>(<div className="container-imgText" onClick={()=>{setCountrieDetails(item);setOpenModal(true)}}><img className="ico-flag" src={item.flags[0]}></img><h3> {item.name.common} </h3></div>))}
           </div>}

           { openModal && <ShowInfo countrie={countrieDetail} onclose={()=> setOpenModal(false)}/>}

       </div>
       </div>
    )
}
export default SearchBar;