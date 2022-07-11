import axios from 'axios'
import { REGISTER_USER_URL, LOGIN_USER_URL, UPLOAD_CLOUD_IMG_URL, DELETE_CLOUD_IMG_URL, CREATE_COLLECTION_URL, GET_USER_INFO_URL, GET_COLLECTION_INFO_URL, CREATE_ITEM_URL, COLLECTION_LIKE, ITEM_LIKE, ADD_COMMENT, GET_COMMENTS, IS_ADMIN, EDIT_PROFILE, EDIT_COLLECTION, GET_USERS, GET_COLLECTIONS, GET_ITEMS, GET_TAGS, EDIT_ITEM, GET_TAG_INFO, TAG_FOLLOW, BLOCK_USERS, DELETE_USERS, CHANGE_ROLE, GUEST_LOGIN, DELETE_ITEM, DELETE_COLLECTION } from '../url/apiUrl';

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
        return { success: false, message: error.response.data }
    }
}

export const guestLoginApi = async () => {
    try {
        const res = await axios.post(GUEST_LOGIN, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
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
        return { success: false, message: error.response.data }
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
        return { success: false, message: error.response.data }
    }
}

export const tagFollowApi = async (name) => {
    try {
        const res = await axios.post(TAG_FOLLOW, { name }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const blockUsersApi = async (users, block) => {
    try {
        await axios.post(BLOCK_USERS, { users, block }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const deleteUsersApi = async (users) => {
    try {
        await axios.post(DELETE_USERS, { users }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const changeRoleApi = async (users, admin) => {
    try {
        await axios.post(CHANGE_ROLE, { users, admin }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}



export const createCollectionApi = async (userId, name, description, img, itemFields) => {
    try {
        const res = await axios.post(CREATE_COLLECTION_URL, { userId, name, description, img, itemFields }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
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

export const collectionLikeApi = async (collectionId) => {
    try {
        await axios.post(COLLECTION_LIKE, { collectionId }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const editCollectionApi = async (userId, id, name, description, img, itemFields) => {
    try {
        const res = await axios.post(EDIT_COLLECTION, { userId, id, name, description, img, itemFields }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const deleteCollectionApi = async (id) => {
    try {
        await axios.post(DELETE_COLLECTION, { id }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}



export const createItemApi = async (collectionId, name, img, additionalFields, tags) => {
    try {
        const res = await axios.post(CREATE_ITEM_URL, { collectionId, name, img, additionalFields, tags }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const itemLikeApi = async (itemId) => {
    try {
        await axios.post(ITEM_LIKE, { itemId }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const editItemApi = async (id, name, img, additionalFields, tags) => {
    try {
        const res = await axios.post(EDIT_ITEM, { id, name, img, additionalFields, tags }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response.data }
    }
}

export const deleteItemApi = async (id) => {
    try {
        await axios.post(DELETE_ITEM, { id }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false, message: error.response.data }
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

export const getCollectionsApi = async (search, filter) => {
    try {
        const res = await axios.get(`${GET_COLLECTIONS}/${filter}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getItemsApi = async (search, filter) => {
    try {
        const res = await axios.get(`${GET_ITEMS}/${filter}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false }
    }
}

export const getTagsApi = async (search) => {
    try {
        const res = await axios.get(`${GET_TAGS}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return { success: true, data: res.data }
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
        return { success: false, message: error.response.data }
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


export const getTagInfoApi = async (name) => {
    try {
        const res = await axios.get(`${GET_TAG_INFO}/${name}/${JSON.parse(localStorage.getItem('userInfo')).id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return { success: true, data: res.data }
    } catch (error) {
        console.log(error);
        return { success: false }
    }
}