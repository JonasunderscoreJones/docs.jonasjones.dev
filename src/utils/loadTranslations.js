// Function to load additional translation files
export const loadAdditionalTranslations = async (locale) => {
    const translationFiles = [
      `${locale}/pagecontents/index.json`
    ];

    const mergedTranslations = {};

  for (const file of translationFiles) {
    try {
      const response = await fetch(file);
      const data = await response.json();

      // Merge the contents of each file into the mergedTranslations object
      Object.keys(data).forEach((key) => {
        // Flatten the keys by combining the file name with the key
        mergedTranslations[key] = data[key];
      });
    } catch (error) {
      console.error(`Error loading translation file ${file}:`, error);
    }
  }

  return mergedTranslations;
  };
