import type { SVGProps } from 'react'

export const Cross = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M47.251 24.486 128 105.232l80.416-80.414A15.288 15.288 0 0 1 219.382 20a16.616 16.616 0 0 1 16.615 16.614 14.955 14.955 0 0 1-4.486 10.966l-81.247 80.413 81.247 81.245a14.95 14.95 0 0 1 4.486 10.134 16.615 16.615 0 0 1-16.615 16.615 15.284 15.284 0 0 1-11.464-4.486L128 150.755l-80.583 80.58a15.294 15.294 0 0 1-10.8 4.652 16.618 16.618 0 0 1-16.614-16.615 14.95 14.95 0 0 1 4.486-10.965l81.247-80.414-81.247-81.244a14.953 14.953 0 0 1-4.486-10.135A16.614 16.614 0 0 1 36.618 20a15.322 15.322 0 0 1 10.633 4.486Z" />
	</svg>
)

export const Maximize = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M56 20h144a36 36 0 0 1 36 36v144a36 36 0 0 1-36 36H56a36.001 36.001 0 0 1-36-36V56a36 36 0 0 1 36-36Zm0 24a12 12 0 0 0-12 12v144a11.998 11.998 0 0 0 12 12h144c3.183 0 6.235-1.264 8.485-3.515A11.996 11.996 0 0 0 212 200V56a11.998 11.998 0 0 0-12-12H56Z" />
	</svg>
)

export const MaximizeRestore = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M79.594 52.4H63.297A35.1 35.1 0 0 1 98.29 20H184.7A51.3 51.3 0 0 1 236 71.3v86.4a35.097 35.097 0 0 1-32.4 34.992v-16.286a18.902 18.902 0 0 0 16.2-18.706V71.3a35.098 35.098 0 0 0-35.1-35.1H98.3a18.9 18.9 0 0 0-18.706 16.2ZM55.1 63.2A35.1 35.1 0 0 0 20 98.3v102.6A35.1 35.1 0 0 0 55.1 236h102.6a35.098 35.098 0 0 0 32.428-21.668A35.098 35.098 0 0 0 192.8 200.9V98.3a35.098 35.098 0 0 0-35.1-35.1H55.1ZM36.2 98.3c0-10.433 8.467-18.9 18.9-18.9h102.6c10.444 0 18.9 8.467 18.9 18.9v102.6c0 5.013-1.991 9.82-5.536 13.364A18.896 18.896 0 0 1 157.7 219.8H55.1a18.898 18.898 0 0 1-18.9-18.9V98.3Z" />
	</svg>
)

export const Minimize = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M224 114H32c-3.183 0-6.235 1.528-8.485 4.247C21.265 120.966 20 124.654 20 128.5s1.264 7.534 3.515 10.253C25.765 141.472 28.817 143 32 143h192c3.183 0 6.235-1.528 8.485-4.247 2.251-2.719 3.515-6.407 3.515-10.253s-1.264-7.534-3.515-10.253c-2.25-2.719-5.302-4.247-8.485-4.247Z" />
	</svg>
)

export const RecordStart = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M20 182V74a27 27 0 0 1 27-27h162a27 27 0 0 1 27 27v108a27.003 27.003 0 0 1-27 27H47a27.002 27.002 0 0 1-27-27Zm108-13.5a40.501 40.501 0 0 0 28.638-69.138A40.5 40.5 0 1 0 128 168.5Z" />
	</svg>
)

export const RecordStop = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M128 236a108.005 108.005 0 0 0 76.368-31.632 108.005 108.005 0 0 0 0-152.736A108.002 108.002 0 0 0 20 128a108.002 108.002 0 0 0 108 108ZM101 87.5h54a13.501 13.501 0 0 1 13.5 13.5v54a13.5 13.5 0 0 1-13.5 13.5h-54A13.499 13.499 0 0 1 87.5 155v-54A13.5 13.5 0 0 1 101 87.5Z" />
	</svg>
)

