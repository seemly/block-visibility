/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Slot } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ACF from './../acf';
import WPFusion from './../wp-fusion';
import UpdateSettings from './../../update-settings';
import links from './../../../utils/links';
import { InformationPopover } from './../../../components';

/**
 * Renders all the control settings.
 *
 * @since 1.8.0
 * @param {Object} props All the props passed to this function
 */
export default function Integrations( props ) {
	const { variables, visibilityControls } = props;
	let activeIntegrations = variables?.integrations ?? {};

	activeIntegrations = Object.keys( activeIntegrations ).map( ( key ) => {
		return activeIntegrations[ key ];
	} );

	activeIntegrations = activeIntegrations.filter(
		( integration ) => integration.active === true
	);

	// If there are no active integrations, hide this section.
	if ( activeIntegrations.length === 0 ) {
		return null;
	}

	return (
		<>
			<div className="setting-tabs__setting-controls integrations">
				<div className="setting-controls__title">
					<span>
						{ __(
							'Third-Party Integration Controls',
							'block-visibility'
						) }
					</span>
					<InformationPopover
						message={ __(
							'The settings below allow you to configure all third-party integration controls for Block Visibility. If you are looking for an integration, and do not see it below, make sure the respective third-party plugin is installed and activated on your website.',
							'block-visibility'
						) }
						subMessage={ __(
							'Visit the plugin Knowledge Base for more information on configuring third-party integration controls and what integrations are currently available in Block Visibility.',
							'block-visibility'
						) }
						link={ links.settingsVisibilityContolsIntegrations }
					/>
				</div>
				<UpdateSettings
					tabSlug="visibility_controls"
					tabSettings={ visibilityControls }
					{ ...props }
				/>
			</div>
			<div className="setting-tabs__setting-panels integrations">
				<ACF { ...props } />
				<WPFusion { ...props } />
				<Slot name="VisibilityControlsIntegrations" />

				{ /* Deprecated in version 3.0.0 */ }
				<Slot name="VisibilityControlsIntegrationsBottom" />
			</div>
		</>
	);
}
