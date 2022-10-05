import axios from 'axios';

const ATTENDANCE_API_BASE_URL = "http://127.0.0.1:8000/api/attendance";

class AttendanceService {

    getAttendance(){
        return axios.get(ATTENDANCE_API_BASE_URL);
    }

    createAttendance(attendance){
        return axios.post(ATTENDANCE_API_BASE_URL, attendance);
    }

    getAttendanceById(attendanceId){
        return axios.get(ATTENDANCE_API_BASE_URL + '/' + attendanceId);
    }

    updateAttendance(attendance, attendanceId){
        return axios.put(ATTENDANCE_API_BASE_URL + '/' + attendanceId, attendance);
    }

    deleteAttendance(attendanceId){
        return axios.delete(ATTENDANCE_API_BASE_URL + '/' + attendanceId);
    }
}

export default new AttendanceService();
