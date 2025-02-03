import React, { useState, useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { loadAdditionalTranslations } from '../utils/loadTranslations'; // Import the helper function

const Translate = ({ id }) => {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const { i18n } = useDocusaurusContext();

  // Look up translation from the default Docusaurus translations first
  let translation = translate({ id });

  if (translation !== id) {
    return <>{translation}</>; // Return the translation if found
  }

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        // Load additional translations based on the current locale
        const pageTranslations = await loadAdditionalTranslations(i18n.currentLocale);
        setTranslations(pageTranslations);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [i18n]); // Re-fetch translations if the locale changes

  if (loading) {
    return <span>Loading...</span>; // Show a loading state while translations are being fetched
  }

  // If not found in the default translations, try additional files
    if (translation == id && translations[id]) {
        console.log('translations', translations);
        console.log('translation:', translations[id]);
        console.log('translation.message:', translations[id].message);
        translation = translations[id].message;
    }

  // If translation is found, return it; otherwise, return the id as fallback
  return <>{translation || id}</>;
};

export default Translate;
