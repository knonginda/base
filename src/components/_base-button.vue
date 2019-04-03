<script>
export default {
  props: {
    users: {
      type: Array,
      default: null,
    },
    type: {
      type: String,
      default: 'submit',
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small'].indexOf(value) !== -1
      },
    },
    theme: {
      type: String,
      default: 'primary',
      validator: function(value) {
        return ['primary', 'secondary', 'teritary'].indexOf(value) !== -1
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Function,
      default: () => {},
    },
    ripple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <button
    :disabled="disabled"
    :class="[theme, size, 'button']"
    v-on="$listeners"
    @click="click()"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '@design';

.button {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
}

.primary {
  color: $color-button-text-primary;
  background: $color-button-bg-primary;
  border: 2px solid $color-button-border-primary;

  &:hover {
    background: $color-button-hover-bg-primary;
  }

  &:disabled {
    opacity: 0.5;

    &:hover {
      background: $color-button-bg-primary;
    }
  }
}

.secondary {
  color: $color-button-text-secondary;
  background-color: #fff;
  border: 2px solid $color-button-border-secondary;

  &:hover {
    background: $color-button-hover-bg-secondary;
  }

  &:disabled {
    opacity: 0.5;

    &:hover {
      background: #fff;
    }
  }
}

.teritary {
  color: $color-button-text-teritary;
  background-color: #fff;
  border: 2px solid $color-button-border-teritary;

  &:hover {
    background: $color-button-hover-bg-teritary;
  }

  &:disabled {
    opacity: 0.5;

    &:hover {
      background: #fff;
    }
  }
}

.small {
  @extend %typography-medium;

  min-width: $size-button-width-small;
  padding: $size-button-padding-small;
}

.medium {
  @extend %typography-medium;

  min-width: $size-button-width-medium;
  padding: $size-button-padding-medium;
}

.large {
  @extend %typography-large;

  min-width: $size-button-width-large;
  padding: $size-button-padding-large;
}
</style>
