const API_URL = 'http://localhost:4000/';
 const  UserRole =  {
   WARD_MANAGER :'WARD_MANAGER',
   DISTRICT_MANAGER : 'DISTRICT_MANAGER',
   DEPARTMENT_MANAGER : 'DEPARTMENT_MANAGER',
}

const RequestState = {
    ACCEPTED:'Accepted',
    DECLINED:'Declined',
    PENDING:'Pending',
}
function fixUrl(url) {
  // Sử dụng regex để tìm kiếm dấu chấm thừa và loại bỏ nó
  return (url?.replace(/^\.\//, ''));
}

const ReportState = {
    PROCESSING : 'Processing',
    PROCESSED : 'Processed',
    REJECTED : 'Rejected',
    PENDING : 'Pending',
}

function  getReportState(state) {
  switch(state) {
    case ReportState.PROCESSING:
      return 'Đang xử lý';
    case ReportState.PROCESSED:
      return 'Đã xử lý';
    case ReportState.REJECTED:
      return 'Đã từ chối';
    case ReportState.PENDING:
      return 'Đang chờ';
    default:
      return 'Không xác định';
  }
}

function getReportStateColor(state) {
  switch(state) {
    case ReportState.PROCESSING:
      return 'warning';
    case ReportState.PROCESSED:
      return 'success';
    case ReportState.REJECTED:
      return 'danger';
    case ReportState.PENDING:
      return 'secondary';
    default:
      return 'secondary';
  }
}

function getRequestStateColor(state) {
    switch(state) {
        case RequestState.ACCEPTED:
            return 'success';
        case RequestState.DECLINED:
            return 'danger';
        case ReportState.PENDING:
            return 'secondary';
        default:
            return 'secondary';
    }
}

function getRequestStateName(state) {
    switch(state) {
        case RequestState.ACCEPTED:
            return 'Chấp nhận'
        case RequestState.DECLINED:
            return 'Từ chối';
        case ReportState.PENDING:
            return 'Đang chờ'
        default:
            return 'secondary';
    }
}

function hiddenActionEditByReportState(state) {
    switch(state) {
        case ReportState.PROCESSING:
        return true;
        case ReportState.PROCESSED:
        return true;
        case ReportState.REJECTED:
        return true;
        case ReportState.PENDING:
        return false;
        default:
        return true;
    }
}

function hiddenActionDeleteByReportState(state) {
    switch(state) {
        case ReportState.PROCESSING:
        return true;
        case ReportState.PROCESSED:
        return false;
        case ReportState.REJECTED:
        return false;
        case ReportState.PENDING:
        return false;
        default:
        return true;
    }
}

function hiidenActionAcceptByRequestState(state) {
    switch(state) {
        case RequestState.ACCEPTED:
            return true;
        case RequestState.DECLINED:
            return true;
        case ReportState.PENDING:
            return false;
        default:
            return true;
    }
}

function hiidenActionDeleteByRequestState(state) {
    switch(state) {
        case RequestState.ACCEPTED:
            return true;
        case RequestState.DECLINED:
            return true;
        case ReportState.PENDING:
            return false;
        default:
            return true;
    }
}

function translateByUserRole(userRole) {
  switch(userRole) {
    case UserRole.WARD_MANAGER:
      return 'Quản lý phường';
    case UserRole.DISTRICT_MANAGER:
      return 'Quản lý quận';
    case UserRole.DEPARTMENT_MANAGER:
      return 'Quản lý sở';
    default:
      return 'Không xác định';
  }
}

export { API_URL, fixUrl, UserRole, getReportState, getReportStateColor, translateByUserRole, hiddenActionEditByReportState, hiddenActionDeleteByReportState, getRequestStateColor, getRequestStateName, hiidenActionAcceptByRequestState, hiidenActionDeleteByRequestState};
