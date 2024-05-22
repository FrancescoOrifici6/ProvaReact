import { createSlice } from "@reduxjs/toolkit"

export const loggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState: {
        value: {
            
        },
    },
    reducers: {
        setLoggedUser: (state, action) => {
            state.value = action.payload
        },
    },
})


// Action creators are generated for each case reducer function
export const { setLoggedUser } = loggedUserSlice.actions

export default loggedUserSlice.reducer