<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      default: null,
    },
    value: {
      type: [String, Object],
      default: null,
    },
  },
  data() {
    return {
      showOptions: false,
    }
  },
  methods: {
    onChange(option) {
      this.$emit('change')
      this.$emit('input', option)
      this.showOptions = !this.showOptions
    },
  },
}
</script>

<template>
  <div class="selector formControl" @click="showOptions = !showOptions">
    <div class="spaceBetween">
      <div class="selectName">{{ value ? value.value : 'Select' }}</div>
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
            @change="onChange(option)"
          />
          {{ option.value }}
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
}

.spaceBetween {
  display: flex;
  justify-content: space-between;
  height: $size-input-height;
}

.selectName {
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 15px;
}

.selectSymbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  color: $brand-blue;
}

.selectorOptions {
  position: absolute;
  top: 38px;
  z-index: $layer-dropdown-z-index;
  width: 100%;
  border: 1px solid $lighter-grey;
}

.option {
  display: flex;
  align-items: center;
  width: 100%;
  height: $size-input-height;
  padding: 0 0 0 15px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid $lighter-grey;

  &:hover {
    background-color: #eee;
  }
}

.option input {
  position: absolute;
  left: -9999px;
}
</style>
