<script>
export default {
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small'].indexOf(value) !== -1
      },
    },
  },
  data() {
    return {
      tabList: [],
      activeTabIndex: 0,
    }
  },
  computed: {
    overlaySizeClasses() {
      return [
        this.size === 'large'
          ? this.$style.large
          : this.size === 'small'
          ? this.$style.small
          : this.$style.medium,
      ]
    },
  },
  mounted() {
    // this.select(0)
    this.activeTabIndex = this.getInitialActiveTab()
    // this.$root.$on('select-tab', (index) => this.select(index))
  },
  methods: {
    select(index) {
      const tab = this.tabList[index]
      if (!tab.isDisabled) {
        this.activeTabIndex = index
      }
      this.$emit('change', tab)
    },
    getInitialActiveTab() {
      const index = this.tabList.findIndex((tab) => tab.active)
      return index === -1 ? 0 : index
    },
    overlayItemClasses(tab, index) {
      return [
        this.activeTabIndex === index ? 'active' : '',
        tab.disabled ? 'disabled' : '',
      ]
    },
  },
}
</script>

<template>
  <div :class="[size, 'tab']">
    <ul>
      <li
        v-for="(tab, index) in tabList"
        :key="index"
        v-bind="tab.dataAttrs"
        :class="[overlayItemClasses(tab, index), 'tabItem']"
        @click="select(index)"
        >{{ tab.title }}</li
      >
    </ul>
    <div class="tabContent">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.tab {
  > ul {
    display: flex;
    width: 100%;
    border-bottom: 1px solid $light-grey;
    border-left: 1px solid $light-grey;
  }
}

.tabContent {
  padding: 0;
}

.tabItem {
  margin-bottom: -1px;
  cursor: pointer;
  background-color: $lightestx-grey;
  border-top: 1px solid #ccc;
  border-right: 1px solid $light-grey;
  border-bottom: 1px solid $light-grey;
}

.small .tabItem {
  padding: $size-tab-padding-small;
}

.medium .tabItem {
  padding: $size-tab-padding-medium;
}

.large .tabItem {
  padding: $size-tab-padding-large;
}

.disabled {
  color: rgba(68, 68, 68, 0.3);
  cursor: not-allowed;
}

.active {
  background-color: #fff;
  border-bottom: 1px solid #fff;
}
</style>
