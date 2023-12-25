import React from 'react';
import { Facebook  as FBLoader} from 'react-content-loader'

const AuthPlaceholder = () => {
    return (
        <div className="row">
            <div className={"container"}>
                <FBLoader />
            </div>
        </div>
    );
};

export default AuthPlaceholder;