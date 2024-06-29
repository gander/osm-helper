<script setup lang="ts">
import {computed} from 'vue';

const {changeset} = defineProps({
  changeset: Number,
});

const changeVisUrl = computed(() => `https://resultmaps.neis-one.org/osm-change-viz?c=${changeset}`);
const achaviUrl = computed(() => `https://overpass-api.de/achavi/?changeset=${changeset}`);
</script>

<template>
  <div>
    <ul>
      <li>
        <a target="_blank" :href="changeVisUrl">
          Changeset by Comparison Visualization
        </a>
      </li>
      <li>
        <a target="_blank" :href="achaviUrl">
          Augmented OSM Change Viewer (Achavi)
        </a>
      </li>
    </ul>
  </div>
</template>

