import React, { Children } from "react";
import Header from '../layouts/components/Header'
import { Box } from "@mui/material";
import Footer from "./components/Footer";

const DefaultLayout = ({children}) => {
    return (
        <Box>
            <Header/>
            <Box marginTop="65px" bgcolor="transparent">
                {children}
            </Box>
            <Footer/>
        </Box>  
    )
}

export default DefaultLayout