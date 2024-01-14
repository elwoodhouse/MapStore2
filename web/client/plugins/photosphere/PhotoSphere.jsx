import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createPlugin } from "../../utils/PluginsUtils";
import Message from "../../components/I18N/Message";
import { Glyphicon } from "react-bootstrap";
import { CONTROL_NAME } from "./constants";
import PhotoSphereContainer from "./containers/PhotoSphereContainer";
import { togglePhotoSphere, configure, reset } from "./actions/photoSphere";
import "./css/style.css";

const PhotoSpherePluginComponent = ({ onMount, onUnmount }) => {
    useEffect(() => {
        onMount();
        return () => {
            onUnmount();
        };
    }, []);
    return <PhotoSphereContainer />;
};

const PhotoSpherePluginContainer = connect(() => ({}), {
    onMount: configure,
    onUnmount: reset
})(PhotoSpherePluginComponent);

export default createPlugin("PhotoSphere", {
    options: {
        disablePluginIf: "{state('mapType') === 'leaflet' || state('mapType') === 'cesium'}"
    },
    // epics,
    // reducers: {
    //     streetView
    // },
    component: PhotoSpherePluginContainer,
    containers: {
        BurgerMenu: {
            position: 50,
            priority: 2,
            doNotHide: true,
            name: CONTROL_NAME,
            text: <Message msgId="photoSphere.title" />,
            tooltip: "photoSphere.tooltip",
            icon: <Glyphicon glyph="road" />,
            action: () => togglePhotoSphere()
        },
        SidebarMenu: {
            position: 50,
            priority: 1,
            doNotHide: true,
            name: CONTROL_NAME,
            text: <Message msgId="photoSphere.title" />,
            tooltip: "photoSphere.tooltip",
            icon: <Glyphicon glyph="road" />,
            action: () => togglePhotoSphere(),
            selector: state => {
                return {
                    bsStyle: state.controls["photo-sphere"] && state.controls["photo-sphere"].enabled ? "primary" : "tray",
                    active: (state.controls["photo-sphere"] && state.controls["photo-sphere"].enabled) || false
                };
            }
        }
    }
});
