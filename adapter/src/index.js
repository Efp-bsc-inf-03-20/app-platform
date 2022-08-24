import { checkForSWUpdateAndReload, OfflineInterface } from '@dhis2/pwa'
import PropTypes from 'prop-types'
import React from 'react'
import { AppWrapper } from './components/AppWrapper.js'
import { ErrorBoundary } from './components/ErrorBoundary.js'
import { ServerVersionProvider } from './components/ServerVersionProvider.js'

const offlineInterface = new OfflineInterface()

const AppAdapter = ({
    url,
    apiVersion,
    appName,
    pwaEnabled,
    plugin,
    children,
}) => (
    <ErrorBoundary fullscreen onRetry={checkForSWUpdateAndReload}>
        <ServerVersionProvider
            url={url}
            apiVersion={apiVersion}
            pwaEnabled={pwaEnabled}
            offlineInterface={offlineInterface}
        >
            <AppWrapper
                appName={appName}
                offlineInterface={offlineInterface}
                plugin={plugin}
            >
                {children}
            </AppWrapper>
        </ServerVersionProvider>
    </ErrorBoundary>
)

AppAdapter.propTypes = {
    appName: PropTypes.string.isRequired,
    apiVersion: PropTypes.number,
    children: PropTypes.element,
    plugin: PropTypes.bool,
    pwaEnabled: PropTypes.bool,
    url: PropTypes.string,
}

export default AppAdapter
