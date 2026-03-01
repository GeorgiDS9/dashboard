<script lang="ts">
import { defineComponent } from 'vue';
import Tabbed from '@shell/components/Tabbed';
import Tab from '@shell/components/Tabbed/Tab';
import { checkBrackets as validateBrackets, decrement as decrementCounter, swapJsonKeys } from '../utils/tab-helpers';

type TimeComparison = 'before' | 'same' | 'after';

export default defineComponent({
  name: 'TabPage',

  layout: 'plain',

  components: { Tabbed, Tab },

  data() {
    return {
      // Tab 1
      counter: 42,

      // Tab 2
      current:       new Date(),
      offsetHours:   0,
      offsetMinutes: 0,
      offsetSeconds: 0,
      timer:         null,

      // Tab 3
      jsonText:   '',
      jsonObj:    null as Record<string, unknown> | null,
      swappedObj: null as Record<string, string> | null,
      jsonError:  '',

      // Tab 5
      bracketInput:  '',
      bracketResult: null as boolean | null,
    };
  },

  computed: {
    // Tab 2
    updated(): Date {
      const newDate = new Date(this.current);

      newDate.setHours(newDate.getHours() + Number(this.offsetHours || 0));
      newDate.setMinutes(newDate.getMinutes() + Number(this.offsetMinutes || 0));
      newDate.setSeconds(newDate.getSeconds() + Number(this.offsetSeconds || 0));

      return newDate;
    },

    timeComparison(): TimeComparison {
      const a = this.current.getTime();
      const b = this.updated.getTime();

      if (a < b) return 'before';
      if (a > b) return 'after';

      return 'same';
    },

    formattedCurrent(): string {
      return this.current.toLocaleString(undefined, {
        year:   'numeric',
        month:  '2-digit',
        day:    '2-digit',
        hour:   '2-digit',
        minute: '2-digit'
      });
    },

    formattedUpdated(): string {
      return this.updated.toLocaleString(undefined, {
        year:   'numeric',
        month:  '2-digit',
        day:    '2-digit',
        hour:   '2-digit',
        minute: '2-digit'
      });
    },

    // Tab 3
    originalJsonPretty(): string {
      if (this.jsonObj) return JSON.stringify(this.jsonObj, null, 2);
      if (this.jsonText) return this.jsonText;

      return '—';
    },

    swappedJsonPretty(): string {
      if (this.swappedObj) return JSON.stringify(this.swappedObj, null, 2);

      return '—';
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      this.current = new Date();
    }, 10000);
  },

  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },

  methods: {
    // Tab 1
    decrement() {
      this.counter = decrementCounter(this.counter);
    },

    // Tab 3
    onJsonFileChange(e) {
      const file = e.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const text = String(reader.result || '');

          this.jsonText = text;
          this.jsonObj = JSON.parse(text);
          this.jsonError = '';
          this.swappedObj = null;
        } catch {
          this.jsonError = 'interview.tabPage.invalidJson';
          this.jsonObj = null;
        }
      };

      reader.readAsText(file);
    },

    swapJson() {
      if (!this.jsonObj) return;

      this.swappedObj = swapJsonKeys(this.jsonObj);
    },

    // Tab 5
    checkBrackets() {
      this.bracketResult = validateBrackets(this.bracketInput);
    },
  },
});
</script>

<template>
  <div>
    <h1>{{ t('interview.tabPage.title') }}</h1>
    <Tabbed>
      <Tab
        name="first"
        label="Tab 1"
      >
        <p
          class="mb-20"
          aria-live="polite"
          aria-atomic="true"
        >
          {{ t('interview.tabPage.counter') }}: {{ counter }}
        </p>
        <button
          type="button"
          class="btn role-primary"
          :disabled="counter === 0"
          @click="decrement"
        >
          {{ t('interview.tabPage.decrement') }}
        </button>
      </Tab>
      <Tab
        name="second"
        label="Tab 2"
      >
        <div>
          <p class="mb-5">
            <strong>{{ t('interview.tabPage.current') }}:</strong> {{ formattedCurrent }}
          </p>
          <p class="mb-5">
            <strong>{{ t('interview.tabPage.updated') }}:</strong> {{ formattedUpdated }}
          </p>
          <p
            class="mb-5"
            aria-live="polite"
            aria-atomic="true"
          >
            <strong>{{ t('interview.tabPage.result') }}:</strong> {{ timeComparison }}
          </p>

          <div class="mt-20">
            <div class="mb-10">
              <label
                style="display:block; margin-bottom:4px"
                for="offset-hours"
              >{{ t('interview.tabPage.hours') }}:</label>
              <input
                id="offset-hours"
                v-model="offsetHours"
                type="number"
                style="width:80px"
              >
            </div>

            <div class="mb-10">
              <label
                style="display:block; margin-bottom:4px"
                for="offset-minutes"
              >{{ t('interview.tabPage.minutes') }}:</label>
              <input
                id="offset-minutes"
                v-model="offsetMinutes"
                type="number"
                style="width:80px"
              >
            </div>

            <div>
              <label
                style="display:block; margin-bottom:4px"
                for="offset-seconds"
              >{{ t('interview.tabPage.seconds') }}:</label>
              <input
                id="offset-seconds"
                v-model="offsetSeconds"
                type="number"
                style="width:80px"
              >
            </div>
          </div>
        </div>
      </Tab>
      <Tab
        name="third"
        label="Tab 3"
      >
        <div>
          <div class="mb-10">
            <label for="json-file">{{ t('interview.tabPage.uploadJson') }}:</label>
          </div>
          <input
            id="json-file"
            type="file"
            accept=".json"
            @change="onJsonFileChange"
          >

          <div class="mt-10">
            <button
              type="button"
              class="btn role-primary"
              :disabled="!jsonObj"
              @click="swapJson"
            >
              {{ t('interview.tabPage.swap') }}
            </button>
          </div>

          <p
            v-if="jsonError"
            role="alert"
            style="color:red;"
          >
            {{ t(jsonError) }}
          </p>

          <h4 class="mt-10">
            {{ t('interview.tabPage.original') }}:
          </h4>
          <pre>{{ originalJsonPretty }}</pre>

          <h4>{{ t('interview.tabPage.swapped') }}:</h4>
          <pre>{{ swappedJsonPretty }}</pre>
        </div>
      </Tab>
      <Tab
        name="fourth"
        label="Tab 4"
      >
        <div>
          <p>
            Tab 4 (Coin Change) not implemented within the time limit of 6h.
          </p>
        </div>
      </Tab>
      <Tab
        name="fifth"
        label="Tab 5"
      >
        <div>
          <div class="mb-10">
            <label for="bracket-input">{{ t('interview.tabPage.enterBrackets') }}:</label>
          </div>
          <input
            id="bracket-input"
            v-model="bracketInput"
            placeholder="e.g. [()]{}"
            style="width:300px"
          >

          <div class="mt-10">
            <button
              type="button"
              class="btn role-primary"
              @click="checkBrackets"
            >
              {{ t('interview.tabPage.check') }}
            </button>
          </div>

          <p
            v-if="bracketResult !== null"
            class="mt-10"
            aria-live="polite"
            aria-atomic="true"
          >
            {{ t('interview.tabPage.result') }}:
            <strong>
              {{ bracketResult }}
            </strong>
          </p>
        </div>
      </Tab>
    </Tabbed>
  </div>
</template>
