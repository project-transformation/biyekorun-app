import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

export function ExternalLink(props) {
  return (
    <Link
      hrefAttrs={{
        // On web, launch the link in a new tab.
        target: '_blank',
      }}
      {...props}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.href);
        }
      }}
    >
      {/* Apply an underline style to the link text */}
      <Text style={styles.linkText}>{props.children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  // Style for the underlined link text
  linkText: {
    textDecorationLine: 'underline',
  },
});
