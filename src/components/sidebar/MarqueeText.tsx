import React, { useEffect, useRef, useState } from "react";
import "./MarqueeText.css";

interface MarqueeTextProps {
	text: string;
	className: string;
	as?: React.ElementType;
	[key: string]: unknown;
}

function MarqueeText({ text, className, as: Tag = "span", ...rest }: MarqueeTextProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLElement>(null);
	const [shouldMarquee, setShouldMarquee] = useState(false);

	useEffect(() => {
		if (containerRef.current && textRef.current) {
			setShouldMarquee(
				textRef.current.offsetWidth > containerRef.current.clientWidth
			);
		}
	}, [text]);

	return (
		<div ref={containerRef} className="marquee-container">
			<div className={shouldMarquee ? "marquee-track" : undefined}>
				<Tag ref={textRef} className={`${className} marquee-text`} {...rest}>
					{text}
				</Tag>
				{shouldMarquee && (
					<Tag className={`${className} marquee-text`} aria-hidden="true" {...rest}>
						{text}
					</Tag>
				)}
			</div>
		</div>
	);
}

export default MarqueeText;