<template>
  <div>
    <p>
      <button @click="toggleShow()">Toggle: {{ show }}</button>
      <span v-if="show" class="translated">{{ $gettext("Welcome %{ name }", { name: obj.name }) }}</span>
    </p>
    <div>
      <p>
        <button @click="setName1()">1</button>
        <button @click="setName2()">2</button>
        <button @click="setName3()">3</button>
        [{{ obj.name }}]
      </p>
      <p v-if="obj.name === 'Group1'" class="translated">{{ $gettext("This is %{ name }", { name: obj.name }) }}</p>
      <p v-else-if="obj.name === 'Group2'" class="translated">
        {{ $gettext("This is %{ name }", { name: obj.name }) }}
      </p>
      <p v-else class="translated">{{ $gettext("This is %{ name }", { name: obj.name }) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(true);
const obj = ref({ name: "Group1" });

const toggleShow = () => {
  show.value = !show.value;
};

const setName1 = () => {
  obj.value.name = "Group1";
};

const setName2 = () => {
  obj.value.name = "Group2";
};

const setName3 = () => {
  obj.value.name = "Group3";
};
</script>
