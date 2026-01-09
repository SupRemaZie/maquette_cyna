import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      ...toast,
      duration: toast.duration || 5000,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove après la durée spécifiée
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, [removeToast]);

  const toast = useCallback((message, type = 'info', options = {}) => {
    return addToast({
      message,
      type,
      ...options,
    });
  }, [addToast]);

  const success = useCallback((message, options = {}) => {
    return toast(message, 'success', options);
  }, [toast]);

  const error = useCallback((message, options = {}) => {
    return toast(message, 'error', options);
  }, [toast]);

  const warning = useCallback((message, options = {}) => {
    return toast(message, 'warning', options);
  }, [toast]);

  const info = useCallback((message, options = {}) => {
    return toast(message, 'info', options);
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        toast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, removeToast }) => {
  const { message, type, title } = toast;

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-accent/20',
      border: 'border-accent',
      text: 'text-accent',
      icon: 'text-accent',
    },
    error: {
      bg: 'bg-destructive/20',
      border: 'border-destructive',
      text: 'text-destructive',
      icon: 'text-destructive',
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
    },
    info: {
      bg: 'bg-primary/20',
      border: 'border-primary',
      text: 'text-primary',
      icon: 'text-primary',
    },
  };

  const Icon = icons[type] || Info;
  const colorScheme = colors[type] || colors.info;

  return (
    <div
      className={`
        ${colorScheme.bg} ${colorScheme.border} border rounded-lg shadow-lg p-4
        flex items-start gap-3
        transform transition-all duration-300 ease-in-out
      `}
      style={{
        animation: 'slideInUp 0.3s ease-out',
      }}
      role="alert"
    >
      <Icon className={`h-5 w-5 ${colorScheme.icon} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`font-semibold ${colorScheme.text} mb-1`}>{title}</h4>
        )}
        <p className={`text-sm ${colorScheme.text}`}>{message}</p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className={`${colorScheme.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ToastProvider;

