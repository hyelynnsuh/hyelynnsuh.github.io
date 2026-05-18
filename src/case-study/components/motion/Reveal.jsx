import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/**
 * Subtle scroll reveal — disabled when prefers-reduced-motion.
 */
export function Reveal({ children, className = '', delay = 0 }) {
	const reduce = useReducedMotion()

	if (reduce) {
		return <div className={className}>{children}</div>
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 6 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-10% 0px -8% 0px' }}
			transition={{ duration: 0.48, delay, ease }}
		>
			{children}
		</motion.div>
	)
}
