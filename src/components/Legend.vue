<template>
  <div class="legend">
    <span class="inline">
      <input type="checkbox" @click="updateMarkers('blue')" v-model="blueCheckbox"/>
      <img class="icon" :src="require('../assets/blue.png')" alt="blue">
      <p class="regionTitle">Northeast</p>
      <p>{{qCount.northEast}}</p>
    </span>
    <span class="inline">
      <input type="checkbox" @click="updateMarkers('green')" v-model="greenCheckbox"/>
      <img class="icon" :src="require('../assets/green.png')" alt="green">
      <p class="regionTitle">Northwest</p>
      <p>{{qCount.northWest}}</p>
    </span>
    <span class="inline">
      <input type="checkbox" @click="updateMarkers('yellow')" v-model="yellowCheckbox"/>
      <img class="icon" :src="require('../assets/yellow.png')" alt="yellow">
      <p class="regionTitle">Southeast</p>
      <p>{{qCount.southEast}}</p>
    </span>
    <span class="inline">
      <input type="checkbox" @click="updateMarkers('red')" v-model="redCheckbox"/>
      <img class="icon" :src="require('../assets/red.png')" alt="red">
      <p class="regionTitle">Southwest</p>
      <p>{{qCount.southWest}}</p>
    </span>
    <button @click="this.resetMarkers">Refresh</button>
  </div>
</template>

<script>
export default {
  name: 'Legend',
  props: {
    qCount: Object,
    updateMarkers: Function,
    reset: Function
  },
  data () {
    return {
      blueCheckbox: true,
      greenCheckbox: true,
      yellowCheckbox: true,
      redCheckbox: true
    }
  },
  methods: {
    resetMarkers () {
      this.blueCheckbox = true;
      this.greenCheckbox = true;
      this.yellowCheckbox = true;
      this.redCheckbox = true;
      this.reset()
    }
  }
}
</script>

<style scoped>
.legend {
  border-radius: 7px;
}
.inline {
  display: inline-flex;
  justify-content: center;
}
.icon {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
.regionTitle {
  font-weight: 800;
  margin-right: 10px;
}
</style>
