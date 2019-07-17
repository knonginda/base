<script>
export default {
  name: 'BaseCheckbox',
  model: {
    prop: 'modelValue',
    event: 'input',
  },
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
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onValue: {
      type: [Boolean, String, Number],
      default: null,
    },
    offValue: {
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
  watch: {
    modelValue: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          return true
        } else {
          this.setChecked()
        }
      },
    },
  },
  mounted() {
    this.setChecked()
  },
  methods: {
    setChecked() {
      let input = this.$el.querySelector('input[type="checkbox"]')
      if (this.modelValue) {
        input.checked = true
      } else {
        input.checked = false
      }
    },
    onChange($event) {
      // Passing custom event from outside change.
      this.$emit('change')
      this.$emit('input', $event.target.checked)
    },
  },
}
</script>

<template>
  <div :class="[size, 'switch', { isDisabled: disabled }]">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      @change="onChange($event)"
    />
    <div class="switchInner">
      <label :for="id"></label>
      <span class="switchText">
        {{ modelValue ? onValue : offValue }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';
.switch {
  .switchInner {
    display: flex;
    align-items: center;
    height: 25px;
  }

  .switchText {
    padding-left: 5px;
  }

  label {
    position: relative;
    width: 50px;
    height: 18px;
    cursor: pointer;

    &::before {
      position: absolute;
      width: 50px;
      height: 18px;
      content: '';
      background-color: #999;
      border-radius: 20px;
      transition: background-color 0.5s ease 0s;
    }

    &::after {
      position: absolute;
      top: -3px;
      right: 27px;
      width: 23px;
      height: 23px;
      content: '';
      background-color: #d8d8d8;
      border: 1px solid #ccc;
      border-radius: 50%;
      transition: right 0.3s ease 0s;
    }

    span {
      display: inline-block;
      margin-left: 55px;
    }
  }

  input {
    display: none;

    &:checked {
      ~ .switchInner label::before {
        background-color: $brand-green;
        transition: background-color 0.5s ease 0s;
      }

      ~ .switchInner label::after {
        right: 0;
        transition: right 0.3s ease 0s;
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
