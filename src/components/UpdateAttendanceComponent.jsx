import React, { Component } from 'react'
import AttendanceService from '../services/AttendanceService';

class UpdateAttendanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            emp_id: '',
            checkin: '',
            checkout: '',
            total_working_hours: '' 
        }
        this.changeEmpIdHandler = this.changeEmpIdHandler.bind(this);
        this.changeCheckinHandler = this.changeCheckinHandler.bind(this);
        this.changeCheckoutHandler = this.changeCheckoutHandler.bind(this);
        this.changeTotalHoursHandler = this.changeTotalHoursHandler.bind(this);
        this.UpdateAttendance = this.UpdateAttendance.bind(this);
    }

    componentDidMount(){
        AttendanceService.getAttendanceById(this.state.id).then( (res) =>{
            let attendance = res.data;
            this.setState({
                emp_id: attendance.emp_id,
                checkin: attendance.checkin,
                checkout : attendance.checkout,
                total_working_hours : attendance.total_working_hours
            });
        });
    }

    UpdateAttendance = (e) => {
        e.preventDefault();
        let attendance = {emp_id: this.state.emp_id, checkin: this.state.checkin, checkout: this.state.checkout, total_working_hours: this.state.total_working_hours};
        console.log('attendance => ' + JSON.stringify(attendance));
        console.log('id => ' + JSON.stringify(this.state.id));
        AttendanceService.updateAttendance(attendance, this.state.id).then( res => {
            this.props.history.push('/attendances');
        });
    }
    
    changeEmpIdHandler= (event) => {
        this.setState({emp_id: event.target.value});
    }

    changeCheckinHandler= (event) => {
        this.setState({checkin: event.target.value});
    }

    changeCheckoutHandler= (event) => {
        this.setState({checkout: event.target.value});
    }

    changeTotalHoursHandler= (event) => {
        this.setState({total_working_hours: event.target.value});
    }

    cancel(){
        this.props.history.push('/attendances');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Attendance</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Employee: </label>
                                            <input placeholder="Employee Name" name="emp_id" className="form-control" 
                                                value={this.state.emp_id} onChange={this.changeEmpIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Checkin: </label>
                                            <input placeholder="Checkin" type="time" name="checkin" className="form-control" 
                                                value={this.state.checkin} onChange={this.changeCheckinHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Checkout: </label>
                                            <input placeholder="Checkout" type="time" name="checkout" className="form-control" 
                                                value={this.state.checkout} onChange={this.changeCheckoutHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Total Hours: </label>
                                            <input placeholder="Total Hours" type="time" name="total_working_hours" className="form-control" 
                                                value={this.state.total_working_hours} onChange={this.changeTotalHoursHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.UpdateAttendance}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateAttendanceComponent;