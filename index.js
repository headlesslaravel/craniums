// layouts
import SidebarLayout from "./src/Layouts/SidebarLayout.vue";
// items
import Table from './src/Items/Table.vue';
import Grid from './src/Items/Grid.vue';
import List from './src/Items/List.vue';
import Empty from './src/Items/Empty.vue';
// elements
import Importer from './src/Elements/Importer.vue';
import Seeker from './src/Elements/Seeker.vue';
import Topper from './src/Elements/Topper.vue';
import ItemDots from './src/Elements/ItemDots.vue';
import Form from './src/Elements/Form.vue';
import Detail from './src/Elements/Detail.vue';
import Finder from './src/Elements/Finder.vue';
import Switch from './src/Elements/Switch.vue';
import Tabs from './src/Elements/Tabs.vue';
import Heading from './src/Elements/Heading.vue';
import Notifications from './src/Elements/Notifications.vue';
import Pagination from './src/Elements/Pagination.vue';
import Dropdown from './src/Elements/Dropdown.vue';
import Timestamp from './src/Elements/Timestamp.vue';
import Breadcrumbs from './src/Elements/Breadcrumbs.vue';
import Flash from './src/Elements/Flash.vue';
import DateInterval from './src/Inputs/DateInterval.vue';
// metrics
import Cards from "./src/Cards/Cards.vue";
// query
import QueryDropdown from './src/Query/Dropdown.vue';
import QueryGroup from './src/Query/Group.vue';
import QueryRange from './src/Query/Range.vue';
// details
import DetailText from './src/Details/Text.vue';
// inputs
import Picker from './src/Inputs/Picker.vue';
import Select from './src/Inputs/Select.vue';
import Textarea from './src/Inputs/Textarea.vue';
import ImageInput from './src/Inputs/Image.vue';
import FileInput from './src/Inputs/File.vue';
// mixins
import Headless from './src/Mixins/Headless.js';
import Items from './src/Mixins/Items.js';
import Connect from './src/Mixins/Connect.js';
import Filtering from './src/Mixins/Filtering.js';
import ToggleFilters from './src/Mixins/ToggleFilters.js';
import ToggleSidebar from './src/Mixins/ToggleSidebar.js';
import ClickOutside from './src/Mixins/ClickOutside.js';
import Permissions from './src/Mixins/Permissions.js';
import GetRoute from './src/Mixins/GetRoute.js';

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
        app.component('Pagination', Pagination);
        app.component('Empty', Empty);
    },
};

export {
    SidebarLayout,
    Table,
    Grid,
    List,
    Seeker,
    Topper,
    ItemDots,
    Importer,
    Form,
    Detail,
    Finder,
    Switch,
    Heading,
    Tabs,
    Dropdown,
    QueryDropdown,
    QueryGroup,
    QueryRange,
    Notifications,
    Pagination,
    Timestamp,
    Breadcrumbs,
    Flash,
    ImageInput,
    FileInput,
    Textarea,
    Select,
    Picker,
    DateInterval,
    // metrics
    Cards,
    // details
    DetailText,
    // mixins
    Headless,
    ToggleFilters,
    ToggleSidebar,
    Filtering,
    Connect,
    GetRoute,
    Items,
};
