import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Home } from "./Pages/Home";
import { NoPage } from "./Pages/NoPage";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { ResetPass } from "./Pages/ResetPassword";
import { SignUpProvider } from "./Pages/SignUpProvider";
import { SignInProvider } from "./Pages/SignInProvider";
import { ResetPassProvider } from "./Pages/ResetPassProvider";
import { MyRequest } from "./Pages/UserDashboard/MyRequest";
import { Profile } from "./Pages/UserDashboard/Profile";
import { ChangePassword } from "./Pages/UserDashboard/ChangePassword";
import { Payment } from "./Pages/UserDashboard/Payment";
import { Promotion } from "./Pages/UserDashboard/Promotion";
import { UpComingRequest } from "./Pages/UserDashboard/UpComingRequest";
import { MyWallet } from "./Pages/UserDashboard/MyWallet";
import { LogOut } from "./Pages/UserDashboard/LogOut";
import { DashboardPage } from "./Pages/UserDashboard/DashboardPage";
import { EmailForgotPage } from "./Pages/EmailForgotPage";
import { EmailForgotPageProvider } from "./Pages/EmailForgotPageProvider";
import { ProfileEdit } from "./Pages/UserDashboard/ProfileEdit";
import { DashboardPageProvider } from "./Pages/ProviderDashboard/DashboardPage";
import { PartnerEarningPage } from "./Pages/ProviderDashboard/PartnerEarningPage";
import { ServiceRequest } from "./Pages/ProviderDashboard/Services/ServiceRequest";
import { ProfileProvider } from "./Pages/ProviderDashboard/ProfileNavbar";
import { ChangePasswordProvider } from "./Pages/ProviderDashboard/ChangePassword";
// import { UpComingPage } from "./Pages/ProviderDashboard/UpComingPage";
import { ManageDocument } from "./Pages/ProviderDashboard/ManageDocument";
import { UpdateLocation } from "./Pages/ProviderDashboard/UpdateLocation";
import { PrivateRoute } from "./Components/PrivateRoute";
import { PrivateRouteProvider } from "./Components/PrivateRouteProvider";
import { Practice } from "./Pages/Practice";
import { EmailBody } from "./Pages/EmailBody";
import { ProfileContent } from "./Pages/ProviderDashboard/ProfileContent";
import { UploadDocument } from "./Pages/ProviderDashboard/UploadDocument";
import FaviconUpdater from "./Components/FaviconUpdater";
import { AccepetService } from "./Pages/ProviderDashboard/Services/AccepetService";
import { ComplatedService } from "./Pages/ProviderDashboard/Services/ComplatedService";
import { CancelledService } from "./Pages/ProviderDashboard/Services/CancelledService";

function App() {
  return (
    <div className="App">
       <FaviconUpdater />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/forgotpassword" element={<ResetPass />} />
        {/* <Route path='/user/dashboard' element={<PrivateRoute><DashboardPage /></PrivateRoute>}/> */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/myrequest"
          element={
            <PrivateRoute>
              <MyRequest />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/profile/edit"
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/promotion"
          element={
            <PrivateRoute>
              <Promotion />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/request"
          element={
            <PrivateRoute>
              <UpComingRequest />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/wallet"
          element={
            <PrivateRoute>
              <MyWallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/logout"
          element={
            <PrivateRoute>
              <LogOut />
            </PrivateRoute>
          }
        />
        {/* <Route path="/practice" element={<Practice />} /> */}

        <Route path="/user/changepassword/:id" element={<EmailForgotPage />} />
        {/* <Route path="/user/resetpassword/:token" element={<EmailBody />} /> */}

        {/*----------------------------------------- Provider Routers start hear --------------------------------------------------- */}

        <Route path="/provider/signin" element={<SignInProvider />} />
        <Route path="/provider/signup" element={<SignUpProvider />} />
        <Route
          path="/provider/forgotpassword"
          element={<ResetPassProvider />}
        />
        <Route
          path="/provider/changepassword/:id"
          element={<EmailForgotPageProvider />}
        />
        <Route
          path="/provider/dashboard"
          element={
            <PrivateRouteProvider>
              <DashboardPageProvider />
            </PrivateRouteProvider>
          }
        />
        {/* <Route path='/provider/dashboard' element={<DashboardPageProvider />}/> */}

        <Route
          path="/provider/earning"
          element={
            <PrivateRouteProvider>
              <PartnerEarningPage />
            </PrivateRouteProvider>
          }
        />
        {/* <Route
          path="/provider/upcoming"
          element={
            <PrivateRouteProvider>
              <UpComingPage />
            </PrivateRouteProvider>
          }
        /> */}
        <Route
          path="/provider/request"
          element={
            <PrivateRouteProvider>
              <ServiceRequest />
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/accepet-request"
          element={
            <PrivateRouteProvider>
              <AccepetService />
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/complated-request"
          element={
            <PrivateRouteProvider>
              <ComplatedService/>
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/cancelled-request"
          element={
            <PrivateRouteProvider>
              <CancelledService/>
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/profile"
          element={
            // <PrivateRouteProvider>
            //   <ProfileProvider />
            // </PrivateRouteProvider>
            <PrivateRouteProvider>
              <ProfileContent/>
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/upload-document"
          element={
            <PrivateRouteProvider>
              <UploadDocument />
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/document"
          element={
            <PrivateRouteProvider>
              <ManageDocument />
            </PrivateRouteProvider>
          }
        />
        <Route
          path="/provider/location"
          element={
            <PrivateRouteProvider>
              <UpdateLocation />
            </PrivateRouteProvider>
          }
        />

        <Route
          path="/provider/changepassword"
          element={
            <PrivateRouteProvider>
              <ChangePasswordProvider />
            </PrivateRouteProvider>
          }
        />

        <Route path="/*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
