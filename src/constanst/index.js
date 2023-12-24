const API_URL = 'http://localhost:4000/';

function fixUrl(url) {
  // Sử dụng regex để tìm kiếm dấu chấm thừa và loại bỏ nó
  return (url.replace(/^\.\//, ''));
}
export { API_URL, fixUrl};