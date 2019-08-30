<script>
import Vue from 'vue'
// https://github.com/simplesmiler/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'
import { clone, map } from 'lodash'

export default {
  name: 'BaseSelectMultiple',
  mixins: [clickaway],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
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
    editable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Please Select Option',
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      showOptions: false,
      matchingValue: '',
      selectedValues: [],
    }
  },
  computed: {
    isSelectAll() {
      if (this.selectedValues.length !== this.options.length - 1) {
        return false
      }
      let options = map(clone(this.options), 'value')
      let index = options.indexOf('')
      if (index > -1) {
        options.splice(index, 1)
      }
      for (let option of options) {
        if (!this.selectedValues.includes(option)) {
          return false
        }
      }
      return true
    },
  },
  created() {
    this.selectedValues = this.value
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
    onAllChange(checkbox) {
      if (!checkbox.target.checked) {
        this.selectedValues = []
      } else {
        this.selectedValues = []
        for (let item of this.options) {
          if (item.value !== '') {
            this.selectedValues.push(item.value)
          }
        }
      }
      this.$emit('input', this.selectedValues)
      this.change()
    },
    onChange(option) {
      let index = this.selectedValues.indexOf(option.value)
      if (index > -1) {
        this.selectedValues.splice(index, 1)
      } else {
        this.selectedValues.push(option.value)
      }
      this.$emit('input', this.selectedValues)
      this.change()
    },
    onOpen() {
      this.showOptions = !this.showOptions && !this.disabled
    },
    onClose() {
      this.showOptions = false
    },
    onMatch() {
      if (this.disabled) {
        return true
      }
      this.showOptions = !this.showOptions
      this.matchingValue = ''
      this.$el.querySelector('input').setAttribute('style', 'display: block')
      Vue.nextTick(() => {
        this.$el.querySelector('input').focus()
      })
    },
    howManySelected() {
      if (this.selectedValues.length > 0) {
        return `Selected(${this.selectedValues.length})`
      } else {
        return ''
      }
    },
    isMatching(option) {
      return (
        option.name
          .toString()
          .toLowerCase()
          .indexOf(this.matchingValue.toString().toLowerCase()) !== -1 ||
        this.matchingValue.toString() === ''
      )
    },
  },
}
</script>

<template>
  <div v-on-clickaway="onClose" :class="overlayClasses()">
    <div v-if="editable" class="spaceBetween" @click="onMatch()">
      <input
        v-show="showOptions"
        v-model="matchingValue"
        class="matchingInput"
        type="text"
      />
      <input
        class="selectName"
        :value="howManySelected()"
        type="text"
        readonly
        :placeholder="placeholder"
      />
      <div class="selectSymbol">
        <BaseFasIcon v-if="!showOptions" name="angle-down" />
        <BaseFasIcon v-else name="angle-up" />
      </div>
    </div>
    <div v-else class="spaceBetween" @click="onOpen()">
      <input
        class="selectName"
        :value="howManySelected()"
        type="text"
        readonly
        :placeholder="placeholder"
      />
      <div class="selectSymbol">
        <BaseFasIcon v-if="!showOptions" name="angle-down" />
        <BaseFasIcon v-else name="angle-up" />
      </div>
    </div>
    <ul v-show="showOptions" class="selectorOptions">
      <template v-for="(option, index) in options">
        <!-- All checkbox -->
        <li v-if="option.value === '' && isMatching(option)" :key="index">
          <input
            :id="'selector_all_' + _uid + '_' + index"
            type="checkbox"
            :value="option.value"
            :name="'selector_' + _uid + '_' + index"
            :checked="isSelectAll"
            @change="onAllChange($event)"
          />
          <label :for="'selector_all_' + _uid + '_' + index" class="option">
            <span class="optionName">{{ option.name }}</span>
          </label>
        </li>
        <!-- Other checkbox -->
        <li v-if="option.value !== '' && isMatching(option)" :key="index">
          <input
            :id="'selector_' + _uid + '_' + index"
            type="checkbox"
            :value="option.value"
            :name="'selector_' + _uid + '_' + index"
            :checked="value.includes(option.value)"
            @change="onChange(option, $event)"
          />
          <label :for="'selector_' + _uid + '_' + index" class="option">
            <span class="optionName">{{ option.name }}</span>
          </label>
        </li>
      </template>
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
  width: calc(100% - 45px);
  margin-top: 2px;
  font-size: 18px;
  text-indent: 9px;
  cursor: pointer;
  border: 0;
  outline: none;
}

.selectSymbol {
  display: flex;
  align-items: center;
  justify-content: center;
}

.option {
  position: relative;
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
    top: 12px;
    left: 14px;
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

  .optionName {
    padding-left: 30px;
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

  input[type='checkbox'] {
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
}

.matchingInput {
  position: absolute;
  margin-top: 2px;
  font-size: 18px;
  text-indent: 9px;
  border: 0;
  outline: none;
}

.small {
  &.selector {
    min-width: 70px;
    height: $size-input-height - 8;
  }

  .matchingInput {
    width: calc(100% - 35px);
    line-height: 24px;
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

  .matchingInput {
    width: calc(100% - 45px);
    line-height: 32px;
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
