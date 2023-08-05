const getPageTitle = (assetName) => {
    let title = assetName.replace(/-/g, ' '); // Replace hyphens with spaces
    title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
    return title;
};

export default getPageTitle;
