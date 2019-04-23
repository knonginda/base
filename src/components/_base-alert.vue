<script>
import upperFirst from 'lodash/upperFirst'

export default {
  props: {
    theme: {
      type: String,
      default: 'danger',
      validator: function(value) {
        return ['warning', 'success', 'danger', 'info'].indexOf(value) !== -1
      },
    },
  },
  computed: {
    overlayClasses() {
      return ['baseAlert', `baseAlert${upperFirst(this.theme)}`]
    },
    themeIconName() {
      return this.theme === 'danger'
        ? 'times-circle'
        : this.theme === 'warning'
        ? 'exclamation-triangle'
        : this.theme === 'success'
        ? 'check-circle'
        : 'exclamation-circle'
    },
  },
}
</script>

<template>
  <div :class="overlayClasses">
    <BaseFasIcon class="themeIcon" :name="themeIconName" />
    <div class="msgContainer">
      <div class="baseTitle">
        <slot name="title" />
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.baseAlert {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 3px;

  > svg {
    margin-right: 12px;
    font-size: 24px;
  }
}

.baseTitle {
  display: block;
  font-weight: bold;
}

.baseAlertSuccess {
  background-color: $lighter-green;
  border: 1px solid $dark-green;

  .themeIcon {
    color: $dark-green;
  }
}

.baseAlertDanger {
  background-color: $lighter-red;
  border: 1px solid $red;

  .themeIcon {
    color: $red;
  }
}

.baseAlertWarning {
  background-color: $light-yellow;
  border: 1px solid $yellow;

  .themeIcon {
    color: $yellow;
  }
}

.baseAlertInfo {
  background-color: $light-blue;
  border: 1px solid $blue;

  .themeIcon {
    color: $blue;
  }
}
</style>
