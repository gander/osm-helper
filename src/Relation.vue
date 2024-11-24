<script setup lang="ts">
import {computed, ref} from 'vue';

const {relationId} = defineProps({
  relationId: Number,
});



const RelatifyUrl = computed(() => `https://relatify.monicz.dev/?relation=${relationId}&load=1`);
const RelatifyValid = ref(false);

async function fetchDetails() {
  try {
    const response = await fetch(`https://www.openstreetmap.org/api/0.6/relation/${relationId}.json`);
    const {elements: [{tags}]} = await response.json();
    return tags['public_transport:version'] === "2" && ['bus', 'tram'].includes(tags['route']);
  } catch (error) {
    console.error(error);
  }
}

fetchDetails().then(result => RelatifyValid.value = Boolean(result));

</script>

<template>
  <div>
    <ul>
      <li v-if="RelatifyValid">
        <a target="_blank" :href="RelatifyUrl">
          OSM Relatify by Kamil Monicz
        </a>
      </li>
    </ul>
  </div>

</template>

<style scoped>
div {
  margin-top: 10px;
}
</style>
