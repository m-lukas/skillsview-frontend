import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post('http://46.101.250.58/api/user/login', { credentials }).then(res => res.data.user),
        signup: user =>
            axios.post('http://46.101.250.58/api/user/signup', { user }).then(res => res.data.user)
    },
    project: {
        create: (data, addition) =>
            axios.post('http://46.101.250.58/api/project/create', { data, addition }).then(res => res.data.project),
        join: data =>
            axios.post('http://46.101.250.58/api/project/join', { data }).then(res => res.data.project),
        get: data =>
            axios.post('http://46.101.250.58/api/project/get', { data }).then(res => res.data.project)
    }
}