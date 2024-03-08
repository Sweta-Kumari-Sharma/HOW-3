declare module 'toastr' {
    interface ToastrOptions {
      closeButton?: boolean;
      debug?: boolean;
      newestOnTop?: boolean;
      progressBar?: boolean;
      positionClass?: string;
      preventDuplicates?: boolean;
      onclick?: () => void;
      showDuration?: string;
      hideDuration?: string;
      timeOut?: string;
      extendedTimeOut?: string;
      showEasing?: string;
      hideEasing?: string;
      showMethod?: string;
      hideMethod?: string;
    }
  
    interface Toastr {
      clear: () => void;
      remove: (toast: HTMLElement) => void;
      error: (message?: string, title?: string, options?: ToastrOptions) => void;
      getContainer: () => HTMLElement;
      info: (message?: string, title?: string, options?: ToastrOptions) => void;
      options: ToastrOptions;
      remove: (toast: HTMLElement) => void;
      success: (message?: string, title?: string, options?: ToastrOptions) => void;
      warning: (message?: string, title?: string, options?: ToastrOptions) => void;
    }
  
    const toastr: Toastr;
    export default toastr;
  }
  