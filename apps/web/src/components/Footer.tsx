function Footer() {
	return (
		<footer className="w-full py-xl bg-secondary-container dark:bg-on-secondary-fixed-variant">
			<div className="flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto px-margin-mobile md:px-gutter">
				<div className="flex flex-col items-center md:items-start gap-sm">
					<p className="font-headline-md text-headline-md font-bold text-on-secondary-container dark:text-on-secondary-fixed m-0">
						Game Store
					</p>
					<small className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim m-0">
						© 2024 Game Store Inc. All rights reserved.
					</small>
				</div>
				<nav aria-label="Footer">
					<ul className="flex flex-wrap justify-center gap-md list-none m-0 p-0">
						<li id="footer-privacy-policy">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-privacy-policy"
							>
								Privacy Policy
							</a>
						</li>
						<li id="footer-terms-of-service">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-terms-of-service"
							>
								Terms of Service
							</a>
						</li>
						<li id="footer-shipping-info">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-shipping-info"
							>
								Shipping Info
							</a>
						</li>
						<li id="footer-returns">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-returns"
							>
								Returns
							</a>
						</li>
						<li id="footer-contact-us">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-contact-us"
							>
								Contact Us
							</a>
						</li>
					</ul>
				</nav>
				<ul className="flex gap-md">
					<li>
						<button
							aria-label="Select language"
							className="text-on-secondary-container"
							type="button"
						>
							<span aria-hidden="true" className="material-symbols-outlined">
								language
							</span>
						</button>
					</li>
					<li>
						<button
							aria-label="Help"
							className="text-on-secondary-container"
							type="button"
						>
							<span aria-hidden="true" className="material-symbols-outlined">
								help_outline
							</span>
						</button>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export { Footer };
