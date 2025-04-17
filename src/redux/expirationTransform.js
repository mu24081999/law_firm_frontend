export default function createExpirationTransaform(expireTime) {
  return {
    in: (state) => {
      return {
        ...state,
        _persistExpiresAt: Date.now() + expireTime,
      };
    },
    out: (state) => {
      if (state._persistExpiresAt && state._persistExpiresAt < Date.now()) {
        return {
          isLoading: false,
          user: {},
          user_id: "",
          message: "",
          error: "",
          token: "",
          type: "",
          isAuthenticated: false,
          isAdmin: false,
        };
      }
      return state;
    },
  };
}
