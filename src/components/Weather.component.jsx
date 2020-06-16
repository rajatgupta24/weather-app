import React from 'react';

const Weather = (props) => {
  return (
    <div className="App">
      <div className="cards">
        <h1>{props.city}</h1>
        <h5 className="py-4">
            <i className={`wi ${props.weatherIcon} display-1`}></i>
        </h5>
        { props.tempCel ? (<h1 className="py-2">{props.tempCel}&deg;</h1>) : null}
        

        {/* {calling function minmaxTemp} */}
        { minmaxTemp(props.tempMin, props.tempMax) }

        <h3 className="py-3">{props.description}</h3>
      </div>
    </div>
  );
};

function minmaxTemp (min, max) {
    if(min && max){
      return (
        <h3>
            <span className="px-4">{max}&deg;</span>
            <span className="px-4">{min}&deg;</span>
        </h3>
      );
    } 
}

export default Weather;
