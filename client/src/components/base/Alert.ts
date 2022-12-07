import Swal from 'sweetalert2';

export const Alert = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const warningAlert = (title: string, callback: () => void) =>
  Swal.fire({
    title: title,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f45162',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    confirmButtonText: '삭제',
    cancelButtonText: '취소',
  }).then(result => {
    if (result.isConfirmed) {
      callback();
    }
  });

export const errorAlert = (title: string) =>
  Swal.fire({
    icon: 'error',
    title: title,
  });
