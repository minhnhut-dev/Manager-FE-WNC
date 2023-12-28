import React from 'react';
import Swal from 'sweetalert2';

const useSweetAlert = (action) => {
    const showAlert = async (options) => {
        try {
            const result = await Swal.fire(options);
            if (result.value) {
                action();
            }
        } catch (error) {
            console.error('Error handling sweetalert:', error);
        }
    };

    return showAlert;
};

export default useSweetAlert;
