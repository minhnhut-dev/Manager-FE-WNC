const API_URL = 'http://localhost:4000/';
 const  UserRole =  {
   WARD_MANAGER :'WARD_MANAGER',
   DISTRICT_MANAGER : 'DISTRICT_MANAGER',
   DEPARTMENT_MANAGER : 'DEPARTMENT_MANAGER',
}
function fixUrl(url) {
  // Sử dụng regex để tìm kiếm dấu chấm thừa và loại bỏ nó
  return (url.replace(/^\.\//, ''));
}
export { API_URL, fixUrl, UserRole};
