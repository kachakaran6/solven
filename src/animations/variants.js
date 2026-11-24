// Framer Motion presets tuned for luxury digital experience

export const springPhysics = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8
};

export const gentleSpring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 1
};

export const smoothEase = [0.16, 1, 0.3, 1]; // Apple-like easeOutExpo

export const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: "easeIn" }
  }
};

export const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" }
  }
};

export const bottomSheetVariants = {
  hidden: { y: "100%", opacity: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 28, stiffness: 320 }
  },
  exit: {
    y: "100%",
    opacity: 0.8,
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] }
  }
};

export const drawerVariantsDesktop = {
  hidden: { x: "100%", opacity: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 30, stiffness: 300 }
  },
  exit: {
    x: "100%",
    opacity: 0.9,
    transition: { duration: 0.25, ease: "easeInOut" }
  }
};

export const hangerSwayVariants = {
  initial: { rotate: 0 },
  swaying: (custom = 1) => ({
    rotate: [0, -1.8 * custom, 1.4 * custom, -0.8 * custom, 0],
    transition: {
      duration: 3.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  })
};

export const flipCardVariants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.5, ease: smoothEase }
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.5, ease: smoothEase }
  }
};
