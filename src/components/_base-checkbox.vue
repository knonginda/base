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
    value: {
      type: [String, Object, Number, Boolean],
      default: null,
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
      default: () => {},
    },
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        return newValue === oldValue ? true : this.setValues()
      },
    },
  },
  mounted() {
    this.setValues()
  },
  methods: {
    setValues() {
      let input = this.$el.querySelector('input[type="checkbox"]')
      if (this.trueValue !== null && this.falseValue !== null) {
        this.value === this.trueValue
          ? (input.checked = true)
          : (input.checked = false)
      } else {
        this.value ? (input.checked = true) : (input.checked = false)
      }
    },
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
      this.change()
    },
  },
}
</script>

<template>
  <div :class="[size, 'checkbox', { isDisabled: disabled }]">
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
    display: none;

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

  &.isDisabled {
    opacity: 0.5;

    input,
    label {
      cursor: not-allowed;
    }
  }
}
</style>
