/**
 * Statistics Parser Utility
 * Parses text input to extract statistics using regex patterns
 * No external APIs - fully in-house processing
 */

/**
 * Parse text to extract statistical data
 * @param {string} text - Raw text containing statistics
 * @returns {Array<{label: string, value: number, color: string}>}
 */
export const parseStatistics = (text) => {
    if (!text || typeof text !== 'string') return [];

    const results = [];
    const colors = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Amber
        '#EF4444', // Red
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#06B6D4', // Cyan
        '#84CC16', // Lime
    ];

    // Pattern 1: "Label: Value%" or "Label - Value%"
    const percentPattern = /([A-Za-z\s]+)[:\-–]\s*(\d+(?:\.\d+)?)\s*%/g;
    let match;

    while ((match = percentPattern.exec(text)) !== null) {
        results.push({
            label: match[1].trim(),
            value: parseFloat(match[2]),
            color: colors[results.length % colors.length]
        });
    }

    // If we found percentage data, return it
    if (results.length > 0) return results;

    // Pattern 2: "Label: $Value" or currency values
    const currencyPattern = /([A-Za-z\s]+)[:\-–]\s*\$\s*([\d,]+(?:\.\d+)?)\s*(million|billion|M|B|K)?/gi;

    while ((match = currencyPattern.exec(text)) !== null) {
        let value = parseFloat(match[2].replace(/,/g, ''));
        const suffix = match[3]?.toLowerCase();

        if (suffix === 'billion' || suffix === 'b') value *= 1000000000;
        else if (suffix === 'million' || suffix === 'm') value *= 1000000;
        else if (suffix === 'k') value *= 1000;

        results.push({
            label: match[1].trim(),
            value: value,
            color: colors[results.length % colors.length]
        });
    }

    if (results.length > 0) return results;

    // Pattern 3: "Label: Value" (plain numbers)
    const numberPattern = /([A-Za-z\s]+)[:\-–]\s*([\d,]+(?:\.\d+)?)\s*(million|billion|M|B|K)?/gi;

    while ((match = numberPattern.exec(text)) !== null) {
        let value = parseFloat(match[2].replace(/,/g, ''));
        const suffix = match[3]?.toLowerCase();

        if (suffix === 'billion' || suffix === 'b') value *= 1000000000;
        else if (suffix === 'million' || suffix === 'm') value *= 1000000;
        else if (suffix === 'k') value *= 1000;

        results.push({
            label: match[1].trim(),
            value: value,
            color: colors[results.length % colors.length]
        });
    }

    if (results.length > 0) return results;

    // Pattern 4: Comma-separated list "A 45, B 30, C 25"
    const listPattern = /([A-Za-z]+)\s+(\d+(?:\.\d+)?)/g;

    while ((match = listPattern.exec(text)) !== null) {
        results.push({
            label: match[1].trim(),
            value: parseFloat(match[2]),
            color: colors[results.length % colors.length]
        });
    }

    return results;
};

/**
 * Format large numbers for display
 * @param {number} value 
 * @returns {string}
 */
export const formatValue = (value) => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toFixed(value % 1 === 0 ? 0 : 1);
};

/**
 * Calculate total for percentage calculations
 * @param {Array} data 
 * @returns {number}
 */
export const getTotal = (data) => {
    return data.reduce((sum, item) => sum + item.value, 0);
};

/**
 * Get maximum value from data
 * @param {Array} data 
 * @returns {number}
 */
export const getMax = (data) => {
    return Math.max(...data.map(item => item.value));
};
