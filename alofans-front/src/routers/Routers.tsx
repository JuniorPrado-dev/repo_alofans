import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import WalletPage from "@/pages/ProfilePage/WalletePage";
import EventsPage from "@/pages/EventsPage";
import LayoutDashBoard from "@/components/LayoutDashBooard";
import EditPage from "@/pages/ProfilePage/EditPage";
import TermsPage from "@/pages/ProfilePage/TermsPage";
import AboutPage from "@/pages/ProfilePage/AboutPage";
import HelpPage from "@/pages/ProfilePage/HelpPage";
import DeletePage from "@/pages/ProfilePage/DeletePage";
import ExitPage from "@/pages/ProfilePage/ExitPage";
import LayoutProfile from "@/pages/ProfilePage/layout";
import LoginPage from "../pages/LoginPage";
import UserRegistrationPage from "../pages/UserRegistrationPage";
import AloPage from "@/pages/AloPage";
import AloSummaryPage from "@/pages/AloPage/AloSummaryPage";
import SendAloPage from "@/pages/AloPage/SendAloPage";
import LayoutEvents from "@/pages/EventsPage/layout";
import EventDetail from "@/pages/EventsPage/EventDetailPage";
import LayoutAlo from "@/pages/AloPage/layout";
import PixPaymentPage from "@/pages/AloPage/PixPaymentPage";
import AddEvent from "@/pages/EventsPage/AddEventPage";
import ProfessionalRegisterPage from "@/pages/ProfessionalRegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import AloManager from "@/pages/AloPage/AloManager";
import AdvertisePage from "@/pages/AdvertisePage";
import NotFound from "@/pages/NotFound";
import PromoteAlo from "@/pages/EventsPage/PromotePage";
import EventEditPage from "@/pages/EventsPage/EventEditPage";
import EditAloOferta from "@/pages/EventsPage/EditAloOferta";
import WithoutAuthorization from "@/pages/WithoutAuthorization";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDashBoard />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="alos" element={<AloPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="/withoutAuthorization"
          element={<WithoutAuthorization />}
        />

        <Route path="/login" element={<LoginPage />}>
          {" "}
        </Route>
        <Route path="/register" element={<UserRegistrationPage />}>
          {" "}
        </Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}>
          {" "}
        </Route>
        <Route
          path="/register/professional"
          element={<ProfessionalRegisterPage />}
        >
          {" "}
        </Route>
        <Route path="/advertise" element={<AdvertisePage />}>
          {" "}
        </Route>

        <Route path="/events" element={<LayoutEvents />}>
          <Route path="edit" element={<EventEditPage />} />
          <Route path="detail" element={<EventDetail />} />
          <Route path="add" element={<AddEvent />} />
        </Route>

        <Route path="/profile" element={<LayoutProfile />}>
          <Route path="wallet" element={<WalletPage />} />
          <Route path="edit" element={<EditPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="delete" element={<DeletePage />} />
          <Route path="exit" element={<ExitPage />} />
        </Route>

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/alos" element={<LayoutAlo />}>
          <Route path="edit-offer" element={<EditAloOferta />} />
          <Route path="promote-alo" element={<PromoteAlo />} />
          <Route path="sendalo" element={<SendAloPage />} />
          <Route path="alo-summary" element={<AloSummaryPage />} />
          <Route path="pix-payment" element={<PixPaymentPage />} />
          <Route path="manager" element={<AloManager />} />
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
