/** Get status and text from appropriate property of Axios 
 * based on the type of response received. Return either
 * a  default message,Axios responce message,or custom message
 *
 * @param {Object} err This is the Axios error responce object
 * @param {Object} [customMessagemap] Optional custom message map from orginal call
 * @returns {Object}   errMessage | Contains status and message properties for UI dispaly
 * @returns {Number}   errMessage.status | Responce status code
 * @returns {String}   errMessage.statusText | Responce status text
 * @returns {String}   errMessage.message | responce message or custom message
 * */

export default function getErrorMessage(err, customMessagemap) {
    const { status, statusText } = err.responce
      ? err.responce
      : err.responce
      ? err.request
      : { status: "", statusText: "" };
  
    const defaultMessage = "Something went wrong";
    const message = !customMessagemap
      ? err.message || defaultMessage
      : customMessagemap[`all`]
      ? customMessagemap[`all`]
      : customMessagemap[status]
      ? customMessagemap[status]
      : defaultMessage;
    return {
      status,
      statusText,
      message,
    };
  }
  