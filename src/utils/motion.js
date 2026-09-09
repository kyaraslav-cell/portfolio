export const NavMotion = ()=>{
  return {
    hidden: {
      x:  "100%" ,
      display: "none",
      
    },
    show: {
      x: 0,
      y: 0,
      display: "flex",
      transition: {
        type: "string",
        delay: 0.2,
        duration: 0.2,
        ease: "easeOut",
      },
    },
}
};




export const textVariant = (delay) => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay: delay,
        },
      },
    };
  };
  
  // type, delay and duration are defaulted rather than passed straight through:
  // an empty string for type leaves framer-motion unable to resolve a
  // transition, and the element stays at opacity 0 forever.
  export const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type || "tween",
          delay: delay || 0,
          duration: duration || 0.75,
          ease: "easeOut",
        },
      },
    };
  };
  
  export const zoomIn = (delay, duration) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  export const slideIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type: type || "tween",
          delay: delay || 0,
          duration: duration || 0.75,
          ease: "easeOut",
        },
      },
    };
  };
  
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerChildren || 0.08,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };