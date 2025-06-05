import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { SignUp } from "./Pages/SignUpAdmin";
import { SignIn } from "./Pages/SignInAdmin";
import { DashboardPage } from "./Pages/DashboardPage";
import { ListUser } from "./Pages/Members/User/ListUser";
import { AddNewUser } from "./Pages/Members/User/AddNewUser";
import { ListProvider } from "./Pages/Members/Provider/ListProvider";
import { AddNewProvider } from "./Pages/Members/Provider/AddNewProvider";
import { EditUser } from "./Pages/Members/User/EditUser";
import { EditProvider } from "./Pages/Members/Provider/EditProvider";
import DocumentsAndServiceAllocation from "./Pages/Members/Provider/DocumentsAndServiceAllocation";
import ListServiceType from "./Pages/General/ListServiceType";
import AddServiceType from "./Pages/General/AddServiceType";
import EditService from "./Pages/General/EditService";
import UserRequestHistory from "./Pages/Members/User/UserRequestHistory";
import ProviderRequestHistory from "./Pages/Members/Provider/ProviderRequestHistory";
import ServicesHistory from "./Pages/Services/ServicesHistory";
import ScheduleServiceHistory from "./Pages/Services/ScheduleServiceHistory";
import ChangePassword from "./Pages/Account/ChangePassword";
import AccountSettings from "./Pages/Account/AccountSettings";
import Logout from "./Pages/Account/Logout";
import ListDocuments from "./Pages/General/Documents/ListDocuments";
import AddDocuments from "./Pages/General/Documents/AddDocuments";
import EditDocuments from "./Pages/General/Documents/EditDocuments";
import { SiteSettings } from "./Pages/Settings/SiteSettings";
import FaviconUpdater from "./Components/FaviconUpdater";
import OverallServiceStatements from "./Pages/Statements/OverallServiceStatements";
import ProviderStatements from "./Pages/Statements/ProviderStatements";
import DailyStatement from "./Pages/Statements/DailyStatement";
import MonthlyStatement from "./Pages/Statements/MonthlyStatement";
import YearlyStatement from "./Pages/Statements/YearlyStatement";
import Rating from "./Pages/Details/Rating";
import Map from "./Pages/Details/Map";

function App() {
  return (
    <div className="App">
      <FaviconUpdater />
      <Routes>
        <Route path="/admin/signup" element={<SignUp />} />
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        {/* USERS  */}
        <Route path="/admin/user" element={<ListUser />} />
        <Route path="/admin/user/create" element={<AddNewUser />} />
        <Route path="/admin/user/:id/edit" element={<EditUser />} />
        <Route
          path="/admin/user/:id/request"
          element={<UserRequestHistory />}
        />
        {/* PROVIDERS  */}
        <Route path="/admin/provider" element={<ListProvider />} />
        <Route path="/admin/provider/create" element={<AddNewProvider />} />
        <Route path="/admin/provider/:id/edit" element={<EditProvider />} />
        <Route
          path="/admin/provider/:id/request"
          element={<ProviderRequestHistory />}
        />
        <Route
          path="/admin/provider/:id/document"
          element={<DocumentsAndServiceAllocation />}
        />

        {/* General */}
        {/* Service Types */}
        <Route path="/admin/service" element={<ListServiceType />} />
        <Route path="/admin/service/create" element={<AddServiceType />} />
        <Route path="/admin/service/:id/edit" element={<EditService />} />
        {/* Documents */}
        <Route path="/admin/documents" element={<ListDocuments />} />
        <Route path="/admin/documents/create" element={<AddDocuments />} />
        <Route path="/admin/documents/:id/edit" element={<EditDocuments />} />

        {/* Services */}
        {/* ServicesHistory */}
        <Route path="/admin/request" element={<ServicesHistory />} />
        <Route
          path="/admin/scheduled/request"
          element={<ScheduleServiceHistory />}
        />

        {/* Account */}
        {/* AccountSettings */}
        <Route path="/admin/profile/edit" element={<AccountSettings />} />
        <Route path="/admin/password" element={<ChangePassword />} />
        <Route path="/admin/logout" element={<Logout />} />

        {/* Settings */}
        {/* Site Settings */}
        <Route path="/admin/setting" element={<SiteSettings />} />

        {/* Statements */}
        {/* OverallServiceStatements */}
        <Route path="/admin/statement" element={<OverallServiceStatements />} />
        {/* ProviderStatements */}
        <Route path="/admin/statement/provider" element={<ProviderStatements />} />
        {/* DailyStatement */}
        <Route path="/admin/statement/today" element={<DailyStatement />} />
        {/* MonthlyStatement */}
        <Route path="/admin/statement/monthly" element={<MonthlyStatement />} />
        {/* YearlyStatement */}
        <Route path="/admin/statement/yearly" element={<YearlyStatement />} />

        {/* Details  */}
        {/* Rating  */}
        <Route path="/admin/ratings" element={<Rating />} />
        {/* Provider Location  */}
        <Route path="/admin/location" element={<Map />} />

      </Routes>
    </div>
  );
}

export default App;
