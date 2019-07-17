import React,{Component} from 'react';
import CanvasDraw from './CanvasDraw'

import * as tf from '@tensorflow/tfjs';
import { fromPixels } from '@tensorflow/tfjs-core/dist/ops/browser';

import './TfjsMnist.css';

class MNIST extends Component {
    static defaultProps = {

    }

    state = {
        predict: ''
    }

    componentDidMount = () => {
        this._initModel();
    }

    _predictMNIST = async () => {
        let input = this._getCanvasGrayImageTensor();
        let output = this.model.predict(input);

        const result = output.argMax(1).dataSync()[0];

        this.setState({
            predict: result
        });
    }

    _initModel = async () => {
        this.model = await tf.loadLayersModel('mnistmodel/model.json');
    }

    _getCanvasGrayImageTensor = () => {
        const ctx = this.draw.ctx;
        let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

        let imgTensor = fromPixels(imgData)
            .resizeNearestNeighbor([28, 28])
            .toFloat()
            .mean(2)
            .div(255)
            .reshape([1, 28, 28, 1]);

        return imgTensor;
    }

    render = () => {
        return (
            <div className='mnist-wrapper'>
                <h2 className='mnist-title'>TF-JS MNIST</h2>
                <h2 className='mnist-predict'>
                    {this.state.predict===''?'':"NUMBER IS : " + this.state.predict}
                </h2>
                <div className='mnist-drawbox'>
                    <CanvasDraw 
                        width={200} 
                        height={200} 
                        removeBtnObj="clearBtn"
                        ref = {(ref)=>{this.draw = ref}}
                    />
                </div>
                <div className='mnist-btnBox'>
                    <button id="clearBtn" className="mnist-btn">CLEAR</button>
                    <button className="mnist-btn" onClick={this._predictMNIST}>PREDICT</button>
                </div>
                
            </div>
        )
    }
}

export default MNIST;