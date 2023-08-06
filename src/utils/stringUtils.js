export const getPageTitle = (assetName) => {
    let title = assetName.replace(/-/g, ' '); // Replace hyphens with spaces
    title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
    return title;
};

export const formatDate = (dateString) => {
    if (!dateString) {
        return '';
    }
    const [year, month, day] = dateString.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};