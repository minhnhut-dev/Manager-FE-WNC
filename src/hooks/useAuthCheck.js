import {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from "../Context/appContext";
import _ from "lodash";

const useAuthCheck = () => {
    const { currentUser } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (_.isEmpty(currentUser)) {
            navigate('/login');
        }
    }, [currentUser, navigate]);
    return !!currentUser;
};

export default useAuthCheck;
