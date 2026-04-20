<template>
  <div class="demo">
    <p class="demo__intro">
      The original <code>app.js</code> takes raw match data and formats it using nested if/else chains.
      Below you can edit the raw input, see the config-driven transformation, and inspect the formatted output — all running live in the browser.
    </p>

    <RawDataEditor v-model="rawMatches" />

    <div class="demo__divider"></div>

    <TransformationEngine />

    <div class="demo__divider"></div>

    <FormattedOutput :results="parseResults" :raw-matches="rawMatches" />

    <div class="demo__divider"></div>

    <ProblemsAnalysis />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { RawMatch } from '@sc-test/shared';
import { DEFAULT_RAW_MATCHES } from '../data/defaultMatches';
import { parseMatchClient } from '../utils/parseMatchClient';
import RawDataEditor from '../components/demo/RawDataEditor.vue';
import TransformationEngine from '../components/demo/TransformationEngine.vue';
import FormattedOutput from '../components/demo/FormattedOutput.vue';
import ProblemsAnalysis from '../components/demo/ProblemsAnalysis.vue';

const rawMatches = ref<RawMatch[]>(structuredClone(DEFAULT_RAW_MATCHES));

const parseResults = computed(() =>
  rawMatches.value.map((m, i) => parseMatchClient(m, i))
);
</script>

<style scoped lang="scss">
.demo {
  &__intro {
    font-size: 14px;
    line-height: 1.7;
    color: $sc-dark;
    margin-bottom: $space-xl;

    code {
      background: $sc-lavender;
      padding: 2px 6px;
      border-radius: 3px;
      color: $sc-purple;
      font-size: 13px;
    }
  }

  &__divider {
    height: 1px;
    background: darken($sc-gray-light, 6%);
    margin: $space-xl 0;
  }
}
</style>
