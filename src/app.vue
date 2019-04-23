<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  data() {
    return {
      dispositionOptions: [
        { name: 'All', value: '' },
        { name: 'None', value: 'None' },
        { name: 'Other', value: 'Other' },
        { name: 'Enrolled', value: 'Enrolled' },
        { name: 'No Sale', value: 'No Sale' },
        { name: 'Pipeline Pipeline', value: 'Pipeline' },
        { name: 'Unworkable', value: 'Unworkable' },
        { name: 'No Contact/Phone Related', value: 'No Contact/Phone Related' },
      ],
      scriptPhaseOptions: [
        { name: 'All', value: '' },
        { name: 'Introduction', value: 'Introduction' },
        { name: 'Needs Analysis', value: 'Needs Analysis' },
        { name: 'Eligibility', value: 'Eligibility' },
        { name: 'Enrollment', value: 'Enrollment' },
        { name: 'None', value: 'None' },
      ],
      electionPeriodOptions: [
        { name: 'All', value: '' },
        { name: 'AEP', value: 'AEP' },
        { name: 'IEP/ICEP', value: 'IEP/ICEP' },
        { name: 'MEDIGAP', value: 'MEDIGAP' },
        { name: 'OEP', value: 'OEP' },
        { name: 'GI', value: 'GI' },
        { name: 'Underwriting', value: 'Underwriting' },
      ],
      newData: [],
      filteredData: [],
      gridColumns: [
        {
          key: 'firstName',
          label: 'Customer Name',
        },
        {
          key: 'createdWhen',
          label: 'Update',
        },
        {
          key: 'disposition',
          label: 'Disposition',
        },
        {
          key: 'electionPeriod',
          label: 'Election Period',
        },
        {
          key: 'scriptPhase',
          label: 'Script Phase',
        },
      ],
      gridData: [],
      query: {
        limit: 10,
        offset: 0,
        filterKey: {
          disposition: { name: 'All' },
          electionPeriod: { name: 'All', value: '' },
          scriptPhase: { name: 'All', value: '' },
          createdWhen: {
            startDate: '',
            endDate: '',
          },
        },
        sort: '',
        order: '',
        perPage: [
          { name: 5, value: 5 },
          { name: 10, value: 10 },
          { name: 20, value: 20 },
          { name: 30, value: 30 },
        ],
      },
      showSelectedItems: [],
    }
  },
  created: function() {
    this.gridData = [
      {
        leadId: 5911766,
        firstName: 'gfds',
        lastName: 'hgfd',
        createdWhen: '2019-02-13T22:46:48.000+0000',
        electionPeriod: 'GI',
        pageNum: 7,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '48',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 3011338,
        firstName: 'fdsa',
        lastName: 'fdsa',
        createdWhen: '2019-02-14T18:50:33.000+0000',
        electionPeriod: 'GI',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled outside of BOSE',
        secondaryDisposition: null,
        duration: '193',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled outside of BOSE',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T19:26:13.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '463',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:43:51.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5911706,
        firstName: 'gfde',
        lastName: 'gfdsw',
        createdWhen: '2019-02-12T21:26:06.000+0000',
        electionPeriod: null,
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '6',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911006,
        firstName: 'dafs',
        lastName: 'dfsa',
        createdWhen: '2019-03-07T04:33:20.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '3',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:22:39.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:32:20.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:32:21.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5911328,
        firstName: 'adf',
        lastName: 'asfd',
        createdWhen: '2019-01-14T19:44:11.000+0000',
        electionPeriod: null,
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '5676',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911652,
        firstName: 'fds',
        lastName: 'fds',
        createdWhen: '2019-02-11T21:55:55.000+0000',
        electionPeriod: 'GI',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '4351',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911686,
        firstName: 'gfds',
        lastName: 'fds',
        createdWhen: '2019-02-12T21:06:06.000+0000',
        electionPeriod: null,
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '6',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911788,
        firstName: 'gfdg',
        lastName: 'fds',
        createdWhen: '2019-02-14T00:00:08.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '1',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5912129,
        firstName: 'adsf',
        lastName: 'adfs',
        createdWhen: '2019-03-06T02:46:40.000+0000',
        electionPeriod: null,
        pageNum: 3,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '5',
        scriptPhase: 'Eligibility',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:22:01.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T21:20:05.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: 7,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - Age In',
        duration: '0',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - Age In',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T21:22:08.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T22:39:36.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T22:39:40.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T22:40:34.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5911206,
        firstName: 'testt',
        lastName: 'tetsss',
        createdWhen: '2019-01-03T22:38:37.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '64',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911209,
        firstName: 'dfs',
        lastName: 'tesa',
        createdWhen: '2019-01-04T01:16:19.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '14',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911786,
        firstName: 'gfds',
        lastName: 'fds',
        createdWhen: '2019-02-13T23:39:26.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '3',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5911787,
        firstName: 'fds',
        lastName: 'fds',
        createdWhen: '2019-02-13T23:46:35.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '2',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T22:43:43.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:39:15.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5911006,
        firstName: 'dafs',
        lastName: 'dfsa',
        createdWhen: '2019-03-08T19:05:15.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5797943,
        firstName: 'test',
        lastName: 'test',
        createdWhen: '2019-01-03T23:48:31.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '10',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911208,
        firstName: 'test',
        lastName: 'test',
        createdWhen: '2019-01-04T00:24:49.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '29',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5911666,
        firstName: 'gfd',
        lastName: 'jhgfd',
        createdWhen: '2019-02-12T18:34:50.000+0000',
        electionPeriod: 'GI',
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '141',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5912106,
        firstName: 'afd',
        lastName: 'afds',
        createdWhen: '2019-03-05T00:49:34.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5912106,
        firstName: 'afd',
        lastName: 'afds',
        createdWhen: '2019-03-05T00:49:44.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5912129,
        firstName: 'adsf',
        lastName: 'adfs',
        createdWhen: '2019-03-06T03:00:52.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-07T23:16:31.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T21:46:50.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5912487,
        firstName: 'afsdasfd',
        lastName: 'adsfadfs',
        createdWhen: '2019-03-19T19:29:16.000+0000',
        electionPeriod: null,
        pageNum: 20,
        currentCover: null,
        primaryDisposition: 'Transferred to IVR',
        secondaryDisposition: null,
        duration: '7',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Transferred to IVR',
        },
      },
      {
        leadId: 5912491,
        firstName: 'afdadf',
        lastName: 'afsdadfs',
        createdWhen: '2019-03-19T21:50:22.000+0000',
        electionPeriod: null,
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '7',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-20T00:04:37.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5912647,
        firstName: 'adfsadsfsdfdsa',
        lastName: 'afdsadsass',
        createdWhen: '2019-03-25T18:13:07.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-27T02:48:29.000+0000',
        electionPeriod: 'GI',
        pageNum: 8,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Too expensive',
        duration: '1',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Too expensive',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T22:58:26.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T23:00:42.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T23:02:04.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T23:02:47.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T23:03:57.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-08T23:04:51.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5912409,
        firstName: 'asdf',
        lastName: 'asdf',
        createdWhen: '2019-03-19T22:04:09.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-19T23:20:56.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-20T00:15:01.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Dialed Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Dialed Call',
        },
      },
      {
        leadId: 5912646,
        firstName: 'fdasdsadsaf',
        lastName: 'fadsasdf',
        createdWhen: '2019-03-25T17:46:27.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-14T01:00:50.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-18T22:58:18.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909608,
        firstName: 'dfas',
        lastName: 'dafs',
        createdWhen: '2019-03-19T00:16:35.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-19T00:19:21.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-19T21:59:01.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '2',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-20T00:15:01.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '1',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5912510,
        firstName: 'adfadsf',
        lastName: 'fsadsdaf',
        createdWhen: '2019-03-20T18:03:49.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Dialed Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Dialed Call',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-11T16:05:07.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5911988,
        firstName: 'ad',
        lastName: 'dfas',
        createdWhen: '2019-03-12T23:00:36.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5911988,
        firstName: 'ad',
        lastName: 'dfas',
        createdWhen: '2019-03-12T23:00:39.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5911988,
        firstName: 'ad',
        lastName: 'dfas',
        createdWhen: '2019-03-12T23:00:44.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 3011338,
        firstName: 'fdsa',
        lastName: 'fdsa',
        createdWhen: '2019-03-12T23:50:42.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5909608,
        firstName: 'dfas',
        lastName: 'dafs',
        createdWhen: '2019-03-19T00:14:40.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-19T00:14:56.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-19T22:16:25.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '107',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5912510,
        firstName: 'adfadsf',
        lastName: 'fsadsdaf',
        createdWhen: '2019-03-20T18:03:12.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Dialed Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Dialed Call',
        },
      },
      {
        leadId: 5912646,
        firstName: 'fdasdsadsaf',
        lastName: 'fadsasdf',
        createdWhen: '2019-03-25T17:46:27.000+0000',
        electionPeriod: null,
        pageNum: null,
        currentCover: null,
        primaryDisposition: null,
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'None',
          value: null,
        },
      },
      {
        leadId: 5912646,
        firstName: 'fdasdsadsaf',
        lastName: 'fadsasdf',
        createdWhen: '2019-03-25T17:47:03.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '1',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5912647,
        firstName: 'adfsadsfsdfdsa',
        lastName: 'afdsadsass',
        createdWhen: '2019-03-25T18:11:17.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '1',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-27T01:45:06.000+0000',
        electionPeriod: 'GI',
        pageNum: 8,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Too expensive',
        duration: '47',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Too expensive',
        },
      },
      {
        leadId: 5912846,
        firstName: 'testhistory',
        lastName: 'testhistory',
        createdWhen: '2019-04-04T01:34:06.000+0000',
        electionPeriod: null,
        pageNum: 31,
        currentCover: null,
        primaryDisposition: 'Enrolled',
        secondaryDisposition: null,
        duration: '5',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'Enrolled',
          value: 'Enrolled',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-11T15:54:33.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '2',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5912488,
        firstName: 'asfdasfd',
        lastName: 'fasds',
        createdWhen: '2019-03-19T19:41:56.000+0000',
        electionPeriod: null,
        pageNum: 13,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '4',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5909837,
        firstName: 'adfs',
        lastName: 'adsf',
        createdWhen: '2019-03-19T23:19:11.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-04-03T21:44:34.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Pipeline',
        secondaryDisposition: 'Pipeline - General',
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Pipeline',
          value: 'Pipeline - General',
        },
      },
      {
        leadId: 5912233,
        firstName: 'adsf',
        lastName: 'adfs',
        createdWhen: '2019-03-12T01:09:27.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '3',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5912487,
        firstName: 'afsdasfd',
        lastName: 'adsfadfs',
        createdWhen: '2019-03-19T19:25:46.000+0000',
        electionPeriod: null,
        pageNum: 20,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '3',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5912510,
        firstName: 'adfadsf',
        lastName: 'fsadsdaf',
        createdWhen: '2019-03-20T18:00:02.000+0000',
        electionPeriod: null,
        pageNum: 13,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '2',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5912646,
        firstName: 'fdasdsadsaf',
        lastName: 'fadsasdf',
        createdWhen: '2019-03-25T17:46:29.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Customer will call back',
        duration: '0',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Customer will call back',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-27T02:52:08.000+0000',
        electionPeriod: 'GI',
        pageNum: 8,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Too expensive',
        duration: '1',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Too expensive',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-27T02:53:25.000+0000',
        electionPeriod: 'GI',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Dialed Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Dialed Call',
        },
      },
      {
        leadId: 5912232,
        firstName: 'das',
        lastName: 'dfas',
        createdWhen: '2019-03-12T00:59:05.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Transferred call',
        duration: '5',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Transferred call',
        },
      },
      {
        leadId: 5909367,
        firstName: 'vre',
        lastName: 'xEA',
        createdWhen: '2019-03-12T22:48:24.000+0000',
        electionPeriod: 'IEP/ICEP',
        pageNum: null,
        currentCover: null,
        primaryDisposition: 'Answered Call',
        secondaryDisposition: null,
        duration: '0',
        scriptPhase: null,
        disposition: {
          key: 'Other',
          value: 'Answered Call',
        },
      },
      {
        leadId: 5912646,
        firstName: 'fdasdsadsaf',
        lastName: 'fadsasdf',
        createdWhen: '2019-03-25T17:44:25.000+0000',
        electionPeriod: null,
        pageNum: 2,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Transferred call',
        duration: '1',
        scriptPhase: 'Needs Analysis',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Transferred call',
        },
      },
      {
        leadId: 5909153,
        firstName: 'firstnamed',
        lastName: 'lastnameaf',
        createdWhen: '2019-03-27T01:19:29.000+0000',
        electionPeriod: 'GI',
        pageNum: 8,
        currentCover: null,
        primaryDisposition: 'No Sale',
        secondaryDisposition: 'Transferred Call',
        duration: '13',
        scriptPhase: 'Enrollment',
        disposition: {
          key: 'No Sale',
          value: 'No Sale - Transferred Call',
        },
      },
    ]
  },
  methods: {
    resetData(value) {
      this.newData = value
    },
    fixDate(event) {
      return this.$moment(event).format('MM/DD/YYYY')
    },
  },
}
</script>

