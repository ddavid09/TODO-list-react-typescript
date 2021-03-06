import React, { Component } from 'react'
import { TaskModel } from '../models/TaskModel';
import '../App.css';
import CancelImg from '../resources/cancel.png'
import MarkUpImg from '../resources/checked.png'
import BackImg from '../resources/back.png'

interface ITaskState {
    done: boolean;
    isMouseInside: boolean;
}

interface TaskComponentProps extends TaskModel {
    markAsDoneFunc: (id: number) => void;
    deleteTask: (id: number) => void;
    backTask: (id: number) => void;
}
export class Task extends Component<TaskComponentProps, ITaskState> {
    state: ITaskState;

    constructor(props: TaskComponentProps) {
        super(props);

        this.state = { done: this.props.done, isMouseInside: false };
    }

    markUp = () => {
        this.setState({
            done: true
        })
        this.props.markAsDoneFunc(this.props.id);
    }

    delete = () => {
        this.props.deleteTask(this.props.id);
    }

    back = () => {
        this.setState({
            done: false
        })
        this.props.backTask(this.props.id);
    }



    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    mouseLeave = () => {
        this.setState({ isMouseInside: false });
    }


    render() {
        let color: string;
        let text: any;
        let textColor: string;
        if (this.state.done) {
            color = '#ababa6';
            text = <s>{this.props.text}</s>;
            textColor = "#696964";
        }
        else {
            color = '#ffff61';
            text = this.props.text;
            textColor = "#000000";
        }


        return (
            <div
                className='taskbtn'
                style={{ backgroundColor: color, color: textColor }}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                {this.state.isMouseInside ?
                    <div className='taskbtn-overlay'>
                        <button onClick={this.delete} className='overlay-button-delete'><img src={CancelImg} alt="DELETE" /></button>
                        {this.state.done ? <button onClick={this.back} className='overlay-button-mark'><img src={BackImg} alt="BACK" /></button> :
                            <button onClick={this.markUp} className='overlay-button-mark'><img src={MarkUpImg} alt="MARK UP" /></button>}

                    </div> : null}
                <p>{text}</p>
            </div>
        )

    }
}

export default Task
