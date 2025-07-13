/**
 * Formats a phone number for an HTML tel link
 * @param {string} phoneNumber - Phone number in any format
 * @returns {string} - Formatted HTML link with tel: protocol
 */

export function formatPhoneLink(phoneNumber: string): string {
    // Strip all non-numeric characters
    const digitsOnly: string = phoneNumber.replace(/\D/g, '');

    // Add +1 country code if it's a 10-digit US number without country code
    const formattedNumber: string = digitsOnly.length === 10 ? `+1${digitsOnly}` : digitsOnly;

    // Create visible text with nice formatting
    // Format as: (XXX) XXX-XXXX for US numbers
    // let displayText: string = phoneNumber;
    // if (digitsOnly.length === 10) {
    //     // US format
    //     displayText = `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
    // }

    // Return formatted HTML link
    return formattedNumber
}