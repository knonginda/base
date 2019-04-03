<script>
import camelCase from 'lodash/camelCase'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library as fontAwesomeIconLibrary } from '@fortawesome/fontawesome-svg-core'
import {
  faSync,
  faUser,
  faHome,
  faCaretUp,
  faCaretRight,
  faCaretDown,
  faCaretLeft,
  faAngleUp,
  faAngleRight,
  faAngleDown,
  faAngleLeft,
  faCheckSquare,
  faCheckCircle,
  faDotCircle,
  faEllipsisH,
  faFilter,
  faSignOutAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons'

import {
  faSquare,
  faCircle,
  faTimesCircle,
  faClock,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons'

// https://fontawesome.com/icons
fontAwesomeIconLibrary.add(
  faSync,
  faUser,
  faHome,
  faCaretUp,
  faCaretRight,
  faCaretDown,
  faCaretLeft,
  faCheckSquare,
  faCheckCircle,
  faDotCircle,
  faEllipsisH,
  faFilter,
  faSquare,
  faCircle,
  faTimesCircle,
  faAngleUp,
  faAngleRight,
  faAngleDown,
  faAngleLeft,
  faClock,
  faSignOutAlt,
  faUserCircle,
  faCog
)

export default {
  components: {
    FontAwesomeIcon,
  },
  inheritAttrs: false,
  props: {
    source: {
      type: String,
      default: 'font-awesome',
    },
    name: {
      type: [String, Array],
      required: true,
    },
  },
  computed: {
    // Gets a CSS module class, e.g. iconCustomLogo
    customIconClass() {
      return this.$style[camelCase('icon-custom-' + this.name)]
    },
  },
}
</script>

<template>
  <FontAwesomeIcon
    v-if="source === 'font-awesome'"
    v-bind="$attrs"
    :icon="name"
  />
  <span
    v-else-if="source === 'custom'"
    v-bind="$attrs"
    :class="customIconClass"
  />
</template>
