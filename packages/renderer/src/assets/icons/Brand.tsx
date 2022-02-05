import type { SVGProps } from 'react'

export const Logo = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<circle cx={256} cy={256} r={256} fill="#6772EB" />
			<path
				d="M143.803 136.768h95.359v240.878h-95.359V136.768Zm125.845 224.039c0-24.46 14.18-41.062 42.539-49.806 10.871-3.309 24.874-4.963 42.007-4.963h14.003V378h-98.549v-17.193Z"
				fill="#F5F5F5"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h512v512H0z" />
			</clipPath>
		</defs>
	</svg>
)
