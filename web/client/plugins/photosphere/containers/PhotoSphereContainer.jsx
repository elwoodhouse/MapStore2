import React, { useState } from "react";
import { connect } from "react-redux";
import { Glyphicon } from "react-bootstrap";
import { createStructuredSelector } from "reselect";

import Message from "../../../components/I18N/Message";
import Dialog from "../../../components/misc/Dialog";
import { Resizable } from "react-resizable";

import { enabledSelector } from "../selectors/photoSphere";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { togglePhotoSphere } from "../actions/photoSphere";

/**
 * Main panel of PhotoSphere Plugin.
 * @param {*} param0
 * @returns
 */
function Panel({ enabled, onClose = () => {} }) {
    const margin = 7;
    const [size, setSize] = useState({ width: 400, height: 300 });
    if (!enabled) {
        return null;
    }
    return (
        <Dialog
            bodyClassName={"photo-sphere-window-body"}
            draggable
            style={{
                zIndex: 10000,
                position: "absolute",
                left: "17%",
                top: "50px",
                margin: 0,
                width: size.width
            }}
        >
            <span role="header" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                    <Message msgId={"photoSphere.title"} />
                </span>
                <button onClick={() => onClose()} className="close">
                    <Glyphicon glyph="1-close" />
                </button>
            </span>
            <div role="body" style={{ height: size.height }}>
                <Resizable
                    width={size.width}
                    height={size.height}
                    onResize={(event, { size: newSize }) => {
                        setSize(newSize);
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: size.height
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                margin: margin,
                                height: `calc(100% - ${2 * margin}px)`,
                                width: `calc(100% - ${2 * margin}px)`
                            }}
                        >
                            <ReactPhotoSphereViewer
                                src="http://ec2-18-213-192-224.compute-1.amazonaws.com:8080/geoserver/www/test_360_photo.jpg"
                                height="100%"
                                width="100%"
                                containerClass="photo-sphere-view"
                            />
                        </div>
                    </div>
                </Resizable>
            </div>
        </Dialog>
    );
}

const PSPanel = connect(
    createStructuredSelector({
        enabled: enabledSelector
    }),
    {
        onClose: () => togglePhotoSphere()
    }
)(Panel);

export default PSPanel;
