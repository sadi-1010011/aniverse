export const loadImages = async function (imageUrls: string[]) {
    const imagePromises = imageUrls.map(async (url) => {
      try {
        const module = await import(url);
        return module.default; // Assuming the default export is the image
      } catch (error) {
        console.error(`Error loading image from ${url}:`, error);
        return null;
      }
    });
  
    const images = await Promise.all(imagePromises);
    return images.filter(image => image != null); // Filter out any null images (failed loads)
  }