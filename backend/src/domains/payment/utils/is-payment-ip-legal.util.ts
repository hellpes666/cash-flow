import { isProduction } from 'src/lib';

import { YOO_KASSA_VALID_IPS } from '../constants';

const ipToNumber = (ip: string): number => {
	return (
		ip
			.split('.')
			.reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
	);
};

const isIpInCidr = (ip: string, cidr: string): boolean => {
	if (cidr.includes('/')) {
		const [subnet, prefixLength] = cidr.split('/');
		const mask = ~(2 ** (32 - parseInt(prefixLength, 10)) - 1) >>> 0;
		return (ipToNumber(ip) & mask) === (ipToNumber(subnet) & mask);
	} else {
		return ip === cidr;
	}
};

export const isPaymentIpLegal = (currentIp: string | undefined): boolean => {
	if (!currentIp) {
		return false;
	}

	if (currentIp === '::1' && !isProduction()) {
		return true;
	}

	for (const cidr of YOO_KASSA_VALID_IPS) {
		if (isIpInCidr(currentIp, cidr)) {
			return true;
		}
	}

	return false;
};
