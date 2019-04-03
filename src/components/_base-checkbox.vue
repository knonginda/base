<script>
export default {
  name: 'BaseCheckbox',
  props: {
    id: {
      type: String,
      default: function() {
        return 'checkbox-id-' + this._uid
      },
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: [Boolean, String, Number],
      default: null,
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: null,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small'].indexOf(value) !== -1
      },
    },
    change: {
      type: Function,
      default: null,
    },
  },
  methods: {
    onChange($event) {
      // Passing custom event from outside change.
      this.$emit('change')
      let isChecked = $event.target.checked
      if (this.trueValue !== null && isChecked) {
        this.$emit('input', this.trueValue)
      } else if (this.falseValue !== null && !isChecked) {
        this.$emit('input', this.falseValue)
      } else {
        this.$emit('input', $event.target.checked)
      }
    },
  },
}
</script>

<template>
  <div :class="[size, 'checkbox']">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :true-value="trueValue"
      :false-value="falseValue"
      @change="onChange($event)"
    />
    <label :for="id">
      <span>
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.checkbox {
  label {
    position: relative;
    display: inline-block;
    cursor: pointer;

    &::before {
      position: absolute;
      width: 20px;
      height: 20px;
      content: '';
      background-color: #fff;
      border: 2px solid $color-checkbox-border;
    }

    &::after {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 12px;
      height: 8px;
      content: '';
      background: transparent;
      border: 3px solid #fff;
      border-top: none;
      border-right: none;
      opacity: 0;
      transform: rotate(-45deg);
    }

    span {
      display: inline-block;
      margin-left: 23px;
    }
  }

  input {
    position: absolute;
    left: -9999px;

    &:checked {
      ~ label::before {
        background-color: $brand-green;
        border: 2px solid $brand-green;
      }

      ~ label::after {
        opacity: 1;
      }
    }
  }

  &.large {
    @extend %typography-large;
  }

  &.medium {
    @extend %typography-medium;
  }

  &.small {
    @extend %typography-small;
  }
}
</style>
