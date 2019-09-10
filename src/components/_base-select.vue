<script>
import Vue from 'vue'
// https://github.com/simplesmiler/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'BaseSelect',
  mixins: [clickaway],
  props: {
    options: {
      type: Array,
      default: () => [],
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
    needAllOption: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      selectedValue: '',
      matchingValue: '',
      showOptions: false,
    }
  },
  computed: {
    selectedName() {
      if (this.selectedValue === '' && this.needAllOption) {
        return 'ALL'
      } else {
        return this.options.filter((item) => {
          return this.selectedValue === item.value
        })[0].name
      }
    },
  },
  created() {
    this.selectedValue = this.value
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
    onChange() {
      this.$emit('input', this.selectedValue)
      this.showOptions = !this.showOptions
      this.change()
    },
    onAllChange() {
      this.$emit('input', this.selectedValue)
      this.showOptions = !this.showOptions
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
    <div v-if="filterable" class="spaceBetween" @click="onMatch()">
      <input
        v-show="showOptions"
        v-model="matchingValue"
        class="matchingInput"
        type="text"
      />
      <div class="selectName">{{ selectedName }}</div>
      <div class="selectSymbol">
        <BaseFasIcon v-if="!showOptions" name="angle-down" />
        <BaseFasIcon v-else name="angle-up" />
      </div>
    </div>
    <div v-else class="spaceBetween" @click="onOpen()">
      <div class="selectName">{{ selectedName }}</div>
      <div class="selectSymbol">
        <BaseFasIcon v-if="!showOptions" name="angle-down" />
        <BaseFasIcon v-else name="angle-up" />
      </div>
    </div>
    <ul v-show="showOptions" class="selectorOptions">
      <template v-if="needAllOption">
        <li v-show="isMatching({ name: 'ALL' })">
          <label :for="'selector_all_' + _uid" class="option">
            <input
              :id="'selector_all_' + _uid"
              v-model="selectedValue"
              type="radio"
              :value="''"
              :name="'selector_' + _uid"
              @change="onAllChange"
            />
            <span class="optionName">ALL</span>
            <BaseFasIcon class="optionChecked" name="check-circle" />
          </label>
        </li>
      </template>
      <template v-for="(option, index) in options">
        <li v-show="isMatching(option)" :key="index">
          <label :for="'selector_' + _uid + '_' + index" class="option">
            <input
              :id="'selector_' + _uid + '_' + index"
              v-model="selectedValue"
              type="radio"
              :value="option.value"
              :name="'selector_' + _uid"
              @change="onChange"
            />
            <span class="optionName">{{ option.name }}</span>
            <BaseFasIcon class="optionChecked" name="check-circle" />
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
  width: 100%;
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
