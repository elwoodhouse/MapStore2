import { toggleControl } from "../../../actions/controls";
import { CONTROL_NAME } from "../constants";
export const TOGGLE_PHOTO_SPHERE = "PHOTO_SPHERE:TOGGLE";
export const CONFIGURE = "PHOTO_SPHERE:CONFIGURE";
export const RESET = "PHOTO_SPHERE:RESET";

export function togglePhotoSphere() {
    return (dispatch) => {
        dispatch(toggleControl(CONTROL_NAME, "enabled"));
    };
}

export function configure(configuration) {
    return {
        type: CONFIGURE,
        configuration
    };
}
/**
 * Resets the plugin on unmount
 */
export function reset() {
    return {
        type: RESET
    };
}
