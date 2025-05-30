import { useEffect, useRef } from 'react';

/**
 * useDialog hook
 * Handles dialog open/close, Escape key, and outside click for native <dialog> elements.
 * Returns a ref to attach to the <dialog> element.
 */
export function useDialog(onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const dialog = dialogRef.current;
      // Only close if the click is on the backdrop (native <dialog> behavior)
      if (dialog && e.target === dialog) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return dialogRef;
}
