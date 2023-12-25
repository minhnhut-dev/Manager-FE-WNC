import { useState, useEffect } from 'react';

function useLocalStorageUser(userKey, initialUser) {
    // Sử dụng useState để lưu trữ user hiện tại
    const [storedUser, setStoredUser] = useState(() => {
        try {
            const item = localStorage.getItem(userKey);
            return item ? JSON.parse(item) : initialUser;
        } catch (error) {
            return initialUser;
        }
    });

    // Sử dụng useEffect để cập nhật local storage khi user thay đổi
    useEffect(() => {
        try {
            // Chuyển user hiện tại thành string và lưu vào local storage
            localStorage.setItem(userKey, JSON.stringify(storedUser));
        } catch (error) {
            console.log(error);
        }
    }, [userKey, storedUser]);

    return [storedUser, setStoredUser];
}

export default useLocalStorageUser;
