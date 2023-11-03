import axios from "./axios";

export const login = async (data) => await axios.post('/auth/login', data)

export const Register = async (data) => await axios.post('/auth/register', data)

export const gLogin = async (data) => await axios.post(`/auth/glogin`, data)

export const EditPDF = async (data) => {
    const { filename, file, order } = data
    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', filename)
    formData.append('pages', JSON.stringify(order))

    return await axios.post('/pdf/createPdf', formData)
}