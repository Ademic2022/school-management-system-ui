import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { USER_ENDPOINTS } from "../../apiCalls/endpoints";
import requestHandler from "../../apiCalls/requestHandler";
import { contextInitialState } from "../Reducer/states/initialStates";
import { contextStateReducer } from "../Reducer/contextReducer";
import ACTIONS from "../Reducer/actions";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    contextStateReducer,
    contextInitialState
  );
  const navigate = useNavigate();
  const location = useLocation();
  // Token the user was last fetched for, so navigation doesn't refetch the same user
  const fetchedToken = useRef(undefined);

  const fetchUserImages = async (userId) => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      const storedImage = localStorage.getItem("userImage");
      const storedThumbnail = localStorage.getItem("thumbnail");

      if (storedImage && storedThumbnail) {
        dispatch({
          type: ACTIONS.SET_PROFILE_IMAGE,
          payload: {
            image: storedImage,
            thumbnail: storedThumbnail,
          },
        });
      } else {
        const fetchedData = await requestHandler(
          "get",
          USER_ENDPOINTS.PROFILE_IMAGE(userId)
        );

        if (fetchedData[0] && fetchedData[0].length > 0) {
          const { image, thumbnail } = fetchedData[0][0];

          localStorage.setItem("userImage", image);
          localStorage.setItem("thumbnail", thumbnail);

          dispatch({
            type: ACTIONS.SET_PROFILE_IMAGE,
            payload: {
              image: image,
              thumbnail: thumbnail,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user images:", error.message);
    }
  };

  const fetchNotifications = async (userId) => {
    try {
      const fetchedData = await requestHandler(
        "get",
        USER_ENDPOINTS.NOTIFICATIONS(userId)
      );
      if (fetchedData[0]) {
        dispatch({ type: ACTIONS.SET_NOTIFICATIONS, payload: fetchedData[0] });
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    /*
      The useEffect hook is responsible for fetching the authenticated user information
      when the component mounts. It uses the location object to determine the current route
      and excludes certain routes (e.g., login, success, reset_password) from triggering the
      authentication fetch.

      Within the try block, it attempts to fetch the authenticated user using the
      athenticatedUser function. If successful, it sets the user information, authentication
      status, and user role using setUser, setAuth, and setRole, respectively. If the user
      fetch is unsuccessful, it calls setUserContext with null values, clears the localStorage,
      and navigates to the login page unless the current route is excluded.

      In case of an error during the fetch, it logs an error message to the console.

      The useEffect runs when the route changes, but skips the fetch if the user has
      already been fetched for the current token.
    */
    const fetchAuthenticatedUser = async () => {
      try {
        const currentRoute = location.pathname;
        const excludedRoutes = [
          "/login",
          "/success",
          "/reset_password",
          /^\/activation\//,
        ];

        const isRouteExcluded = (route) => {
          return excludedRoutes.some((excludedRoute) => {
            if (excludedRoute instanceof RegExp) {
              return excludedRoute.test(route);
            } else {
              return excludedRoute === route || route.startsWith(excludedRoute);
            }
          });
        };

        const isExcluded = isRouteExcluded(currentRoute);

        const token = localStorage.getItem("token");
        if (!isExcluded && (!state.auth || token !== fetchedToken.current)) {
          const getUser = await requestHandler(
            "get",
            USER_ENDPOINTS.AUTHENTICATED_USER
          );

          if (getUser[0] !== null) {
            fetchedToken.current = token;
            const storedImage = localStorage.getItem("userImage");
            const storedThumbnail = localStorage.getItem("thumbnail");
            fetchNotifications(getUser[0].id);
            if (storedImage && storedThumbnail) {
              dispatch({
                type: ACTIONS.SET_PROFILE_IMAGE,
                payload: {
                  image: storedImage,
                  thumbnail: storedThumbnail,
                },
              });
            } else {
              fetchUserImages(getUser[0].id);
            }

            dispatch({
              type: ACTIONS.SET_USER_DATA,
              payload: {
                userData: { ...getUser[0] },
                authStatus: true,
                UserRole: getUser[0].role,
                isApproved: getUser[0].is_approved,
                role: getUser[0].role,
              },
            });
          } else {
            fetchedToken.current = undefined;
            setUserContext(null, false, null);
            localStorage.clear();

            if (!isExcluded) {
              navigate("/login");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
      }
    };

    fetchAuthenticatedUser();
  }, [navigate, location.pathname, dispatch, state.auth]);

  const setUserContext = (userData, authStatus, UserRole) => {
    /*
      The setUserContext function is a utility function within the UserProvider component.
      It takes four parameters - userData, authStatus, UserRole, and userSubjects - and updates
      the corresponding state variables: userData updates the user information,
      authStatus updates the authentication status, and UserRole updates the user role.
      This function ensures a synchronized update of multiple state variables related
      to user context in the application. If all parameters are falsy (null, undefined, false, etc.),
      it triggers a reset action by dispatching ACTIONS.RESET_STATE; otherwise, it updates the state
      with the new data.
    */
    if (!userData && !authStatus && !UserRole) {
      // Reset the state
      dispatch({ type: ACTIONS.RESET_STATE });
    } else {
      dispatch({
        type: ACTIONS.SET_USER_CONTEXT,
        payload: {
          userData,
          authStatus,
          UserRole,
        },
      });
    }
  };

  const setAuthStatus = (newAuthStatus) => {
    dispatch({
      type: ACTIONS.SET_AUTH_STATUS,
      payload: newAuthStatus,
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setUserContext,
      setAuthStatus,
      setRole: (role) => dispatch({ type: ACTIONS.SET_ROLE, payload: role }),
      setProfileImage: (image) =>
        dispatch({ type: ACTIONS.SET_PROFILE_IMAGE, payload: image }),
      setUserStatus: (status) =>
        dispatch({ type: ACTIONS.SET_USER_STATUS, payload: status }),
      setNotifications: (notifications) =>
        dispatch({ type: ACTIONS.SET_NOTIFICATIONS, payload: notifications }),
    }),
    // setUserContext and setAuthStatus only use the stable dispatch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  /*
    The useUser hook is a custom hook that utilizes the useContext hook to access the
    UserContext provided by the UserProvider. It retrieves the context, and if it's not
    available, it throws an error indicating that useUser must be used within a UserProvider.
    If the context is available, it returns the context, providing a convenient way to access
    user-related information throughout the application.
  */
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
