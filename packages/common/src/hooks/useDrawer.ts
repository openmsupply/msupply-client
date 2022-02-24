import create from 'zustand';
import LocalStorage from '../localStorage/LocalStorage';

type DrawerController = {
  hoverActive: Record<string, boolean>;
  hoverOpen: boolean;
  isOpen: boolean;
  hasUserSet: boolean;
  clicked?: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setHoverActive: (key: string, active: boolean) => void;
  setHoverOpen: (open: boolean) => void;
  setClicked: (clicked?: string) => void;
  clearHoverActive: () => void;
};

export const useDrawer = create<DrawerController>(set => {
  const initialValue = LocalStorage.getItem('/appdrawer/open');
  return {
    hasUserSet: initialValue !== null,
    isOpen: !!initialValue,
    hoverActive: {},
    hoverOpen: false,
    setClicked: (clicked?: string) => set(state => ({ ...state, clicked })),
    setHoverActive: (key, active) =>
      set(state => {
        const newHoverActive = { ...state.hoverActive, [key]: active };
        return { ...state, hoverActive: newHoverActive };
      }),
    setHoverOpen: hoverOpen => set(state => ({ ...state, hoverOpen })),
    open: () => set(state => ({ ...state, isOpen: true })),
    close: () => set(state => ({ ...state, isOpen: false, hoverOpen: false })),
    toggle: () =>
      set(state => ({ ...state, isOpen: !state.isOpen, hasUserSet: true })),
    clearHoverActive: () => set(state => ({ ...state, hoverActive: {} })),
  };
});

useDrawer.subscribe(({ hasUserSet, isOpen }) => {
  if (hasUserSet) LocalStorage.setItem('/appdrawer/open', isOpen);
});

LocalStorage.addListener<boolean>((key, value) => {
  if (key === '/appdrawer/open') {
    useDrawer.setState(state => ({ ...state, isOpen: value }));
  }
});
