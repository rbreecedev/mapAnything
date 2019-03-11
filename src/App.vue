<template>
  <div id="app">
    <Legend class="legend" :qCount="{ northEast, northWest, southEast, southWest }" :updateMarkers="this.toggleMarkers" :reset="this.resetmarkers"/>
    <div id="map"></div>
  </div>
</template>

<script>
import Legend from './components/Legend.vue'
import gmapsInit from './utils/gmaps';

export default {
  name: 'app',
  components: {
    Legend
  },
  data () {
    return {
      northEast: 0,
      northWest: 0,
      southEast: 0,
      southWest: 0,
      showNorthEast: true,
      showNorthWest: true,
      shouwSouthEast: true,
      showSouthWest: true,
      coords: [],
      gmarkers: [],
      map: null
    }
  },
  methods: {
    toggleMarkers (markerType) {
      this.gmarkers.map((marker) => {
        if (marker.icon.split('.', 1)[0].split('/img/')[1] === markerType) {
          marker.setVisible(!marker.visible);
        }
      });
    },
    resetmarkers () {
      this.coords = [];
      this.gmarkers.map((marker) => marker.setMap(null))
      this.northEast = 0;
      this.northWest = 0;
      this.southEast = 0;
      this.southWest = 0;
      this.gmarkers = [];
      for (let i=0; i<2000; i++) {
        const lat = Math.random() * (85 - -85) + -85;
        const long = Math.random() * (180 - -180) + -180;
        if (lat > 0 && long > 0) {
          this.coords.push({lat,long, q:'ne'});
          this.northEast++
        } 
        else if (lat < 0 && long < 0) {
          this.coords.push({lat,long, q:'sw'});
          this.southWest++
        }
        else if (lat > 0 && long < 0) {
          this.coords.push({lat,long, q:'nw'});
          this.northWest++
        }
        else if (lat < 0 && long > 0) {
          this.coords.push({lat,long, q:'se'});
          this.southEast++
        }
      }
      this.updateMarkers()
    },
    updateMarkers() {
      var icons = {
        red: require('./assets/red.png'),
        blue: require('./assets/blue.png') ,
        yellow: require('./assets/yellow.png'),
        green: require('./assets/green.png') 
      };
      this.coords.map((coord) => {
        if (coord.q === 'ne' && this.showNorthEast === true) {
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(coord.lat, coord.long),
            map: this.map,
            icon: icons['green'],
          });
          this.gmarkers.push(marker);
        } 
        else if (coord.q === 'sw' && this.showSouthWest === true) {
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(coord.lat, coord.long),
            map: this.map,
            icon: icons['yellow'],
          });
          this.gmarkers.push(marker);
        }
        else if (coord.q === 'nw' && this.showNorthWest === true) {
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(coord.lat, coord.long),
            map: this.map,
            icon: icons['blue'],
          });
          this.gmarkers.push(marker);
        }
        else if (coord.q === 'se' && this.shouwSouthEast === true) {
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(coord.lat, coord.long),
            map: this.map,
            icon: icons['red'],
          });
          this.gmarkers.push(marker);
        }
      })
    }
  },
  async mounted () {
    try {
      for (let i=0; i<2000; i++) {
        const lat = Math.random() * (85 - -85) + -85;
        const long = Math.random() * (180 - -180) + -180;
        if (lat > 0 && long > 0) {
          this.coords.push({lat,long, q:'ne'});
          this.northEast++
        } 
        else if (lat < 0 && long < 0) {
          this.coords.push({lat,long, q:'sw'});
          this.southWest++
        }
        else if (lat > 0 && long < 0) {
          this.coords.push({lat,long, q:'nw'});
          this.northWest++
        }
        else if (lat < 0 && long > 0) {
          this.coords.push({lat,long, q:'se'});
          this.southEast++
        }
      }
      const google = await gmapsInit();
      const mapCenter = {lat: 0, lng: 0};
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: mapCenter
      })
      this.updateMarkers();
    } catch (e) {
      console.warn(e)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#map {
    height: 600px;
    width: 100%;
    margin:10px auto;
}
.legend {
  max-width: 200px;
  position: absolute;
  z-index: 2;
  left:20px;
  right: 20px;
  top:17%;
  background: rgba(255,255,255,1);
  padding: 10px;

}
</style>