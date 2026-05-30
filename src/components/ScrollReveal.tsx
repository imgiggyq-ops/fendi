/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  id?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  id
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 60 };
      case 'down':
        return { y: -60 };
      case 'left':
        return { x: 60 };
      case 'right':
        return { x: -60 };
      default:
        return {};
    }
  };

  const getTargetPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0 };
      case 'left':
      case 'right':
        return { x: 0 };
      default:
        return {};
    }
  };

  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        ...getInitialPosition()
      }}
      whileInView={{
        opacity: 1,
        ...getTargetPosition()
      }}
      viewport={{
        once: false,
        amount: 0.12,
        margin: "0px 0px -50px 0px"
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Beautiful cubic bezier for luxury spring ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
