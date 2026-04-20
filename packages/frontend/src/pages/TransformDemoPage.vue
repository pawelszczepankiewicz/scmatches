<template>
  <div class="demo">
    <div class="demo__header">
      <p class="demo__intro">
        The original <code>app.js</code> used nested if/else chains to format
        match data. This form is parsed using the refactored config-driven
        approach - edit the raw input and see the formatted output update live.
      </p>
      <div class="demo__header-links">
        <RouterLink to="/how-it-works" class="btn btn--accent"
          >How It Works</RouterLink
        >
        <RouterLink to="/problems" class="btn btn--primary"
          >12 Problems Fixed</RouterLink
        >
      </div>
    </div>

    <RawDataEditor v-model="rawMatches" :errors="parseResults" />

    <div class="demo__divider"></div>

    <FormattedOutput :results="parseResults" :raw-matches="rawMatches" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { RawMatch } from "@sc-test/shared";
import { DEFAULT_RAW_MATCHES } from "../data/defaultMatches";
import { parseMatchClient } from "../utils/parseMatchClient";
import RawDataEditor from "../components/demo/RawDataEditor.vue";
import FormattedOutput from "../components/demo/FormattedOutput.vue";

const rawMatches = ref<RawMatch[]>(
  JSON.parse(JSON.stringify(DEFAULT_RAW_MATCHES)),
);

const parseResults = computed(() =>
  rawMatches.value.map((m, i) => parseMatchClient(m, i)),
);
</script>

<style scoped lang="scss">
.demo {
  &__header {
    margin-bottom: $space-xl;
  }

  &__intro {
    font-size: 14px;
    line-height: 1.7;
    color: $sc-dark;
    margin-bottom: $space-md;

    code {
      background: $sc-lavender;
      padding: 2px 6px;
      border-radius: 3px;
      color: $sc-purple;
      font-size: 13px;
    }
  }

  &__header-links {
    display: flex;
    gap: $space-sm;
    flex-wrap: wrap;

    .btn {
      text-decoration: none;
      font-size: 13px;
      padding: $space-xs $space-md;
    }
  }

  &__divider {
    height: 1px;
    background: $sc-gray-border;
    margin: $space-xl 0;
  }
}
</style>
