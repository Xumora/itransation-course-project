import React, { createContext, useContext, useState } from 'react'
const Context = createContext()


const DataContext = ({ children }) => {
    const [admin, setAdmin] = useState(false)
    const [mainPageSearch, setMainPageSearch] = useState('')

    const value = {
        admin,
        setAdmin,
        mainPageSearch,
        setMainPageSearch,
    }

    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    () => children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useAdmin = (setterOnly) => {
    const { admin, setAdmin } = useContext(Context)
    return setterOnly ? [setAdmin] : [admin, setAdmin]
}

const useMainPageSearch = (setterOnly) => {
    const { mainPageSearch, setMainPageSearch } = useContext(Context)
    return setterOnly ? [setMainPageSearch] : [mainPageSearch, setMainPageSearch]
}


export {
    DataContext,
    useAdmin,
    useMainPageSearch
}