import React, {Component} from 'react';
import './CanvasDraw.css'

class CanvasDraw extends Component  {
    pos = {X:-1, Y: -1};
    drawable = false;

    static defaultProps = {
        width: 300,
        height: 300,
        removeBtnObj: null,
        lineWidth: 10,
        color: '#444444'
    }

    componentDidMount = () => {
        this.canvas = document.getElementById("canvasDraw");
        this.ctx = this.canvas.getContext("2d");

        this.ctx.lineWidth = this.props.lineWidth;
        this.ctx.strokeStyle = this.props.color;

        this.canvas.addEventListener("mousedown", this._listener);
        this.canvas.addEventListener("mousemove", this._listener);
        this.canvas.addEventListener("mouseout",  this._listener);
        this.canvas.addEventListener("mouseup",   this._listener);

        if(this.props.removeBtnObj) {
            const clearBtn = document.getElementById(this.props.removeBtnObj);
            clearBtn.addEventListener("click", this._clear);
        }
    }

    _listener = (event) => {
        switch(event.type) {
            case "mousedown":
                this._initDraw(event);
                break;
            case "mousemove":
                if(this.drawable)
                    this._draw(event);
                break;
            case "mouseout":
            case "mouseup":
                this._finishDraw();
                break;
        }
    }

    _initDraw = (event) => {
        this.ctx.beginPath();
        this.drawable = true;
        this.pos = this._getPosition(event);

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.moveTo(this.pos.X, this.pos.Y);
    }

    _draw = (event) => {
        this.pos = this._getPosition(event);
        this.ctx.lineTo(this.pos.X, this.pos.Y);
        
        this.ctx.stroke();
    }

    _finishDraw = () => {
        this.drawable = false;
        this.pos.X = -1;
        this.pos.Y = -1;
    }

    _getPosition = (event) => {
        let x = event.pageX - this.canvas.offsetLeft;
        let y = event.pageY - this.canvas.offsetTop;
        
        return {X: x, Y: y};
    }

    _clear = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
    }

    render = () => {
        return (
            <canvas className="canvas-draw" id="canvasDraw" width={this.props.width} height={this.props.height}>
            </canvas>
        )
    }
}

export default CanvasDraw;