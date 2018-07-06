import React, { Component } from 'react';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//library for chart
import {AreaChart} from 'react-d3-components'

//library for http request
import axios from 'axios';

//styles
const divStyle = {
  display: 'flex'
};
const textcenter = {
  'text-align':'center'
};

export default class App extends Component {

// list of variables

area = ""

state = {
    persons: []
  }

value = {
  temp: {
    label: "Temperature",
    temp_value: []
         },
  pressure: {
    label: "Pressure",
     pressure_value: []
         },
  humidity: {
     label: "Humidity",
    humidity_value: []
         }
}  

// life cycle hooks
  componentDidMount() {
    
  }


 constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }


//method to dynamically change values corresponding to dropdown
  toggle(e) {

// setting the value to intial state
    this.value = {
  temp: {
    label: "Temperature",
    temp_value: []
         },
  pressure: {
    label: "Pressure",
     pressure_value: []
         },
  humidity: {
     label: "Humidity",
    humidity_value: []
         }
}

  this.area = e.target.value; 


// calling api with axios lib and mapping the response
     axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.area+'&APPID=31f68198d201cdfca333b8a33489f228')
      .then(res => {
       
       (res.data.list).map((item,index) =>  this.value.temp.temp_value.push({x: index,y: item.main.temp}));
       (res.data.list).map((item,index) =>  this.value.pressure.pressure_value.push({x: index,y: item.main.pressure}));
       (res.data.list).map((item,index) =>  this.value.humidity.humidity_value.push({x: index,y: item.main.humidity}));
        console.log(this.value);
        const persons = res.data.list;
        this.setState({ persons });
      })
  }

  render() {

// constants vaues for d3 charts
const data_temp = [
    {
    label: 'Temperature',
    values: this.value.temp.temp_value
    }
];
const data_pressure = [
    {
    label: 'pressure',
    values: this.value.pressure.pressure_value
    }
];
const data_humidity = [
    {
    label: 'humidity',
    values: this.value.humidity.humidity_value
    }
];

// condition for displaying view based on values 
if((this.value.temp.temp_value).length != 0){
  const place = "https://maps.google.com/maps?q="+this.area+"&ie=UTF8&output=embed";
    return (
      <div>React simple starter
         <select onChange={this.toggle}>
  <option value="chennai">chennai</option>
  <option value="coimbatore">coimbatore</option>
  <option value="salem">salem</option>
  <option value="trichy">trichy</option>
  <option value="madurai">madurai</option>
</select>
<br/>
Map
<span style={divStyle}>
        <iframe width="300" height="200" id="gmap_canvas" src={place} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
<span style={divStyle}>

<span style={textcenter}>
<AreaChart
                data={data_temp}
                width={200}
                height={200}
                yOrientation='right' // if you do not provide right default left orientation for yAxis will be used
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
 Temperature    
</span>           
<span style={textcenter}>
   <AreaChart
                data={data_pressure}
                width={200}
                height={200}
                yOrientation='right' // if you do not provide right default left orientation for yAxis will be used
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
  Pressure
</span>
<span style={textcenter}>
<AreaChart
                data={data_humidity}
                width={200}
                height={200}
                yOrientation='right' // if you do not provide right default left orientation for yAxis will be used
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
                Humidity
</span>
          </span>
        </span>
      </div>

    );
  }else{
    return <div>
         React simple starter
         <select onChange={this.toggle}>
 <option value="chennai">chennai</option>
  <option value="coimbatore">coimbatore</option>
  <option value="salem">salem</option>
  <option value="trichy">trichy</option>
  <option value="madurai">madurai</option>
</select>
    </div>;
  }
  }
}