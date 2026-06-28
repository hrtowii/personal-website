import { helium, nixos_gif, tailscale } from "../utils/base64stuff";
import "./WebringCard.css";

const webring_links = [
	{ href: "https://hrtowii.nekoweb.org", src: "/8831.png" },
	{ href: "https://dane.gg", src: "https://dane.gg/assets/img/88x31.gif" },
	{ href: "https://snoolie.gay/", src: "/snoolie.gif" },
	{ href: "https://cyb3r17.space", src: "/cyb3r17.png" },
	{ href: "https://miaow.ing/", src: "https://miaow.ing/images/88x31_miaowing.png" },
	{ href: "https://jesx.dev", src: "https://jesx.dev/images/buttons/footer/jesx.gif" },
	{ href: "https://nekoweb.org/", src: "https://nekoweb.org/assets/buttons/button6.gif" },
];

const badge_links = [
	{ href: "https://badge.les.bi", src: "https://badge.les.bi/88x31/trans/bi/half/outset.png", alt: "trans bi" },
	{ href: "/", src: "https://cyber.dabamos.de/88x31/darwin.gif", alt: "darwin" },
	{ href: "/", src: "/arch.gif", alt: "arch btw" },
	// { href: "/", src: "https://cyber.dabamos.de/88x31/bestviewedopen.gif", alt: "best viewed open" },
	// { href: "/", src: "https://cyber.dabamos.de/88x31/cssdif.gif", alt: "css" },
	{ href: "https://helium.computer", src: helium, alt: "helium" },
	{ href: "https://nixos.org", src: nixos_gif, alt: "nixos" },
	{ href: "https://tailscale.com", src: tailscale, alt: "tailscale" },
];

const ScrollRow = ({ items, speed = 7 }) => (
	<div className="infinite-scroll-container">
		<div className="scroll-wrapper">
			<div className="scroll-content" style={{ animationDuration: `${speed}s` }}>
				{[...items, ...items].map(({ href, src, alt }, i) => (
					<a key={i} href={href}>
						<img src={src} alt={alt ?? href} />
					</a>
				))}
			</div>
		</div>
	</div>
);

const WebringCard = () => (
	<div className="webring_card">
		<div className="webring_status_header">
			<p className="status-text">cool stuff !!</p>
		</div>
		<div className="webring_content">
			<ScrollRow items={webring_links} speed={7} />
			<ScrollRow items={badge_links} speed={3} />
		</div>
	</div>
);

export default WebringCard;
