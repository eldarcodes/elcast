import { layoutStore } from '@/store/layout/layout.store';

export function useLayout() {
  const isVisibleDeactivationAlert = layoutStore(
    (state) => state.isVisibleDeactivationAlert,
  );
  const setIsVisibleDeactivationAlert = layoutStore(
    (state) => state.setIsVisibleDeactivationAlert,
  );

  const closeDeactivationAlert = () => setIsVisibleDeactivationAlert(false);
  const openDeactivationAlert = () => setIsVisibleDeactivationAlert(true);

  return {
    isVisibleDeactivationAlert,
    closeDeactivationAlert,
    openDeactivationAlert,
  };
}
