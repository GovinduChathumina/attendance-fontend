import React, { Component } from 'react'
import AttendanceService from '../services/AttendanceService';

class CreateAttendanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
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
        this.saveOrUpdateAttendance = this.saveOrUpdateAttendance.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            AttendanceService.getAttendanceById(this.state.id).then( (res) =>{
                let attendance = res.data;
                this.setState({
                    emp_id: attendance.emp_id,
                    checkin: attendance.checkin,
                    checkout : attendance.checkout,
                    total_working_hours : attendance.total_working_hours,
                });
            });
        }        
    }
    saveOrUpdateAttendance = (e) => {
        e.preventDefault();
        let attendance = {emp_id: this.state.emp_id, checkin: this.state.checkin, checkout: this.state.checkout, total_working_hours: this.state.total_working_hours};
        console.log('attendance => ' + JSON.stringify(attendance));

        // step 5
        if(this.state.id === 'add'){
            AttendanceService.createAttendance(attendance).then(res =>{
                this.props.history.push('/attendances');
            });
        }else{
            AttendanceService.updateAttendance(attendance, this.state.id).then( res => {
                this.props.history.push('/attendance');
            });
        }
    }

    sumOFHoursWorked(){
        var checkin = "00:45".split(':');
        var checkout = "01:20".split(':');
        
        let secondSum = Number(checkin[1]) + Number(checkout[1]);
        let minSum = Number(checkin[0]) + Number(checkout[0]);
        
        if(secondSum > 59){
          secondSum = Math.abs(60 - secondSum);
          minSum += 1;
        }
        
        if(secondSum < 10){
          secondSum = `0${secondSum}`;
        }
        
        if(minSum < 10){
          minSum = `0${minSum}`;
        }
        
        return `${minSum}:${secondSum}`;   
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
        this.setState({total_working_hours: this.sumOFHoursWorked()});
    }

    cancel(){
        this.props.history.push('/attendance-list');
    }

    getTitle(){
        if(this.state.id === 'add'){
            return <h3 className="text-center">Add Attendance</h3>
        }else{
            return <h3 className="text-center">Update Attendance</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateAttendance}>Save</button>
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

export default CreateAttendanceComponent;