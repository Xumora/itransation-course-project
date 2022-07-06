import axios from 'axios'
import { REGISTER_USER_URL, LOGIN_USER_URL, LOGOUT_USER_URL, UPLOAD_CLOUD_IMG_URL, DELETE_CLOUD_IMG_URL, CREATE_COLLECTION_URL, GET_USER_INFO_URL, GET_COLLECTION_INFO_URL, CREATE_ITEM_URL, COLLECTION_LIKE, ITEM_LIKE, ADD_COMMENT, GET_COMMENTS, IS_ADMIN, EDIT_PROFILE, GET_FOLLOWERS, GET_FOLLOWINGS, EDIT_COLLECTION, GET_USERS, GET_COLLECTIONS, GET_ITEMS } from '../url/apiUrl';

axios.defaults.withCredentials = true

export const registerUserApi = async (userInfo) => {
    try {
        const res = await axios.post(REGISTER_USER_URL, userInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const loginUserApi = async (userInfo) => {
    try {
        const res = await axios.post(LOGIN_USER_URL, userInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.response.data }
    }
}

export const logoutUserApi = async () => {
    try {
        const res = await axios.post(LOGOUT_USER_URL, {}, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const uploadCloudImgApi = async (data) => {
    try {
        const res = await axios.post(UPLOAD_CLOUD_IMG_URL, data, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const deleteCloudImgApi = async (id) => {
    try {
        await axios.post(DELETE_CLOUD_IMG_URL, { public_id: id }, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export const createCollectionApi = async (name, description, img, itemFields) => {
    try {
        const res = await axios.post(CREATE_COLLECTION_URL, { name, description, img, itemFields }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getUserInfoApi = async (id) => {
    try {
        const res = await axios.get(`${GET_USER_INFO_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getCollectionInfoApi = async (id) => {
    try {
        const res = await axios.get(`${GET_COLLECTION_INFO_URL}/${id}`, {
            headers: {
                'Content-Type': 'appliaction/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const createItemApi = async (collectionId, name, img, additionalFields) => {
    try {
        const res = await axios.post(CREATE_ITEM_URL, { collectionId, name, img, additionalFields }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const collectionLikeApi = async (userId, collectionId) => {
    try {
        await axios.post(COLLECTION_LIKE, { userId, collectionId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export const itemLikeApi = async (userId, itemId) => {
    try {
        await axios.post(ITEM_LIKE, { userId, itemId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export const addCommentApi = async (id, content, type) => {
    try {
        const res = await axios.post(ADD_COMMENT, { id, content, type }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getCommentsApi = async (id, type) => {
    try {
        const res = await axios.get(`${GET_COMMENTS}/${id}/${type}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const isAdminApi = async () => {
    try {
        await axios.get(IS_ADMIN, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export const editProfileApi = async (username, email, password, bio, website, img, bgImg) => {
    try {
        const res = await axios.post(EDIT_PROFILE, { username, email, password, bio, website, img, bgImg }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getFollowersApi = async (id) => {
    try {
        const res = await axios.get(`${GET_FOLLOWERS}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getFollowingsApi = async (id) => {
    try {
        const res = await axios.get(`${GET_FOLLOWINGS}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const editCollectionApi = async (id, name, description, img, itemFields) => {
    try {
        const res = await axios.post(EDIT_COLLECTION, { id, name, description, img, itemFields }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getUsersApi = async (search) => {
    try {
        const res = await axios.get(`${GET_USERS}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getCollectionsApi = async (search) => {
    try {
        const res = await axios.get(`${GET_COLLECTIONS}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getItemsApi = async (search) => {
    try {
        const res = await axios.get(`${GET_ITEMS}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}