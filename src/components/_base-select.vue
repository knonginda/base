<script>
// https://github.com/simplesmiler/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'BaseSelect',
  mixins: [clickaway],
  props: {
    options: {
      type: Array,
      default: null,
    },
    value: {
      type: [String, Object, Number],
      default: null,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small'].indexOf(value) !== -1
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showOptions: false,
    }
  },
  methods: {
    overlayClasses() {
      return [
        'selector',
        'formControl',
        this.size,
        { open: this.showOptions },
        { disabled: this.disabled },
      ]
    },
    onChange(option) {
      this.$emit('change')
      this.$emit('input', option)
      this.showOptions = !this.showOptions
    },
    onOpen() {
      this.showOptions = !this.showOptions && !this.disabled
    },
    onClose() {
      this.showOptions = false
    },
  },
}
</script>

<template>
  <div v-on-clickaway="onClose" :class="overlayClasses()" @click="onOpen()">
    <div class="spaceBetween">
      <div class="selectName">{{ value ? value.name : 'All' }}</div>
      <div class="selectSymbol">
        <BaseFasIcon v-if="!showOptions" name="angle-down" />
        <BaseFasIcon v-else name="angle-up" />
      </div>
    </div>
    <ul v-show="showOptions" class="selectorOptions">
      <li v-for="(option, index) in options" :key="index">
        <label :for="'selector_' + _uid + '_' + index" class="option">
          <input
            :id="'selector_' + _uid + '_' + index"
            type="radio"
            :value="option.value"
            :name="'selector_' + _uid"
            :checked="option.value === value.value"
            @change="onChange(option)"
          />
          <span class="optionName">{{ option.name }}</span>
          <BaseFasIcon class="optionChecked" name="check-circle" />
        </label>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.selector {
  position: relative;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid $color-select-border;
  border-radius: 3px;

  &.open {
    border-radius: 3px 3px 0 0;
  }

  &.disabled {
    opacity: 0.5;
  }
}

.spaceBetween {
  display: flex;
  justify-content: space-between;
}

.selectName {
  min-width: 50px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selectSymbol {
  display: flex;
  align-items: center;
  justify-content: center;
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid $lighter-grey;

  &:hover {
    background-color: $lighter-green;
  }

  .optionChecked {
    font-size: 14px;
    color: $dark-green;
    opacity: 0;
  }

  input {
    position: absolute;
    left: -9999px;

    &:checked {
      ~ .optionChecked {
        opacity: 1;
      }
    }
  }

  .optionName {
    padding-right: 15px;
  }
}

.selectorOptions {
  position: absolute;
  z-index: $layer-dropdown-z-index;
  min-width: -webkit-calc(100% + 2px);
  white-space: nowrap;
  border: 1px solid $lighter-grey;

  li {
    &:last-child {
      .option {
        border-bottom: 0;
      }
    }
  }
}

.small {
  &.selector {
    min-width: 70px;
    height: $size-input-height - 8;
  }

  .spaceBetween {
    height: $size-input-height - 10;
  }

  .selectorOptions {
    top: $size-input-height - 10;
    left: -1px;

    li {
      .option {
        height: $size-input-height - 10;
      }
    }
  }

  .selectName {
    min-width: 35px;
    line-height: $size-input-height - 10;
  }

  .selectSymbol {
    min-width: 35px;
  }
}

.medium {
  &.selector {
    min-width: 100px;
    height: $size-input-height;
  }

  .spaceBetween {
    height: $size-input-height - 2;
  }

  .selectorOptions {
    top: $size-input-height - 2;
    left: -1px;

    li {
      .option {
        height: $size-input-height - 2;
      }
    }
  }

  .selectName {
    min-width: 45px;
    line-height: $size-input-height;
  }

  .selectSymbol {
    min-width: 45px;
  }
}
</style>
