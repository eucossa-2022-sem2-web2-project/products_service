/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductsError } from '@eucossa-web2-product-service-common/errors';
import { capitalize } from 'string-shuffle';
import { INext, IReq, IRes } from '@eucossa-web2-product-service-common/requests';

export default (err: any, req: IReq, res: IRes, next: INext) => {
	// Compare instance of two objsects
	if (err instanceof ProductsError) {
		return res.status(err.statusCode).json({
			...err.toJson(),
		});
	}

	if (err.name === 'ValidationError') {
		const error: string[] = [];
		for (const key of Object.keys(err['errors']))
			error.push(`${capitalize(key)} field is required`);

		return res.status(400).json({
			data: {
				error,
			},
			status: 'error',
			message: 'Invalid inputs',
		});
	}
	if (err.code === 11000) {
		let error = '';
		const x: { [x: string]: any } = err['keyValue'];
		for (const key of Object.keys(x))
			error += `${capitalize(key)} ${x[key]} already exists`;

		return res.status(409).json({
			status: 'error',
			message: 'Duplicate entry',
			data: { error },
		});
	}

	return res.status(500).json({
		status: 'error',
		message: err.message ? err.message : 'Internal server error',
		data: {}
	});
};
