<template>
  <div :class="$style.root">
    <div :class="$style.editor" class="language-vue">
      <slot name="editor"></slot>
    </div>
    <div :class="$style.preview">
      <slot name="preview"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: stretch;
  overflow: hidden;
  margin: 1rem 0;
}

.editor {
  margin: 0 !important;
  border: none;
  flex: 0 0;
  flex-basis: 50%;
  border-radius: 0 !important;
  padding: 20px 24px;
  overflow: hidden;

  color: #eee !important;
  line-height: 1.5 !important;

  :global(textarea) {
    outline: none;
  }

  :global(.prism-editor__editor) {
    color: #eee !important;
  }
}

.preview {
  flex-basis: 50%;
  padding: 20px 24px;
  overflow: hidden;
}
</style>
