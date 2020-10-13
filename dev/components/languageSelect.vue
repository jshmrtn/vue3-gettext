<template>
  <div>
    <p>
      <translate>Select your language:</translate>
    </p>
    <p>
      <select v-model="$language.current" name="language">
        <option v-for="(language, key) in $language.availableLanguages" :key="key" :value="key">
          {{ language }}
        </option>
      </select>
    </p>
  </div>
</template>
