import React, {Component} from 'react';
import Proptypes from 'prop-types'
/** https://github.com/google-map-react/google-map-react */
import GoogleMapReact from 'google-map-react'
import './GoogleMap.css'
const Marker = ({text}) => {
    return (
        <div className="marker">
            <div className="marker-text">
                {text}
            </div>
        </div>
    )
}

class GoogleMap extends Component{
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11,
        markers: [],
    };
    state = {

    }

    render() {
        return (
            <div className="map-wrapper">
                <h1 className="map-title"> GoogleMap Demo </h1>
                <div className="map-body">
                    <GoogleMapReact
                        bootstrapURLKeys={{key:"GOOGLE MAP KEY"}}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {this.props.markers}
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

GoogleMap.propTypes = {
    center: Proptypes.number,
    zoom: Proptypes.number,
    markers: Proptypes.array,
    layerType: Proptypes.array,
}

export {
    GoogleMap,
    Marker,
};