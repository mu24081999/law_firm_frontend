import { Routes, Route } from "react-router-dom";
import LawFirmLayout from "../../layouts/LawFirmLayout";
import LawFirmHome from "./Home";
import LawFirmClients from "./Clients";
import LawFirmServices from "./Services";
import LawFirmChat from "./Chat";
import Contacts from "./Contacts";
import Settings from "./Settings";
import Team from "./Team";
import Integration from "./Integrations";
import Template from "./Template";
import TeamChat from "./TeamChat";
import ServiceRequests from "./ServiceRequests";
import PrivateRoute from "../components/PrivateRoute";
import { useSelector } from "react-redux";
import { getLatestValidSubscription } from "../../utils/validarteSubscription";
import Notification from "./Notification";
import BillingInvoicing from "./BillingInvoicing";
import CaseManagement from "./CaseManagement";
import DocumentManagement from "./DocumentManagement";
import LeadsManagement from "./LeadsManagement";
import KanbanWithLeads from "./Leads/KanbanWithLeads";
function Dashboard() {
  const { user, isLoading, isAuthenticated, token } = useSelector(
    (state) => state.auth
  );
  return (
    <>
      {!isLoading && user?.id && (
        <LawFirmLayout>
          <Routes>
            <Route
              path="/leads-management"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  // subscription={}
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <KanbanWithLeads />
                </PrivateRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  // subscription={}
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <BillingInvoicing />
                </PrivateRoute>
              }
            />
            <Route
              path="/case-management"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  // subscription={}
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <CaseManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/document-management"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  // subscription={}
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <DocumentManagement />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/leads-management"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  // subscription={}
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <LeadsManagement />
                </PrivateRoute>
              }
            /> */}
            <Route
              path="/"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  // subscription={}
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <LawFirmHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <Notification />
                </PrivateRoute>
              }
            />
            <Route
              path="/template"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <Template />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <LawFirmClients />
                </PrivateRoute>
              }
            />
            <Route
              path="/services"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <LawFirmServices />
                </PrivateRoute>
              }
            />
            <Route
              path="/service-requests"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <ServiceRequests />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <LawFirmChat />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route
              path="/team"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <Team />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-chat"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <TeamChat />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment-integrations"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isSubscribed={
                    getLatestValidSubscription(user?.subscriptions)?.isValid
                  }
                  subscriptionStatus={
                    getLatestValidSubscription(user?.subscriptions)
                      ?.latestSubscription?.subscriptionReciept?.status ===
                    "confirm"
                      ? "active"
                      : "pending"
                  }
                  emailVerified={user?.verified}
                  loading={isLoading}
                >
                  <Integration />
                </PrivateRoute>
              }
            />
          </Routes>
        </LawFirmLayout>
      )}
    </>
  );
}

export default Dashboard;
