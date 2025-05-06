import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}


const createNewUserService = (data) => {

    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)


}

const deleteUserService = (userId) => {

    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })

}

const editUserService = (data) => {

    return axios.put('/api/edit-user', data)
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}


const getDataMarkdownById = (inputId) => {
    return axios.get(`/api/get-doctor-markdown?id=${inputId}`)
}
const saveBulkScheduleDoctor = (inputData) => {
    return axios.post(`/api/bulk-create-schedule`, inputData)
}


const getScheduleDoctorByDate = (inputId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${inputId}&date=${date}`)
}
const getExtraInforDoctorById = (inputId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${inputId}`)
}

const getProfileDoctorById = (inputId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${inputId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('api/patient-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    getDataMarkdownById,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    createNewSpecialty,
    getAllSpecialty
}                                          