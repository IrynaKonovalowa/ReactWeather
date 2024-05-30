class Meteo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: this.props.data.name, date: this.props.data.date, temp: this.props.data.temp, description: this.props.data.description, icon: this.props.data.icon,
             temp_min: this.props.data.temp_min, temp_max: this.props.data.temp_max, wind: this.props.data.wind, hour: this.props.data.hour }
        this.loadMeteo = this.loadMeteo.bind(this);
        this.loadMeteoFiveDays = this.loadMeteoFiveDays.bind(this);
      }

      loadMeteo(text) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+text+'&units=metric&appid=c0bc985bf7ca3183130a72837a0de48c'
          ).then((data) => {
            propsValues = {
            }
            console.log(data);
            return data.json();
          })
          .then((meteo)=>{
            console.log(meteo.name);
            console.log(meteo.main.temp_min);
            console.log(meteo.main.temp_max);
            console.log(meteo.weather[0].description);
            console.log(meteo.weather[0].icon);            
            console.log(meteo.dt);
            let daTe = new Date(meteo.dt*1000).toDateString();
            console.log(daTe);            
            let imgUrl = "https://api.openweathermap.org/img/w/" + meteo.weather[0].icon + ".png";
            this.setState({ name: meteo.name, date: daTe, temp: Math.round(meteo.main.temp), temp_min: Math.round(meteo.main.temp_min), temp_max: Math.round(meteo.main.temp_max), description: meteo.weather[0].description, icon: imgUrl, wind: meteo.wind.speed });
        });
    }
    loadMeteoFiveDays(text) {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q='+text+'&units=metric&appid=c0bc985bf7ca3183130a72837a0de48c'
          ).then((data) => {
            propsValues = {
            }
            console.log(data);
            return data.json();
          })
          .then((meteo)=>{
            console.log(meteo.list[0]);
            this.setState({ hour: meteo.list });
        });
    }

    componentDidMount(){
    this.loadMeteo("Paris");
    this.loadMeteoFiveDays("Paris");
    }

    render() {
        return (
            <div>
          <div class = "divMeteo" >        
            <Search meteo={[this.loadMeteo, this.loadMeteoFiveDays]}/>            
          <p>{this.state.date}</p>
          <p class = "city">{this.state.name}</p>          
          <img src={this.state.icon} alt="Icon meteo" />
          <p class = "temp">{this.state.temp} °C</p> 
          <p>{this.state.description}</p>          
          <p>Temp min: {this.state.temp_min} °C</p>
          <p>Temp max: {this.state.temp_max} °C</p>
          <p>Wind speed: {this.state.wind} km/h</p>
          </div>
          <div>
          {this.state.hour.map(function (h) {
            return <div class="divHour"><p>{h.dt_txt}</p><img src={"https://api.openweathermap.org/img/w/"+ h.weather[0].icon+ ".png"} alt="Icon meteo" /><p>{h.weather[0].description}</p><p>{Math.round(h.main.temp)} °C</p><p></p>    </div>;
          })}
         </div>          
         </div>
        );
      }
  }