import MainProvider from "./Main/MainProvider";
import SocketProvider from "./SocketContext/SocketProvider";
import PropTypes from "prop-types";
const AppProviders = ({ children }) => {
  return (
    <MainProvider>
      <SocketProvider>{children}</SocketProvider>
    </MainProvider>
  );
};
AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProviders;
