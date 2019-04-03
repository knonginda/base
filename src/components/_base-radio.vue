<script>
export default {
  name: 'BaseRadio',
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    id: {
      type: String,
      default: function() {
        return 'radio-id-' + this._uid
      },
    },
    name: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small'].indexOf(value) !== -1
      },
    },
  },
  computed: {
    state() {
      if (this.modelValue === undefined) {
        return this.checked
      }
      return this.modelValue === this.value
    },
  },
  mounted() {
    if (this.checked && !this.state) {
      this.toggle()
    }
  },
  methods: {
    onChange() {
      // Passing custom event from outside change.
      this.$emit('change')
      this.toggle()
    },
    toggle() {
      this.$emit('input', this.state ? '' : this.value)
    },
  },
}
</script>

<template>
  <div :class="['radio', size]">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      :checked="state"
      @change="onChange"
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

.radio {
  input {
    position: absolute;
    left: -9999px;

    &:checked ~ label::after {
      position: absolute;
      top: 3px;
      left: 4px;
      width: 12px;
      height: 12px;
      font-size: 12px;
      content: '';
      background: $brand-green;
      border-radius: 50px;
    }
  }

  label {
    position: relative;
    cursor: pointer;

    &::before {
      position: absolute;
      display: inline-block;
      padding: 9px;
      content: '';
      background-color: #fff;
      border: 1px solid $color-radio-border;
      border-radius: 50%;
    }

    span {
      display: inline-block;
      margin: 1px 0 0 23px;
    }
  }
}

.large {
  @extend %typography-large;
}

.medium {
  @extend %typography-medium;
}

.small {
  @extend %typography-small;
}
</style>
