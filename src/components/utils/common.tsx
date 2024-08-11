/* eslint-disable @typescript-eslint/no-explicit-any */
export const isOdd = (num: number) => {
	return num % 2 !== 0;
};

export const normalizeNumber = (
	value = '',
	prevValue = '',
	max: any,
	maxLength?: any
) => {
	try {
		const matchedString = value?.trim()?.match(/^(\d*)([,.]\d{0,100})?$/g);

		if (matchedString) {
			const newValue =
				matchedString[0].replace(',', '.') +
				(matchedString[1] ? matchedString[1].replace(',', '.') : '');

			if (+newValue >= max) {
				return max;
			}

			if (newValue.charAt(0) === '.') {
				return `0${newValue}`;
			}
			if (newValue.length >= maxLength) {
				return prevValue;
			}
			return newValue;
		}

		if (+prevValue >= max) {
			return max;
		}
		return prevValue;
	} catch {
		return value;
	}
};
