<template>
  <div id="app">
    <div class="status">{{ status }}</div>
    <button>Reset</button>
    <template v-for="row in 3">
      <div class="row" :key="row">
        <button v-for="button in 3" class="square" style="width:40px;height:40px;"></button>
      </div>
    </template>
  </div>
</template>
<script>
  
  export default {
    name: "App",
    data() {
      return {
        status: 'Next player: X'
      };
    }
  };
</script>