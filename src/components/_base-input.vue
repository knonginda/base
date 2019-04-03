<script>
export default {
  name: 'BaseInput',
  model: {
    event: 'update',
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    class="input form-control"
    :value="value"
    :name="name"
    :disabled="disabled"
    v-on="$listeners"
    @input="$emit('update', $event.target.value)"
  />
</template>

<style lang="scss" scoped>
@import '@design';

.input {
  @extend %typography-medium;

  display: block;
  width: 100%;
  height: $size-input-height;
  padding: $size-input-padding-vertical $size-input-padding-horizontal;
  margin-bottom: 0;
  line-height: 1;
  border: $size-input-border solid $color-input-border;
  border-radius: $size-input-border-radius;

  &::placeholder {
    color: $color-placeholder;
  }
}
</style>
