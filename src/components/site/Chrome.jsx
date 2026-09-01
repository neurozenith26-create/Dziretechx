// ============================================================================
// CHROME CONTEXT
// ============================================================================
// Shared state for the pieces that sit outside the normal section flow: the
// slide-in drawer, the enquiry modal, and the nav's centre chips — which the
// hero animates directly (the chips "fly" from the hero panel up into the bar
// as the hero track finishes), so the hero needs a ref to them.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ChromeContext = createContext(null);

export const useChrome = () => {
  const ctx = useContext(ChromeContext);
  if (!ctx) throw new Error('useChrome must be used inside <ChromeProvider>');
  return ctx;
};

export const ChromeProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navChipsRef = useRef(null);
  const navRef = useRef(null);

  const openModal = useCallback(() => {
    setDrawerOpen(false);
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // Scroll lock lives on <html> so it survives the section-level overflow rules.
  useEffect(() => {
    const locked = drawerOpen || modalOpen;
    document.documentElement.classList.toggle('dz-locked', locked);
    return () => document.documentElement.classList.remove('dz-locked');
  }, [drawerOpen, modalOpen]);

  // Escape closes whichever overlay is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setModalOpen(false);
      setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(
    () => ({ drawerOpen, setDrawerOpen, modalOpen, openModal, closeModal, navChipsRef, navRef }),
    [drawerOpen, modalOpen, openModal, closeModal]
  );

  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
};

export default ChromeProvider;
