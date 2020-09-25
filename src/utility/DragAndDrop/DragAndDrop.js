import React, { Component } from "react";

class DragAndDrop extends Component {
    dropRef = React.createRef();

    state = {
        drag: false
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ drag: true })
        }
    }
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({ drag: false })
        }
    }

    handleDrop = (e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: false })
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log(e.dataTransfer.files);
            this.props.handleDrop(e.dataTransfer.files[0]);
            // e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    }

    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);

    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }

    render() {
        return (
            <div ref={this.dropRef}>
                {this.props.children}
            </div>
        )
    }
};

export default DragAndDrop