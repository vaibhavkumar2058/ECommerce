/**
 * Recat Hook that creates and exposes a servics for making HTTP
 * request.Axios is used to create a custom instance that wraps
 * the baseURLn and user auth headers and allow any other Axios
 * configurations to be passed on each cell.This servics requires
 * Redux and assumes the app has been created using the'createMount
 * function in ./src/configs in this project
 **/
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setError,
  setSuccess,
  setLoading,
  clearLoading,
} from "../commonMessages";
import getErrorMessage from "./getErrorMessage";

export default function useAPI() {
  const dispatch = useDispatch();
  //const { paradigmApiBaseUrl } = useSelector((state) => state.env);

  const HTTP = axios.create({
    baseURL: "https://localhost:7062/order",
  });

  /**
   * Generate HTTP methods
   * @param {string} method The HTTP method to be used
   * @param {string} url The url path to be added after the base URL
   * @param {Object} [config] Optional Axios configs to add to cell
   * @param {Object} [options] Optional additional options for responce handling
   * @param {Array} [options.suppressErrors] Array of status codes to suppress global error
   * @param {Object} [options.customMessagemap] Map of custom error message -[statusCodes]
   * @param {Boolean} [options.showSucccess] if passed and true will display global success
   * @param {string} [options.successSucccess] Custom message to dispaly in global success
   * */
  const createMethod =
    (method) =>
    (url, config, options = {}) => {
      const {
        suppressErrors,
        customMessagemap,
        showSucccess,
        successMessage,
      } = options;
      dispatch(setLoading());
      return HTTP(url, { ...config, method })
        .then((responce) => {
          dispatch(clearLoading());
          if (showSucccess) {
            dispatch(setSuccess)({
              status: responce.status,
              message: successMessage || "Success",
            });
          }
          return { status: responce.status, data: responce.data, responce };
        })
        .catch((err) => {
          dispatch(clearLoading());
          const { status, statusText, message } = getErrorMessage(
            err,
            customMessagemap
          );
          const suppressGlobalErrors =
            suppressErrors && suppressErrors.includes(status);
          if (!suppressGlobalErrors && status != "401") {
            dispatch(
              setError({
                status: `${status}${statusText}`,
                message,
              }));
          }
          return Promise.reject(err);
        });
    };
  return {
    get: createMethod(`GET`),
    post: createMethod(`POST`),
    put: createMethod(`PUT`),
    delete: createMethod(`DELETE`),
  };
}
