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
  faForward,
  faStepForward,
  faFastForward,
  faBackward,
  faStepBackward,
  faFastBackward,
  faInfo,
  faSort,
  faSortUp,
  faSortDown,
  faSquare,
  faTimesCircle,
  faExclamation,
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'

import {
  faSquare as farSquare,
  faCircle,
  faTimesCircle as farTimesCircle,
  faClock,
  faUserCircle,
  faCalendarAlt,
  faEye,
  faEyeSlash,
  faEdit,
  faFile,
  faFileWord,
  faFilePdf,
  faFileExcel,
} from '@fortawesome/free-regular-svg-icons'

// https://fontawesome.com/icons
fontAwesomeIconLibrary.add(
  // Solid
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
  faForward,
  faStepForward,
  faFastForward,
  faBackward,
  faStepBackward,
  faFastBackward,
  faInfo,
  faSort,
  faSortUp,
  faSortDown,
  faSquare,
  faExclamation,
  faExclamationTriangle,
  faExclamationCircle,

  // Regular
  farSquare,
  faCircle,
  faTimesCircle,
  farTimesCircle,
  faClock,
  faUserCircle,
  faCalendarAlt,
  faEye,
  faEyeSlash,
  faEdit,
  faFile,
  faFileWord,
  faFilePdf,
  faFileExcel
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
