<template>
  <div>
    <p>
      <translate>Select your language:</translate>
    </p>
    <p>
      <select v-model="$gettextPlugin.current" name="language">
        <option v-for="(language, key) in $gettextPlugin.availableLanguages" :key="key" :value="key">
          {{ language }}
        </option>
      </select>
    </p>
  </div>
</template>
