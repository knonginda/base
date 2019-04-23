import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// https://github.com/pagekit/vue-resource
import VueResource from 'vue-resource'

// https://github.com/brockpetrie/vue-moment
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

// https://github.com/Akryum/v-tooltip
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

// https://github.com/charliekassel/vuejs-datepicker
import BaseDatePicker from 'vuejs-datepicker'

Vue.use(VueResource)
Vue.use(VueMoment, { moment })
Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('BaseDatePicker', BaseDatePicker)
Vue.component('BasePopover', VPopover)

// Filter
Vue.filter('date', function(value) {
  if (!value) return ''
  value = value.toString()
  return moment(value).format('MM/DD/YYYY')
})

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /_base-[\w-]+\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = upperFirst(
    camelCase(
      fileName
        // Remove the "./_" from the beginning
        .replace(/^\.\/_/, '')
        // Remove the file extension from the end
        .replace(/\.\w+$/, '')
    )
  )
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})
