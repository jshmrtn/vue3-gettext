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
      <p v-if="obj.name === 'Group1'" v-translate="obj.name" class="translated">This is %{ obj.name }</p>
      <p v-else-if="obj.name === 'Group2'" v-translate="obj.name" class="translated">This is %{ obj.name }</p>
      <p v-else v-translate="obj.name" class="translated">This is %{ obj.name }</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true,
    obj: {
      name: "Group1",
    },
  }),
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    setName1() {
      this.obj.name = "Group1";
    },
    setName2() {
      this.obj.name = "Group2";
    },
    setName3() {
      this.obj.name = "Group3";
    },
  },
};
</script>
