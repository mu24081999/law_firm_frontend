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
});
