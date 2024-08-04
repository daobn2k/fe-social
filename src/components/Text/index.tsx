import React from 'react';
import clsx from 'clsx';
import { fontTypes } from '../../types/font.type';
import { colorTypes } from '../../types/color.type';

interface TextProps {
	children: React.ReactNode;
	type?: fontTypes | undefined;
	color?: colorTypes | undefined;
	disabled?: boolean;
	state?: null | 'disable';
	className?: string;
	onClick?: () => void;
	element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'a';
	fontFamily?:
		| 'font-fauces'
		| 'font-inknut-antiqua'
		| 'font-plus-jakarta'
		| 'font-fig-tree'
		| 'font-bebas-neue'
		| 'font-mono-sans';
	href?: string;
	style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({
	type,
	color,
	disabled = false,
	className = '',
	children,
	element = 'div',
	fontFamily = 'font-sora',
	href,
	onClick,
	style,
}) => {
	const classes = clsx(
		type,
		{ 'text-disable': disabled, [className]: !!className },
		fontFamily
	);

	return React.createElement(
		element,
		{
			className: classes,
			href: href,
			style: { color: `var(${color})`, ...style },
			onClick,
		},
		React.createElement(React.Fragment, undefined, children)
	);
};

export default Text;