export const ShareScreen = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fill="currentColor"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2 4.5c0-1.103.897-2 2-2h16c1.103 0 2 .897 2 2v11c0 1.104-.897 2-2 2h-7v2h4v2H7v-2h4v-2H4c-1.103 0-2-.896-2-2v-11Zm11.2 9.838V11.6c-3.336 0-5.532 1.063-7.2 3.4.672-3.338 2.532-6.662 7.2-7.338V5L18 9.662l-4.8 4.675Z"
		/>
	</svg>
)

export const Settings = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M19 3v4m0 14V11m-7-8v12m0 6v-2M5 3v2m0 16V9"
			strokeWidth={2}
			strokeLinecap="round"
		/>
		<circle cx={19} cy={9} r={2} fill="none" strokeWidth={2} strokeLinecap="round" />
		<circle cx={12} cy={17} r={2} fill="none" strokeWidth={2} strokeLinecap="round" />
		<circle cx={5} cy={7} r={2} fill="none" strokeWidth={2} strokeLinecap="round" />
	</svg>
)

export const Info = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M128 20a108 108 0 1 0 0 216.002A108 108 0 0 0 128 20Zm0 194.4A86.399 86.399 0 0 1 66.906 66.906 86.4 86.4 0 1 1 128 214.4Z" />
		<path d="M128 95.6c5.965 0 10.8-4.835 10.8-10.8 0-5.965-4.835-10.8-10.8-10.8-5.965 0-10.8 4.835-10.8 10.8 0 5.965 4.835 10.8 10.8 10.8ZM128 106.4a10.804 10.804 0 0 0-7.637 3.163 10.804 10.804 0 0 0-3.163 7.637v54c0 2.864 1.138 5.611 3.163 7.637a10.804 10.804 0 0 0 15.274 0 10.804 10.804 0 0 0 3.163-7.637v-54c0-2.864-1.138-5.611-3.163-7.637A10.804 10.804 0 0 0 128 106.4Z" />
	</svg>
)
export const Update = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M111.007 3.618a12.374 12.374 0 0 1 17.488 0l28.871 28.87a12.37 12.37 0 0 1 0 17.487l-28.871 28.87a12.375 12.375 0 0 1-20.807-8.834 12.369 12.369 0 0 1 3.319-8.653l7.094-7.094a74.242 74.242 0 0 0-61.452 53.033 74.231 74.231 0 0 0 23.837 77.59 12.372 12.372 0 0 1-6.814 21.826 12.38 12.38 0 0 1-9.04-2.822A98.979 98.979 0 0 1 119.14 29.255l-8.134-8.15a12.373 12.373 0 0 1 0-17.487Zm62.94 49.755a12.374 12.374 0 0 1 17.422-1.584 98.978 98.978 0 0 1-54.51 174.637l8.134 8.149a12.366 12.366 0 0 1 3.936 8.834 12.363 12.363 0 0 1-3.622 8.967 12.38 12.38 0 0 1-8.968 3.622 12.372 12.372 0 0 1-8.834-3.936l-28.871-28.87a12.37 12.37 0 0 1 0-17.486l28.871-28.87a12.376 12.376 0 0 1 20.807 8.834 12.37 12.37 0 0 1-3.319 8.653l-7.094 7.094a74.239 74.239 0 0 0 61.078-95.374 74.24 74.24 0 0 0-23.463-35.25 12.373 12.373 0 0 1-1.567-17.42Z" />
	</svg>
)

export const Download = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export const Hide = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M10.25 11.75c-6 2-8.5-3.75-8.5-3.75s.5-1.75 3-3.25m4-1c3.5.5 5.5 4.25 5.5 4.25s-.5 1.25-1.5 2.25l-4-6.5Z"
			fill="none"
			stroke="#000"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M8.625 9.083a1.25 1.25 0 0 1-1.429-2.041L8 8l.625 1.083Z"
			fill="#000"
			stroke="#000"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="m3.75 1.75 8.5 12.5"
			stroke="#000"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export const Loading = (props: SVGProps<SVGSVGElement>) => (
	<svg
		id="eBqQnd2oCwH1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1024 1024"
		shapeRendering="geometricPrecision"
		textRendering="geometricPrecision"
		{...props}
	>
		<path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.446 440.446 0 0 0-94.3-139.9 437.729 437.729 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150s83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36Z" />
	</svg>
)
