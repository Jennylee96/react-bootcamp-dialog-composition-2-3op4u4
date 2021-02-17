import React from "react";
import ReactDOM from "react-dom";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { left: "25%", top: "25%" },
      bStartDrag: false,
      posbyCursor: {}
    };
    this.dlg = React.createRef();
    this.grab = React.createRef();

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.moving = this.moving.bind(this);
  }

  componentDidUpdate(props, state) {
    if (this.state.bStartDrag && !state.bStartDrag) {
      window.addEventListener("mouseup", this.dragEnd);
      window.addEventListener("mousemove", this.moving);
    } else if (!this.state.bStartDrag && state.bStartDrag) {
      window.removeEventListener("mousemove", this.moving);
      window.removeEventListener("mouseup", this.dragEnd);
    }
  }

  dragStart(e) {
    this.setState({ ...this.state, bStartDrag: true });
    console.log("Moving start");
    this.setState({
      bStartDrag: true,
      posByCursor: { x: e.clientX, y: e.clientY }
    });
  }
  moving(e) {
    if (!this.state.bStartDrag) return;
    console.log("Moving", e.clientX, e.clientY);
    let dX = this.state.posByCursor.x - e.clientX;
    let dY = this.state.posByCursor.y - e.clientY;
    this.setState({
      posByCursor: { x: e.clientX, y: e.clientY }
    });
    if (this.state.bStartDrag) {
      this.setState({
        position: {
          left: this.dlg.current.offsetLeft - dX,
          top: this.dlg.current.offsetTop - dY
        }
      });
    }
  }
  dragEnd(e) {
    console.log("Drag end");
    this.setState({ bStartDrag: false });
  }
  render() {
    const { header, body, footer } = this.props;
    const { position } = this.state;
    const dlgstyle = {
      top: position.top,
      left: position.left
    };

    return ReactDOM.createPortal(
      <div className="dialog" ref={this.dlg} style={dlgstyle}>
        <div
          style={{ cursor: "move", userSelect: "none" }}
          onMouseDown={this.dragStart}
        >
          {header}
        </div>

        {body}

        {footer}
      </div>,
      document.getElementById("dialog")
    );
  }
}

export default Dialog;