<template>
  <div class="baseStyle">
    <div style="display: flex;">
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label class="formLabel">Disposition</label>
        <BaseSelect
          v-model="query.filterKey.disposition"
          :options="dispositionOptions"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label class="formLabel">Script Phase</label>
        <BaseSelect
          v-model="query.filterKey.scriptPhase"
          :options="scriptPhaseOptions"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label class="formLabel">Election Period</label>
        <BaseSelect
          v-model="query.filterKey.electionPeriod"
          :options="electionPeriodOptions"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label for="form-field" class="formLabel">Start Date</label>
        <BaseDatePicker
          id="form-field"
          v-model="query.filterKey.createdWhen.startDate"
          placeholder="Start Date"
          :calendar-button="true"
          calendar-button-icon="calendar"
          format="MM/dd/yyyy"
          @input="query.filterKey.createdWhen.startDate = fixDate($event)"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <label for="form-field" class="formLabel">End Date</label>
        <BaseDatePicker
          id="form-field"
          v-model="query.filterKey.createdWhen.endDate"
          placeholder="End Date"
          :calendar-button="true"
          calendar-button-icon="calendar"
          format="MM/dd/yyyy"
          @input="query.filterKey.createdWhen.endDate = fixDate($event)"
        />
      </div>
      <div class="formField" style=" width: 160px;margin-right: 20px;">
        <BaseButton @click="$refs.modal.open()">Open</BaseButton>
        <BaseModal ref="modal" theme="info">
          <template slot="title">
            <h2>This is custom title</h2>
          </template>
          <div
            >Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.</div
          >
        </BaseModal>
      </div>
    </div>
    <BaseGrid
      ref="grid"
      :query="query"
      :columns="gridColumns"
      :data="gridData"
      @changes="resetData"
    >
      <template v-slot:tbody>
        <tr v-for="(row, index) in newData" :key="index" class="stickyColumns">
          <td v-tooltip="'Test'"
            >{{ row.firstName }}, {{ row.lastName }}
            <BasePopover placement="top">
              <button class="tooltip-target b3">Click me</button>
              <template slot="popover">
                <strong>tet</strong>
              </template>
            </BasePopover>
          </td>
          <td>{{ row.createdWhen | date }}</td>
          <td>{{ row.disposition.value }}</td>
          <td>{{ row.electionPeriod }}</td>
          <td>{{ row.scriptPhase }}</td>
        </tr>
      </template>
    </BaseGrid>
    <BaseAlert theme="info">
      <template v-slot:title
        >Well Done!</template
      >
      You successfully read this important
      <BaseLink href="https://www.google.com">alert message</BaseLink>.
    </BaseAlert>
  </div>
</template>

<style lang="scss">
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  @extend %typography-medium;

  background: $color-body-bg;
}

.baseStyle {
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}

.stickyColumns {
  &:nth-child(1) {
    td {
      background-color: #d7e9bb !important;
    }
  }
  &:nth-child(2) {
    td {
      background-color: #f0f6e4 !important;
    }
  }
  &:nth-child(3) {
    td {
      background-color: #f7faf2 !important;
    }
  }
}
</style>
