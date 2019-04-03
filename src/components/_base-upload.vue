<script>
export default {
  props: {
    value: {
      type: File,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0])
    },
  },
}
</script>

<template>
  <div class="uploader">
    <BaseInput :value="value ? value.name : ''" readonly />
    <label>
      <div :class="['selectButton', disabled ? 'disabled' : '']">Browse</div>
      <input
        type="file"
        class="fileButton"
        :disabled="disabled"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.uploader {
  display: flex;
}

.selectButton {
  width: 105px;
  margin-left: 10px;
  font-size: $font-size-large;
  line-height: 36px;
  color: $color-button-text-teritary;
  text-align: center;
  cursor: pointer;
  background: $color-button-bg-teritary;
  border: 2px solid $color-button-border-teritary;
  border-radius: 5px;

  &:hover {
    background: $color-button-hover-bg-teritary;
  }
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.fileButton {
  display: none;
}
</style>
