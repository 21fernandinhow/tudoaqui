import { useEffect } from "react";

interface useUnsavedChangesProps {
  isDirty: boolean;
  message?: string;
};

export const useUnsavedChanges = ({ isDirty, message = "Tem certeza que deseja sair sem salvar?" }: useUnsavedChangesProps) => {

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);

  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a");
      if (!link) return;

      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey
      ) {
        return;
      }

      const confirmLeave = window.confirm(message);

      if (!confirmLeave) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDirty, message]);
}