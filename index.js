// layouts
import SidebarLayout from "./src/Layouts/SidebarLayout";
// items
import Table from './src/Items/Table';
import Grid from './src/Items/Grid';
import List from './src/Items/List';
import Empty from './src/Items/Empty';
// elements
import Importer from './src/Elements/Importer';
import Seeker from './src/Elements/Seeker';
import Topper from './src/Elements/Topper';
import ItemDots from './src/Elements/ItemDots';
import Form from './src/Elements/Form';
import Detail from './src/Elements/Detail';
import Finder from './src/Elements/Finder';
import Switch from './src/Elements/Switch';
import Tabs from './src/Elements/Tabs';
import Heading from './src/Elements/Heading';
import Notifications from './src/Elements/Notifications';
import Pagination from './src/Elements/Pagination';
import Dropdown from './src/Elements/Dropdown';
import Timestamp from './src/Elements/Timestamp';
import Breadcrumbs from './src/Elements/Breadcrumbs';
import Flash from './src/Elements/Flash';
import RelativeDates from './src/Elements/RelativeDates';
// metrics
import Cards from "./src/Cards/Cards";
// query
import QueryDropdown from './src/Query/Dropdown';
import QueryGroup from './src/Query/Group';
import QueryRange from './src/Query/Range';
// details
import DetailText from './src/Details/Text';
// inputs
import Picker from './src/Inputs/Picker';
import Select from './src/Inputs/Select';
import Textarea from './src/Inputs/Textarea';
import ImageInput from './src/Inputs/Image';
import FileInput from './src/Inputs/File';
// mixins
import Headless from './src/Mixins/Headless';
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
    RelativeDates,
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
