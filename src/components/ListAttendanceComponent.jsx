import React, { Component } from 'react'
import AttendanceService from '../services/AttendanceService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                attendances: []
        }
        this.addEmployee = this.addAttendance.bind(this);
        this.uploadAttendance = this.uploadAttendance.bind(this);
        this.editEmployee = this.editAttendance.bind(this);
        this.deleteEmployee = this.deleteAttendance.bind(this);
    }

    uploadAttendance(){
        this.props.history.push('/upload-attendance');
    }

    deleteAttendance(id){
        AttendanceService.deleteAttendance(id).then( res => {
            this.setState({attendances: this.state.attendances.filter(attendance => attendance.id !== id)});
        });
    }

    editAttendance(id){
        this.props.history.push(`/update-attendance/${id}`);
    }

    componentDidMount(){
        AttendanceService.getAttendance().then((res) => {
            this.setState({ attendances: res.data});
        });
    }

    addAttendance(){
        this.props.history.push('/add-attendance/add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Employees Attendance List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee Attendance</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee Id</th>
                                    <th> Checkin</th>
                                    <th> Checkout</th>
                                    <th> Total Working Hours</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.attendances.map(
                                        attendance => 
                                        <tr key = {attendance.id}>
                                             <td> {attendance.emp_id} </td>   
                                             <td> {attendance.checkin}</td>
                                             <td> {attendance.checkout}</td>
                                             <td> {attendance.total_working_hours}</td>
                                             <td>
                                                 <button onClick={ () => this.editAttendance(attendance.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAttendance(attendance.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent;