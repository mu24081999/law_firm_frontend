import { combineReducers } from "redux";
import authReducer from "./slices/auth";
import serviceReducer from "./slices/service";
import profileReducer from "./slices/profile";
import invitationReducer from "./slices/invitation";
import teamReducer from "./slices/team";
import chatReducer from "./slices/chat";
import websiteReducer from "./slices/website";
import analyticsReducer from "./slices/analytics";
import subscriptionReducer from "./slices/subscription";
import userReducer from "./slices/users";
import firmReducer from "./slices/firm";
import domainReducer from "./slices/domain";
import templateReducer from "./slices/template";
import lawFirmReducer from "./slices/lawfirm";
import emailAccountReducer from "./slices/emailAccount";
import emailTemplateReducer from "./slices/emailTemplate";
import bankAccountReducer from "./slices/bankAccount";
import billingInvoiceReducer from "./slices/billingInvoice";

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  invitation: invitationReducer,
  team: teamReducer,
  chat: chatReducer,
  website: websiteReducer,
  analytics: analyticsReducer,
  subscription: subscriptionReducer,
  user: userReducer,
  service: serviceReducer,
  firm: firmReducer,
  domain: domainReducer,
  template: templateReducer,
  lawfirm: lawFirmReducer,
  emailAccount: emailAccountReducer,
  emailTemplate: emailTemplateReducer,
  bankAccount: bankAccountReducer,
  billing: billingInvoiceReducer,
});
