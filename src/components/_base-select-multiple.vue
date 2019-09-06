<script>
import Vue from 'vue'
// https://github.com/simplesmiler/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'
import { remove, cloneDeep } from 'lodash'

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
    filterable: {
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
    debounce: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      matchingValue: '',
      showOptions: false,
      isDebounce: null,
      selectedAll: true,
      selectedValues: [],
      emitSelectedValues: [],
    }
  },
  watch: {
    selectedValues: {
      handler() {
        this.isSelectedAll()
        this.selectedNumber()
      },
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      for (let [index, option] of this.options.entries()) {
        this.selectedValues[index] = false
        for (let passValue of this.value) {
          if (option.value === passValue) {
            this.selectedValues[index] = true
          }
        }
      }
      this.isSelectedAll()
      this.selectedNumber()
    },
    overlayClasses() {
      return [
        'selector',
        'formControl',
        this.size,
        { open: this.showOptions },
        { disabled: this.disabled },
      ]
    },
    transformData() {
      this.emitSelectedValues = []
      for (let [index, value] of this.selectedValues.entries()) {
        if (value) {
          this.emitSelectedValues.push(this.options[index].value)
        }
      }
      clearTimeout(this.isDebounce)
      this.isDebounce = setTimeout(() => {
        this.$emit('input', this.emitSelectedValues)
        this.change()
      }, Number(this.debounce))
    },
    selectedNumber() {
      let cloneData = cloneDeep(this.selectedValues)
      let selectedNumber = remove(cloneData, (selected) => {
        return selected
      })
      if (selectedNumber.length === this.selectedValues.length) {
        return 'ALL'
      } else if (selectedNumber.length > 0) {
        return `Selected (${selectedNumber.length})`
      } else {
        return ''
      }
    },
    isSelectedAll() {
      for (let selected of this.selectedValues) {
        if (!selected) {
          this.selectedAll = false
          break
        }
        this.selectedAll = true
      }
    },
    onAllChange($event) {
      if ($event.target.checked) {
        for (let index = 0; index < this.selectedValues.length; index++) {
          this.selectedValues[index] = true
        }
      } else {
        for (let index = 0; index < this.selectedValues.length; index++) {
          this.selectedValues[index] = false
        }
      }
      this.onClose()
      this.onOpen()
      this.transformData()
    },
    onChange() {
      this.transformData()
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
    <!-- Has Filterable -->
    <div v-if="filterable" class="spaceBetween" @click="onMatch()">
      <input
        v-show="showOptions"
        v-model="matchingValue"
        class="matchingInput"
        type="text"
      />
      <input
        class="selectName"
        :value="selectedNumber()"
        type="text"
        readonly
        :placeholder="placeholder"
      />
      <div class="selectSymbol">
        <BaseFasIcon v-if="!showOptions" name="angle-down" />
        <BaseFasIcon v-else name="angle-up" />
      </div>
    </div>
    <!-- Hasn't Filterable -->
    <div v-else class="spaceBetween" @click="onOpen()">
      <input
        class="selectName"
        :value="selectedNumber()"
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
      <!-- All Checkbox -->
      <li v-if="isMatching({ name: 'ALL' })">
        <input
          :id="'selector_all_' + _uid"
          :name="'selector_' + _uid"
          :checked="selectedAll"
          type="checkbox"
          @change="onAllChange"
        />
        <label :for="'selector_all_' + _uid" class="option">
          <span class="optionName">ALL</span>
        </label>
      </li>
      <!-- Other Checkboxs -->
      <template v-for="(option, index) in options">
        <li v-if="isMatching(option)" :key="index">
          <input
            :id="'selector_' + _uid + '_' + index"
            v-model="selectedValues[index]"
            :name="'selector_' + _uid + '_' + index"
            type="checkbox"
            @change="onChange"
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
