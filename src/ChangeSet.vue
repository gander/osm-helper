<script setup lang="ts">
import {computed, ref} from 'vue';

const {changeset} = defineProps({
  changeset: Number,
});

async function fetchDetails() {
  try {
    const response = await fetch(`https://www.openstreetmap.org/api/0.6/changeset/${changeset}.json`);
    const {elements} = await response.json();
    return elements[0]?.tags?.created_by;
  } catch (error) {
    console.error(error);
  }
}

const changeVisUrl = computed(() => `https://resultmaps.neis-one.org/osm-change-viz?c=${changeset}`);
const osmChaUrl = computed(() => `https://osmcha.org/changesets/${changeset}`);
const achaviUrl = computed(() => `https://overpass-api.de/achavi/?changeset=${changeset}`);

const createdBy = ref('');

fetchDetails().then(data => createdBy.value = data);
</script>

<template>
  <div>
    <ul>
      <li>
        <a target="_blank" :href="achaviUrl">
          Augmented OSM Change Viewer (Achavi)
        </a>
      </li>
      <li>
        <a target="_blank" :href="changeVisUrl">
          Changeset by Comparison Visualization
        </a>
      </li>
      <li>
        <a target="_blank" :href="osmChaUrl">
          OpenStreetMap Changeset Analyser (OSMCha)
        </a>
      </li>
    </ul>
    <div v-if="createdBy">
      Created By: <strong>{{ createdBy }}</strong>
    </div>
  </div>
</template>

