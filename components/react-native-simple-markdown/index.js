import React from 'react';
import { Text, View, TouchableOpacity, Linking, Image } from 'react-native';

function MarkdownToComponent({ markdownText }) {
  const splitLines = markdownText?.split('\n');
  const components = [];

  for (let i = 0; i < splitLines?.length; i++) {
    const line = splitLines[i];

    // Handle headers (##, ###, etc.)
    if (line.startsWith('# ')) {
      const headerText = line.replace('# ', '');
      components.push(
        <Text key={i} style={{ fontSize: 24, fontWeight: 'bold' }}>
          {headerText}
        </Text>
      );
    }

    // Handle paragraphs with custom styles
    else if (line.trim() !== '') {
      components.push(
        <Text key={i} style={{ marginBottom: 8, fontSize: 16 }}>
          {line}
        </Text>
      );
    }

    // Handle bold text
    else if (line.startsWith('**') && line.endsWith('**')) {
      const boldText = line.replace(/\*\*/g, '');
      components.push(
        <Text key={i} style={{ fontWeight: 'bold' }}>
          {boldText}
        </Text>
      );
    }

    // Handle image links
    else if (line.startsWith('![') && line.endsWith(')')) {
      const imageUrl = line.match(/\((.*?)\)/)[1];
      components.push(
        <Image
          key={i}
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 200 }}
        />
      );
    }

    // Handle links
    else if (line.includes('[') && line.includes('](') && line.includes(')')) {
      const linkText = line.match(/\[(.*?)\]/)[1];
      const linkUrl = line.match(/\((.*?)\)/)[1];
      components.push(
        <TouchableOpacity key={i} onPress={() => Linking.openURL(linkUrl)}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            {linkText}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  return <View>{components}</View>;
}

export default MarkdownToComponent;
