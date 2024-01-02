
const statusRequestAddSpaces = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined'
}
function getReportAddSpaces(status){
  switch (status)
  {
    case statusRequestAddSpaces.PENDING:
      return 'Đang xử lý';
    case statusRequestAddSpaces.ACCEPTED:
      return 'Đã duyệt';
    case statusRequestAddSpaces.DECLINED:
      return 'Đã từ chối';
    default:
      return 'Đang xử lý';
  }
}
function getReportAddSpacesColor(status){
  switch (status)
  {
    case statusRequestAddSpaces.PENDING:
      return 'warning';
    case statusRequestAddSpaces.ACCEPTED:
      return 'success';
    case statusRequestAddSpaces.DECLINED:
      return 'danger';
    default:
      return 'warning';
  }
}

function hiddenActionDeleteByReportAddSpaces(status){
  switch (status)
  {
    case statusRequestAddSpaces.PENDING:
      return false;
    case statusRequestAddSpaces.ACCEPTED:
      return true;
    case statusRequestAddSpaces.DECLINED:
      return true;
    default:
      return false;
  }
}

export {getReportAddSpaces, getReportAddSpacesColor, hiddenActionDeleteByReportAddSpaces};