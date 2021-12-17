// layouts
import SidebarLayout from "./src/Layouts/SidebarLayout";
// items
import JetTable from './src/Items/Table';
import JetGrid from './src/Items/Grid';
import JetList from './src/Items/List';
import JetEmpty from './src/Items/Empty';
// elements
import JetForm from './src/Elements/Form';
import JetDetail from './src/Elements/Detail';
import JetFinder from './src/Elements/Finder';
import JetSwitch from './src/Elements/Switch';
import JetTabs from './src/Elements/Tabs';
import JetTitle from './src/Elements/Title';
import JetNotifications from './src/Elements/Notifications';
import JetPagination from './src/Elements/Pagination';
import JetDropdown from './src/Elements/Dropdown';
import JetTimestamp from './src/Elements/Timestamp';
import Breadcrumbs from './src/Elements/Breadcrumbs';
import JetFlash from './src/Elements/Flash';
import RelativeDates from './src/Elements/RelativeDates';
// metrics
import CardGroup from "./src/Metrics/CardGroup";
// query
import JetQueryDropdown from './src/Query/Dropdown';
import JetQueryGroup from './src/Query/Group';
import JetQueryRange from './src/Query/Range';
// details
import JetDetailText from './src/Details/Text';
// inputs
import JetPicker from './src/Inputs/Picker';
import JetSelect from './src/Inputs/Select';
import JetTextarea from './src/Inputs/Textarea';
import JetImageInput from './src/Inputs/Image';
import JetFileInput from './src/Inputs/File';
// mixins
import Items from './src/Mixins/Items';
import Connect from './src/Mixins/Connect';
import Filtering from './src/Mixins/Filtering';
import ToggleFilters from './src/Mixins/ToggleFilters';
import ToggleSidebar from './src/Mixins/ToggleSidebar';
import ClickOutside from './src/Mixins/ClickOutside';
import Permissions from './src/Mixins/Permissions';
import GetRoute from './src/Mixins/GetRoute';

import ConnectedComponents from './src/Classses/ConnectedComponents';
import DataWrapper from './src/Classses/DataWrapper';

import vQuery from './src/Directives/v-query/index';

export default {
    install: (app, options) => {
        app.use(vQuery);
        app.use(ClickOutside);
        app.mixin(Permissions);
        app.provide('$connectedComponents', new ConnectedComponents());

        app.provide('config', new DataWrapper(options));
        app.component('jet-pagination', JetPagination);
        app.component('jet-empty', JetEmpty);
    },
};

export {
    SidebarLayout,
    JetTable,
    JetGrid,
    JetList,
    JetForm,
    JetDetail,
    JetFinder,
    JetSwitch,
    JetTitle,
    JetTabs,
    JetDropdown,
    JetQueryDropdown,
    JetQueryGroup,
    JetQueryRange,
    JetNotifications,
    JetPagination,
    JetTimestamp,
    Breadcrumbs,
    JetFlash,
    JetImageInput,
    JetFileInput,
    JetTextarea,
    JetSelect,
    JetPicker,
    RelativeDates,
    // metrics
    CardGroup,
    // details
    JetDetailText,
    // mixins
    ToggleFilters,
    ToggleSidebar,
    Filtering,
    Connect,
    GetRoute,
    Items,
};
