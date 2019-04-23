<script>
import upperFirst from 'lodash/upperFirst'

export default {
  name: 'BaseModal',

  props: {
    title: {
      type: [String, Array, Object],
      required: false,
      default: '',
    },
    overlayTheme: {
      type: String,
      required: false,
      default: 'normal',
    },
    theme: {
      type: String,
      default: 'normal',
      validator: function(value) {
        return (
          ['normal', 'warning', 'success', 'danger', 'info'].indexOf(value) !==
          -1
        )
      },
    },
    blocking: {
      type: Boolean,
      required: false,
      default: false,
    },
    isHideCloseButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: [Number, String],
      required: false,
      default: null,
    },
    height: {
      type: [Number, String],
      required: false,
      default: null,
    },
    buttonSpace: {
      type: String,
      default: 'flexEnd',
      validator: function(value) {
        return ['flexStart', 'flexEnd', 'spaceBetween'].indexOf(value) !== -1
      },
    },
  },
  data() {
    return {
      visible: false,
      isOpen: false,
      closeIcon: ['far', 'times-circle'],
      backups: {
        body: {
          height: null,
          overflow: null,
        },
      },
    }
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title
    },
    overlayClasses() {
      return [
        'baseModalOverlay',
        'baseModalClickable',
        `baseModal${upperFirst(this.theme)}`,
        { blocking: this.blocking },
        { isBaseModalOverlayVisible: this.visible },
      ]
    },
    modalContentStyle() {
      let height = this.height
      let maxHeight = null
      if (height !== null) {
        if (Number.isInteger(Number(height))) {
          height = height + 'px'
        }
        maxHeight = 'none'
      }
      return {
        height,
        maxHeight,
      }
    },
    modalStyle() {
      let width = this.width
      let maxWidth = null
      if (width !== null) {
        if (Number.isInteger(Number(width))) {
          width = width + 'px'
        }
        maxWidth = 'none'
      }
      return {
        width,
        maxWidth,
      }
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
  mounted() {
    document.addEventListener('keyup', this.onDocumentKeyup)
  },
  methods: {
    open() {
      this.isOpen = true
      this.lockBody()
      setTimeout(() => {
        if (!this.visible) {
          this.visible = true
        }
      }, 30)
      this.$emit('open')
    },
    close() {
      this.visible = false
      this.unlockBody()
      setTimeout(() => {
        this.isOpen = false
      }, 300)
      this.$emit('close')
    },
    lockBody() {
      this.backups.body.height = document.body.style.height
      this.backups.body.overflow = document.body.style.overflow
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
    },
    unlockBody() {
      document.body.style.height = this.backups.body.height
      document.body.style.overflow = this.backups.body.overflow
    },
    onOverlayClick(event) {
      if (
        !event.target.classList ||
        event.target.classList.contains('baseModalClickable')
      ) {
        if (!this.blocking) {
          this.close()
        }
      }
    },
  },
}
</script>

<template>
  <div>
    <div v-show="isOpen" :class="overlayClasses" @click="onOverlayClick">
      <div
        :class="['baseModal', visible ? 'isBaseModalVisible' : '']"
        :style="modalStyle"
      >
        <div v-if="!isHideCloseButton" class="baseActionClose" @click="close">
          <BaseFasIcon :name="['far', 'times-circle']" />
        </div>

        <!-- If title is present -->
        <div v-if="hasTitle" class="baseTitle">
          <template v-if="hasTitle">
            <BaseFasIcon class="themeIcon" :name="themeIconName" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h2 v-if="title" v-html="title"></h2>
            <slot v-else name="title"></slot>
          </template>
        </div>

        <!-- Content: Wrapper -->
        <div ref="content" class="baseContent" :style="modalContentStyle">
          <!-- Actual Content -->
          <template v-if="$slots.default">
            <slot class="baseContentContent"></slot>
          </template>
        </div>

        <!-- Buttons -->
        <div v-if="$slots.button" :class="['baseButtons', buttonSpace]">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.baseModalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $layer-modal-z-index;
  width: 100vw;
  height: 100vh;
  background: rgba(#fff, 0.9);
  opacity: 0;
  transition: opacity 0.3s;
  transform: translate3d(0, 0, 0);
}

.baseContent {
  display: flex;
  line-height: 1.5;
  transform: translateY(-8px);

  padding: {
    top: 24px;
    right: 32px;
    bottom: 24px;
    left: 32px;
  }
}

.baseButtons {
  text-align: right;
  border-top: 1px solid $color-modal-border;
  transform: translateY(16px);

  padding: {
    top: 12px;
    right: 20px;
    bottom: 12px;
    left: 20px;
  }
}

.baseButtons,
.baseContent {
  opacity: 0;
  transition: {
    property: transform, opacity;
    duration: 0.3s;
    delay: 0.09s;
    timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
}

.baseModal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 640px;
  max-height: 100vh;
  overflow-y: auto;
  background: $color-modal-bg;
  border-radius: 3px;
  box-shadow: $color-modal-box-shadow;
  opacity: 0;
  transform: scale(0.9) translate(calc(-50% - 32px), -50%);

  transition: {
    property: transform, opacity;
    duration: 0.3s;
    delay: 0.05s;
    timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
}

.baseTitle {
  @include ellipsis;

  display: flex;
  align-items: center;
  height: 64px;
  line-height: 64px;
  border-bottom: 1px solid $color-modal-border;
  padding: {
    right: 64px;
    left: 32px;
  }

  > svg {
    margin-right: 10px;
    font-size: 24px;
  }

  > h2 {
    @include ellipsis;
    @include mp0;

    font-size: 22px;
    font-weight: 500;
    text-align: left;
  }
}

.baseContentContent {
  flex-grow: 1;
  text-align: left;
}

.baseActionClose {
  > svg {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px !important;
    height: 28px !important;
    color: $medium-grey;
    cursor: pointer;
  }
}

/* stylelint-disable */
.flexStart {
  display: flex;
  justify-content: flex-start;

  button {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.flexEnd {
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 0;

    &:last-child {
      margin-left: 20px;
    }
  }
}
/* stylelint-enable */

.spaceBetween {
  display: flex;
  justify-content: space-between;
}

.isBaseModalOverlayVisible {
  opacity: 1;
}

.isBaseModalVisible {
  opacity: 1;
  transform: translate(-50%, -50%);

  .baseButtons,
  .baseContent {
    opacity: 1;
    transform: none;
  }
}

.baseModalSuccess {
  .baseTitle {
    background-color: $lighter-green;
  }
  .themeIcon {
    color: $dark-green;
  }
}

.baseModalDanger {
  .baseTitle {
    background-color: $lighter-red;
  }
  .themeIcon {
    color: $red;
  }
}

.baseModalWarning {
  .baseTitle {
    background-color: $light-yellow;
  }
  .themeIcon {
    color: $yellow;
  }
}

.baseModalInfo {
  .baseTitle {
    background-color: $light-blue;
  }
  .themeIcon {
    color: $blue;
  }
}
</style>
